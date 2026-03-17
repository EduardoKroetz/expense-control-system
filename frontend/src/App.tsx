import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import Navbar from './components/layout/Navbar'
import Persons from './pages/persons/Persons'
import Categories from './pages/categories/Categories'
import Transactions from './pages/transactions/Transactions'
import PersonsTotals from './pages/reports/PersonsTotals'
import CategoriesTotals from './pages/reports/CategoriesTotals'
/* import Categories from './pages/Categories'
import Transactions from './pages/Transactions'
import PersonsTotals from './pages/Reports/PersonsTotals'
import CategoriesTotals from './pages/Reports/CategoriesTotals' */

function App() {
   return (
     <BrowserRouter>
        <Navbar />
     
         <div className='p-6 container mx-auto'>
            <Routes>
               <Route path="/" element={<Navigate to="/persons" replace />} />

               <Route path="/persons" element={<Persons />} />
               <Route path="/categories" element={<Categories />} />
               <Route path="/transactions" element={<Transactions />} />

               <Route path="/reports/persons-totals" element={<PersonsTotals />} />
               <Route path="/reports/categories-totals" element={<CategoriesTotals />} />
            </Routes>
         </div>

     </BrowserRouter>
  )
}

export default App