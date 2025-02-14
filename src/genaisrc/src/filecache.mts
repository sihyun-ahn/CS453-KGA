import { RULE_EVALUATION_DIR, TEST_EVALUATION_DIR } from "./constants.mts";
import {
    resolveTestId,
    resolvePromptId,
    resolveRuleHash,
} from "./resolvers.mts";
import type {
    PromptPexContext,
    PromptPexOptions,
    PromptPexTest,
} from "./types.mjs";

export async function resolveTestEvalPath(
    files: PromptPexContext,
    test: PromptPexTest,
    options: PromptPexOptions
) {
    const { evalCache } = options || {};
    const id = await resolveTestId(files, test);
    const promptid = await resolvePromptId(files);
    const file = evalCache
        ? await workspace.readText(
              path.join(files.dir, TEST_EVALUATION_DIR, `${id}.json`)
          )
        : undefined;
    return { id, promptid, file };
}

export async function resolveRuleEvalPath(
    files: PromptPexContext,
    rule: string,
    options: PromptPexOptions
) {
    const { evalCache } = options || {};
    const hash = await resolveRuleHash(files, rule);
    const promptid = await resolvePromptId(files);
    const file = evalCache
        ? await workspace.readText(
              path.join(files.dir, RULE_EVALUATION_DIR, `${hash}.json`)
          )
        : undefined;
    return { id: hash, promptid, file };
}

export async function resolveTestPath(
    files: PromptPexContext,
    test: PromptPexTest,
    options: { model: string } & PromptPexOptions
) {
    const { model, evalCache } = options;
    const id = await resolveTestId(files, test);
    const promptid = await resolvePromptId(files);
    const file = evalCache
        ? await workspace.readText(
              path.join(
                  files.dir,
                  model
                      .replace(/^[^:]+:/g, "")
                      .replace(/[^a-z0-9\.\-]/g, "_")
                      .replace(/_+/g, "_")
                      .replace(/^_+|_+$/g, "")
                      .toLowerCase(),
                  `${id}.json`
              )
          )
        : undefined;
    return { id, promptid, file };
}
