// components/Layout.jsx
import { Footer } from "./Footer"
import { Header } from "./Header"
import '../styles/components/layout.css' 

const Layout = (props) => {
  return (
    <div className="layout-container">
      <Header />
      <main className="main-content">
        {props.children}
      </main>
      <Footer />
    </div>
  )
}

export { Layout }