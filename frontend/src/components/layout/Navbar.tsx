import { Link } from "react-router-dom"

export default function Navbar() {
  return (
    <div className="navbar bg-base-100 shadow">

      <div className="flex-1">
        <span className="text-xl font-bold">
          Controle de Despesas
        </span>
      </div>

      <div className="flex gap-2">
        <Link className="btn btn-ghost" to="/persons">Pessoas</Link>
        <Link className="btn btn-ghost" to="/categories">Categorias</Link>
        <Link className="btn btn-ghost" to="/transactions">Transações</Link>

        <div className="dropdown dropdown-end">

          <label tabIndex={0} className="btn btn-ghost">Relatórios</label>

          <ul tabIndex={0} className="menu dropdown-content bg-base-100 rounded-box w-52 shadow">
            <li>
              <Link to="/reports/persons-totals">
                Totais por Pessoa
              </Link>
            </li>

            <li>
              <Link to="/reports/categories-totals">
                Totais por Categoria
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  )
}