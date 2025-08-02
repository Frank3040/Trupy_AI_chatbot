import { Link, NavLink } from 'react-router-dom'
import { useState } from 'react'
import { Menu, X } from 'lucide-react'

/**
 * Barra de navegación superior.
 * Muestra título/logo y enlaces a las rutas principales.
 */
export default function Navbar() {
  const [open, setOpen] = useState(false)

  const toggle = () => setOpen(!open)
  const close = () => setOpen(false)

  const baseLink =
    'block px-4 py-2 md:inline-block md:px-3 md:py-2 hover:text-purple-300 transition text-purple-100 relative'

  return (
    <header>
      <nav className="mx-auto flex max-w-6xl items-center justify-between p-4">
        {/* Logo / título */}
        <Link to="/" className="text-xl font-semibold text-white" onClick={close}>
          Trupy AI
        </Link>

        {/* Botón hamburguesa (mobile) */}
        <button
          onClick={toggle}
          className="md:hidden p-1 rounded hover:bg-white/10 text-white"
          aria-label="Abrir menú"
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>

        {/* Enlaces */}
        <ul
          className={`mt-4 md:mt-0 md:flex md:space-x-3 ${
            open ? '' : 'hidden md:block'
          }`}
        >
          {[
            { to: '/students', label: 'Estudiantes' },
            { to: '/chat', label: 'Chat' },
            { to: '/report', label: 'Reporte' },
            { to: '/psych/login', label: 'Psicólogos' },
          ].map(({ to, label }) => (
            <li key={to}>
              <NavLink
                to={to}
                className={({ isActive }) =>
                  `${baseLink} ${
                    isActive
                      ? 'text-purple-300 font-medium after:content-[""] after:absolute after:left-0 after:bottom-0 after:w-full after:h-0.5 after:bg-purple-400'
                      : ''
                  }`
                }
                onClick={close}
              >
                {label}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  )
}
       
