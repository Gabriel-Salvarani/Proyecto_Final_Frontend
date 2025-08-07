import { Link } from "react-router-dom"
import { useAuth } from "../context/UserContext"
import "../styles/components/Header.css"
import logo from "../assets/logo.jpg"
const Header = () => {
  const { user, logout } = useAuth()

  const handleLogout = () => {
    logout()
  }

  const toggleMenu = () => document.body.classList.toggle("open")

  return (
    <header className="main-header">
      <nav className="navbar">
        <div className="menu-monitor">
          <img src={logo} alt="imagen de logo" className="logo"/>
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
        </div>
        <div className="menu-responsive">
          <button className="burger" onClick={toggleMenu}>
            <span className="burger-icon"></span>
          </button>
          <div className="menu">
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
          </div>
        </div>
      </nav>
    </header>
  )
}

export { Header }
