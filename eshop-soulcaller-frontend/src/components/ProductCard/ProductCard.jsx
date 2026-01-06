import React from 'react'
import './ProductCard.scss'
import productImage from '../../assets/inGameCurrency6.jpg'

const ProductCard = () => {
  return (
    <div className="product-card">
        <h2 className="product-name">Product Name</h2>
        <img className="product-image" src={productImage} alt="Product" />
        <p className="product-price">$9.99</p>
        <button className="add-to-cart-btn">Add to Cart</button>
    </div>
  )
}

export default ProductCard