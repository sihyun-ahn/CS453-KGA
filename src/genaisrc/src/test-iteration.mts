import { generateTests } from "./testgen.mts"
import { runTests } from "./testrun.mts"
import { computeOverview } from "./reports.mts"
import { parseAllRules } from "./parsers.mts"
import {
    initializeMutationTree,
    loadMutationTree,
    saveMutationTree,
    addIterationResult,
    getMutationState,
    moveToNextBranch,
    incrementIteration,
    getCurrentBranch,
} from "./mutation-state.mts"
import { saveIterationFiles } from "./iteration-files.mts"
import type {
    PromptPexContext,
    PromptPexIterationOptions,
    PromptPexMutationTree,
    PromptPexMutationState,
    PromptPexTestResult,
    PromptPexTest,
} from "./types.mts"

const dbg = host.logger("promptpex:iteration")
const { output } = env

export async function runIterativeTestGeneration(
    files: PromptPexContext,
    options: PromptPexIterationOptions,
    existingTree?: PromptPexMutationTree
): Promise<{ tree: PromptPexMutationTree; finalResults: PromptPexTestResult[] }> {
    const { enableMutationSystem = true } = options
    
    if (!enableMutationSystem) {
        // Fall back to single iteration
        const tests = await generateTests(files, options)
        const results = await runTests(files, options)
        return { tree: null as any, finalResults: results }
    }

    // Use existing tree if provided, otherwise initialize or load mutation tree
    let tree: PromptPexMutationTree
    if (existingTree) {
        tree = existingTree
        dbg("using existing tree state")
    } else {
        tree = await loadMutationTree(files)
        if (!tree) {
            const allRules = parseAllRules(files, options)
            tree = await initializeMutationTree(files, allRules, options)
            dbg("initialized new mutation tree")
        } else {
            dbg("loaded existing mutation tree")
        }
    }

    // Set up mutation options for current branch
    const currentBranch = getCurrentBranch(tree)
    const shouldMutateRule = currentBranch.mutatedRuleId !== undefined

    // Check current state
    const state = getMutationState(tree)
    
    if (state.nextAction === 'complete') {
        output.heading(3, `Iteration System Status`)
        displayTreeStatus(tree)
        output.heading(3, "🎉 Multi-iteration test generation complete!")
        displayFinalSummary(tree)
        return { tree, finalResults: await getAllResults(tree) }
    }

    // Show status BEFORE running iteration (but after checking completion)
    output.heading(3, `Iteration System Status`)
    displayTreeStatus(tree)

    // Run current iteration with retry logic
    output.heading(4, `Running Iteration ${currentBranch.totalIterations + 1}`)
    output.itemValue("Current Branch", tree.currentBranch)
    output.itemValue("Mutated Rule", currentBranch.mutatedRuleId || "none")

    // Add current context to options for file naming
    const mutatedOptions = {
        ...options,
        mutateRule: shouldMutateRule,
        currentBranch: tree.currentBranch,
        currentIteration: tree.currentIteration,
        compliance: true, // Enable compliance evaluation for iteration system
    }

    // Retry logic for test generation failures
    const maxRetries = 3
    let retryCount = 0
    let tests: PromptPexTest[] = []
    let results: PromptPexTestResult[] = []
    
    while (retryCount < maxRetries) {
        try {
            tests = await generateTests(files, mutatedOptions)
            
            if (!tests || tests.length === 0) {
                retryCount++
                output.warn(`⚠️ Test generation failed (no tests generated). Retry ${retryCount}/${maxRetries}`)
                
                if (retryCount < maxRetries) {
                    output.note(`🔄 Retrying test generation...`)
                    continue
                } else {
                    output.warn(`❌ Test generation failed after ${maxRetries} attempts. Moving to next iteration.`)
                    // Create a dummy failed result to record the failure
                    results = []
                    break
                }
            }
            
            // Test generation succeeded, now run the tests
            results = await runTests(files, mutatedOptions)
            break // Success, exit retry loop
            
        } catch (error) {
            retryCount++
            const errorMessage = error instanceof Error ? error.message : String(error)
            
            if (errorMessage.includes("No tests found to run") || errorMessage.includes("Invalid generated test format")) {
                output.warn(`⚠️ Test generation/parsing failed: ${errorMessage}. Retry ${retryCount}/${maxRetries}`)
                
                if (retryCount < maxRetries) {
                    output.note(`🔄 Retrying test generation...`)
                    continue
                } else {
                    output.warn(`❌ Test generation failed after ${maxRetries} attempts: ${errorMessage}`)
                    // Create a dummy failed result to record the failure
                    results = []
                    tests = []
                    break
                }
            } else {
                // Different error, re-throw
                throw error
            }
        }
    }
    
    // Save iteration files in organized directory structure
    await saveIterationFiles(files, tree, tests, results)
    
    // Record results - this updates totalIterations and bestCompliance
    await addIterationResult(files, tree, results, tests.length)
    
    // Display iteration results
    displayIterationResults(tree, results)
    
    // Update state after recording results
    const updatedState = getMutationState(tree)
    
    // Display next actions
    displayNextActions(updatedState)
    
    // Auto-advance for both continuing iteration AND mutating rules
    if (updatedState.nextAction === 'continue_iteration') {
        incrementIteration(tree)
        await saveMutationTree(files, tree)
        output.note(`⏩ Automatically continuing to next iteration...`)
        // Continue with current tree state (don't reload)
        return runIterativeTestGeneration(files, options, tree)
    } else if (updatedState.nextAction === 'mutate_rules') {
        // Automatically move to next rule mutation branch
        const nextBranch = moveToNextBranch(tree)
        if (nextBranch) {
            await saveMutationTree(files, tree)
            output.note(`🔀 Automatically moving to next branch: ${nextBranch}`)
            // Continue with current tree state (don't reload)
            return runIterativeTestGeneration(files, options, tree)
        } else {
            output.heading(3, "🎉 All rule mutations explored!")
            displayFinalSummary(tree)
            return { tree, finalResults: await getAllResults(tree) }
        }
    }
    
    return { tree, finalResults: results }
}

export async function handleMutateRules(
    files: PromptPexContext,
    options: PromptPexIterationOptions
): Promise<{ tree: PromptPexMutationTree; canContinue: boolean }> {
    const tree = await loadMutationTree(files)
    if (!tree) {
        throw new Error("No mutation tree found. Run initial test generation first.")
    }

    const nextBranch = moveToNextBranch(tree)
    if (!nextBranch) {
        output.heading(3, "🎉 All rule mutations explored!")
        displayFinalSummary(tree)
        return { tree, canContinue: false }
    }

    await saveMutationTree(files, tree)
    output.heading(3, `🔀 Moved to next branch: ${nextBranch}`)
    
    return { tree, canContinue: true }
}

function displayTreeStatus(tree: PromptPexMutationTree): void {
    const totalBranches = 1 + tree.branches.length // root + rule branches
    const completedBranches = [tree.rootBranch, ...tree.branches].filter(b => b.isComplete).length
    const currentBranch = getCurrentBranch(tree)
    
    dbg(`displayTreeStatus: currentBranch=${tree.currentBranch}, totalIterations=${currentBranch.totalIterations}, nodes=${currentBranch.nodes.length}`)
    console.log(`🔍 DEBUG displayTreeStatus: currentBranch=${tree.currentBranch}, totalIterations=${currentBranch.totalIterations}, nodes=${currentBranch.nodes.length}`)
    
    output.itemValue("Progress", `${completedBranches}/${totalBranches} branches completed`)
    output.itemValue("Current Branch", tree.currentBranch)
    output.itemValue("Current Iteration", `${currentBranch.totalIterations + 1}/${tree.maxIterationsPerBranch}`)
    output.itemValue("Compliance Threshold", `${tree.complianceThreshold * 100}%`)
    
    // Show branch status
    const branches = [
        tree.rootBranch,
        ...tree.branches
    ]
    
    // Debug each branch
    branches.forEach(branch => {
        dbg(`displayTreeStatus: branch=${branch.name}, totalIterations=${branch.totalIterations}, bestCompliance=${branch.bestCompliance}`)
        console.log(`🔍 DEBUG branch: ${branch.name}, totalIterations=${branch.totalIterations}, bestCompliance=${branch.bestCompliance}`)
    })
    
    output.table(branches.map(branch => ({
        Branch: branch.name,
        Status: branch.isComplete ? "✅ Complete" : branch.name === tree.currentBranch ? "🔄 Active" : "⏳ Pending",
        Iterations: branch.totalIterations,
        "Best Compliance": branch.bestCompliance ? `${(branch.bestCompliance * 100).toFixed(1)}%` : "N/A"
    })))
}

function displayIterationResults(tree: PromptPexMutationTree, results: PromptPexTestResult[]): void {
    const currentBranch = getCurrentBranch(tree)
    const latestNode = currentBranch.nodes[currentBranch.nodes.length - 1]
    
    if (latestNode) {
        output.heading(5, "Iteration Results")
        output.itemValue("Tests Generated", latestNode.testsGenerated.toString())
        
        if (latestNode.testsGenerated === 0) {
            output.warn("⚠️ Test generation failed - no valid tests were generated")
            output.itemValue("Compliance Rate", "0.0% (no tests)")
        } else {
            output.itemValue("Compliance Rate", `${(latestNode.compliance! * 100).toFixed(1)}%`)
        }
        
        output.itemValue("Threshold", `${(tree.complianceThreshold * 100).toFixed(1)}%`)
        
        const passed = latestNode.compliance! >= tree.complianceThreshold
        if (latestNode.testsGenerated === 0) {
            output.warn(`❌ Test generation failed - will retry`)
        } else if (passed) {
            output.heading(3, `✅ Compliance threshold met!`)
        } else {
            output.warn(`❌ Below compliance threshold`)
        }
    }
}

function displayNextActions(state: PromptPexMutationState): void {
    output.heading(5, "Next Actions")
    
    switch (state.nextAction) {
        case 'continue_iteration':
            output.note("🔄 Will continue iterating on current branch (compliance below threshold)")
            break
        case 'mutate_rules':
            output.note("🔀 Will automatically move to next rule mutation branch (compliance above threshold)")
            output.itemValue("Available branches", state.availableBranches.length.toString())
            break
        case 'complete':
            output.heading(3, "🎉 Multi-iteration system complete!")
            break
    }
}

function displayFinalSummary(tree: PromptPexMutationTree): void {
    output.heading(4, "Final Summary")
    
    const allBranches = [tree.rootBranch, ...tree.branches]
    const totalIterations = allBranches.reduce((sum, b) => sum + b.totalIterations, 0)
    const bestBranch = allBranches.reduce((best, current) => 
        (current.bestCompliance || 0) > (best.bestCompliance || 0) ? current : best
    )
    
    output.itemValue("Total Iterations", totalIterations.toString())
    output.itemValue("Best Branch", bestBranch.name)
    output.itemValue("Best Compliance", `${((bestBranch.bestCompliance || 0) * 100).toFixed(1)}%`)
    
    // Summary table
    output.table(allBranches.map(branch => ({
        Branch: branch.name,
        Iterations: branch.totalIterations,
        "Best Compliance": branch.bestCompliance ? `${(branch.bestCompliance * 100).toFixed(1)}%` : "N/A",
        Status: branch.isComplete ? "Complete" : "Incomplete"
    })))
}

async function getAllResults(tree: PromptPexMutationTree): Promise<PromptPexTestResult[]> {
    const allBranches = [tree.rootBranch, ...tree.branches]
    const allResults: PromptPexTestResult[] = []
    
    for (const branch of allBranches) {
        for (const node of branch.nodes) {
            if (node.results) {
                allResults.push(...node.results)
            }
        }
    }
    
    return allResults
} 