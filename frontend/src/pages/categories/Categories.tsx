import { useEffect, useState } from "react";
import PageHeader from "../../components/ui/PageHeader";
import type Category from "../../types/category";
import Spinner from "../../components/ui/Spinner";
import Modal from "../../components/ui/Modal";
import CategoryForm from "./CategoryForm";
import toast from "react-hot-toast";
import CategoriesTable from "./CategoriesTable";
import { Plus } from "lucide-react";
import { deleteCategory, getCategories } from "../../services/categoryService";

export default function Categories() {
  const [modalViewOpen, setModalViewOpen] = useState(false);
  const [category, setCategory] = useState<Category | undefined>();

  const [categoryToDelete, setCategoryToDelete] = useState<Category | undefined>();
  const [isLoadingDelete, setIsLoadingDelete] = useState(false);

  const [categories, setCategories] = useState<Category[]>([]);

  const [isLoadingCategories, setIsLoadingCategories] = useState(false);

  useEffect(() => {
    fetchCategories();
  },[])

  async function fetchCategories() {
    setIsLoadingCategories(true);

    try {
      const data = await getCategories();
      setCategories(data);
    }
    finally {
      setIsLoadingCategories(false);
    }
  }

  function handleCategorySaved(category: Category) {
    setCategory(undefined);
    setModalViewOpen(false);

    // Atualizar estado da listagem após salvar uma categoria
    const categoryExists = categories.some(p => p.id === category.id);
    if (categoryExists)
      setCategories(prev => prev.map(p => p.id === category.id ? category : p))
    else
      setCategories(prev => [...prev, category])
  }

  async function handleDeleteCategory() { 
    if (!categoryToDelete)
      return

    setIsLoadingDelete(true);

    try {
      await deleteCategory(categoryToDelete.id);
      setCategories(prev => prev.filter(p => p.id != categoryToDelete.id));
    }
    catch {
      toast.error("Erro ao deletar a categoria")
      return;
    }
    finally {
      setIsLoadingDelete(false);    
    }
    
    setCategoryToDelete(undefined);
    toast.success("Categoria deletada com sucesso!")
  }

  function openDetailModal(category: Category | undefined) {
    setCategory(category ?? { id: 0, description: "", purpose: "Expense" }); 
    setModalViewOpen(true);
  }

  return (
    <div>
      <PageHeader title="Categorias">
        <button 
          className="btn bg-blue-400"
          onClick={() => openDetailModal(undefined)}
        >
          Nova categoria
          <Plus size={16}></Plus>
        </button>
      </PageHeader>

      {isLoadingCategories ? (
          <div className="flex justify-center">
            <Spinner size="xl" />
          </div>
        )  
        : (
          <CategoriesTable 
            categories={categories} 
            onView={openDetailModal} 
            onDelete={setCategoryToDelete} 
          />
        )
      }

      <Modal 
        open={modalViewOpen} 
        title={!category || category.id === 0  ? "Nova categoria" : "Atualizar Categoria"} 
        onClose={() => setModalViewOpen(false)}
      >
        <CategoryForm 
          key={category?.id} 
          category={category} 
          onSuccess={handleCategorySaved}
        />
      </Modal>

      <Modal 
        open={categoryToDelete != null} 
        title={"Deletar categoria"} 
        onClose={() => setCategoryToDelete(undefined)}
      >
        <div>
          Tem certeza que deseja deletar a categoria <strong>{categoryToDelete?.description}</strong>?
        </div>
        <button 
          className="btn bg-blue-400 float-end mt-8"
          onClick={handleDeleteCategory}
        >
          {isLoadingDelete ? <Spinner size="lg" /> : "Confirmar"}         
        </button>
      </Modal>
    </div>
  )
}