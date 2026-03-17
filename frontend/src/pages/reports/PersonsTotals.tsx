import { useEffect, useState } from "react";
import PageHeader from "../../components/ui/PageHeader";
import Spinner from "../../components/ui/Spinner";
import Table from "../../components/ui/Table";
import type PersonTotals from "../../types/personTotals";
import { getPersonsTotals } from "../../services/reportService";
import { valueFormatter } from "../../utils/valueFormatter";
import EmptyStateTable from "../../components/ui/EmptyStateTable";

export default function PersonsTotals() {
  const [personsTotals, setPersonsTotals] = useState<PersonTotals | undefined>();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    fetchPersonsTotals();
  }, [])

  async function fetchPersonsTotals() {
    setIsLoading(true);

    try {
      const data = await getPersonsTotals();
      setPersonsTotals(data);
    }
    finally {
      setIsLoading(false);
    }
  }

  return (
    <div>
      <PageHeader title="Relatórios > Totais por Pessoa" />

      {isLoading || !personsTotals ? (
          <div className="flex justify-center">
            <Spinner size="xl" />
          </div>
        )  
        : (
          <Table>
            <thead>
              <tr>
                <th>Pessoa</th>  
                <th>Total Despesa</th>  
                <th>Total Receita</th>  
                <th>Saldo</th>  
              </tr> 
            </thead>       
            <tbody>
              {personsTotals.persons.length > 0 ? (
                personsTotals.persons.map(person => (       
                  <tr key={person.id}>
                    <td>
                      {person.fullName}
                    </td>
                    <td>
                      {valueFormatter.format(person.totalExpense)}
                    </td>
                    <td>
                      {valueFormatter.format(person.totalIncome)}
                    </td>
                    <td>
                      {valueFormatter.format(person.balance)}
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