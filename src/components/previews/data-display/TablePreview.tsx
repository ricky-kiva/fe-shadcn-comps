export function TablePreview() {
  return (
    <div className="w-full max-w-[155px] overflow-hidden rounded-xs border border-border bg-canvas shadow-xs">
      <table className="w-full text-left font-sans text-[10px]">
        <thead className="bg-canvas-soft border-b border-border text-neutral-400 font-medium">
          <tr>
            <th className="py-1 px-1.5">Invoice</th>
            <th className="py-1 px-1.5 text-right">Status</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-border/60 font-mono text-[9px] text-foreground">
          <tr>
            <td className="py-1 px-1.5">INV-001</td>
            <td className="py-1 px-1.5 text-right text-emerald-500">Paid</td>
          </tr>
          <tr>
            <td className="py-1 px-1.5">INV-002</td>
            <td className="py-1 px-1.5 text-right text-neutral-400">Pending</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
