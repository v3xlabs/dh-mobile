import {ScrollView, Text} from 'react-native';

import Header from '../components/Header';
import React from 'react';
import {useRoute} from '@react-navigation/native';

interface RoomsScreenProps {}
const RoomsScreen: React.FC<RoomsScreenProps> = () => {
  const route = useRoute();

  return (
    <>
      <Header title={route.name} canGoBack />
      <ScrollView>
        <Text>RoomsScreen</Text>
      </ScrollView>
    </>
  );
};
export default RoomsScreen;
// const styles = StyleSheet.create({})
