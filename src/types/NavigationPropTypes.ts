import { MaterialBottomTabNavigationProp } from '@react-navigation/material-bottom-tabs';

export type HomeScreenTabNavigatorParamsList = {
  Home: undefined;
  Rooms: undefined;
  People: undefined;
};

export type HomeTabNavigationProp = MaterialBottomTabNavigationProp<
  HomeScreenTabNavigatorParamsList,
  'Home'
>;
export type RoomsTabNavigationProp = MaterialBottomTabNavigationProp<
  HomeScreenTabNavigatorParamsList,
  'Rooms'
>;
