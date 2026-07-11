import { createContext, useContext, useReducer, useEffect } from "react";
import productReducer, { productInitialState } from "./productReducer";
import { normalizeProduct } from "../utils/productData";
import { apiUrl } from "../utils/api";

const ProductContext = createContext();

export const ProductProvider = ({ children }) => {
  const [state, dispatch] = useReducer(productReducer, productInitialState);

  useEffect(() => {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 1500);

    async function loadData() {
      try {
        dispatch({ type: "SET_REFRESHING", payload: true });

        const res = await fetch(apiUrl("/api/products"), {
          signal: controller.signal,
        });
        const data = await res.json();

        if (Array.isArray(data) && data.length > 0) {
          dispatch({
            type: "SET_PRODUCTS",
            payload: data.map((product, index) => normalizeProduct(product, index)),
          });
        } else {
          dispatch({ type: "SET_REFRESHING", payload: false });
        }
      } catch (err) {
        if (err.name !== "AbortError") {
          console.error("Error loading products:", err);
        }
        dispatch({ type: "SET_REFRESHING", payload: false });
      }
    }

    loadData();

    return () => {
      clearTimeout(timeout);
      controller.abort();
    };
  }, []);

  const addProduct = (product) => {
    dispatch({
      type: "ADD_PRODUCT",
      payload: normalizeProduct(product, state.products.length),
    });
  };

  const updateProduct = (id, data) => {
    dispatch({ type: "UPDATE_PRODUCT", payload: { id, data } });
  };

  const deleteProduct = (id) => {
    dispatch({ type: "DELETE_PRODUCT", payload: id });
  };

  return (
    <ProductContext.Provider
      value={{
        products: state.products,
        isRefreshing: state.isRefreshing,
        addProduct,
        updateProduct,
        deleteProduct,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
};

export const useProducts = () => useContext(ProductContext);
