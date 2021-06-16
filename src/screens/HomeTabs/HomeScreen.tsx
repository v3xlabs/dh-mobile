import { View } from 'react-native';

import Header from '../../components/Header';
import React from 'react';
import { observer } from 'mobx-react-lite';
import { theme } from '../../Constants/Colors';
import { useRoute } from '@react-navigation/native';
import { useRoomsContext } from '../../Contexts/RoomsContext';
import RoomsView from '../../components/RoomsView';

interface HomeScreenProps {}
const HomeScreen: React.FC<HomeScreenProps> = ({}) => {
  const route = useRoute();
  const { Rooms } = useRoomsContext();

  return (
    <>
      <Header title={route.name} />
      <View style={{ flex: 1, backgroundColor: theme.palette.primary[800] }}>
        <RoomsView Rooms={Rooms} />
      </View>
    </>
  );
};
export default observer(HomeScreen);
