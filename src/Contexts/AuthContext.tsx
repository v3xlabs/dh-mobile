import React, { createContext, useContext, useEffect } from 'react';

import AsyncStorage from '@react-native-async-storage/async-storage';
import { AuthStore } from '../Store/AuthStore';
import { Linking } from 'react-native';
import { observer } from 'mobx-react-lite';
import { useMeLazyQuery } from '../GQL/GraphqlOperations';

const AuthContext = createContext<typeof AuthStore>(AuthStore);

export const useAuthContext = () => useContext(AuthContext);

export const AuthContextProvider: React.FC = observer(({ children }) => {
  // const {
  //   data: UserData,
  //   refetch,
  //   loading,
  // } = useMeQuery({ fetchPolicy: 'cache-and-network' });
  const [getUser, { data: UserData, loading }] = useMeLazyQuery({
    fetchPolicy: 'no-cache',
  });
  useEffect(() => {
    AuthStore.setUser(UserData?.me || null, getUser);
  }, [UserData?.me, getUser]);

  useEffect(() => {
    Linking.addEventListener('url', onReceiveURL);
    return () => {
      Linking.removeEventListener('url', onReceiveURL);
    };
  });

  const onReceiveURL = async ({ url }: { url: string }) => {
    const token = url.split('token=')[1];
    if (token) {
      await AsyncStorage.setItem('@token', token);
      AuthStore.setToken(token);
      getUser();
    }
  };

  useEffect(() => {
    return () => {
      AuthStore.disposeAutorun();
    };
  });
  return (
    <AuthContext.Provider value={AuthStore}>
      {loading ? null : children}
    </AuthContext.Provider>
  );
});
