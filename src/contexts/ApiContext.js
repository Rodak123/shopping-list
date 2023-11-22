import React, { createContext, useContext, useEffect, useState } from 'react';

const ApiContext = createContext();

export const ApiProvider = ({ children }) => {
  const [api, setApi] = useState(null);

  useEffect(() => {
    if (api === null) {
      const id = 1;
      const api = {
        url: 'http://localhost:3100',
        id: id,
      };
      setApi(api);
    }
  }, [api]);

  return <ApiContext.Provider value={{ api }}>{children}</ApiContext.Provider>;
};

export const useApi = () => {
  return useContext(ApiContext);
};
