import { useEffect, useState } from "react"
import type Transaction from "../../types/transaction"
import FormField from "../../components/ui/FormField"
import { createTransaction } from "../../services/transactionService"
import Spinner from "../../components/ui/Spinner"
import toast from "react-hot-toast"
import { parseType } from "../../utils/parseTransactionType"
import { formatPurposePtBr } from "../../utils/parseCategoryPurpose"
import { getCategories } from "../../services/categoryService"
import { getPersons } from "../../services/personService"
import type Person from "../../types/person"
import type Category from "../../types/category"
import { valueFormatter } from "../../utils/valueFormatter"

type TransactionFormProps = {
  transaction?: Transaction,
  onSuccess?: (transaction: Transaction) => void
}

type Errors = {
  description?: string
  value?: string
  type?: string
  categoryId?: string
  personId?: string
}

const types = ["Expense", "Income"];

export default function TransactionForm({ transaction, onSuccess }: TransactionFormProps) {
  const newTransaction = !transaction || transaction?.id === 0;

  const [description, setDescription] = useState(transaction?.description ?? "");
  const [value, setValue] = useState(transaction?.value ?? 0);
  const [type, setType] = useState(transaction?.type ?? "");
  const [categoryId, setCategoryId] = useState(transaction?.categoryId ?? "");
  const [personId, setPersonId] = useState(transaction?.personId ?? "");
  const [personFullName, setPersonFullName] = useState(transaction?.personFullName ?? "");
  const [categoryDescription, setCategoryDescription] = useState(transaction?.categoryDescription ?? "");

  const [errors, setErrors] = useState<Errors>({})
  const [isLoading, setIsLoading] = useState(false);

  const [allCategories, setAllCategories] = useState<Category[]>([])

  const [filteredCategories, setFilteredCategories] = useState<Category[]>([])
  const [persons, setPersons] = useState<Person[]>([])

  async function fetchCategories() {
    const data = await getCategories();
    setAllCategories(data);
  }
  
  async function fetchPersons() {
    const data = await getPersons();
    setPersons(data);
  }

  useEffect(() => {
    fetchCategories();
    fetchPersons();
  }, [])

  useEffect(() => {
    setFilteredCategories(() => allCategories.filter(c => 
      c.purpose == "Both" ||
      (c.purpose == "Expense" && type == "Expense") ||
      (c.purpose == "Income" && type == "Income")
    ))

    if (newTransaction)
      setCategoryId("");
  }, [type, allCategories])

  function handleChangeValue(e: React.ChangeEvent<HTMLInputElement>) {
    const raw = e.target.value.replace(/\D/g, "");
    setValue(Number(raw) / 100);
  }

  function handleChangeCategory(ev: React.ChangeEvent<HTMLSelectElement>) {
    const id = Number(ev.target.value);

    const category = allCategories.find(c => c.id === id);

    setCategoryId(id);
    setCategoryDescription(category?.description ?? "");
  }

  function handleChangePerson(ev: React.ChangeEvent<HTMLSelectElement>) {
    const id = Number(ev.target.value);

    const person = persons.find(p => p.id === id);

    setPersonId(id);
    setPersonFullName(person?.fullName ?? "");
  }

  async function handleSubmit(e: React.SubmitEvent) {
    e.preventDefault()

    const newErrors: Errors = {}

    if (!description.trim()) {
      newErrors.description = "Descrição é obrigatório"
    }  else if (description.length > 400) {
      newErrors.description = "Descrição deve possuir no máximo 400 caracteres"
    }

    if (value <= 0) {
      newErrors.value = "Valor deve ser maior que zero."
    }

    if (!type) {
      newErrors.type = "Tipo é obrigatório"
    } 

    if (!categoryId) {
      newErrors.categoryId = "Categoria é obrigatória"
    } 
   
    if (!personId) {
      newErrors.personId = "Pessoa é obrigatória"
    } 

    setErrors(newErrors)

    if (Object.keys(newErrors).length > 0) return

    setIsLoading(true);

    const data: Transaction = {
      id: transaction?.id ?? 0,
      description,
      value: value,
      type: parseType(type!),
      categoryId: Number(categoryId),
      personId: Number(personId),
      personFullName: personFullName,
      categoryDescription: categoryDescription
    }

    try {
      const res = await createTransaction(data)
      data.id = res.id;
    } catch {
      toast.error("Erro ao salvar a transação")
      return;
    }
    finally {
      setIsLoading(false);
    }

    toast.success(`Transação ${newTransaction ? "criada" : "atualizada"} com sucesso!`)
    onSuccess?.(data)
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <FormField name="Descrição" error={errors.description} > 
        <input
          type="text"
          placeholder="Descrição"
          className={`input input-bordered w-full ${errors.description ? "input-error" : ""}`}
          value={description}
          maxLength={400}
          onChange={(e) => setDescription(e.target.value)}
        />
      </FormField>

      <FormField name="Valor" error={errors.value} > 
        <input
          type="text"
          placeholder="Valor"
          className={`input input-bordered w-full ${errors.value ? "input-error" : ""}`}
          value={valueFormatter.format(value)}
          onChange={handleChangeValue}
        />
      </FormField>
 
      <FormField name="Tipo" error={errors.type} > 
        <select
          className={`select input-bordered w-full ${errors.type ? "input-error" : ""}`}
          onChange={(ev) => setType(ev.target.value)}
          value={type}
        >
          <option value="">Selecione um tipo</option>

          {types.map(t => (
            <option key={t} value={t}>
              {formatPurposePtBr(t)}
            </option>
          ))}
        </select>
      </FormField>

      <FormField name="Categoria" error={errors.categoryId} > 
        <select
          className={`select input-bordered w-full ${errors.categoryId ? "input-error" : ""}`}
          onChange={handleChangeCategory}
          value={categoryId}
        >
          <option value="">Selecione uma categoria</option>

          {filteredCategories.map(c => (
            <option key={c.id} value={c.id}>
              {c.description}
            </option>
          ))}
        </select>
      </FormField>
      
      <FormField name="Pessoa" error={errors.personId} > 
        <select
          className={`select input-bordered w-full ${errors.personId ? "input-error" : ""}`}
          onChange={handleChangePerson}
          value={personId}
        >
          <option value="">Selecione uma pessoa</option>

          {persons.map(p => (
            <option key={p.id} value={p.id}>
              {p.fullName}
            </option>
          ))}
        </select>
      </FormField>

      {newTransaction && (
        <div>
          <button className="btn bg-blue-400 float-end mt-3">
            {isLoading ? <Spinner size="lg" /> : "Salvar"}     
          </button>
        </div>
      )}

    </form>
  )
}