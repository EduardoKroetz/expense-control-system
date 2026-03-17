import { Search, Trash2 } from "lucide-react";
import Table from "../../components/ui/Table";
import EmptyState from "../../components/ui/EmptyStateTable";
import type Category from "../../types/category";
import { formatPurposePtBr } from "../../utils/parseCategoryPurpose";

type CategoriesTableProps = {
  categories: Category[],
  onView: (category: Category) => void,
  onDelete: (category: Category) => void
}

export default function CategoriesTable({ categories, onView, onDelete }: CategoriesTableProps) {
  return (
    <Table>
      <thead>
        <tr>
          <th>Consultar</th>  
          <th>Descrição</th>  
          <th>Finalidade</th>  
          <th>Remover</th>  
        </tr> 
      </thead>       
      <tbody>
        {categories.length > 0 ? (
          categories.map(category => (       
            <tr key={category.id}>
              <td>
                  <button 
                    className="btn bg-blue-400"
                    onClick={() => onView(category)}
                    >
                    <Search className="w-4 h-4" />
                  </button>
              </td>
              <td>
                {category.description}
              </td>
              <td>
                {formatPurposePtBr(category.purpose)}
              </td>
              <td>
                <button 
                  className="btn bg-red-400"
                  onClick={() => onDelete(category)}
                >
                  <Trash2 className="w-4 h-4"></Trash2>
                </button>
              </td>
            </tr>         
          ))
        ) : (
          <EmptyState colSpan={4} />
        )}

      </tbody> 
    </Table>
  )
}