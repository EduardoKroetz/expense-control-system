import { Search } from "lucide-react";
import Table from "../../components/ui/Table";
import EmptyState from "../../components/ui/EmptyStateTable";
import type Transaction from "../../types/transaction";
import { formatTypePtBr } from "../../utils/parseTransactionType";
import { valueFormatter } from "../../utils/valueFormatter";

type TransactionsTableProps = {
  transactions: Transaction[],
  onView: (transaction: Transaction) => void,
}

export default function TransactionsTable({ transactions, onView }: TransactionsTableProps) {
  return (
    <Table>
      <thead>
        <tr>
          <th>Consultar</th>  
          <th>Descrição</th>  
          <th>Valor</th>  
          <th>Tipo</th>  
          <th>Categoria</th>  
          <th>Pessoa</th>  
        </tr> 
      </thead>       
      <tbody>
        {transactions.length > 0 ? (
          transactions.map(transaction => (       
            <tr key={transaction.id}>
              <td>
                  <button 
                    className="btn bg-blue-400"
                    onClick={() => onView(transaction)}
                    >
                    <Search className="w-4 h-4" />
                  </button>
              </td>
              <td>
                {transaction.description}
              </td>
              <td>
                {valueFormatter.format(transaction.value)}
              </td>
              <td>
                {formatTypePtBr(transaction.type)}
              </td>
              <td>
                {transaction.categoryDescription}
              </td>
              <td>
                {transaction.personFullName}
              </td>
            </tr>         
          ))
        ) : (
          <EmptyState colSpan={6} />
        )}

      </tbody> 
    </Table>
  )
}