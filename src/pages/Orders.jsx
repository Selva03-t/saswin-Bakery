import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

function Orders() {
  const [orders, setOrders] = useState([]);
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate("/login");
      return;
    }

    const fetchOrders = async () => {
      try {
       const res = await axios.get(
  `http://localhost:5000/api/orders/${user.email}`,
  { withCredentials: true }
);

        setOrders(res.data);
      } catch (error) {
        console.log("Order fetch error:", error);
      }
    };

    fetchOrders();
  }, [user, navigate]);

  if (!user) return null;

  if (orders.length === 0) {
    return (
      <section className="orders-page">
        <h2>Your Orders</h2>
        <p>You haven't placed any orders yet.</p>
        <Link to="/products" className="btn primary">
          Start Ordering
        </Link>
      </section>
    );
  }

  return (
    <section className="orders-page">
      <h2>Your Orders</h2>

      <div className="orders-list">
        {orders.map((order) => (
          <div key={order._id} className="order-card">
            <div className="order-header">
              <span className="order-id">Order #{order._id}</span>
              <span className="order-date">
                {new Date(order.createdAt).toLocaleString()}
              </span>
            </div>

            <ul className="order-items">
              {order.items.map((item, i) => (
                <li key={i}>
                  {item.name} × {item.qty} — ₹{item.price * item.qty}
                </li>
              ))}
            </ul>

            <div className="order-footer">Total: ₹{order.totalAmount}</div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Orders;
