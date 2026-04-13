import CartItem from "../components/CartItem";
import { useCart } from "../context/CartContext";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import axios from "axios";

function Cart() {
  const { cart, cartTotalItems, cartTotalPrice, dispatch } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();

  const handleClear = () => {
    dispatch({ type: "CLEAR_CART" });
  };

  const handleCheckout = async () => {
    if (!user) {
      navigate("/login");
      return;
    }

    try {
      await axios.post("http://localhost:5000/api/orders", {
        items: cart.items,
        totalAmount: cartTotalPrice,
        userEmail: user.email,
      });

      dispatch({ type: "CLEAR_CART" });
      navigate("/orders");
    } catch (error) {
      console.log("Order error:", error);
      alert("Failed to place order");
    }
  };

  if (cart.items.length === 0) {
    return (
      <section className="cart-page">
        <div className="empty-state">
          <h2>Your Cart is Empty</h2>
          <p>Add items to your cart and shop your favorites!</p>
          <Link to="/products" className="btn primary">
            Shop Now
          </Link>
        </div>
      </section>
    );
  }

  return (
    <section className="cart-page">
      <h2>Your Cart</h2>
      <p>Total items: {cartTotalItems}</p>

      <div className="cart-list">
        {cart.items.map((item) => (
          <CartItem key={item.id} item={item} />
        ))}
      </div>

      <div className="cart-summary">
        <h3>Order Summary</h3>
        <p>Total: ₹{cartTotalPrice}</p>

        {!user && (
          <p className="cart-note">
            Please <Link to="/login">login</Link> to place your order.
          </p>
        )}

        <button className="btn secondary" onClick={handleClear}>
          Clear Cart
        </button>

        <button className="btn primary" onClick={handleCheckout}>
          Place Order
        </button>
      </div>
    </section>
  );
}

export default Cart;
