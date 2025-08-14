import { Link } from "react-router-dom"
import { useAuth } from "../context/UserContext"
import "../styles/components/Header.css"
const Header = () => {
  const { user, logout } = useAuth()

  const handleLogout = () => {
    logout()
    document.body.classList.remove("open") 
  }

  const toggleMenu = () => document.body.classList.toggle("open")

  const closeMenu = () => {
    document.body.classList.remove("open")
  }

  return (
    <header className="main-header">
      <nav className="navbar">
        <div className="menu-monitor">
          <h1 className="logo">Mi Tienda</h1>
          <ul className="nav-list">
            {user ? (
              <>
                <li><Link to="/">Inicio</Link></li>
                <li><Link to="/aboutus">Sobre Nosotros</Link></li>
                <li><Link to="/dashboard">Panel</Link></li>
                <li><button onClick={handleLogout} className="logout-btn">Salir</button></li>
              </>
            ) : (
              <>
                <li><Link to="/">Inicio</Link></li>
                <li><Link to="/aboutus">Sobre Nosotros</Link></li>
                <li><Link to="/login">Inicia Sesión</Link></li>
                <li><Link to="/registrate">Registrate</Link></li>
              </>
            )}
          </ul>
        </div>
        <div className="menu-responsive">
          <h1 className="logo">Mi Tienda</h1>
          <button className="burger" onClick={toggleMenu}>
            <span className="burger-icon"></span>
          </button>
          <div className="menu">
            <ul className="nav-list">
              {user ? (
                <>
                  <li><Link to="/" onClick={closeMenu}>Inicio</Link></li>
                  <li><Link to="/dashboard" onClick={closeMenu}>Panel</Link></li>
                  <li><button onClick={handleLogout} className="logout-btn">Salir</button></li>
                </>
              ) : (
                <>
                  <li><Link to="/">Inicio</Link></li>
                  <li><Link to="/login" onClick={closeMenu}>Inicia Sesión</Link></li>
                  <li><Link to="/registrate" onClick={closeMenu}>Registrate</Link></li>
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
