import { useEffect, useState } from "react"
import { Layout } from "../components/Layout"
import { useAuth } from "../context/UserContext"
import "../styles/pages/Home.css"

const Home = () => {
const [products, setProducts] = useState([])
const [showPopup, setShowPopup] = useState(null)
const [productToEdit, setProductToEdit] = useState(null)
const [titleEdit, setTitleEdit] = useState("")
const [priceEdit, setPriceEdit] = useState("")
const [descriptionEdit, setDescriptionEdit] = useState("")
const [categoryEdit, setCategoryEdit] = useState("")
const [imageEdit, setImageEdit] = useState("")
const [isUpdating, setIsUpdating] = useState(false);
const [expandedDescriptions, setExpandedDescriptions] = useState({}); // Nuevo estado

const { user } = useAuth()

const fetchingProducts = async () => {
const response = await fetch("https://fakestoreapi.com/products", { method: "GET" })
const data = await response.json()
setProducts(data)
}

useEffect(() => {
fetchingProducts()
}, [])

const handleDelete = async (id) => {
const response = await fetch("https://fakestoreapi.com/products/${id}", { method: "DELETE" })

if (response.ok) {
  setProducts(prevProduct => prevProduct.filter((product) => product.id != id))
}
}

const handleOpenEdit = (product) => {
setShowPopup(true)
setProductToEdit(product)
setTitleEdit(product.title)
setPriceEdit(product.price)
setDescriptionEdit(product.description)
setCategoryEdit(product.category)
setImageEdit(product.image)
}

const handleUpdate = async (e) => {
e.preventDefault()

const updatedProduct = {
  id: productToEdit.id,
  title: titleEdit,
  price: Number(priceEdit),
  description: descriptionEdit,
  category: categoryEdit,
  image: imageEdit
}

try {
  const response = await fetch(`https://fakestoreapi.com/products/${productToEdit.id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(updatedProduct)
  })

  if (response.ok) {
    const data = await response.json()
    setProducts(prevProduct =>
      prevProduct.map((product) =>
        product.id === productToEdit.id
          ? data
          : product
      ))
  }
  setShowPopup(false)
} catch (error) {
  console.log(error)
}
}

// Función para alternar la expansión de la descripción
const toggleDescription = (id) => {
setExpandedDescriptions(prevState => ({
...prevState,
// Si el ID ya existe, invierte su valor; si no, lo establece en true
...(prevState.hasOwnProperty(id) ? { [id]: !prevState[id] } : { [id]: true })
}));
};

const getDescriptionToShow = (description, id) => {
const isExpanded = expandedDescriptions[id] || false;
if (isExpanded) {
return description;
}
// Muestra solo las primeras 100 caracteres como resumen
return description.slice(0, 100) + (description.length > 100 ? "..." : "");
};

return (
<Layout>
<div className="main-container">
<section className="main-section">
<h1>Bienvenido a Nuestra Tienda</h1>
<p>Descubrí una selección exclusiva de productos para vos. Calidad, confianza y atención personalizada.</p>
</section>

    <section className="main-section why-choose-us">
      <h2>¿Por qué elegirnos?</h2>
      <ul>
        <li>
          <h3>Envíos a todo el país</h3>
          <p>Recibí tu compra en la puerta de tu casa estés donde estés.</p>
        </li>
        <li>
          <h3>Pagos seguros</h3>
          <p>Trabajamos con plataformas que garantizan tu seguridad.</p>
        </li>
        <li>
          <h3>Atención personalizada</h3>
          <p>Estamos disponibles para ayudarte en todo momento.</p>
        </li>
      </ul>
    </section>

    <section className="main-section">
      <h2>Nuestros productos</h2>
      <p>Elegí entre nuestras categorías más populares.</p>

      {showPopup && (
        <section className="popup-edit">
          <h2>Editando producto.</h2>
          <form onSubmit={handleUpdate}>
            <input type="text" placeholder="Ingrese el titulo" value={titleEdit} onChange={(e) => setTitleEdit(e.target.value)}/>
            <input type="number" placeholder="Ingrese el precio" value={priceEdit} onChange={(e) => setPriceEdit(e.target.value)}/>
            <textarea placeholder="Ingrese la descripción" value={descriptionEdit} onChange={(e) => setDescriptionEdit(e.target.value)}></textarea>
            <input type="text" placeholder="Ingrese la categoria" value={categoryEdit} onChange={(e) => setCategoryEdit(e.target.value)}/>
            <input type="text" placeholder="Ingrese la URL de la imagen" value={imageEdit} onChange={(e) => setImageEdit(e.target.value)}/>
            <div className="button-container">
              <button className="close-button" onClick={() => setShowPopup(null)}>Cerrar</button>
              <button className="update-button">Actualizar</button>
            </div>
          </form>
        </section>
      )}

      <div className="products-grid">
        {products.map((product) => (
          <div key={product.id} className="product-card">
            <div className="product-card-image-container">
              <img src={product.image} alt={`Imagen de ${product.title}`} />
            </div>
            <div className="product-card-content">
              <h2 key={product.id}>{product.title}</h2>
              <p className="description">{getDescriptionToShow(product.description, product.id)}</p>
              {product.description.length > 100 && (
                <button className="read-more-button" onClick={() => toggleDescription(product.id)}>
                  {expandedDescriptions[product.id] ? "Leer menos" : "Leer más"}
                </button>
              )}
              <p className="category"><strong>{product.category}</strong></p>
              <p className="price">${product.price}</p>
              {user && (
                <div className="product-card-actions">
                  <button onClick={() => handleOpenEdit(product)}>Actualizar</button>
                  <button onClick={() => handleDelete(product.id)}>Borrar</button>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </section>
  </div>
</Layout>
)
}

export { Home }