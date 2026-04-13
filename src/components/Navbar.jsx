import { Link, NavLink, useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ShoppingCart, Heart, User as UserIcon, LogOut, Cookie } from "lucide-react";

function Navbar() {
  const { cartTotalItems } = useCart();
  const { user, logoutUser } = useAuth();
  const navigate = useNavigate();
  const [bump, setBump] = useState(false);

  useEffect(() => {
    if (cartTotalItems === 0) return;
    setBump(true);
    const timer = setTimeout(() => setBump(false), 300);
    return () => clearTimeout(timer);
  }, [cartTotalItems]);

  const handleLogout = () => {
    logoutUser();
    navigate("/login");
  };

  return (
    <motion.nav 
      className="navbar"
      initial={{ y: -50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      <div className="nav-left">
        <Link to="/" className="brand" style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#E03131' }}>
          <Cookie size={28} />
          Saswin Bakery
        </Link>
      </div>

      <div className="nav-right">
        <NavLink to="/" className="nav-link">Home</NavLink>
        <NavLink to="/products" className="nav-link">Menu</NavLink>
        
        <NavLink to="/wishlist" className="nav-link" style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
          <Heart size={18} /> <span className="hide-mobile">Wishlist</span>
        </NavLink>

        {user && (
          <>
            <NavLink to="/orders" className="nav-link">Orders</NavLink>
            <NavLink to="/admin" className="nav-link">Admin</NavLink>
          </>
        )}

        <NavLink to="/cart" className={`nav-link cart-link`}>
          <motion.div
            animate={bump ? { scale: [1, 1.2, 1] } : {}}
            transition={{ duration: 0.3 }}
            style={{ display: 'flex', alignItems: 'center', gap: '4px' }}
          >
            <ShoppingCart size={20} />
            <AnimatePresence>
              {cartTotalItems > 0 && (
                <motion.span 
                  className="cart-badge"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  exit={{ scale: 0 }}
                >
                  {cartTotalItems}
                </motion.span>
              )}
            </AnimatePresence>
          </motion.div>
        </NavLink>

        {user ? (
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginLeft: '8px' }}>
            <span className="nav-user" style={{ display: 'flex', alignItems: 'center', gap: '4px', fontWeight: 500 }}>
               <UserIcon size={16} /> {user.name}
            </span>
            <button className="btn secondary btn-small" onClick={handleLogout} title="Logout">
              <LogOut size={16} />
            </button>
          </div>
        ) : (
          <div style={{ display: 'flex', gap: '8px', marginLeft: '8px' }}>
            <NavLink to="/login" className="btn secondary btn-small">Login</NavLink>
            <NavLink to="/register" className="btn primary btn-small">Register</NavLink>
          </div>
        )}
      </div>
    </motion.nav>
  );
}

export default Navbar;
