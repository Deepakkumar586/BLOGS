import { createContext, useEffect, useState } from "react";
import axios from "axios";

export const UserContext = createContext({});

export function UserContextProvider({ children }) {
  const [user, setUser] = useState(null);
  const getUser = async()=>{
    try{
      const res = await axios.get('http://localhost:8000/api/auth/refresh',{withCredentials:true})
      // console.log(res.data);
      setUser(res.data);
    }
    catch(err){
      console.log(err);
    }
  }
  useEffect(()=>{
    getUser();
  },[])

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
}
