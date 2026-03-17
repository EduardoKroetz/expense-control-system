import { useEffect, useState } from "react";
import PageHeader from "../../components/ui/PageHeader";
import type Person from "../../types/person";
import Spinner from "../../components/ui/Spinner";
import Modal from "../../components/ui/Modal";
import PersonForm from "./PersonForm";
import { deletePerson, getPersons } from "../../services/personService";
import toast from "react-hot-toast";
import PersonsTable from "./PersonsTable";
import { Plus } from "lucide-react";

export default function Persons() {
  const [modalViewOpen, setModalViewOpen] = useState(false);
  const [person, setPerson] = useState<Person | undefined>();

  const [personToDelete, setPersonToDelete] = useState<Person | undefined>();
  const [isLoadingDelete, setIsLoadingDelete] = useState(false);

  const [persons, setPersons] = useState<Person[]>([]);

  const [isLoadingPersons, setIsLoadingPersons] = useState(false);

  useEffect(() => {
    fetchPersons();
  },[])

  async function fetchPersons() {
    setIsLoadingPersons(true);

    try {
      const data = await getPersons();
      setPersons(data);
    }
    finally {
      setIsLoadingPersons(false);
    }
  }

  function handlePersonSaved(person: Person) {
    setPerson(undefined);
    setModalViewOpen(false);

    // Atualizar estado da listagem após salvar uma pessoa
    const personExists = persons.some(p => p.id === person.id);
    if (personExists)
      setPersons(prev => prev.map(p => p.id === person.id ? person : p))
    else
      setPersons(prev => [...prev, person])
  }

  async function handleDeletePerson() { 
    if (!personToDelete)
      return

    setIsLoadingDelete(true);

    try {
      await deletePerson(personToDelete.id);
      setPersons(prev => prev.filter(p => p.id != personToDelete.id));
    }
    catch {
      toast.error("Erro ao deletar a pessoa")
      return;
    }
    finally {
      setIsLoadingDelete(false);    
    }
    
    setPersonToDelete(undefined);
    toast.success("Pessoa deletada com sucesso!")
  }

  function openDetailModal(person: Person | undefined) {
    setPerson(person ?? { id: 0, fullName: "", age: 0 }); 
    setModalViewOpen(true);
  }

  return (
    <div>
      <PageHeader title="Pessoas">
        <button 
          className="btn bg-blue-400"
          onClick={() => openDetailModal(undefined)}
        >
          Nova pessoa
          <Plus size={16}></Plus>
        </button>
      </PageHeader>

      {isLoadingPersons ? (
          <div className="flex justify-center">
            <Spinner size="xl" />
          </div>
        )  
        : (
          <PersonsTable 
            persons={persons} 
            onView={openDetailModal} 
            onDelete={setPersonToDelete} 
          />
        )
      }

      <Modal 
        open={modalViewOpen} 
        title={!person || person.id === 0  ? "Nova pessoa" : "Atualizar Pessoa"} 
        onClose={() => setModalViewOpen(false)}
      >
        <PersonForm 
          key={person?.id} 
          person={person} 
          onSuccess={handlePersonSaved}
        />
      </Modal>

      <Modal 
        open={personToDelete != null} 
        title={"Deletar pessoa"} 
        onClose={() => setPersonToDelete(undefined)}
      >
        <div>
          Tem certeza que deseja deletar a pessoa <strong>{personToDelete?.fullName}</strong>?
        </div>
        <button 
          className="btn bg-blue-400 float-end mt-8"
          onClick={handleDeletePerson}
        >
          {isLoadingDelete ? <Spinner size="lg" /> : "Confirmar"}         
        </button>
      </Modal>
    </div>
  )
}