import React, { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import './SingleProductPage.scss'
import { getProductById } from '../../services/api'


const SingleProductPage = () => {
  const { id } = useParams()
  const [product, setProduct] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    const fetchProduct = async () => {
      setLoading(true)
      setError('')
      try {
        const data = await getProductById(id)
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
          <p className="product-price">${product.price}</p>
          {product.description && <p className="product-description">{product.description}</p>}
          <button className="add-to-cart-btn">Add to Cart</button>
          <div className="back-link">
            <Link to="/">← Back to shop</Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SingleProductPage