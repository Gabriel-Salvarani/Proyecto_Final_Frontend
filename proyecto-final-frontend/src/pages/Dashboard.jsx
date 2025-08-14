import { useState } from "react"
import { Layout } from "../components/Layout"
import "../styles/pages/dashboard.css"

const Dashboard = () => {
  const [name, setName] = useState("")
  const [price, setPrice] = useState("")
  const [description, setDescription] = useState("")
  const [category, setCategory] = useState("")
  const [image, setImage] = useState("")
  const [product, setProduct] = useState(null)
  const [error, setError] = useState(null)



  const handleSubmit = async (e) => {
    e.preventDefault()
    setError(null)

    if (!name || !price || !description) {
      setError("Debes completar todos los campos")
      return
    }

    if (name.length < 3) {
      setError("El nombre debe tener al menos 4 caracteres")
      return
    }

    const newProduct = {
      id: crypto.randomUUID(),
      title: name,
      price: price,
      description: description,
      category: category,
      image: image
    }

    // petición al backend mediante fetch -> método POST https://fakeproductapi.com/products
    const response = await fetch("https://fakestoreapi.com/products", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(newProduct)
    })

    const data = await response.json()
    setProduct(data)
    setName("")
    setPrice("")
    setDescription("")
    setCategory("")
    setImage("")
  }

return (
    <Layout>
      <div className="dashboard-container">
        <h1>Panel de Administración</h1>

        <section className="dashboard-section">
          <h2 className="section-title">Cargar nuevo producto</h2>
          <form className="product-form" onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="product-name">Nombre del producto:</label>
              <input type="text" id="product-name" name="nombre" onChange={(e) => setName(e.target.value)} value={name} required placeholder="ej: camisa, remera"/>
            </div>

            <div className="form-group">
              <label htmlFor="product-price">Precio:</label>
              <input type="number" id="product-price" name="precio" onChange={(e) => setPrice(e.target.value)} value={price} required placeholder="0.0"/>
            </div>

            <div className="form-group">
              <label htmlFor="product-description">Descripción:</label>
              <textarea id="product-description" name="descripcion" rows="4" onChange={(e) => setDescription(e.target.value)} value={description} required placeholder="Una descripción detallada del producto"/>
            </div>

            <div className="form-group">
              <label htmlFor="product-category">Categoría:</label>
              <input type="text" id="product-category" name="categoria" onChange={(e) => setCategory(e.target.value)} value={category} placeholder="ej: Ropa de hombre, Electrónica"/>
            </div>

            <div className="form-group">
              <label htmlFor="product-image">URL de la imagen:</label>
              <input id="product-image" name="imagen" type="text" onChange={(e) => setImage(e.target.value)} value={image} placeholder="https://ejemplo.com/imagen.jpg"/>
            </div>

            {error && <p className="error-message">{error}</p>}

            <button type="submit" className="submit-btn">Guardar producto</button>
          </form>

          {product && (
            <div className="product-preview">
              <h3>Producto creado: {product.title}</h3>
              <p>${product.price}</p>
              <p>{product.description}</p>
            </div>
          )}
        </section>
      </div>
    </Layout>
  )
}

export { Dashboard }