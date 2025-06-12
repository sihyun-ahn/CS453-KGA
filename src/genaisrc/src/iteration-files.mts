import type {
    PromptPexContext,
    PromptPexTest,
    PromptPexTestResult,
    PromptPexMutationTree,
} from "./types.mts"

const dbg = host.logger("promptpex:iteration-files")

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

export async function saveIterationFiles(
    files: PromptPexContext,
    tree: PromptPexMutationTree,
    tests: PromptPexTest[],
    results: PromptPexTestResult[]
): Promise<void> {
    const iterationDir = getIterationDirectoryPath(
        files,
        tree.currentBranch,
        tree.currentIteration
    )

    // Save tests
    const testsPath = path.join(iterationDir, "tests.json")
    const testsContent = JSON.stringify(tests, null, 2)
    await workspace.writeText(testsPath, testsContent)
    dbg(`saved tests to ${testsPath}`)

    // Save test results
    const resultsPath = path.join(iterationDir, "test-results.json")
    const resultsContent = JSON.stringify(results, null, 2)
    await workspace.writeText(resultsPath, resultsContent)
    dbg(`saved results to ${resultsPath}`)

    // Save iteration metadata
    const metadataPath = path.join(iterationDir, "metadata.json")
    const metadata = {
        branchName: tree.currentBranch,
        iteration: tree.currentIteration,
        timestamp: new Date().toISOString(),
        testsGenerated: tests.length,
        resultsCount: results.length,
        complianceRate:
            results.length > 0
                ? results.filter((r) => r.compliance === "ok").length /
                  results.length
                : 0,
        complianceThreshold: tree.complianceThreshold,
        mutatedRuleId: getCurrentBranch(tree).mutatedRuleId,
    }
    await workspace.writeText(metadataPath, JSON.stringify(metadata, null, 2))
    dbg(`saved metadata to ${metadataPath}`)
}

export async function saveIterationTestData(
    files: PromptPexContext,
    tree: PromptPexMutationTree,
    testDataContent: string
): Promise<void> {
    const iterationDir = getIterationDirectoryPath(
        files,
        tree.currentBranch,
        tree.currentIteration
    )
    const testDataPath = path.join(iterationDir, "test-data.json")
    await workspace.writeText(testDataPath, testDataContent)
    dbg(`saved test data to ${testDataPath}`)
}

export async function loadIterationTests(
    files: PromptPexContext,
    branchName: string,
    iteration: number
): Promise<PromptPexTest[] | null> {
    try {
        const iterationDir = getIterationDirectoryPath(
            files,
            branchName,
            iteration
        )
        const testsPath = path.join(iterationDir, "tests.json")
        const { content } = await workspace.readText(testsPath)
        if (!content) return null
        return JSON.parse(content) as PromptPexTest[]
    } catch (error) {
        dbg(`failed to load iteration tests: ${error}`)
        return null
    }
}

export async function loadIterationResults(
    files: PromptPexContext,
    branchName: string,
    iteration: number
): Promise<PromptPexTestResult[] | null> {
    try {
        const iterationDir = getIterationDirectoryPath(
            files,
            branchName,
            iteration
        )
        const resultsPath = path.join(iterationDir, "test-results.json")
        const { content } = await workspace.readText(resultsPath)
        if (!content) return null
        return JSON.parse(content) as PromptPexTestResult[]
    } catch (error) {
        dbg(`failed to load iteration results: ${error}`)
        return null
    }
}

export async function getAllIterationHistory(
    files: PromptPexContext,
    tree: PromptPexMutationTree
): Promise<
    Array<{
        branchName: string
        iteration: number
        tests: PromptPexTest[]
        results: PromptPexTestResult[]
        metadata: any
    }>
> {
    const history = []
    const allBranches = [tree.rootBranch, ...tree.branches]

    for (const branch of allBranches) {
        for (let i = 0; i < branch.totalIterations; i++) {
            const tests = await loadIterationTests(files, branch.name, i)
            const results = await loadIterationResults(files, branch.name, i)

            if (tests && results) {
                const iterationDir = getIterationDirectoryPath(
                    files,
                    branch.name,
                    i
                )
                const metadataPath = path.join(iterationDir, "metadata.json")
                const { content } = await workspace.readText(metadataPath)
                const metadata = content ? JSON.parse(content) : {}

                history.push({
                    branchName: branch.name,
                    iteration: i,
                    tests,
                    results,
                    metadata,
                })
            }
        }
    }

    return history
}

function getCurrentBranch(tree: PromptPexMutationTree) {
    if (tree.currentBranch === "original") {
        return tree.rootBranch
    }

    const branch = tree.branches.find((b) => b.name === tree.currentBranch)
    if (!branch) {
        throw new Error(`Branch not found: ${tree.currentBranch}`)
    }
    return branch
}
