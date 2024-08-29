// src/contexts/DataContext.js

import React, { createContext, useState, useContext } from 'react';

// Create the context
const MarketplaceContext = createContext();

// Create a provider component
export const MarketplaceProvider = ({ children }) => {
  const [list, setList] = useState();
  
  return (
    <MarketplaceContext.Provider value={{ list, setList}}>
      {children}
    </MarketplaceContext.Provider>
  );
};

// Custom hook to use the DataContext
export const useMarketData = () => useContext(MarketplaceContext);
