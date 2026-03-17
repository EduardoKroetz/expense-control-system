import { useEffect, useState } from "react";
import PageHeader from "../../components/ui/PageHeader";
import type Transaction from "../../types/transaction";
import Spinner from "../../components/ui/Spinner";
import Modal from "../../components/ui/Modal";
import { Plus } from "lucide-react";
import { getTransactions } from "../../services/transactionService";
import TransactionsTable from "./TransactionsTable";
import TransactionForm from "./TransactionForm";

export default function Transactions() {
  const [modalViewOpen, setModalViewOpen] = useState(false);
  const [transaction, setTransaction] = useState<Transaction | undefined>();

  const [transactions, setTransactions] = useState<Transaction[]>([]);

  const [isLoadingTransactions, setIsLoadingTransactions] = useState(false);

  useEffect(() => {
    fetchTransactions();
  },[])

  async function fetchTransactions() {
    setIsLoadingTransactions(true);

    try {
      const data = await getTransactions();
      setTransactions(data);
    }
    finally {
      setIsLoadingTransactions(false);
    }
  }

  function handleTransactionSaved(transaction: Transaction) {
    setTransaction(undefined);
    setModalViewOpen(false);

    setTransactions(prev => [...prev, transaction])
  }

  function openDetailModal(transaction: Transaction | undefined) {
    setTransaction(transaction ?? { id: 0, description: "", value: 0, type: "Expense", categoryId: 0, personId: 0 }); 
    setModalViewOpen(true);
  }

  return (
    <div>
      <PageHeader title="Transações">
        <button 
          className="btn bg-blue-400"
          onClick={() => openDetailModal(undefined)}
        >
          Nova transação
          <Plus size={16}></Plus>
        </button>
      </PageHeader>

      {isLoadingTransactions ? (
          <div className="flex justify-center">
            <Spinner size="xl" />
          </div>
        )  
        : (
          <TransactionsTable 
            transactions={transactions} 
            onView={openDetailModal} 
          />
        )
      }

      <Modal 
        open={modalViewOpen} 
        title={!transaction || transaction.id === 0  ? "Nova transação" : "Visualizar Transação"} 
        onClose={() => setModalViewOpen(false)}
      >
        <TransactionForm 
          key={transaction?.id} 
          transaction={transaction} 
          onSuccess={handleTransactionSaved}
        />
      </Modal>
    </div>
  )
}