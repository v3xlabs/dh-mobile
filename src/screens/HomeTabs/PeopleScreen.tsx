import Header from '../../components/Header';
import { PeopleTabNavigationProp } from '../../types/NavigationPropTypes';
import React from 'react';
import { ScrollView } from 'react-native-gesture-handler';
import { Text } from 'react-native-paper';
import { View } from 'react-native';
import { observer } from 'mobx-react-lite';
import { theme } from '../../Constants/Colors';
import { useAuthContext } from '../../Contexts/AuthContext';
import { useRoute } from '@react-navigation/core';

interface PeopleScreenProps {
  navigation: PeopleTabNavigationProp;
}
const PeopleScreen: React.FC<PeopleScreenProps> = ({ navigation }) => {
  const route = useRoute();
  const { token } = useAuthContext();
  return (
    <>
      <Header
        title={route.name}
        subtitle="has a subtitle"
        canGoBack
        onGoBack={() => navigation.navigate('Home')}
      />
      <View style={{ flex: 1, backgroundColor: theme.palette.primary[800] }}>
        <ScrollView>
          <Text>PeopleScreen</Text>
          <Text>`token: ${token}`</Text>
        </ScrollView>
      </View>
    </>
  );
};
export default observer(PeopleScreen);
// const styles = StyleSheet.create({})
