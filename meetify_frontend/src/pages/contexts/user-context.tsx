import { useState, createContext, useEffect } from "react";
import axios from "axios";

interface UserContextInterface {
  userData: any[];
  setUserData: any;
}
export const UserContext = createContext<UserContextInterface>({
  userData: [],
  setUserData: undefined,
});

export const UserProvider = ({ children }: any) => {
  const [userData, setUserData] = useState([]);
  const getUserData = () =>
    axios.get("http://localhost:8000/user").then((response: any) => {
      setUserData(response.data);
    });

  useEffect(() => {
    getUserData();
  }, []);

  return (
    <UserContext.Provider value={{ userData, setUserData }}>
      {children}
    </UserContext.Provider>
  );
};
