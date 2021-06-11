import HomeScreen from './HomeScreen';
import { HomeScreenTabNavigatorParamsList } from '../../types/NavigationPropTypes';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import LoginScreen from '../../components/LoginScreen';
import PeopleScreen from './PeopleScreen';
import React from 'react';
import RoomsScreen from './RoomsScreen';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { observer } from 'mobx-react-lite';
import { theme } from '../../Constants/Colors';
import { useAuthContext } from '../../Contexts/AuthContext';

const HomeScreenStackNavigator =
  createMaterialBottomTabNavigator<HomeScreenTabNavigatorParamsList>();
interface NavigatorProps {}
const Navigator: React.FC<NavigatorProps> = () => {
  const { Me } = useAuthContext();
  return (
    <HomeScreenStackNavigator.Navigator
      initialRouteName="Home"
      barStyle={{ backgroundColor: theme.palette.primary[900] }}
      activeColor={theme.palette.accent.default}
    >
      {Me ? (
        <>
          <HomeScreenStackNavigator.Screen
            name="Home"
            component={HomeScreen}
            options={{
              tabBarIcon: ({ color }) => (
                <Icon name="home" size={24} color={color} />
              ),
            }}
          />
          <HomeScreenStackNavigator.Screen
            name="Rooms"
            component={RoomsScreen}
            options={{
              tabBarIcon: ({ color }) => (
                <Icon name="water-boiler" size={24} color={color} />
              ),
            }}
          />
          <HomeScreenStackNavigator.Screen
            name="People"
            component={PeopleScreen}
            options={{
              tabBarIcon: ({ color }) => (
                <Icon name="account-multiple" size={24} color={color} />
              ),
            }}
          />
        </>
      ) : (
        <HomeScreenStackNavigator.Screen
          name="Login"
          component={LoginScreen}
          options={{
            tabBarIcon: ({ color }) => (
              <Icon name="account-multiple" size={24} color={color} />
            ),
          }}
        />
      )}
    </HomeScreenStackNavigator.Navigator>
  );
};
export default observer(Navigator);
// const styles = StyleSheet.create({})
