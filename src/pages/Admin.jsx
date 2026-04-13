import { useState } from "react";
import { useProducts } from "../context/ProductContext";

function Admin() {
  const { products, addProduct, updateProduct, deleteProduct } = useProducts();
  const [editingId, setEditingId] = useState(null);
  const [form, setForm] = useState({
    name: "",
    price: "",
    category: "Cakes",
    image: "",
  });

  const handleEdit = (product) => {
    setEditingId(product.id);
    setForm({
      name: product.name,
      price: product.price,
      category: product.category,
      image: product.image,
    });
  };

  const clearForm = () => {
    setEditingId(null);
    setForm({
      name: "",
      price: "",
      category: "Cakes",
      image: "",
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.name || !form.price) return;

    const data = {
      name: form.name,
      price: Number(form.price),
      category: form.category,
      image:
        form.image ||
        "https://images.pexels.com/photos/291528/pexels-photo-291528.jpeg?auto=compress&cs=tinysrgb&w=400",
    };

    if (editingId) {
      updateProduct(editingId, data);
    } else {
      addProduct(data);
    }
    clearForm();
  };

  return (
    <section className="admin-page">
      <h2>Admin Panel</h2>
      <p className="admin-subtitle">Manage bakery products here.</p>

      <div className="admin-grid">
        <form onSubmit={handleSubmit} className="admin-form">
          <h3>{editingId ? "Edit Product" : "Add Product"}</h3>

          <label>
            Name
            <input
              type="text"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              placeholder="Product name"
            />
          </label>

          <label>
            Price (₹)
            <input
              type="number"
              value={form.price}
              onChange={(e) => setForm({ ...form, price: e.target.value })}
              placeholder="Price"
            />
          </label>

          <label>
            Category
            <select
              value={form.category}
              onChange={(e) => setForm({ ...form, category: e.target.value })}
            >
              <option value="Cakes">Cakes</option>
              <option value="Cupcakes">Cupcakes</option>
              <option value="Bread">Bread</option>
            </select>
          </label>

          <label>
            Image URL
            <input
              type="text"
              value={form.image}
              onChange={(e) => setForm({ ...form, image: e.target.value })}
              placeholder="Optional image URL"
            />
          </label>

          <div className="admin-form-actions">
            <button type="submit" className="btn primary">
              {editingId ? "Update" : "Add"} Product
            </button>
            {editingId && (
              <button
                type="button"
                className="btn secondary"
                onClick={clearForm}
              >
                Cancel
              </button>
            )}
          </div>
        </form>

        <div className="admin-table-wrapper">
          <table className="admin-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Category</th>
                <th>Price (₹)</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {products.length === 0 ? (
                <tr>
                  <td colSpan="4">No products found.</td>
                </tr>
              ) : (
                products.map((p) => (
                  <tr key={p.id}>
                    <td>{p.name}</td>
                    <td>{p.category}</td>
                    <td>{p.price}</td>
                    <td>
                      <button
                        className="btn secondary btn-small"
                        onClick={() => handleEdit(p)}
                      >
                        Edit
                      </button>
                      <button
                        className="btn danger btn-small"
                        onClick={() => deleteProduct(p.id)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}

export default Admin;
