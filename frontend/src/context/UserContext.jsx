import { createContext, useEffect, useState } from "react";
import axios from "axios";

export const UserContext = createContext({});

export function UserContextProvider({ children }) {
  const [user, setUser] = useState(null);

  const getUser = async () => {
    try {
      const res = await axios.get("https://blogs-19nw.onrender.com/api/auth/refetch", {
        withCredentials: true, // ensures the cookie is sent
      });

      // Check if res.data is not null or undefined before accessing its properties
      if (res.data) {
        // console.log("User data received:", res.data);
        setUser(res.data);
      }
    } catch (err) {
      console.error("Error fetching user:", err.response?.data || err.message);
    }
  };

  useEffect(() => {
    getUser();
  }, []);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
}
