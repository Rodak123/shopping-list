import React, { createContext, useContext, useState } from 'react';

const ApiContext = createContext();

export const ApiProvider = ({ children }) => {
  const [api, setApi] = useState(null);

  const isApiInitialized = () => {
    return api !== null;
  };

  return (
    <ApiContext.Provider value={{ api, setApi, isApiInitialized }}>{children}</ApiContext.Provider>
  );
};

export const useApi = () => {
  return useContext(ApiContext);
};
