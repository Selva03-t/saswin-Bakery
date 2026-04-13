import { createContext, useContext, useEffect, useReducer } from "react";
import cartReducer, { cartInitialState } from "./CartReducer";

const CartContext = createContext();

export function CartProvider({ children }) {
  const [state, dispatch] = useReducer(
    cartReducer,
    cartInitialState,
    (initial) => {
      const saved = localStorage.getItem("bakery_cart");
      return saved ? JSON.parse(saved) : initial;
    }
  );

  useEffect(() => {
    localStorage.setItem("bakery_cart", JSON.stringify(state));
  }, [state]);

  const cartTotalItems = state.items.reduce((sum, item) => sum + item.qty, 0);
  const cartTotalPrice = state.items.reduce(
    (sum, item) => sum + item.qty * item.price,
    0
  );

  const value = {
    cart: state,
    dispatch,
    cartTotalItems,
    cartTotalPrice,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  return useContext(CartContext);
}
