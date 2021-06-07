import 'react-native-gesture-handler';

import { DefaultTheme, Provider as PaperProvider } from 'react-native-paper';
import { SafeAreaView, StatusBar, StyleSheet } from 'react-native';

import { AuthContextProvider } from './src/Contexts/AuthContext';
import { NavigationContainer } from '@react-navigation/native';
import Navigator from './src/screens/HomeTabs/Navigator';
import React from 'react';

declare global {
  namespace ReactNativePaper {
    interface ThemeColors {
      red: string;
    }

    interface Theme {
      isDark: boolean;
    }
  }
}

const theme = {
  ...DefaultTheme,
  // Specify custom property
  dark: true,
  isDark: true,
  // Specify custom property in nested object
  colors: {
    ...DefaultTheme.colors,
    red: '#fd4d4d',
    text: '#dee3ea',
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

const App = () => {
  return (
    <SafeAreaView style={styles.root}>
      <StatusBar
        barStyle="dark-content"
        translucent={false}
        backgroundColor={theme.colors.primary}
      />
      <NavigationContainer>
        <PaperProvider theme={theme}>
          <AuthContextProvider>
            <Navigator />
          </AuthContextProvider>
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
