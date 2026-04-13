import { useCart } from "../context/CartContext";

function CartItem({ item }) {
  const { dispatch } = useCart();

  const handleQtyChange = (e) => {
    const qty = Number(e.target.value);
    dispatch({ type: "UPDATE_QTY", payload: { id: item.id, qty } });
  };

  const handleRemove = () => {
    dispatch({ type: "REMOVE_FROM_CART", payload: item.id });
  };

  return (
    <div className="cart-item">
      <div className="cart-item-info">
        <h4>{item.name}</h4>
        <p>₹{item.price} each</p>
      </div>
      <div className="cart-item-actions">
        <input
          type="number"
          min="1"
          value={item.qty}
          onChange={handleQtyChange}
          className="qty-input"
        />
        <p className="cart-item-subtotal">₹{item.price * item.qty}</p>
        <button className="btn danger btn-small" onClick={handleRemove}>
          ✕
        </button>
      </div>
    </div>
  );
}

export default CartItem;
