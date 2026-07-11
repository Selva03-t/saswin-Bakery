export const wishlistInitialState = {
  items: [], // array of product objects
};

export default function wishlistReducer(state, action) {
  switch (action.type) {
    case "TOGGLE_WISHLIST": {
      const exists = state.items.find((i) => i.id === action.payload.id);
      if (exists) {
        return {
          ...state,
          items: state.items.filter((i) => i.id !== action.payload.id),
        };
      }
      return { ...state, items: [action.payload, ...state.items] };
    }

    case "REMOVE_FROM_WISHLIST":
      return {
        ...state,
        items: state.items.filter((i) => i.id !== action.payload),
      };

    default:
      return state;
  }
}
