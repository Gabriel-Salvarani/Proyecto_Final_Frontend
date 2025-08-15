import { useState } from "react";
import { Layout } from "../components/Layout";
import { useAuth } from "../context/UserContext";
import { useNavigate, Link } from "react-router-dom";
import "../styles/pages/login.css"; // Se asume que el CSS está en este archivo

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [apiError, setApiError] = useState("");

  const { login } = useAuth();
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    
    e.preventDefault();
    console.log({ email, password });
    const isLogin = await login(email, password);

    if (isLogin) {
      setEmail("");
      setPassword("");
      navigate("/");
    }
    setEmailError("");
    setPasswordError("");
    setApiError("");

  // 1. Validar campos (validación de front-end)
  let isValid = true;

  if (email.trim() === "") {
    setEmailError("El nombre de usuario es requerido.");
    isValid = false;
  } else if (email.length < 4) { // Ejemplo de validación mínima
    setEmailError("El usuario debe tener al menos 4 caracteres.");
    isValid = false;
  }

  if (password.trim() === "") {
    setPasswordError("La contraseña es requerida.");
    isValid = false;
  } else if (password.length < 6) { // Ejemplo de validación mínima
    setPasswordError("La contraseña debe tener al menos 6 caracteres.");
    isValid = false;
  }

  if (!isValid) {
    return; // Detener el envío si hay errores de validación
  }


 // 3. Manejar el resultado de la llamada a la API
    if (isLogin) {
      setEmail("");
      setPassword("");
      navigate("/");
    } else {
    // Si el login falla (credenciales incorrectas), muestra un error
    setApiError("Usuario o contraseña incorrectos. Por favor, inténtalo de nuevo.");
  }
};


  return (
    <Layout>
      <div className="background-svg-container">
        <svg
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
          xmlnsXlink="http://www.w3.org/1999/xlink"
          x="0px"
          y="0px"
          width="100%"
          height="100%"
          viewBox="0 0 1600 900"
        >
          <defs>
            <path
              id="wave"
              fill="rgba(120, 28, 207, 0.6)"
              d="M-363.852,502.589c0,0,236.988-41.997,505.475,0 s371.981,38.998,575.971,0s293.985-39.278,505.474,5.859s493.475,48.368,716.963-4.995v560.106H-363.852V502.589z"
            />
          </defs>
          <g>
            <use xlinkHref="#wave" opacity=".4">
              <animateTransform
                attributeName="transform"
                attributeType="XML"
                type="translate"
                dur="8s"
                calcMode="spline"
                values="270 230; -334 180; 270 230"
                keyTimes="0; .5; 1"
                keySplines="0.42, 0, 0.58, 1.0;0.42, 0, 0.58, 1.0"
                repeatCount="indefinite"
              />
            </use>
            <use xlinkHref="#wave" opacity=".6">
              <animateTransform
                attributeName="transform"
                attributeType="XML"
                type="translate"
                dur="6s"
                calcMode="spline"
                values="-270 230;243 220;-270 230"
                keyTimes="0; .6; 1"
                keySplines="0.42, 0, 0.58, 1.0;0.42, 0, 0.58, 1.0"
                repeatCount="indefinite"
              />
            </use>
            <use xlinkHref="#wave" opacity=".9">
              <animateTransform
                attributeName="transform"
                attributeType="XML"
                type="translate"
                dur="4s"
                calcMode="spline"
                values="0 230;-140 200;0 230"
                keyTimes="0; .4; 1"
                keySplines="0.42, 0, 0.58, 1.0;0.42, 0, 0.58, 1.0"
                repeatCount="indefinite"
              />
            </use>
          </g>
        </svg>
      </div>

      <div className="login-container">
        <div className="login">
          <h2>Bienvenido de vuelta</h2>
          <h3>Preparate para comprar en tu tienda favorita</h3>
          <div className="login-user">
            <h4>Usuario de prueba:</h4>
            <p>Usuario: johnd</p>
            <p>Contraseña: m38rmF$</p>
          </div>
          <form className="form" onSubmit={handleLogin}>
            <div className="textbox">
              <input
                required
                type="text"
                onChange={(e) => setEmail(e.target.value)}
                value={email}
              />
              <label>Usuario</label>
            </div>
            {emailError && <p className="error-message">{emailError}</p>}

            <div className="textbox">
              <input
                required
                type="password"
                onChange={(e) => setPassword(e.target.value)}
                value={password}
              />
              <label>Contraseña</label>
            </div>
            {passwordError && <p className="error-message">{passwordError}</p>}
            {apiError && <p className="error-message api-error">{apiError}</p>}

            <button type="submit">
              Iniciar sesión
            </button>
          </form>
          <p className="footer">
            ¿Aún no eres miembro? <Link to="/registrate">¡Regístrate!</Link>
          </p>
        </div>
      </div>
    </Layout>
  )
}

export { Login }
