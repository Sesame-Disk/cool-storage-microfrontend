import React, { useState } from "react";
import { VerifyToken } from "../components/auth/FetchData";

const AuthContext = React.createContext({
  token: "",
  isAuthenticated: false,
  user: {},
  login: (token) => {},
  logout: () => {},
  verifyToken: () => {},
});

export const AuthContextProvider = (props) => {
  const [token, setToken] = useState("");
  const [userIsLoggedIn, setUserIsLoggedIn] = useState(false);

  const loginHandler = (value, ttl) => {
    setToken(token);
    setUserIsLoggedIn(true);
    const now = new Date().getTime();
    const item = {
      value: value,
      expiry: now + ttl,
    };
    localStorage.setItem("cool-token", JSON.stringify(item));
  };

  const logoutHandler = () => {
    setToken("");
    setUserIsLoggedIn(false);
    localStorage.removeItem("cool-token");
  };

  const verifyTokenHandler = () => {
    setToken("");
    setUserIsLoggedIn(false);
    const itemStr = localStorage.getItem("cool-token");
    if (itemStr) {
      const item = JSON.parse(itemStr);
      const now = new Date();
      if (now.getTime() > item.expiry) {
        localStorage.removeItem("cool-token");
        return;
      }

      //todo: validacion del token
      setToken(item.value);
      setUserIsLoggedIn(true);

      // VerifyToken(item.value, (err) => {
      //   if (err) {
      //     localStorage.removeItem("cool-token");
      //     return;
      //   }
      //   setToken(item.value);
      //   setUserIsLoggedIn(true);
      // });
    }
  };

  const contextValue = {
    token: token,
    isAuthenticated: userIsLoggedIn,
    login: loginHandler,
    logout: logoutHandler,
    verifyToken: verifyTokenHandler,
  };

  return (
    <AuthContext.Provider value={contextValue}>
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
