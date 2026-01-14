// src/components/admin/AdminProductsTab.jsx
import { useEffect, useState } from "react";
import {
  getProducts,
  createProduct,
  updateProduct,
  deleteProduct,
  fetchCategories,
} from "../../services/api";
import "./AdminProductTab.scss";

const AdminProductsTab = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);

  const [form, setForm] = useState({
    id: null,
    name: "",
    price: "",
    description: "",
    img_url: "",
    category_id: "",
  });

  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);   // för produkter
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    loadProducts();
    loadCategories();
  }, []);

  async function loadProducts() {
    try {
      setLoading(true);
      setError("");
      const data = await getProducts();
      setProducts(data);
    } catch (err) {
      console.error(err);
      setError("Kunde inte hämta produkter.");
    } finally {
      setLoading(false);
    }
  }

  async function loadCategories() {
    try {
      const data = await fetchCategories();
      setCategories(data);
    } catch (err) {
      console.error(err);
      // vi sätter inte error här för att inte döda hela produktsidan
    }
  }

  function resetForm() {
    setForm({
      id: null,
      name: "",
      price: "",
      description: "",
      img_url: "",
      category_id: "",
    });
    setIsEditing(false);
  }

  function handleChange(e) {
    const { name, value } = e.target;
    setForm(prev => ({
      ...prev,
      [name]: value,
    }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setSaving(true);
    setError("");
    setMessage("");

    try {
      const payload = {
        name: form.name,
        description: form.description || null,
        price: form.price === "" ? null : Number(form.price),
        img_url: form.img_url || null,
        category_id:
          form.category_id === "" ? null : Number(form.category_id),
      };

      if (!payload.name || !payload.name.trim()) {
        setError("Namn är obligatoriskt.");
        setSaving(false);
        return;
      }

      if (isEditing && form.id != null) {
        // UPDATE
        const updated = await updateProduct(form.id, payload);
        setProducts(prev =>
          prev.map(p => (p.id === updated.id ? updated : p))
        );
        setMessage(`Produkten "${updated.name}" uppdaterades.`);
      } else {
        // CREATE
        const created = await createProduct(payload);
        setProducts(prev => [...prev, created]);
        setMessage(`Produkten "${created.name}" skapades.`);
      }

      resetForm();
    } catch (err) {
      console.error(err);
      setError("Kunde inte spara produkten.");
    } finally {
      setSaving(false);
    }
  }

  function handleEdit(product) {
    setIsEditing(true);
    setForm({
      id: product.id,
      name: product.name ?? "",
      price: product.price ?? "",
      description: product.description ?? "",
      img_url: product.img_url ?? "",
      category_id: product.category_id ?? "",
    });
    setMessage("");
    setError("");
  }

  async function handleDelete(id) {
    const confirmDelete = window.confirm(
      "Är du säker på att du vill ta bort den här produkten? Detta kan ta bort relaterade orders enligt backend-logiken."
    );
    if (!confirmDelete) return;

    try {
      setError("");
      setMessage("");
      await deleteProduct(id);
      setProducts(prev => prev.filter(p => p.id !== id));
      setMessage("Produkten togs bort.");
      if (form.id === id) {
        resetForm();
      }
    } catch (err) {
      console.error(err);
      setError("Kunde inte ta bort produkten.");
    }
  }

  // Hjälp-funktion för att visa kategorinamnet i tabellen
  function getCategoryName(categoryId) {
    if (categoryId == null) return "-";
    const cat = categories.find(c => c.id === categoryId);
    return cat ? cat.name : categoryId;
  }

  return (
    <div>
      <h2>{isEditing ? "Redigera produkt" : "Skapa ny produkt"}</h2>

      {error && <div>{error}</div>}
      {message && <div>{message}</div>}

      <div className="add-product-form-container">
        <form onSubmit={handleSubmit} id="add-product-form">
            <label>
              Namn*:
              <input
                type="text"
                name="name"
                value={form.name}
                onChange={handleChange}
                required
              />
            </label>
            <label>
              Pris:
              <input
                type="number"
                name="price"
                value={form.price}
                onChange={handleChange}
              />
            </label>
            <label>
              Beskrivning:
              <textarea
                name="description"
                value={form.description}
                onChange={handleChange}
                rows={3}
              />
            </label>

            <label>
              Bild-URL:
              <input
                type="text"
                name="img_url"
                value={form.img_url}
                onChange={handleChange}
              />
            </label>

            <label>
              Kategori:
              <select
                name="category_id"
                value={form.category_id}
                onChange={handleChange}
              >
                <option value="">Ingen kategori</option>
                {categories.map(cat => (
                  <option key={cat.id} value={cat.id}>
                    {cat.name}
                  </option>
                ))}
              </select>
            </label>

            <button type="submit" disabled={saving}>
              {saving
                ? "Sparar..."
                : isEditing
                ? "Uppdatera produkt"
                : "Skapa produkt"}
            </button>
            {isEditing && (
              <button type="button" onClick={resetForm}>
                Avbryt redigering
              </button>
            )}
        </form>
      </div>

      <section>
        <div>
          <h3>Befintliga produkter</h3>
          <button onClick={loadProducts} disabled={loading}>
            {loading ? "Laddar..." : "Ladda om"}
          </button>
        </div>

        {loading && products.length === 0 && <p>Laddar produkter...</p>}
        {!loading && products.length === 0 && <p>Inga produkter hittades.</p>}

        {products.length > 0 && (
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Namn</th>
                <th>Pris</th>
                <th>Kategori</th>
                <th>Åtgärder</th>
              </tr>
            </thead>
            <tbody>
              {products
                .slice()
                .sort((a, b) => a.name.localeCompare(b.name))
                .map(product => (
                  <tr key={product.id}>
                    <td>{product.id}</td>
                    <td>{product.name}</td>
                    <td>{product.price ?? "-"}</td>
                    <td>{getCategoryName(product.category_id)}</td>
                    <td>
                      <button onClick={() => handleEdit(product)}>
                        Redigera
                      </button>
                      <button onClick={() => handleDelete(product.id)}>
                        Ta bort
                      </button>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        )}
      </section>
    </div>
  );
};

export default AdminProductsTab;