import { useEffect, useState } from 'react';
import { fetchProducts } from '../../services/api';

function ProductPage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    console.log('ProductPage mounted, calling fetchProducts...');
    fetchProducts()
      .then(data => {
        console.log('Products in ProductPage:', data);
        setProducts(data);
      })
      .catch(err => {
        console.error('Error in ProductPage fetch:', err);
        setError('Kunde inte hämta produkter');
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  if (loading) return <div style={{ color: 'white' }}>Laddar produkter...</div>;
  if (error) return <div style={{ color: 'red' }}>{error}</div>;

  return (
    <div style={{ padding: '2rem', color: 'white' }}>
      <h1>Products</h1>
      <pre>{JSON.stringify(products, null, 2)}</pre>
    </div>
  );
}

export default ProductPage;
