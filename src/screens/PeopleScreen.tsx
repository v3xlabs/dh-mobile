import Header from '../components/Header';
import React from 'react';
import { ScrollView } from 'react-native-gesture-handler';
import { Text } from 'react-native';
import { useRoute } from '@react-navigation/core';

interface PeopleScreenProps {}
const PeopleScreen: React.FC<PeopleScreenProps> = () => {
  const route = useRoute();
  return (
    <>
      <Header title={route.name} subtitle="has a subtitle" />
      <ScrollView>
        <Text>PeopleScreen</Text>
      </ScrollView>
    </>
  );
};
export default PeopleScreen;
// const styles = StyleSheet.create({})
