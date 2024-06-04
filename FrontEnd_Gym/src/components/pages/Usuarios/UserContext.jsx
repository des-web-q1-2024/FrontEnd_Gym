// UserContext.js
import React, { createContext, useState, useEffect } from "react";

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [userLogin, setUserLogin] = useState(() => {
    const savedUser = localStorage.getItem("userLogin");
    return savedUser ? JSON.parse(savedUser) : null;
  });

  useEffect(() => {
    if (userLogin) {
      localStorage.setItem("userLogin", JSON.stringify(userLogin));
    } else {
      localStorage.removeItem("userLogin");
    }
  }, [userLogin]);

  return (
    <UserContext.Provider value={{ userLogin, setUserLogin }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserContext;
