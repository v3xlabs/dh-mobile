import { Button, Text } from 'react-native-paper';
import { ScrollView, View } from 'react-native';

import Header from '../../components/Header';
import React from 'react';
import { observer } from 'mobx-react-lite';
import { theme } from '../../Constants/Colors';
import { useAuthContext } from '../../Contexts/AuthContext';
import { useRoute } from '@react-navigation/native';
import { useRoomsContext } from '../../Contexts/RoomsContext';

interface HomeScreenProps {}
const HomeScreen: React.FC<HomeScreenProps> = ({}) => {
  const route = useRoute();
  const { logout, getUser } = useAuthContext();
  const { Rooms } = useRoomsContext();

  return (
    <>
      <Header title={route.name} />
      <View style={{ flex: 1, backgroundColor: theme.palette.primary[800] }}>
        <ScrollView>
          <Text>HomeScreen</Text>
          <Text>Powered by Luc</Text>
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
              onPress={() => {
                getUser();
              }}
            >
              Refetch
            </Button>
            <Text>{JSON.stringify(Rooms, null, 2)}</Text>
          </View>
        </ScrollView>
      </View>
    </>
  );
};
export default observer(HomeScreen);
