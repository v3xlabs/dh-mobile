import React, { createContext, useContext, useEffect } from 'react';

import { AuthStore } from '../Store/AuthStore';

const AuthContext = createContext<typeof AuthStore>(AuthStore);

export const useAuthContext = () => useContext(AuthContext);

export const AuthContextProvider: React.FC = ({ children }) => {
  useEffect(() => {
    return () => {
      AuthStore.disposeAutorun();
    };
  }, []);
  return (
    <AuthContext.Provider value={AuthStore}>{children}</AuthContext.Provider>
  );
};
