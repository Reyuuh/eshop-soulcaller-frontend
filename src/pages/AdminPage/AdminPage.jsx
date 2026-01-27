// src/pages/AdminPage/AdminPage.jsx

import React, { useState } from "react";
import { Navigate } from "react-router-dom";
import AdminProductsTab from "../../components/AdminProductTab/AdminProductTab";
import AdminCategoriesTab from "../../components/AdminCategoriesTab/AdminCategoriesTab";
import AdminOrdersTab from "../../components/AdminOrdersTab/AdminOrdersTab";

export default function AdminPage() {
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");

  // Not logged in → go to login
  if (!token) {
    return <Navigate to="/login" replace />;
  }

  // Logged in but not admin → kick to home
  if (role !== "admin") {
    return <Navigate to="/" replace />;
  }

  const [activeTab, setActiveTab] = useState("products");

  return (
    <div>
      <h1>Admin</h1>

      <nav>
        <button
          type="button"
          onClick={() => setActiveTab("products")}
          aria-pressed={activeTab === "products"}
        >
          Produkter
        </button>

        <button
          type="button"
          onClick={() => setActiveTab("categories")}
          aria-pressed={activeTab === "categories"}
        >
          Kategorier
        </button>

        <button
          type="button"
          onClick={() => setActiveTab("orders")}
          aria-pressed={activeTab === "orders"}
        >
          Orders
        </button>
      </nav>

      <hr />

      {activeTab === "orders" && <AdminOrdersTab />}
      {activeTab === "products" && <AdminProductsTab />}
      {activeTab === "categories" && <AdminCategoriesTab />}
    </div>
  );
}
