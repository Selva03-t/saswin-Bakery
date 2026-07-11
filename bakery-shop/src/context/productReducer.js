import { localProducts } from "../utils/productData";

export const productInitialState = {
  products: localProducts,
  isRefreshing: false,
};

function productReducer(state, action) {
  switch (action.type) {
    case "SET_PRODUCTS":
      return {
        ...state,
        products: action.payload,
        isRefreshing: false,
      };

    case "SET_REFRESHING":
      return {
        ...state,
        isRefreshing: action.payload,
      };

    case "ADD_PRODUCT":
      return {
        ...state,
        products: [...state.products, action.payload],
      };

    case "UPDATE_PRODUCT": {
      const { id, data } = action.payload;
      return {
        ...state,
        products: state.products.map((product) =>
          product._id === id ? { ...product, ...data } : product
        ),
      };
    }

    case "DELETE_PRODUCT":
      return {
        ...state,
        products: state.products.filter((product) => product._id !== action.payload),
      };

    default:
      return state;
  }
}

export default productReducer;
