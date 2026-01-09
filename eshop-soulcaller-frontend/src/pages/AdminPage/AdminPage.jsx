import { useState } from 'react';
import {
  fetchProducts,
  createProduct,
  updateProduct,
  deleteProduct,
} from '../../services/api';

export default function AdminPage() {
  const [log, setLog] = useState('');

  function logResult(title, data) {
    console.log(title, data);
    setLog(prev => `${title}:\n${JSON.stringify(data, null, 2)}\n\n${prev}`);
  }

async function handleCreate() {
  try {
    const newProduct = {
      name: 'Ny testprodukt',
      price: 199,
      description: 'En mysig plushie',
      img_url: 'https://example.com/test.jpg',
      category_id: 1, // nån kategori du vet finns
    };

    const data = await createProduct(newProduct);
    console.log('createProduct', data);
  } catch (err) {
    console.error(err);
  }
}


  async function handleFetch() {
    try {
      const data = await fetchProducts();
      logResult('fetchProducts', data);
    } catch (err) {
      console.error(err);
      setLog('Fel vid fetchProducts: ' + err.message);
    }
  }

  async function handleUpdate() {
    try {
      const id = 1; // byt till ett id som finns i din db
      const updated = { name: 'Uppdaterad produkt', price: 999 };
      const data = await updateProduct(id, updated);
      logResult('updateProduct', data);
    } catch (err) {
      console.error(err);
      setLog('Fel vid updateProduct: ' + err.message);
    }
  }

  async function handleDelete() {
    try {
      const id = 1; // byt till ett id som finns
      const data = await deleteProduct(id);
      logResult('deleteProduct', data);
    } catch (err) {
      console.error(err);
      setLog('Fel vid deleteProduct: ' + err.message);
    }
  }

  return (
    <div style={{ padding: '2rem' }}>
      <h1>Admin test</h1>
      <button onClick={handleFetch}>Testa fetchProducts</button>
      <button onClick={handleCreate}>Testa createProduct</button>
      <button onClick={handleUpdate}>Testa updateProduct</button>
      <button onClick={handleDelete}>Testa deleteProduct</button>

      <h2>Logg</h2>
      <pre>{log}</pre>
    </div>
  );
}
