import { Search, Trash2 } from "lucide-react";
import type Person from "../../types/person";
import Table from "../../components/ui/Table";
import EmptyStateTable from "../../components/ui/EmptyStateTable";

type PersonsTableProps = {
  persons: Person[],
  onView: (person: Person) => void,
  onDelete: (person: Person) => void
}

export default function PersonsTable({ persons, onView, onDelete }: PersonsTableProps) {
  return (
    <Table>
      <thead>
        <tr>
          <th>Consultar</th>  
          <th>Nome</th>  
          <th>Idade</th>  
          <th>Remover</th>  
        </tr> 
      </thead>       
      <tbody>
        {persons.length > 0 ? (
          persons.map(person => (       
            <tr key={person.id}>
              <td>
                  <button 
                    className="btn bg-blue-400"
                    onClick={() => onView(person)}
                    >
                    <Search className="w-4 h-4" />
                  </button>
              </td>
              <td>
                {person.fullName}
              </td>
              <td>
                {person.age}
              </td>
              <td>
                <button 
                  className="btn bg-red-400"
                  onClick={() => onDelete(person)}
                >
                  <Trash2 className="w-4 h-4"></Trash2>
                </button>
              </td>
            </tr>         
          ))
        ) : (
          <EmptyStateTable colSpan={4} />
        )}

      </tbody> 
    </Table>
  )
}