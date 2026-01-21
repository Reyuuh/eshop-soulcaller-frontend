import React, { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import './SingleProductPage.scss'
import { getProductById } from '../../services/api'
import { useCart } from '../../context/CartContext'


const SingleProductPage = () => {
  const { id } = useParams()
  const [product, setProduct] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [quantity, setQuantity] = useState(1)
  const [showToast, setShowToast] = useState(false);
  const { addToCart } = useCart()

  useEffect(() => {
    const fetchProduct = async () => {
      setLoading(true)
      setError('')
      try {
        const data = await getProductById(id)
        console.log(data)
        setProduct(data)
      } catch (err) {
        setError(err.message)
        console.error('Failed to fetch product', err)
      } finally {
        setLoading(false)
      }
    }

    if (id) fetchProduct()
  }, [id])

    const handleAddToCart = () => {
    if (product) {
      addToCart({
        ...product,
        quantity: quantity
      })
      setQuantity(1) // Reset quantity after adding
      setShowToast(true);
    // Dölj den automatiskt efter 3 sekunder
    setTimeout(() => setShowToast(false), 3000);
    }
  }

    const handleQuantityChange = (value) => {
    const newQuantity = parseInt(value)
    if (newQuantity > 0) {
      setQuantity(newQuantity)
    }
  }

  if (loading) return <div className="single-product-page"><p>Loading product...</p></div>
  if (error) return <div className="single-product-page"><p className="error-message">{error}</p></div>
  if (!product) return <div className="single-product-page"><p>Product not found</p></div>

  const img = product.img_url || 'https://via.placeholder.com/500'

  return (
    <div className="single-product-page">
      <div className="single-product-container">
        <div className="image-column">
          <img src={img} alt={product.name} className="single-product-image" />
        </div>
        <div className="info-column">
          <h1 className="product-title">{product.name}</h1>
          <p className="product-price">{product.price} kr</p>
          {product.description && <p className="product-description">{product.description}</p>}
           <div className="quantity-section">
            <label htmlFor="quantity">Quantity:</label>
            <input 
              type="number" 
              id="quantity"
              min="1" 
              value={quantity} 
              onChange={(e) => handleQuantityChange(e.target.value)}
            />
          </div>
          <button className="add-to-cart-btn" onClick={handleAddToCart}>Add to Cart</button>
          <div className="back-link">
            <Link to="/">← Back to shop</Link>
            {showToast && (
            <div className="toast-notification">
              ✅ {product.name} har lagts till i varukorgen!
            </div>
          )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default SingleProductPage