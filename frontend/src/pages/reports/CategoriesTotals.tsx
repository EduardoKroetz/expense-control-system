import { useEffect, useState } from "react";
import type CategoryTotals from "../../types/categoryTotals";
import { getCategoriesTotals } from "../../services/reportService";
import Spinner from "../../components/ui/Spinner";
import PageHeader from "../../components/ui/PageHeader";
import { valueFormatter } from "../../utils/valueFormatter";
import Table from "../../components/ui/Table";
import EmptyStateTable from "../../components/ui/EmptyStateTable";

export default function CategoriesTotals() {
  const [categoriesTotals, setCategoriesTotals] = useState<CategoryTotals | undefined>();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    fetchCategoriesTotals();
  }, [])

  async function fetchCategoriesTotals() {
    setIsLoading(true);

    try {
      const data = await getCategoriesTotals();
      setCategoriesTotals(data);
    }
    finally {
      setIsLoading(false);
    }
  }

  return (
    <div>
      <PageHeader title="Relatórios > Totais por Categoria" />

      {isLoading || !categoriesTotals ? (
          <div className="flex justify-center">
            <Spinner size="xl" />
          </div>
        )  
        : (
          <Table>
            <thead>
              <tr>
                <th>Categoria</th>  
                <th>Total Despesa</th>  
                <th>Total Receita</th>  
                <th>Saldo</th>  
              </tr> 
            </thead>       
            <tbody>
              {categoriesTotals.categories.length > 0 ? (
                categoriesTotals.categories.map(category => (       
                  <tr key={category.id}>
                    <td>
                      {category.description}
                    </td>
                    <td>
                      {valueFormatter.format(category.totalExpense)}
                    </td>
                    <td>
                      {valueFormatter.format(category.totalIncome)}
                    </td>
                    <td>
                      {valueFormatter.format(category.balance)}
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
    </div>
  )
}