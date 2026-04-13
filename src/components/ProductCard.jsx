import { useCart } from "../context/CartContext";
import { Link } from "react-router-dom";
import { useWishlist } from "../context/WishlistContext";
import { useToast } from "../context/ToastContext";
import { motion, AnimatePresence } from "framer-motion";
import { Heart, Plus, ShoppingCart } from "lucide-react";

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
    <motion.div 
      className="product-card"
      whileHover={{ y: -8, boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)' }}
      transition={{ duration: 0.3 }}
      style={{ position: 'relative' }}
    >
      <motion.button
        className={`wishlist-btn`}
        onClick={handleToggleWishlist}
        type="button"
        whileTap={{ scale: 0.8 }}
        style={{
          color: inWishlist ? '#E03131' : '#9CA3AF',
          background: 'rgba(255, 255, 255, 0.9)',
          boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
        }}
      >
        <Heart size={16} fill={inWishlist ? '#E03131' : 'none'} />
      </motion.button>

      <Link to={`/products/${item._id}`}>
        <div className="product-image-wrapper">
          <motion.img
            src={item.image}
            alt={item.title}
            className="product-image"
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.4 }}
          />
        </div>
      </Link>

      <div className="product-body">
        <Link to={`/products/${item._id}`} className="product-title-link">
          <h3 className="product-title">{item.title}</h3>
        </Link>

        <p className="product-category" style={{ fontSize: '0.85rem', color: '#6B7280' }}>{item.category}</p>
        
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '0.8rem' }}>
          <p className="product-price" style={{ color: '#E03131', fontSize: '1.2rem' }}>₹{item.price}</p>
          
          <motion.button 
            className="btn primary btn-small" 
            onClick={handleAddToCart}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            style={{ borderRadius: '50%', padding: '0.6rem', width: '38px', height: '38px' }}
            title="Add to Cart"
          >
            <Plus size={18} strokeWidth={3} />
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
}

export default ProductCard;
