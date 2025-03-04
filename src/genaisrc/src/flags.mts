export const diagnostics =
    !!process.env.GENAISCRIPT_DEBUG || !!process.env.DEBUG
if (diagnostics) console.warn(`diagnostics enabled`)
