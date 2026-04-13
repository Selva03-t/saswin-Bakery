import { createContext, useContext, useState } from "react";
import axios from "axios";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem("user")) || null
  );

  //  REGISTER USER (Backend)
  const registerUser = async (name, email, password) => {
    try {
     axios.post("http://localhost:5000/api/auth/register",
  { name, email, password },
  { withCredentials: true }
);


      return { success: true, message: res.data.message };
    } catch (error) {
      return {
        success: false,
        message: error.response?.data?.error || "Registration failed",
      };
    }
  };

  //  LOGIN USER (Backend)
const loginUser = async (email, password) => {
  try {
    const res = await axios.post(
      "http://localhost:5000/api/auth/login",
      { email, password },
      { withCredentials: true }   
    );

    setUser(res.data.user);
    localStorage.setItem("user", JSON.stringify(res.data.user));

    return { success: true };
  } catch (error) {
    return {
      success: false,
      message: error.response?.data?.error || "Login failed",
    };
  }
};


  // LOGOUT
  const logoutUser = () => {
    setUser(null);
    localStorage.removeItem("user");
  };

  return (
    <AuthContext.Provider
      value={{ user, loginUser, registerUser, logoutUser }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
