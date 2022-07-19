import React, { useState, useMemo } from "react";

// create context
export const LoginContext = React.createContext();

export const LoginProvider = ({ children }) => {
  const initialToken = localStorage.getItem("token");
  const [token, setToken] = useState(initialToken);
  const [isLoggedIn, setLoggedIn] = useState(!!token);

  function logIn() {
    setLoggedIn(true);
  }
  function logOut() {
    setLoggedIn(false);
  }

  const value = useMemo(
    () => ({
      isLoggedIn,
      logIn,
      logOut,
    }),
    [isLoggedIn]
  );

  return (
    <LoginContext.Provider value={value}>{children}</LoginContext.Provider>
  );
};
