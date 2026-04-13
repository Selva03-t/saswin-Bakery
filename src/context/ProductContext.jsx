import { createContext, useContext, useReducer, useEffect } from "react";
import productReducer from "./productReducer";
import { productInitialState } from "./productReducer";

import blackForest from "../assets/products/black-forestcake.jpg";
import blueberryCheese from "../assets/products/blueberry-cheesecake.jpg";
import brownie from "../assets/products/brownie.jpg";
import butterScotch from "../assets/products/butter-scotch.jpg";
import chocoLava from "../assets/products/choco-lava.jpg";
import chocolateMuffin from "../assets/products/chocolate-muffin.jpg";
import choctuffle from "../assets/products/chocolate-tuffle.jpg";
import creamRoll from "../assets/products/cream-roll.jpg";
import doughnut from "../assets/products/doughnur.jpg";
import frenchCroissant from "../assets/products/french-croisant.jpg";
import garlicBread from "../assets/products/garlic-bread.jpg";
import lemonTart from "../assets/products/lemon-tart.jpg";
import marble from "../assets/products/marble.jpg";
import paneerBun from "../assets/products/paneer-bun.jpg";
import puffPastry from "../assets/products/puff-pastry.jpg";
import redvalvet from "../assets/products/red-valvet.jpg";
import strawberryCup from "../assets/products/strawberry-cup.jpg";
import tiramisu from "../assets/products/tiramisu.jpg";
import vanillaCupcake from "../assets/products/vanilla-cupcake.jpg";
import wheatBread from "../assets/products/wheat-bread.jpg";

const ProductContext = createContext();

export const ProductProvider = ({ children }) => {
  const [state, dispatch] = useReducer(productReducer, productInitialState);

  // 🔥 Fetch products from backend
  useEffect(() => {
    async function loadData() {
      const fallbackProducts = [
        { _id: 1, title: 'Black Forest Cake', image: blackForest, category: 'Cakes', price: 549 },
        { _id: 2, title: 'Blueberry Cheesecake', image: blueberryCheese, category: 'Cakes', price: 699 },
        { _id: 3, title: 'Chocolate Brownie', image: brownie, category: 'Cakes', price: 199 },
        { _id: 4, title: 'Butter Scotch Cake', image: butterScotch, category: 'Cakes', price: 599 },
        { _id: 5, title: 'Choco Lava Cake', image: chocoLava, category: 'Cakes', price: 149 },
        { _id: 6, title: 'Chocolate Muffin', image: chocolateMuffin, category: 'Cupcakes', price: 129 },
        { _id: 7, title: 'Chocolate Truffle', image: choctuffle, category: 'Cakes', price: 499 },
        { _id: 8, title: 'Cream Roll', image: creamRoll, category: 'Bread', price: 49 },
        { _id: 9, title: 'Doughnut', image: doughnut, category: 'Cakes', price: 89 },
        { _id: 10, title: 'French Croissant', image: frenchCroissant, category: 'Bread', price: 119 },
        { _id: 11, title: 'Garlic Bread', image: garlicBread, category: 'Bread', price: 149 },
        { _id: 12, title: 'Lemon Tart', image: lemonTart, category: 'Cupcakes', price: 159 },
        { _id: 13, title: 'Marble Cake', image: marble, category: 'Cakes', price: 449 },
        { _id: 14, title: 'Paneer Bun', image: paneerBun, category: 'Bread', price: 69 },
        { _id: 15, title: 'Puff Pastry', image: puffPastry, category: 'Bread', price: 59 },
        { _id: 16, title: 'Red Velvet Cake', image: redvalvet, category: 'Cakes', price: 599 },
        { _id: 17, title: 'Strawberry Cupcake', image: strawberryCup, category: 'Cupcakes', price: 139 },
        { _id: 18, title: 'Tiramisu', image: tiramisu, category: 'Cakes', price: 799 },
        { _id: 19, title: 'Vanilla Cupcake', image: vanillaCupcake, category: 'Cupcakes', price: 99 },
        { _id: 20, title: 'Wheat Bread', image: wheatBread, category: 'Bread', price: 89 },
      ];

      try {
        const res = await fetch("http://localhost:5000/api/products");
        const data = await res.json();

        if (Array.isArray(data) && data.length > 0) {
          dispatch({ type: "SET_PRODUCTS", payload: data });
        } else {
          dispatch({ type: "SET_PRODUCTS", payload: fallbackProducts });
        }
      } catch (err) {
        console.error("Error loading products:", err);
        dispatch({ type: "SET_PRODUCTS", payload: fallbackProducts });
      }
    }

    loadData();
  }, []);

  const addProduct = (product) => {
    dispatch({ type: "ADD_PRODUCT", payload: product });
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
