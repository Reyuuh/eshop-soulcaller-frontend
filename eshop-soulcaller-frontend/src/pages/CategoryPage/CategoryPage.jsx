import React, { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
// Vi importerar både funktionen för kategorinamnet och alla produkter
import { fetchCategoryById, getProducts } from '../../services/api.js'
import "./CategoryPage.scss"

const CategoryPage = () => {
  const { id } = useParams()
  const [categoryName, setCategoryName] = useState('')
  const [filteredProducts, setFilteredProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    const loadData = async () => {
      setLoading(true)
      setError('')
      try {
        // 1. Hämta kategorins detaljer (för att få namnet till rubriken)
        const categoryInfo = await fetchCategoryById(id)
        setCategoryName(categoryInfo.name)

        // 2. Hämta ALLA produkter
        const allProducts = await getProducts()
        console.log("Alla produkter från API:", allProducts)

        // 3. Filtrera produkterna manuellt här
        // Vi kollar om produktens category_id matchar ID:t i URL:en
        const matchingProducts = allProducts.filter(product => {
          // Vi kollar flera möjliga fältnamn för säkerhets skull
          const pCatId = product.category_id || product.categoryId || product.category
          return pCatId == id // Använd == för att sträng ska matcha siffra
        })

        setFilteredProducts(matchingProducts)
      } catch (err) {
        setError('Kunde inte ladda kategorins produkter.')
        console.error(err)
      } finally {
        setLoading(false)
      }
    }

    if (id) {
      loadData()
    }
  }, [id])

  if (loading) return <div className="category-status">Laddar...</div>
  if (error) return <div className="category-status error">{error}</div>

  return (
    <div className="category-container">
      <header className="category-header">
        <Link to="/" className="back-button">← Tillbaka till start</Link>
        <h1>{categoryName || 'Kategori'}</h1>
        <p>Visar {filteredProducts.length} produkter</p>
      </header>

      <div className="product-card-container">
        {filteredProducts.length > 0 ? (
          filteredProducts.map((product) => (
            <Link 
              to={`/product/${product.id || product._id}`} 
              key={product.id || product._id} 
              className="product-item"
            >
              <div className='product-name'>
              <div className="product-card">
                  <h2 className="product-name">{product.name}</h2>
                  <img className="product-image" src={product.img_url || product.image || 'https://via.placeholder.com/250' } alt={product.name} />
                  <p className="product-price">{product.price} kr</p>
                </div>
              </div>
            </Link>
          ))
        ) : (
          <div className="no-products">
            <p>Inga produkter hittades för kategori-ID: {id}</p>
          </div>
        )}
      </div>
    </div>
  )
}

export default CategoryPage