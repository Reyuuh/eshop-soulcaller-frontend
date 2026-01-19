import React, { useState, useEffect } from 'react'
import './ProductCard.scss'
import { getProducts } from '../../services/api'
import { Link } from 'react-router-dom'


const ProductCard = () => {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [currentPage, setCurrentPage] = useState(1)
  const productsPerPage = 6

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true)
      setError('')
      try {
        const data = await getProducts()
        console.log('Products fetched:', data)
        setProducts(data)
      } catch (err) {
        setError(err.message)
        console.log('Error, failed to fetch products', err)
      } finally {
        setLoading(false)
      }
    }

    fetchProducts()
  }, [])

  // Beräkna vilka produkter som ska visas på denna sida
  const indexOfLastProduct = currentPage * productsPerPage
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage
  const currentProducts = products.slice(indexOfFirstProduct, indexOfLastProduct)
  
  // Beräkna totalt antal sidor
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

  if (loading) {
    return <div className="product-card-container"><p>Loading products...</p></div>
  }

  if (error) {
    return <div className="product-card-container"><p className="error-message">{error}</p></div>
  }

  return (
    <>
        <div className="product-card-container">
        {currentProducts && currentProducts.length > 0 ? (
          currentProducts.map((product) => {
            const id = product.id || product._id
            const img = product.img_url || product.image || product.img || 'https://via.placeholder.com/250'
            return (
              <Link to={`/product/${id}`} key={id} className="product-link">
                <div className="product-card">
                  <h2 className="product-name">{product.name}</h2>
                  <img
                    className="product-image"
                    src={img}
                    alt={product.name}
                  />
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
          <button 
            className="pagination-btn" 
            onClick={handlePrevPage} 
            disabled={currentPage === 1}
          >
            Previous
          </button>

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

          <button 
            className="pagination-btn" 
            onClick={handleNextPage} 
            disabled={currentPage === totalPages}
          >
            Next
          </button>
        </div>
      )}
    </>
  )
}

export default ProductCard