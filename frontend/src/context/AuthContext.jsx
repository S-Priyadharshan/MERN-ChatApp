/* eslint-disable*/

// import { createContext, useContext, useState } from "react";

// export const AuthContext = createContext();

// export const useAuthContext = () => {
// 	return useContext(AuthContext);
// };

// export const AuthContextProvider = ({ children }) => {
// 	const [authUser, setAuthUser] = useState(JSON.parse(localStorage.getItem("chat-user")) || null);

// 	return <AuthContext.Provider value={{ authUser, setAuthUser }}>{children}</AuthContext.Provider>;
// };

import React, { createContext, useContext, useState, useEffect } from 'react';

export const AuthContext = createContext();

export const useAuthContext = () => {
  return useContext(AuthContext);
};

export const AuthContextProvider = ({ children }) => {
  const [authUser, setAuthUser] = useState(null);

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("chat-user"));

    if (storedUser) {
      // Check if the user is an Axios response object and extract the data if necessary
      if (storedUser.data) {
        setAuthUser(storedUser.data); // Extract data from the Axios response
      } else {
        setAuthUser(storedUser); // Use the stored data directly if already correct
      }
    } else {
      // Handle the case when no user is available
      setAuthUser(null);
    }
  }, []);

  return <AuthContext.Provider value={{ authUser, setAuthUser }}>{children}</AuthContext.Provider>;
};
