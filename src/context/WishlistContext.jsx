import { createContext, useContext, useEffect, useReducer } from "react";
import wishlistReducer, { wishlistInitialState } from "./wishlistReducer";

const WishlistContext = createContext();

export function WishlistProvider({ children }) {
  const [state, dispatch] = useReducer(
    wishlistReducer,
    wishlistInitialState,
    (initial) => {
      const saved = localStorage.getItem("wishlist");
      if (saved) return { items: JSON.parse(saved) };
      return initial;
    }
  );

  useEffect(() => {
    localStorage.setItem("wishlist", JSON.stringify(state.items));
  }, [state.items]);

  const toggleWishlist = (product) => {
    dispatch({ type: "TOGGLE_WISHLIST", payload: product });
  };

  const removeFromWishlist = (id) => {
    dispatch({ type: "REMOVE_FROM_WISHLIST", payload: id });
  };

  const value = {
    wishlistItems: state.items,
    toggleWishlist,
    removeFromWishlist,
  };

  return (
    <WishlistContext.Provider value={value}>
      {children}
    </WishlistContext.Provider>
  );
}

export function useWishlist() {
  return useContext(WishlistContext);
}
