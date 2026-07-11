export const cartInitialState = {
  items: [],
};

const getItemId = (item) => item._id || item.id;

const normalizeCartItem = (item) => ({
  _id: getItemId(item),
  title: item.title || item.name || "Bakery item",
  price: Number(item.price) || 0,
  image: item.image,
  category: item.category,
});

export default function cartReducer(state, action) {
  switch (action.type) {
    case "ADD_TO_CART": {
      const cartItem = normalizeCartItem(action.payload);
      const existing = state.items.find((item) => getItemId(item) === cartItem._id);

      if (existing) {
        return {
          ...state,
          items: state.items.map((item) =>
            getItemId(item) === cartItem._id ? { ...item, qty: item.qty + 1 } : item
          ),
        };
      }

      return {
        ...state,
        items: [...state.items, { ...cartItem, qty: 1 }],
      };
    }

    case "REMOVE_FROM_CART":
      return {
        ...state,
        items: state.items.filter((item) => getItemId(item) !== action.payload),
      };

    case "UPDATE_QTY": {
      const { id, qty } = action.payload;

      if (qty <= 0) {
        return {
          ...state,
          items: state.items.filter((item) => getItemId(item) !== id),
        };
      }

      return {
        ...state,
        items: state.items.map((item) =>
          getItemId(item) === id ? { ...item, qty } : item
        ),
      };
    }

    case "CLEAR_CART":
      return cartInitialState;

    default:
      return state;
  }
}
