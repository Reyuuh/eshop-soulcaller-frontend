import React, { useState, useEffect } from 'react'
import './ProductCard.scss'
import { getProducts } from '../../services/api'
import { Link } from 'react-router-dom'

// Vi lägger till { data } som en prop här
const ProductCard = ({ data }) => { 
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [currentPage, setCurrentPage] = useState(1)
  const productsPerPage = 6

  useEffect(() => {
    // 2. LOGIK: Om 'data' skickas med som prop, använd den istället för att fetcha
    if (data) {
      setProducts(data)
      setLoading(false)
      setError('')
    } else {
      // Om ingen data skickas med (t.ex. på startsidan), hämta allt som vanligt
      const fetchProducts = async () => {
        setLoading(true)
        setError('')
        try {
          const fetchedData = await getProducts()
          setProducts(fetchedData)
        } catch (err) {
          setError(err.message)
        } finally {
          setLoading(false)
        }
      }
      fetchProducts()
    }
  }, [data]) // 3. VIKTIGT: Kör om useEffect om 'data' ändras

  // 4. Nollställ sidnumret till 1 om produktlistan ändras (så man inte fastnar på sista sidan)
  useEffect(() => {
    setCurrentPage(1)
  }, [products.length])

  // --- Resten av din logik är exakt densamma som tidigare ---
  const indexOfLastProduct = currentPage * productsPerPage
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage
  const currentProducts = products.slice(indexOfFirstProduct, indexOfLastProduct)
  const totalPages = Math.ceil(products.length / productsPerPage)

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1)
      window.scrollTo(0, 0)
    }
  }

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1)
      window.scrollTo(0, 0)
    }
  }

  const handlePageClick = (pageNumber) => {
    setCurrentPage(pageNumber)
    window.scrollTo(0, 0)
  }

  if (loading) return <div className="product-card-container"><p>Loading products...</p></div>
  if (error) return <div className="product-card-container"><p className="error-message">{error}</p></div>

  return (
    <>
    <h1 className="featured-products-title">Featured Products</h1>
        <div className="product-card-container">
        {currentProducts && currentProducts.length > 0 ? (
          currentProducts.map((product) => {
            const id = product.id || product._id
            const img = product.img_url || product.image || product.img || 'https://via.placeholder.com/250'
            return (
              <Link to={`/product/${id}`} key={id} className="product-link">
                <div className="product-card">
                  <h2 className="product-name">{product.name}</h2>
                  <img className="product-image" src={img} alt={product.name} />
                  <p className="product-price">{product.price} kr</p>
               
                  
                </div>
              </Link>
            )
          })
        ) : (
          <p>No products available</p>
        )}
      </div>

      {totalPages > 1 && (
        <div className="pagination">
          <button className="pagination-btn" onClick={handlePrevPage} disabled={currentPage === 1}>Previous</button>
          <div className="pagination-numbers">
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <button
                key={page}
                className={`pagination-number ${currentPage === page ? 'active' : ''}`}
                onClick={() => handlePageClick(page)}
              >
                {page}
              </button>
            ))}
          </div>
          <button className="pagination-btn" onClick={handleNextPage} disabled={currentPage === totalPages}>Next</button>
        </div>
      )}
    </>
  )
}

export default ProductCard