import React from 'react'
import './AdminAddProductForm.scss'

const AdminAddProductForm = () => {
  return (
    <div className='add-product-form-container'>  
      <form action="submit" id='add-product-form'>
        <h2>Add New Product</h2>
        <label htmlFor="product-name">Product Name:</label>
        <input type="text" id="product-name" placeholder="Product Name" />
        <label htmlFor="price">Price:</label>
        <input type="number" id="price" placeholder="Price" />
        <label htmlFor="description">Description:</label>
        <textarea id="description" placeholder="Product Description"></textarea>
        <label htmlFor="category">Category:</label>
        <input type="text" id="category" placeholder="Category" />
        <label htmlFor="image-url">Image URL:</label>
        <input type="text" id="image-url" placeholder="Image URL" />            
        <button type="submit">Add Product</button>  
        </form>  
    </div>
  )
}

export default AdminAddProductForm