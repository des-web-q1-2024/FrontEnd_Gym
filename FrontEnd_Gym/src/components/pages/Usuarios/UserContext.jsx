// UserContext.js
import React, { createContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useIdleTimer from "./useIdleTimer";

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [userLogin, setUserLogin] = useState(() => {
    const savedUser = localStorage.getItem("userLogin");
    return savedUser ? JSON.parse(savedUser) : null;
  });

  const navigate = useNavigate();

  const handleIdle = () => {
    setUserLogin(null);
    localStorage.removeItem("userLogin");
    navigate("/");
  };

  useIdleTimer(handleIdle, 600000); // 10 minutes

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
