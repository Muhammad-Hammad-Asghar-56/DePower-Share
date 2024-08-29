import React, { createContext, useState, useContext } from 'react';
import  {UserRegistoryManager}  from "../Contracts/UserRegistorManager"
import {MarketplaceManager} from "../Contracts/MarketplaceManager.js";

// Create the context
const contractContext = createContext();

// Create a provider component
export const ContractProvider = ({ children }) => {
    const userRegistoryContractManager = new UserRegistoryManager();
    const MarketplaceContractManager = new MarketplaceManager();
   
  return (
    <contractContext.Provider value={{ userRegistoryContractManager,MarketplaceContractManager}}>
      {children}
    </contractContext.Provider>
  );
};

// Custom hook to use the UserContext
export const useContractContext = () => useContext(contractContext);
