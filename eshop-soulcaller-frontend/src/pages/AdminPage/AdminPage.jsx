import React from "react";
import { useState } from "react";
import AdminProductsTab from "../../components/AdminProductTab/AdminProductTab";
import AdminCategoriesTab from "../../components/AdminCategoriesTab/AdminCategoriesTab";

export default function AdminPage() {
  const [activeTab, setActiveTab] = useState("products");

  return (
    <div>
      <h1>Admin</h1>

      {/* Simple tabs */}
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
      </nav>

      <hr />

      {/* Tab content */}
      {activeTab === "products" && <AdminProductsTab />}
      {activeTab === "categories" && <AdminCategoriesTab />}
    </div>
  );
}
