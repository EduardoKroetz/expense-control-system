type TableProps = {
  children: React.ReactNode
}

export default function Table({ children }: TableProps) {
  return (
    <div className="overflow-x-auto rounded-box border border-base-content/5 bg-base-100">
      <table className="table">
        {children}
      </table>
    </div>
  )
}