import { createContext, useEffect, useState } from "react";
import axios from "axios";

export const AuthContext = createContext();

export function AuthContextProvider({ children }) {
  const storedUser = localStorage.getItem("currentUser");
  const [currentUser, setCurrentUser] = useState(storedUser ? JSON.parse(storedUser) : null);

  const login = async (inputs) => {
    const res = await axios.post("http://localhost:8800/api/Login/login", inputs, {
      withCredentials: true,
    });
    setCurrentUser(res.data);
  };

  useEffect(() => {
    if (currentUser) {
      localStorage.setItem("currentUser", JSON.stringify(currentUser));
    } else {
      localStorage.removeItem("currentUser");
    }
  }, [currentUser]);

  return <AuthContext.Provider value={{ currentUser, login }}>{children}</AuthContext.Provider>;
}
