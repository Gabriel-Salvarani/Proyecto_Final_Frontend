import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Layout } from "../components/Layout";
import "../styles/pages/register.css";

const Register = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [usernameError, setUsernameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [success, setSuccess] = useState("");

  const navigate = useNavigate(); // Initialize useNavigate

  // Helper function to validate email format
  const isValidEmail = (email) => {
    // Basic regex for email validation
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  // Helper function to validate password strength
  const isValidPassword = (password) => {
    // Minimum 8 characters, at least one letter, one number, and one special character
    const minLength = 8;
    const hasLetter = /[a-zA-Z]/.test(password);
    const hasNumber = /[0-9]/.test(password);
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);

    if (password.length < minLength) {
      return "La contraseña debe tener al menos 8 caracteres.";
    }
    if (!hasLetter) {
      return "La contraseña debe contener al menos una letra.";
    }
    if (!hasNumber) {
      return "La contraseña debe contener al menos un número.";
    }
    if (!hasSpecialChar) {
      return "La contraseña debe contener al menos un carácter especial.";
    }
    return ""; // Password is valid
  };

  const handleUsernameChange = (e) => {
    const value = e.target.value;
    setUsername(value);
    if (value.trim() === "") {
      setUsernameError("El nombre de usuario es requerido.");
    } else {
      setUsernameError("");
    }
  };

  const handleEmailChange = (e) => {
    const value = e.target.value;
    setEmail(value);
    if (value.trim() === "") {
      setEmailError("El email es requerido.");
    } else if (!isValidEmail(value)) {
      setEmailError("Ingresa un email válido.");
    } else {
      setEmailError("");
    }
  };

  const handlePasswordChange = (e) => {
    const value = e.target.value;
    setPassword(value);
    const errorMsg = isValidPassword(value);
    setPasswordError(errorMsg);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSuccess("");

    // Re-validate all fields on submit
    let formIsValid = true;

    if (username.trim() === "") {
      setUsernameError("El nombre de usuario es requerido.");
      formIsValid = false;
    } else {
      setUsernameError("");
    }

    if (email.trim() === "") {
      setEmailError("El email es requerido.");
      formIsValid = false;
    } else if (!isValidEmail(email)) {
      setEmailError("Ingresa un email válido.");
      formIsValid = false;
    } else {
      setEmailError("");
    }

    const passwordValidationMessage = isValidPassword(password);
    if (password.trim() === "") {
      setPasswordError("La contraseña es requerida.");
      formIsValid = false;
    } else if (passwordValidationMessage) {
      setPasswordError(passwordValidationMessage);
      formIsValid = false;
    } else {
      setPasswordError("");
    }

    if (!formIsValid) {
      return; // Stop form submission if there are errors
    }

    const newUser = {
      username,
      email,
      password,
    };

    console.log("Nuevo usuario:", newUser);
    setSuccess("Usuario registrado con éxito. Redirigiendo a la página");

    // Simulate API call and then redirect
    setTimeout(() => {
      setUsername("");
      setEmail("");
      setPassword("");
      setUsernameError("");
      setEmailError("");
      setPasswordError("");
      setSuccess("");
      navigate("/login"); // Redirect to login page
    }, 2000); // Redirect after 2 seconds
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
      <div className="register-conteiner"> {/* Typo: changed to register-container in CSS, keep this in mind */}
        <div className="register">
          <h2>Hola, Bienvenido!</h2>
          <form className="form" onSubmit={handleSubmit}>
            <div className="textbox">
              <input
                id="username"
                type="text"
                onChange={handleUsernameChange} // Use specific change handler
                onBlur={handleUsernameChange} // Validate on blur
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
                onChange={handleEmailChange} // Use specific change handler
                onBlur={handleEmailChange} // Validate on blur
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
                onChange={handlePasswordChange} // Use specific change handler
                onBlur={handlePasswordChange} // Validate on blur
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
  );
};

export { Register };
