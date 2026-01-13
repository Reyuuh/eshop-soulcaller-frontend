import { useEffect, useState } from "react";
import {
  fetchCategories,
  createCategory,
  updateCategory,
  deleteCategory,
} from "../../services/api";
import './AdminCategoriesTab.scss';


const AdminCategoriesTab = () => {

    const [categories, setCategories] = useState([]);
    const [form, setForm] = useState({
      id: null,
        name: "",
        description: "",
    });
    const [isEditing, setIsEditing] = useState(false);
    const [loading, setLoading] = useState(false);
    const [saving, setSaving] = useState(false);
    const [error, setError] = useState("");
    const [message, setMessage] = useState("");

    //hämta upp kategorier när fliken laddas
    useEffect(() => {
      loadCategories();
    }, []);

    async function loadCategories() {
        try {
        setLoading(true);
        setError("");
        const data = await fetchCategories();
        setCategories(data);
      } catch (err) {
        console.error(err);
        setError("Kunde inte hämta kategorier.");
      } finally {
        setLoading(false);
      }
    }
   
    function resetForm() {
      setForm({
        id: null,
        name: "",
        description: "",
      });
      setIsEditing(false);
    }

     function handleChange(e) {
      const { name, value } = e.target;
      setForm(prev => ({
        ...prev,
        [name]: value
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
            };

            if (isEditing && form.id !== null) {

                const updated = await updateCategory(form.id, payload);
                setCategories(prev =>
                    prev.map(cat => (cat.id === updated.id ? updated : cat))
                );
                setMessage("Kategorin uppdaterades.");
            } else {

                const created = await createCategory(payload);
                setCategories(prev => [...prev, created]);
                setMessage("Kategorin skapades.");
            }

            resetForm();
        } catch (err) {
            console.error(err);
            setError("Kunde inte spara kategorin.");
        } finally {
            setSaving(false);
        }
    }

    function handleEdit(category) {
        setIsEditing(true);
        setForm({
            id: category.id,
            name: category.name,
            description: category.description ?? "",
        });
        setMessage("");
        setError("");
    }

    async function handleDelete(id) {
    const confirmDelete = window.confirm(
      "Är du säker på att du vill ta bort den här kategorin?"
    );
    if (!confirmDelete) return;

    try {
      setError("");
      setMessage("");
      await deleteCategory(id);
      setCategories(prev => prev.filter(c => c.id !== id));
      setMessage("Kategorin togs bort.");
      if (form.id === id) {
        resetForm();
      }
    } catch (err) {
      console.error(err);
      setError(
        "Kunde inte ta bort kategorin. Kontrollera om den används av produkter."
      );
    }
  }

return (
    <div>
      <h2>{isEditing ? "Redigera kategori" : "Skapa ny kategori"}</h2>

      {error && <div>{error}</div>}
      {message && <div>{message}</div>}

      <section className="admin-category-form-container">
        <form onSubmit={handleSubmit} id="admin-category-form">
          <div>
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
          </div>

          <div>
            <label>
              Beskrivning:
              <textarea
                name="description"
                value={form.description}
                onChange={handleChange}
                rows={3}
              />
            </label>
          </div>

          <div>
            <button type="submit" disabled={saving}>
              {saving
                ? "Sparar..."
                : isEditing
                ? "Uppdatera kategori"
                : "Skapa kategori"}
            </button>
            {isEditing && (
              <button type="button" onClick={resetForm}>
                Avbryt redigering
              </button>
            )}
          </div>
        </form>
      </section>

      <section>
        <div>
          <h3>Befintliga kategorier</h3>
          <button onClick={loadCategories} disabled={loading}>
            {loading ? "Laddar..." : "Ladda om"}
          </button>
        </div>

        {loading && categories.length === 0 && <p>Laddar kategorier...</p>}
        {!loading && categories.length === 0 && <p>Inga kategorier hittades.</p>}

        {categories.length > 0 && (
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Namn</th>
                <th>Beskrivning</th>
                <th>Åtgärder</th>
              </tr>
            </thead>
            <tbody>
              {categories
                .slice()
                .sort((a, b) => a.name.localeCompare(b.name))
                .map(category => (
                  <tr key={category.id}>
                    <td>{category.id}</td>
                    <td>{category.name}</td>
                    <td>{category.description ?? "-"}</td>
                    <td>
                      <button onClick={() => handleEdit(category)}>
                        Redigera
                      </button>
                      <button onClick={() => handleDelete(category.id)}>
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

export default AdminCategoriesTab;