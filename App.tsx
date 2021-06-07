import 'react-native-gesture-handler';

import { DefaultTheme, Provider as PaperProvider } from 'react-native-paper';
import { StatusBar, StyleSheet } from 'react-native';

import HomeScreen from './src/screens/HomeScreen';
import { HomeScreenTabNavigatorParamsList } from './src/types/NavigationPropTypes';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { NavigationContainer } from '@react-navigation/native';
import PeopleScreen from './src/screens/PeopleScreen';
import React from 'react';
import RoomsScreen from './src/screens/RoomsScreen';
import { SafeAreaView } from 'react-native-safe-area-context';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';

declare global {
  namespace ReactNativePaper {
    interface ThemeColors {
      background: string;
    }

    interface Theme {
      isDark: boolean;
    }
  }
}

export const theme = {
  ...DefaultTheme,
  // Specify custom property
  dark: true,
  isDark: true,
  // Specify custom property in nested object
  colors: {
    ...DefaultTheme.colors,
    text: 'white',
    primary: '#0b0e11',
    secondary: '#5575e7',
  },
};

/*#0b0e11
 primary: {
            100: "#dee3ea",
            200: "#b2bdcd",
            300: "#5d7290", // Searchbar text color
            400: "#5d7290", // Items hover
            500: "#5d7290", // "+" hover
            600: "#323d4d", // Separators and +
            700: "#242c37", // Bg (Explore more rooms) + hover
            800: "#151a21", // Bg boxes
            900: "#" // Main bg
        },
        accent: {
            default: "#fd4d4d",
            disabled: "#f5bfbf",
            hover: "#fd6868"
        },
        secondary: {
            default: "#5575e7",
            washedOut: "#879eed"
        },
        buttonText: "#fff"
*/

const HomeScreenStackNavigator =
  createMaterialBottomTabNavigator<HomeScreenTabNavigatorParamsList>();
const App = () => {
  return (
    <SafeAreaView style={styles.root}>
      <StatusBar
        barStyle={'light-content'}
        backgroundColor={theme.colors.primary}
      />
      <NavigationContainer>
        <PaperProvider theme={theme}>
          <HomeScreenStackNavigator.Navigator
            initialRouteName="Home"
            screenOptions={{ tabBarColor: 'red' }}
          >
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
                tabBarColor: '#0b0e11',
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
                  <Icon name="water-boiler" size={24} color={color} />
                ),
              }}
            />
          </HomeScreenStackNavigator.Navigator>
        </PaperProvider>
      </NavigationContainer>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
});

export default App;
