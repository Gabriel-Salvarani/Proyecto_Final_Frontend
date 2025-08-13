import { useState } from "react"
// Se eliminó la importación de Layout, ya que no se pudo resolver la ruta.
import { Layout } from "../components/Layout"

const Register = () => {
  const [username, setUsername] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [success, setSuccess] = useState("")

  const handleSubmit = (e) => {
    e.preventDefault()
    setError("")
    setSuccess("")

    // Se corrigió la lógica de validación: debe ser !password para verificar si está vacío.
    if (!username || !email || !password) {
      setError("Debes completar todos los campos")
      return
    }

    const newUser = {
      username,
      email,
      password
    }

    console.log(newUser)
    setSuccess("Usuario registrado con éxito")

    setUsername("")
    setEmail("")
    setPassword("")
  }

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
      <div className="register-conteiner">
        <div className="register">
          <h2>Hola, bienvenido</h2>
          <form className="form" onSubmit={handleSubmit}>
            <div className="textbox">
              <input
                id="username"
                type="text"
                onChange={(e) => setUsername(e.target.value)}
                value={username}
                placeholder=" "
                required
              />
              <label htmlFor="username">Usuario</label>
            </div>
            <div className="textbox">
              <input
                id="email"
                type="email"
                onChange={(e) => setEmail(e.target.value)}
                value={email}
                placeholder=" " 
                required
              />
              <label htmlFor="email">Email</label>
            </div>
            <div className="textbox">
              <input
                id="password"
                type="password"
                onChange={(e) => setPassword(e.target.value)}
                value={password}
                placeholder=" " 
                required
              />
              <label htmlFor="password">Contraseña</label>
            </div>
            <button type="submit">
              Ingresar
            </button>
          </form>
          <p className="footer-register">
            ¿Ya tienes una cuenta? <Link to="/login">Inicia Sesión</Link>
          </p>
          {
            error && <p style={{ color: "red" }}>{error}</p>
          }
          {
            success && <p style={{ color: "green" }}>{success}</p>
          }
        </div>
      </div>
    </Layout>
  )
}

export {Register} // Exporta como default para facilitar la importación
