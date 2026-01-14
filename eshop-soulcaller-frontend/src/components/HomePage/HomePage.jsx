import React from 'react';
import { useDispatch } from 'react-redux';
import { addItem } from '../../redux/slices/cartSlice';
import './HomePage.scss';

const HomePage = () => {
  const dispatch = useDispatch();

  // Sample products (replace with API data later)
  const products = [
    { id: 1, name: 'Mystic Artifact', price: 29.99 },
    { id: 2, name: 'Soul Gem', price: 49.99 },
  ];

  const handleAddToCart = (product) => {
    dispatch(addItem(product));
  };

  return (
  <div className="home-page" style={{ padding: 24 }}>
    <h1>Welcome to Soulcaller E-shop</h1>
    <section>
      <h2>Featured Products</h2>
      {products.map((product) => (
        <div key={product.id}>
          <h3>{product.name}</h3>
          <p>${product.price}</p>
          <button onClick={() => handleAddToCart(product)}>Add to Cart</button>
        </div>
      ))}
    </section>
  </div>
  );
};

export default HomePage;