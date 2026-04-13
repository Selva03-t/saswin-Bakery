export const cartInitialState = {
  items: [], // {id, name, price, image, qty}
};

export default function cartReducer(state, action) {
  switch (action.type) {
    case "ADD_TO_CART": {
      const existing = state.items.find((i) => i.id === action.payload.id);
      if (existing) {
        return {
          ...state,
          items: state.items.map((i) =>
            i.id === action.payload.id ? { ...i, qty: i.qty + 1 } : i
          ),
        };
      }
      return {
        ...state,
        items: [...state.items, { ...action.payload, qty: 1 }],
      };
    }

    case "REMOVE_FROM_CART": {
      return {
        ...state,
        items: state.items.filter((i) => i.id !== action.payload),
      };
    }

    case "UPDATE_QTY": {
      const { id, qty } = action.payload;
      if (qty <= 0) {
        return {
          ...state,
          items: state.items.filter((i) => i.id !== id),
        };
      }
      return {
        ...state,
        items: state.items.map((i) =>
          i.id === id ? { ...i, qty } : i
        ),
      };
    }

    case "CLEAR_CART":
      return cartInitialState;

    default:
      return state;
  }
}
