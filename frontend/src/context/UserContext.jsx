import { createContext, useEffect, useState } from "react";
import axios from "axios";

export const UserContext = createContext({});

export function UserContextProvider({ children }) {
  const [user, setUser] = useState(null);
  console.log(user?._id);

  const getUser = async () => {
    try {
      const res = await axios.get('http://localhost:8000/api/auth/refetch', { withCredentials: true });
      
      // Check if res.data is not null or undefined before accessing its properties
      if (res.data) {
        console.log(res.data?._id);
        setUser(res.data);
      }
    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    getUser();
  }, []);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
}
