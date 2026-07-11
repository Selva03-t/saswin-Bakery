import { useCart } from "../context/CartContext";
import { Link } from "react-router-dom";
import { useWishlist } from "../context/WishlistContext";
import { useToast } from "../context/ToastContext";
import { Heart, Plus } from "lucide-react";

function ProductCard({ item }) {
  const { dispatch } = useCart();
  const { wishlistItems, toggleWishlist } = useWishlist();
  const { showToast } = useToast();

  const inWishlist = wishlistItems.some((w) => w._id === item._id);

  const handleAddToCart = () => {
    dispatch({ type: "ADD_TO_CART", payload: item });
    showToast("Added to cart!", "success");
  };

  const handleToggleWishlist = () => {
    toggleWishlist(item);
    showToast(
      inWishlist ? "Removed from wishlist" : "Added to wishlist",
      "info"
    );
  };

  return (
    <article className="product-card">
      <button
        className="wishlist-btn"
        onClick={handleToggleWishlist}
        type="button"
        aria-label={inWishlist ? "Remove from wishlist" : "Add to wishlist"}
      >
        <Heart size={16} fill={inWishlist ? "#E03131" : "none"} />
      </button>

      <Link to={`/products/${item._id}`} aria-label={`View ${item.title}`}>
        <div className="product-image-wrapper">
          <img
            src={item.image}
            alt={item.title}
            className="product-image"
            loading="lazy"
            decoding="async"
          />
        </div>
      </Link>

      <div className="product-body">
        <Link to={`/products/${item._id}`} className="product-title-link">
          <h3 className="product-title">{item.title}</h3>
        </Link>

        <p className="product-category">{item.category}</p>

        <div className="product-card-footer">
          <p className="product-price">Rs. {item.price}</p>
          <button
            className="btn primary btn-small add-icon-btn"
            onClick={handleAddToCart}
            type="button"
            title="Add to Cart"
          >
            <Plus size={18} strokeWidth={3} />
          </button>
        </div>
      </div>
    </article>
  );
}

export default ProductCard;
