import React, { createContext, useState, useContext } from 'react';

// Create the context
const userContext = createContext();

// Create a provider component
export const UserProvider = ({ children }) => {
  const [data, setData] = useState(null);
  
  const getUserDetail = () => {
    return data;
  }
    
  return (
    <userContext.Provider value={{ data, setData, getUserDetail }}>
      {children}
    </userContext.Provider>
  );
};

// Custom hook to use the UserContext
export const useUserContext = () => useContext(userContext);
