export async function checkConfirm(tag: string) {
    const v = process.env.CONFIRM
    if (v === "*" || v?.toLowerCase()?.includes(tag?.toLowerCase())) {
        if (!(await host.confirm(`Continue`))) cancel("user cancelled")
    }
}
