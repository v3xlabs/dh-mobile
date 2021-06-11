import { Button, Text } from 'react-native-paper';
import { ScrollView, View } from 'react-native';

import Header from '../../components/Header';
import React from 'react';
import { observer } from 'mobx-react-lite';
import { theme } from '../../Constants/Colors';
import { useAuthContext } from '../../Contexts/AuthContext';
import { useRoute } from '@react-navigation/native';

interface HomeScreenProps {}
const HomeScreen: React.FC<HomeScreenProps> = ({}) => {
  const route = useRoute();
  const { token, logout, Me, refetchUser } = useAuthContext();
  return (
    <>
      <Header title={route.name} />
      <View style={{ flex: 1, backgroundColor: theme.palette.primary[800] }}>
        <ScrollView>
          <Text>HomeScreen</Text>
          <Text>`token: {token}`</Text>
          <View style={{ justifyContent: 'center', alignItems: 'center' }}>
            <Button
              mode="contained"
              labelStyle={{ color: theme.palette.primary[100] }}
              color={theme.palette.accent.default}
              onPress={async () => {
                await logout();
              }}
            >
              Logout
            </Button>
            <Button
              mode="contained"
              labelStyle={{ color: theme.palette.primary[100] }}
              color={theme.palette.accent.default}
              onPress={async () => {
                await refetchUser();
              }}
            >
              Refetch
            </Button>
            <Text>{JSON.stringify(Me, null, 2)}</Text>
          </View>
        </ScrollView>
      </View>
    </>
  );
};
export default observer(HomeScreen);
