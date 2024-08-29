import React, { createContext, useState, useContext } from 'react';

// Create the context
const adsContext = createContext();

// Create a provider component
export const AdsProvider = ({ children }) => {
  const [data, setData] = useState(null);
  
     
  return (
    <adsContext.Provider value={{ data, setData }}>
      {children}
    </adsContext.Provider>
  );
};

// Custom hook to use the UserContext
export const useAdsContext = () => useContext(adsContext);
