export function toLatexTable(
    data: any[],
    options?: { headers?: string[]; label?: string; caption?: string }
) {
    if (!data?.length) return "no data";
    const { headers = Object.keys(data[0]), label, caption } = options || {};
    const latexTable = `
  \\begin{table}[h!]
  \\centering
  \\begin{tabular}{|${headers.map(() => `c`).join("|")}|}
  \\hline
  ${headers.join(" & ")} \\\\
  \\hline
  ${data
      .map((raw) =>
          headers.map((k) => ("" + raw[k]).replace(/&/g, "\\&")).join(" & ")
      )
      .join(`\\\\\n\\hline\n`)}
  \\end{tabular}
  ${caption ? `\\caption{${caption}}` : ""}
  ${label ? `\\label{${label}}` : ""}
  \\end{table}
  `;
    return latexTable;
}
