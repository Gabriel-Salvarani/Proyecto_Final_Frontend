import "../styles/components/Footer.css"
import { FaGithub, FaInstagram, FaEnvelope } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="main-footer">
      <div className="footer-container">
        <div className="footer-section footer-about">
          <h3 className="footer-title">Mi Tienda</h3>
          <p className="footer-text">Tu tienda online de confianza con los mejores productos y atención personalizada.</p>
        </div>
        <div className="footer-section footer-links">
          <h3 className="footer-title">Enlaces útiles</h3>
          <ul className="footer-nav">
            <li><a href="/">Inicio</a></li>
            <li><a href="/aboutus">Sobre nosotros</a></li>
            <li><a href="/login">Iniciar sesión</a></li>
            <li><a href="/registrate">Registrarse</a></li>
          </ul>
        </div>
        <div className="footer-section footer-contact">
          <h3 className="footer-title">Contáctanos</h3>
          <p>Email: Salvaranigabriel@mitienda.com</p>
          <div className="footer-social">
            <a href="https://github.com/Gabriel-Salvarani" target="_blank" rel="noopener noreferrer"><FaGithub /></a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer"><FaInstagram /></a>
            <a href="mailto:salvaranigabriel@gmail.com"><FaEnvelope /></a>
          </div>
        </div>
      </div>
      <div className="footer-bottom">
        <p className="footer-developer">Desarrollado por{" "}<a href="https://www.linkedin.com/in/gabriel-salvarani/" target="_blank" rel="noopener noreferrer">Gabriel Salvarani</a></p>
        <p className="footer-copyright">
          © 2025 Mi Tienda. Todos los derechos reservados.
        </p>
      </div>
    </footer>
  )
}

export { Footer }