import type { PromptPexContext } from "./types.mts";

export async function checkPromptSafety(files: PromptPexContext) {
    const contentSafety = await host.contentSafety();
    if (!contentSafety) {
        env.output.warn(`content safety not configured, skipping`);
    } else {
        if (
            (await contentSafety.detectHarmfulContent?.(files.prompt))
                ?.harmfulContentDetected
        )
            throw new Error(`Harmful content detected in prompt`);
        if (
            (await contentSafety.detectPromptInjection?.(files.prompt))
                ?.attackDetected
        )
            throw new Error(`Harmful content detected in rules`);
    }
}
