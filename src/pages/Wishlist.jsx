import { useWishlist } from "../context/WishlistContext";
import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { useToast } from "../context/ToastContext";

function Wishlist() {
  const { wishlistItems, removeFromWishlist } = useWishlist();
  const { dispatch } = useCart();
  const { showToast } = useToast();

  const handleMoveToCart = (item) => {
    dispatch({ type: "ADD_TO_CART", payload: item });
    removeFromWishlist(item.id);
    showToast("Moved to cart", "success");
  };

  if (wishlistItems.length === 0) {
    return (
        <section className="wishlist-page">
    <div className="empty-state">
      <h2>Your Wishlist</h2>
      <p>No items yet. Start exploring!</p>
      <Link to="/products" className="btn primary">
        Browse Products
      </Link>
    </div>
  </section>
    );
  }

  return (
    <section className="wishlist-page">
      <h2>Your Wishlist</h2>
      <div className="product-grid">
        {wishlistItems.map((item) => (
          <div key={item.id} className="product-card">
            <div className="product-image-wrapper">
              <img src={item.image} alt={item.name} className="product-image" />
            </div>
            <div className="product-body">
              <h3 className="product-title">{item.name}</h3>
              <p className="product-category">{item.category}</p>
              <p className="product-price">₹{item.price}</p>
              <div style={{ display: "flex", gap: "0.5rem" }}>
                <button
                  className="btn secondary"
                  onClick={() => removeFromWishlist(item.id)}
                >
                  Remove
                </button>
                <button
                  className="btn primary"
                  onClick={() => handleMoveToCart(item)}
                >
                  Move to Cart
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Wishlist;
