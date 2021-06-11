import React, { createContext, useContext, useEffect } from 'react';

import { AuthStore } from '../Store/AuthStore';
import { observer } from 'mobx-react-lite';
import { useMeQuery } from '../GQL/GraphqlOperations';

const AuthContext = createContext<typeof AuthStore>(AuthStore);

export const useAuthContext = () => useContext(AuthContext);

export const AuthContextProvider: React.FC = observer(({ children }) => {
  const { data: UserData, refetch } = useMeQuery();

  useEffect(() => {
    AuthStore.setUser(UserData?.me || null, refetch);
  }, [refetch, UserData?.me]);

  useEffect(() => {
    return () => {
      AuthStore.disposeAutorun();
    };
  });
  return (
    <AuthContext.Provider value={AuthStore}>{children}</AuthContext.Provider>
  );
});
