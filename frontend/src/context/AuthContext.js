// src/context/AuthContext.js
import React, { createContext, useState } from "react";

// Create the context
export const AuthContext = createContext();

// Create the provider component
export const AuthContextProvider = ({ children }) => {
  const [signupState, setSignupState] = useState("P1"); // P1: User not registered
  const [loginState, setLoginState] = useState("P4"); // P4: User not logged in
  const [userId, setUserId] = useState(null); // Add userId state
  const [isAuthenticated, setIsAuthenticated] = useState(false); // Track authentication state

  // Provide the context value
  const value = {
    signupState,
    setSignupState,
    loginState,
    setLoginState,
    userId,
    setUserId,
    isAuthenticated,
    setIsAuthenticated,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};