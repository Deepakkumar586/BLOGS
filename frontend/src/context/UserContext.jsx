import { createContext, useEffect, useState } from "react";
import axios from "axios";

export const UserContext = createContext({});

export function UserContextProvider({ children }) {
  const [user, setUser] = useState(null);

  const getUser = async () => {
    try {
      const res = await axios.get("https://blogs-4v8d.onrender.com/api/auth/refetch", {
        withCredentials: true,
      });

      // Check if res.data is not null or undefined before accessing its properties
      if (res.data) {
        setUser(res.data);
      }
    } catch (err) {
      console.error(err);
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
