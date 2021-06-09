import React, { createContext, useContext, useEffect } from 'react';

import { AuthStore } from '../Store/AuthStore';
import { observer } from 'mobx-react-lite';
import { useMeQuery } from '../GQL/GraphqlOperations';

const AuthContext = createContext<typeof AuthStore>(AuthStore);

export const useAuthContext = () => useContext(AuthContext);

export const AuthContextProvider: React.FC = observer(({ children }) => {
  const { setUser, token } = useAuthContext();
  const { data: UserData, refetch } = useMeQuery();

  useEffect(() => {
    if (UserData?.me || token) {
      setUser(UserData?.me || null, refetch);
    }
  }, [setUser, refetch, UserData, token]);
  useEffect(() => {
    return () => {
      AuthStore.disposeAutorun();
    };
  });
  return (
    <AuthContext.Provider value={AuthStore}>{children}</AuthContext.Provider>
  );
});
