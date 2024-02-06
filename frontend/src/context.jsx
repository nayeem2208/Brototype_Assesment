import React, { createContext, useContext, useState } from "react";

const GlobalContext = createContext();

const GlobalProvider = ({ children }) => {
  const [refresh, setRefresh] = useState(true);

  return (
    <GlobalContext.Provider
      value={{
        refresh,
        setRefresh
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export const refreshContext = () => {
  return useContext(GlobalContext);
};

export default GlobalProvider;