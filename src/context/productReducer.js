export const productInitialState = {
  products: [],
};

function productReducer(state, action) {
  switch (action.type) {

    // 🔥 Set backend products
    case "SET_PRODUCTS":
      return {
        ...state,
        products: action.payload, // array of products from backend
      };

    // Add product (admin feature)
    case "ADD_PRODUCT":
      return {
        ...state,
        products: [...state.products, action.payload],
      };

    // Update product
    case "UPDATE_PRODUCT": {
      const { id, data } = action.payload;
      return {
        ...state,
        products: state.products.map((product) =>
          product._id === id ? { ...product, ...data } : product
        ),
      };
    }

    // Delete product
    case "DELETE_PRODUCT":
      return {
        ...state,
        products: state.products.filter(
          (product) => product._id !== action.payload
        ),
      };

    default:
      return state;
  }
}

export default productReducer;
