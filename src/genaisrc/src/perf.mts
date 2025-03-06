import { performance } from "perf_hooks"
import { createWriteStream, WriteStream } from "fs"

let output: OutputTrace
let writer: WriteStream

const totals: Record<string, number> = {}

export function initPerf(options: { filename?: string; output?: OutputTrace }) {
    const { filename } = options
    if (filename) {
        writer = createWriteStream(filename)
        writer.write("id,duration\n")
    }
    output = options.output
    if (output) output.heading(3, "Performance")
}

export function start(id: string) {
    const start = performance.mark(id + ".start")
    return () => {
        const end = performance.mark(id + ".end")
        const m = performance.measure(id, id + ".start", id + ".end")
        const duration = Math.ceil(m.duration)
        totals[id] = (totals[id] || 0) + m.duration

        if (writer) writer.write(`${id},${duration}\n`)
        if (output) output.itemValue(id, `${duration}ms`)
        else console.debug(`${id}: ${duration}ms`)
    }
}

export async function measure<T>(
    id: string,
    fn: () => Awaitable<T>
): Promise<T> {
    const end = start(id)
    try {
        return await fn()
    } finally {
        end()
    }
}

export function reportPerf(output: OutputTrace) {
    output.table(
        Object.entries(totals).map(([id, duration]) => ({
            id,
            duration,
            durationMs: ms(duration),
        }))
    )
}
