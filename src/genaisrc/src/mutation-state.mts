import type {
    PromptPexContext,
    PromptPexIterationOptions,
    PromptPexMutationTree,
    PromptPexMutationState,
    PromptPexMutationBranch,
    PromptPexMutationNode,
    PromptPexTestResult,
    PromptPexRule,
} from "./types.mts"

const dbg = host.logger("promptpex:mutation-state")

export async function initializeMutationTree(
    files: PromptPexContext,
    allRules: PromptPexRule[],
    options: PromptPexIterationOptions
): Promise<PromptPexMutationTree> {
    const { complianceThreshold = 0.5, maxIterationsPerBranch = 5 } = options

    const tree: PromptPexMutationTree = {
        rootBranch: {
            name: "original",
            nodes: [],
            isComplete: false,
            totalIterations: 0,
        },
        branches: allRules.map((rule) => ({
            name: `rule-${rule.id}-inverted`,
            mutatedRuleId: rule.id,
            nodes: [],
            isComplete: false,
            totalIterations: 0,
        })),
        currentBranch: "original",
        currentIteration: 0,
        totalRules: allRules.length,
        complianceThreshold,
        maxIterationsPerBranch,
        isComplete: false,
        startTime: new Date().toISOString(),
        lastUpdateTime: new Date().toISOString(),
    }

    await saveMutationTree(files, tree)
    dbg(`initialized mutation tree with ${allRules.length} rule branches`)
    return tree
}

export async function loadMutationTree(
    files: PromptPexContext
): Promise<PromptPexMutationTree | null> {
    try {
        const filePath = path.join(files.dir || "", "mutation-state.json")
        const { content } = await workspace.readText(filePath)
        if (!content) {
            dbg("loadMutationTree: no content found")
            return null
        }

        const tree = JSON.parse(content) as PromptPexMutationTree
        const currentBranch =
            tree.currentBranch === "original"
                ? tree.rootBranch
                : tree.branches.find((b) => b.name === tree.currentBranch)
        dbg(
            `loadMutationTree: loaded tree - currentBranch=${tree.currentBranch}, totalIterations=${currentBranch?.totalIterations}, nodes=${currentBranch?.nodes.length}`
        )
        return tree
    } catch (error) {
        dbg(`loadMutationTree: failed to load - ${error}`)
        return null
    }
}

export async function saveMutationTree(
    files: PromptPexContext,
    tree: PromptPexMutationTree
): Promise<void> {
    tree.lastUpdateTime = new Date().toISOString()
    const filePath = path.join(files.dir || "", "mutation-state.json")
    const content = JSON.stringify(tree, null, 2)

    const currentBranch =
        tree.currentBranch === "original"
            ? tree.rootBranch
            : tree.branches.find((b) => b.name === tree.currentBranch)
    dbg(
        `saveMutationTree: saving tree - currentBranch=${tree.currentBranch}, totalIterations=${currentBranch?.totalIterations}, nodes=${currentBranch?.nodes.length}`
    )

    await workspace.writeText(filePath, content)
    dbg(`saveMutationTree: saved to ${filePath}`)
}

export async function addIterationResult(
    files: PromptPexContext,
    tree: PromptPexMutationTree,
    results: PromptPexTestResult[],
    testsGenerated: number
): Promise<void> {
    const currentBranch = getCurrentBranch(tree)
    const compliance = calculateCompliance(results)

    dbg(
        `addIterationResult: BEFORE - branch=${tree.currentBranch}, totalIterations=${currentBranch.totalIterations}, nodes=${currentBranch.nodes.length}`
    )
    console.log(
        `🔍 DEBUG addIterationResult BEFORE: branch=${tree.currentBranch}, totalIterations=${currentBranch.totalIterations}, nodes=${currentBranch.nodes.length}`
    )

    const node: PromptPexMutationNode = {
        id: `${tree.currentBranch}-${tree.currentIteration}`,
        branchName: tree.currentBranch,
        iteration: tree.currentIteration,
        mutatedRuleId: currentBranch.mutatedRuleId,
        compliance,
        testsGenerated,
        timestamp: new Date().toISOString(),
        results,
        isComplete: true,
    }

    currentBranch.nodes.push(node)
    currentBranch.totalIterations++

    dbg(
        `addIterationResult: AFTER - branch=${tree.currentBranch}, totalIterations=${currentBranch.totalIterations}, nodes=${currentBranch.nodes.length}`
    )
    console.log(
        `🔍 DEBUG addIterationResult AFTER: branch=${tree.currentBranch}, totalIterations=${currentBranch.totalIterations}, nodes=${currentBranch.nodes.length}`
    )

    // Update best compliance for this branch
    if (
        !currentBranch.bestCompliance ||
        compliance > currentBranch.bestCompliance
    ) {
        currentBranch.bestCompliance = compliance
        dbg(`addIterationResult: updated best compliance to ${compliance}`)
        console.log(`🔍 DEBUG updated best compliance to ${compliance}`)
    }

    await saveMutationTree(files, tree)
    dbg(
        `addIterationResult: saved tree - branch=${tree.currentBranch}, iteration=${tree.currentIteration}, compliance=${compliance}`
    )
    console.log(
        `🔍 DEBUG saved tree - branch=${tree.currentBranch}, iteration=${tree.currentIteration}, compliance=${compliance}`
    )
}

export function calculateCompliance(results: PromptPexTestResult[]): number {
    if (!results.length) {
        dbg("calculateCompliance: no results provided")
        return 0
    }

    const compliantResults = results.filter((r) => r.compliance === "ok")
    const complianceRate = compliantResults.length / results.length

    dbg(
        `calculateCompliance: ${compliantResults.length}/${results.length} = ${complianceRate}`
    )
    dbg(`compliance values: ${results.map((r) => r.compliance).join(", ")}`)

    return complianceRate
}

export function getCurrentBranch(
    tree: PromptPexMutationTree
): PromptPexMutationBranch {
    if (tree.currentBranch === "original") {
        return tree.rootBranch
    }

    const branch = tree.branches.find((b) => b.name === tree.currentBranch)
    if (!branch) {
        throw new Error(`Branch not found: ${tree.currentBranch}`)
    }
    return branch
}

export function getMutationState(
    tree: PromptPexMutationTree
): PromptPexMutationState {
    const currentBranch = getCurrentBranch(tree)
    const currentCompliance =
        currentBranch.nodes[currentBranch.nodes.length - 1]?.compliance ?? 0

    // Check if current branch should continue iterating
    const canContinueIteration =
        currentBranch.totalIterations < tree.maxIterationsPerBranch &&
        currentCompliance < tree.complianceThreshold

    // Find available branches to mutate to (excluding current branch)
    const availableBranches = tree.branches
        .filter((b) => !b.isComplete && b.name !== tree.currentBranch)
        .map((b) => b.name)

    // Check if we can mutate rules (move to next branch)
    const canMutateRules =
        !canContinueIteration &&
        (currentCompliance >= tree.complianceThreshold ||
            currentBranch.totalIterations >= tree.maxIterationsPerBranch) &&
        availableBranches.length > 0

    let nextAction: "continue_iteration" | "mutate_rules" | "complete"
    if (canContinueIteration) {
        nextAction = "continue_iteration"
    } else if (canMutateRules) {
        nextAction = "mutate_rules"
    } else {
        nextAction = "complete"
        tree.isComplete = true
    }

    dbg(
        `getMutationState: branch=${tree.currentBranch}, iterations=${currentBranch.totalIterations}/${tree.maxIterationsPerBranch}, compliance=${currentCompliance}/${tree.complianceThreshold}, action=${nextAction}`
    )

    return {
        tree,
        availableBranches,
        canContinueIteration,
        canMutateRules,
        nextAction,
    }
}

export function moveToNextBranch(tree: PromptPexMutationTree): string | null {
    const currentBranch = getCurrentBranch(tree)
    currentBranch.isComplete = true

    // Find next available branch
    const nextBranch = tree.branches.find((b) => !b.isComplete)
    if (!nextBranch) {
        tree.isComplete = true
        return null
    }

    tree.currentBranch = nextBranch.name
    tree.currentIteration = 0

    dbg(`moved to next branch: ${nextBranch.name}`)
    return nextBranch.name
}

export function incrementIteration(tree: PromptPexMutationTree): void {
    tree.currentIteration++
    dbg(
        `incremented iteration to ${tree.currentIteration} for branch ${tree.currentBranch}`
    )
}

export function getIterationDirectoryPath(
    files: PromptPexContext,
    branchName: string,
    iteration: number
): string {
    return path.join(
        files.dir || "",
        "mutation-runs",
        branchName,
        `iteration-${iteration}`
    )
}

export async function ensureIterationDirectory(
    files: PromptPexContext,
    branchName: string,
    iteration: number
): Promise<string> {
    const dirPath = getIterationDirectoryPath(files, branchName, iteration)
    // Directory will be created automatically when we write files
    dbg(`iteration directory: ${dirPath}`)
    return dirPath
}
