import { Link } from "react-router-dom"
import { useAuth } from "../context/UserContext"
import "../styles/components/Header.css"
import logo from "../assets/Logo.png"
const Header = () => {
  const { user, logout } = useAuth()

  const handleLogout = () => {
    logout()
  }

  return (
    <header className="main-header">
      <img
        src={logo}
        alt="imagen de logo"
        className="logo"
      />
      <nav>
        <ul className="nav-list">
          {user ? (
            <>
              <li><Link to="/">Inicio</Link></li>
              <li><Link to="/dashboard">Dashboard</Link></li>
              <li><button onClick={handleLogout} className="logout-btn">Cerrar sesión</button></li>
            </>
          ) : (
            <>
              <li><Link to="/login">Inicia Sesión</Link></li>
              <li><Link to="/registrate">Registrate</Link></li>
            </>
          )}
        </ul>
      </nav>
    </header>
  )
}

export { Header }
