import { useEffect, useState } from "react"
import { Layout } from "../components/Layout"
import { useAuth } from "../context/UserContext"
import "../styles/pages/aboutus.css"

const AboutUs = () => {
    return (
        <Layout>
            <div className="about-us-container">
                <h1>Sobre Nosotros</h1>
                
                <section>
                    <h2>De qué trata el proyecto</h2>
                    <p>
                        Este proyecto es una extensión y personalización de una plantilla base. 
                        Se enfoca en desarrollar una aplicación web de comercio electrónico con diversas funcionalidades 
                        técnicas y de presentación. El objetivo es crear una plataforma completa y funcional 
                        que demuestre habilidades en el desarrollo front-end.
                    </p>
                </section>
                
                <section className="mb-5">
                    <h2>A quién está dirigido</h2>
                    <p>
                        El proyecto está dirigido a usuarios interesados en comprar productos en línea. 
                        La plataforma busca ofrecer una experiencia de usuario fluida y visualmente atractiva, 
                        permitiendo a los usuarios navegar, buscar y ver detalles de los productos de manera sencilla.
                    </p>
                </section>

                <section>
                    <h2>Tecnologías y enfoques utilizados</h2>
                    <p>
                        Para el desarrollo de este proyecto, se han implementado diversas tecnologías y buenas prácticas:
                    </p>
                    <ul>
                        <li>
                            Estilos y Diseño: Se implementó un diseño responsive con breakpoints para móvil (hasta 480px), tablet (hasta 880px) y escritorio (resolución por defecto). El diseño de la página de inicio incluye un grid responsive para mostrar los productos correctamente.
                        </li>
                        <li>
                            Funcionalidades de Interfaz: Se ha incorporado una barra de búsqueda parcial que filtra los productos dinámicamente sin recargar la página. Los formularios cuentan con validación y mensajes claros para mejorar la experiencia de usuario.
                        </li>
                        <li>
                            Lógica y Manejo de Datos: El proyecto utiliza la FakeStoreAPI para la gestión de usuarios y productos.
                        </li>
                    </ul>
                </section>
            </div>
        </Layout>
    )
}

export {AboutUs}