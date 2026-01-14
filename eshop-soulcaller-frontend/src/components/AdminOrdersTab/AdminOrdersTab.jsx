// src/components/AdminOrdersTab/AdminOrdersTab.jsx
import { useEffect, useState } from "react";
import {
  fetchOrders,
  updateOrder,
  deleteOrder,
} from "../../services/api";
import "./AdminOrdersTab.scss";

// 🔹 Status-labels (backendlägen → vad användaren ser)
const STATUS_LABELS = {
  pending: "Väntar",
  paid: "Betald",
  shipped: "Skickad",
  completed: "Klar",
  cancelled: "Avbruten",
};

// 🔹 Lista med alla statusar (till dropdown)
const ORDER_STATUSES = Object.keys(STATUS_LABELS);

// 🔹 Färger för badges (kan tweakas som du vill)
const STATUS_COLORS_BG = {
  pending: "#FFE4B5",   // ljus orange
  paid: "#CDE8FF",      // ljus blå
  shipped: "#E3D1FF",   // ljus lila
  completed: "#CFF7C9", // ljus grön
  cancelled: "#FFD6D9", // ljus röd
};

const STATUS_COLORS_TEXT = {
  pending: "#8B5A00",
  paid: "#004A89",
  shipped: "#5A2D82",
  completed: "#1E6B1B",
  cancelled: "#8B0010",
};

const AdminOrdersTab = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");

  const [form, setForm] = useState({
    id: null,
    status: "",
  });
  const [isEditing, setIsEditing] = useState(false);

  // Hämta orders när fliken laddas
  useEffect(() => {
    loadOrders();
  }, []);

  async function loadOrders() {
    try {
      setLoading(true);
      setError("");
      const data = await fetchOrders();
      setOrders(data);
    } catch (err) {
      console.error(err);
      setError("Kunde inte hämta orders.");
    } finally {
      setLoading(false);
    }
  }

  function resetForm() {
    setForm({
      id: null,
      status: "",
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
      // Tillåt bara update om vi faktiskt redigerar en vald order
      if (!isEditing || form.id === null) {
        setError("Ingen order vald för uppdatering.");
        return;
      }

      const payload = {
        status: form.status,
      };

      const updated = await updateOrder(form.id, payload);

      setOrders(prev =>
        prev.map(order => (order.id === updated.id ? updated : order))
      );

      setMessage(`Order #${updated.id} uppdaterad.`);
      resetForm();
    } catch (err) {
      console.error(err);
      setError("Kunde inte uppdatera ordern.");
    } finally {
      setSaving(false);
    }
  }

  function handleEdit(order) {
    setIsEditing(true);
    setForm({
      id: order.id,
      status: order.status ?? "",
    });
    setMessage("");
    setError("");
  }

  async function handleDelete(id) {
    const confirmDelete = window.confirm(
      "Är du säker på att du vill ta bort den här ordern?"
    );
    if (!confirmDelete) return;

    try {
      setError("");
      setMessage("");
      await deleteOrder(id);
      setOrders(prev => prev.filter(o => o.id !== id));
      setMessage(`Order ${id} togs bort.`);
      if (form.id === id) {
        resetForm();
      }
    } catch (err) {
      console.error(err);
      setError("Kunde inte ta bort ordern.");
    }
  }

  return (
    <div>
      <h2>Orders (admin)</h2>

      {error && <div>{error}</div>}
      {message && <div>{message}</div>}

      {/* Formulär för status-uppdatering */}
      <section className="admin-order-form-container">
        <form onSubmit={handleSubmit} id="admin-order-form" className="admin-order-form">
        <h3>
          {isEditing
            ? `Redigera order #${form.id}`
            : "Redigera orderstatus"}
        </h3>
            <label>
              Order-ID:
              <input
                type="number"
                name="id"
                value={form.id ?? ""}
                onChange={e =>
                  setForm(prev => ({
                    ...prev,
                    id:
                      e.target.value === ""
                        ? null
                        : Number(e.target.value),
                  }))
                }
                disabled={isEditing} // när vi valt via tabellen vill vi låsa ID
              />
            </label>

            <label>
              Status:
              <select
                name="status"
                value={form.status}
                onChange={handleChange}
              >
                <option value="">Välj status</option>
                {ORDER_STATUSES.map(status => (
                  <option key={status} value={status}>
                    {STATUS_LABELS[status]}
                  </option>
                ))}
              </select>
            </label>

          <div>
            <button type="submit" disabled={saving}>
              {saving ? "Sparar..." : "Uppdatera status"}
            </button>
            {isEditing && (
              <button type="button" onClick={resetForm}>
                Avbryt
              </button>
            )}
          </div>
        </form>
      </section>

      {/* Lista med orders */}
      <section>
        <div>
          <h3>Befintliga orders</h3>
          <button onClick={loadOrders} disabled={loading}>
            {loading ? "Laddar..." : "Ladda om"}
          </button>
        </div>

        {loading && orders.length === 0 && <p>Laddar orders...</p>}
        {!loading && orders.length === 0 && <p>Inga orders hittades.</p>}

        {orders.length > 0 && (
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Användare</th>
                <th>Status</th>
                <th>Totalt</th>
                <th>Skapad</th>
                <th>Åtgärder</th>
              </tr>
            </thead>
            <tbody>
              {orders.map(order => {
                const bg =
                  STATUS_COLORS_BG[order.status] || "#eee";
                const textColor =
                  STATUS_COLORS_TEXT[order.status] || "#333";

                return (
                  <tr key={order.id}>
                    <td>{order.id}</td>
                    {/* Justera efter vad ditt Order-objekt heter */}
                    <td>{order.user_id ?? order.userId ?? "-"}</td>

                    {/* Status med färgad badge */}
                    <td>
                      <span
                        style={{
                          backgroundColor: bg,
                          color: textColor,
                          padding: "3px 8px",
                          borderRadius: "999px",
                          fontSize: "0.85rem",
                          textTransform: "capitalize",
                          display: "inline-block",
                          minWidth: "90px",
                          textAlign: "center",
                        }}
                      >
                        {STATUS_LABELS[order.status] ??
                          order.status ??
                          "-"}
                      </span>
                    </td>

                    <td>{order.total ?? order.total_price ?? "-"}</td>

                    <td>
                      {order.createdAt
                        ? new Date(order.createdAt).toLocaleString()
                        : "-"}
                    </td>

                    <td>
                      <button onClick={() => handleEdit(order)}>
                        Redigera status
                      </button>
                      <button onClick={() => handleDelete(order.id)}>
                        Ta bort
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        )}
      </section>
    </div>
  );
};

export default AdminOrdersTab;
