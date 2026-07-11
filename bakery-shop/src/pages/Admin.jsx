import { useEffect, useState } from "react";
import axios from "axios";
import { useProducts } from "../context/ProductContext";

function Admin() {
  const { products, addProduct, updateProduct, deleteProduct } = useProducts();
  const [orders, setOrders] = useState([]);
  const [orderError, setOrderError] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [form, setForm] = useState({
    name: "",
    price: "",
    category: "Cakes",
    image: "",
  });

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/orders", {
          withCredentials: true,
        });
        setOrders(res.data);
        setOrderError("");
      } catch (error) {
        setOrderError(error.response?.data?.error || "Unable to load orders");
      }
    };

    fetchOrders();
  }, []);

  const handleEdit = (product) => {
    setEditingId(product._id);
    setForm({
      name: product.title,
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
      title: form.name,
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
      <p className="admin-subtitle">Manage bakery products and incoming customer orders.</p>

      <section className="admin-orders-section">
        <h3>Incoming Orders</h3>
        {orderError && <p style={{ color: "red" }}>{orderError}</p>}

        {orders.length === 0 ? (
          <p>No orders received yet.</p>
        ) : (
          <div className="orders-list admin-orders-list">
            {orders.map((order) => (
              <div key={order._id} className="order-card">
                <div className="order-header">
                  <span className="order-id">
                    {order.orderType === "customCake" ? "Custom Cake" : "Product Order"} #{order._id}
                  </span>
                  <span className="order-date">
                    {new Date(order.createdAt).toLocaleString()}
                  </span>
                </div>

                <p><strong>Customer:</strong> {order.userEmail}</p>
                <p><strong>Status:</strong> {order.status || "Pending"}</p>

                {order.orderType === "customCake" ? (
                  <div className="custom-order-details">
                    <p><strong>Cake Type:</strong> {order.customCake?.cakeType}</p>
                    <p><strong>Flavor:</strong> {order.customCake?.flavor}</p>
                    <p><strong>Size:</strong> {order.customCake?.size}</p>
                    <p><strong>Shape:</strong> {order.customCake?.shape || "Not specified"}</p>
                    <p><strong>Message:</strong> {order.customCake?.message || "No message"}</p>
                    <p><strong>Delivery Date:</strong> {order.customCake?.deliveryDate || "Not selected"}</p>
                  </div>
                ) : (
                  <>
                    <ul className="order-items">
                      {order.items.map((item, i) => (
                        <li key={`${order._id}-${item.productId || i}`}>
                          {item.title || item.name || "Bakery item"} x {item.qty} - Rs. {item.price * item.qty}
                        </li>
                      ))}
                    </ul>
                    <div className="order-footer">Total: Rs. {order.totalAmount}</div>
                  </>
                )}
              </div>
            ))}
          </div>
        )}
      </section>

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
            Price (Rs.)
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
                <th>Price (Rs.)</th>
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
                  <tr key={p._id}>
                    <td>{p.title}</td>
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
                        onClick={() => deleteProduct(p._id)}
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
