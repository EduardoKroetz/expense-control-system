
type EmptyStateTable = {
  colSpan: number
}

export default function EmptyStateTable({ colSpan }: EmptyStateTable) {
  return (
    <tr className="text-center">
      <td colSpan={colSpan} className="text-sm text-base-content/60 font-semibold">
        Sem registros
      </td>
    </tr>
  )
}