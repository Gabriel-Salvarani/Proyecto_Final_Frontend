import { useState } from "react"
import { useNavigate, Link } from "react-router-dom"
import { Layout } from "../components/Layout"
import { useAuth } from "../context/UserContext"
import "../styles/pages/register.css"

const Register = () => {
  const [username, setUsername] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [usernameError, setUsernameError] = useState("")
  const [emailError, setEmailError] = useState("")
  const [passwordError, setPasswordError] = useState("")
  const [success, setSuccess] = useState("")

  const navigate = useNavigate()
  // Make sure to get the 'register' function from the context
  const { register } = useAuth()

  const isValidEmail = (email) => {
    // Basic regex for email validation
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
  }

  const isValidPassword = (password) => {
    const minLength = 8
    const hasLetter = /[a-zA-Z]/.test(password)
    const hasNumber = /[0-9]/.test(password)
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password)

    if (password.length < minLength) {
      return "La contraseña debe tener al menos 8 caracteres."
    }
    if (!hasLetter) {
      return "La contraseña debe contener al menos una letra."
    }
    if (!hasNumber) {
      return "La contraseña debe contener al menos un número."
    }
    if (!hasSpecialChar) {
      return "La contraseña debe contener al menos un carácter especial."
    }
    return ""
  }

  const handleUsernameChange = (e) => {
    const value = e.target.value
    setUsername(value)
    if (value.trim() === "") {
      setUsernameError("El nombre de usuario es requerido.")
    } else {
      setUsernameError("")
    }
  }

  const handleEmailChange = (e) => {
    const value = e.target.value
    setEmail(value)
    if (value.trim() === "") {
      setEmailError("El email es requerido.")
    } else if (!isValidEmail(value)) {
      setEmailError("Ingresa un email válido.")
    } else {
      setEmailError("")
    }
  }

  const handlePasswordChange = (e) => {
    const value = e.target.value
    setPassword(value)
    const errorMsg = isValidPassword(value)
    setPasswordError(errorMsg)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setSuccess("")
    setUsernameError("")
    setEmailError("")
    setPasswordError("")

    let formIsValid = true

    if (username.trim() === "") {
      setUsernameError("El nombre de usuario es requerido.")
      formIsValid = false
    }

    if (email.trim() === "") {
      setEmailError("El email es requerido.")
      formIsValid = false
    } else if (!isValidEmail(email)) {
      setEmailError("Ingresa un email válido.")
      formIsValid = false
    }

    const passwordValidationMessage = isValidPassword(password)
    if (password.trim() === "") {
      setPasswordError("La contraseña es requerida.")
      formIsValid = false
    } else if (passwordValidationMessage) {
      setPasswordError(passwordValidationMessage)
      formIsValid = false
    }

    if (!formIsValid) {
      return
    }

    // Call the register function from the context
    // It will handle the API call and set the user state to true on success
    const registrationSuccessful = await register({ username, email, password })

    if (registrationSuccessful) {
      setSuccess("Usuario registrado con éxito. Redirigiendo a la página principal.")
      // The context already sets the user to true, so we just need to navigate
      setTimeout(() => {
        navigate("/")
      }, 2000)
    } else {
      setSuccess("Error en el registro. Inténtalo de nuevo.")
    }
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
      <div className="register-container">
        <div className="register">
          <h2>Hola, Bienvenido!</h2>
          <form className="form" onSubmit={handleSubmit}>
            <div className="textbox">
              <input
                id="username"
                type="text"
                onChange={handleUsernameChange}
                onBlur={handleUsernameChange}
                value={username}
                placeholder=" "
                required
              />
              <label htmlFor="username">Usuario</label>
            </div>
            {usernameError && <p className="error-message">{usernameError}</p>}
            <div className="textbox">
              <input
                id="email"
                type="email"
                onChange={handleEmailChange}
                onBlur={handleEmailChange}
                value={email}
                placeholder=" "
                required
              />
              <label htmlFor="email">Email</label>
            </div>
            {emailError && <p className="error-message">{emailError}</p>}
            <div className="textbox">
              <input
                id="password"
                type="password"
                onChange={handlePasswordChange}
                onBlur={handlePasswordChange}
                value={password}
                placeholder=" "
                required
              />
              <label htmlFor="password">Contraseña</label>
            </div>
            {passwordError && <p className="error-message">{passwordError}</p>}
            <button type="submit">Ingresar</button>
          </form>
          <p className="footer-register">
            ¿Ya tienes una cuenta? <Link to="/login">Inicia Sesión</Link>
          </p>
          {success && <p className="success-message">{success}</p>}
        </div>
      </div>
    </Layout>
  )
}

export { Register }