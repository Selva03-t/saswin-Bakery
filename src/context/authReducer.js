export default function authReducer(state, action) {
  switch (action.type) {
    case "LOGIN":
    case "REGISTER":
      return { ...state, user: action.payload };

    case "LOGOUT":
      return { ...state, user: null };

    default:
      return state;
  }
}
