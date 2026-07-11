import { useCart } from "../context/CartContext";

function CartItem({ item }) {
  const { dispatch } = useCart();
  const itemId = item._id || item.id;
  const itemTitle = item.title || item.name || "Bakery item";

  const handleQtyChange = (e) => {
    const qty = Number(e.target.value);
    dispatch({ type: "UPDATE_QTY", payload: { id: itemId, qty } });
  };

  const handleRemove = () => {
    dispatch({ type: "REMOVE_FROM_CART", payload: itemId });
  };

  return (
    <div className="cart-item">
      <div className="cart-item-info">
        <h4>{itemTitle}</h4>
        <p>Rs. {item.price} each</p>
      </div>
      <div className="cart-item-actions">
        <input
          type="number"
          min="1"
          value={item.qty}
          onChange={handleQtyChange}
          className="qty-input"
        />
        <p className="cart-item-subtotal">Rs. {item.price * item.qty}</p>
        <button className="btn danger btn-small" onClick={handleRemove} type="button">
          Remove
        </button>
      </div>
    </div>
  );
}

export default CartItem;
