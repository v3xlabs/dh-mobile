import 'react-native-gesture-handler';

import { DefaultTheme, Provider as PaperProvider } from 'react-native-paper';
import { SafeAreaView, StatusBar, StyleSheet } from 'react-native';

import { ApolloProvider } from '@apollo/client';
import { AuthContextProvider } from './src/Contexts/AuthContext';
import { NavigationContainer } from '@react-navigation/native';
import Navigator from './src/screens/HomeTabs/Navigator';
import React from 'react';
import { client } from './src/Contexts/ApolloProvider';
import { theme } from './src/Constants/Colors';

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

const PaperTheme = {
  ...DefaultTheme,
  // Specify custom property
  dark: true,
  isDark: true,
  // Specify custom property in nested object
  colors: {
    ...DefaultTheme.colors,
    red: '#fd4d4d',
    text: '#dee3ea',
    primary: theme.palette.primary[900],
  },
};

const App = () => {
  // const linking: LinkingOptions = {
  //   prefixes: ['https://dogehouse.online', 'dogehouse://'],
  //   enabled: true,
  // config: {
  //   screens: {
  //     Login: 'login',
  //   },
  // },

  // subscribe(listener) {
  //   const onReceiveURL = ({ url }: { url: string }) => {
  //     console.log(`url`, url);
  //     return listener(url);
  //   };

  //   // Listen to incoming links from deep linking
  //   Linking.addEventListener('url', onReceiveURL);

  //   // Listen to firebase push notifications

  //   return () => {
  //     // Clean up the event listeners
  //     Linking.removeEventListener('url', onReceiveURL);
  //   };
  // },
  // };
  return (
    <SafeAreaView style={styles.root}>
      <StatusBar
        barStyle={'light-content'}
        translucent={false}
        backgroundColor={theme.palette.primary[900]}
      />
      <ApolloProvider client={client}>
        <NavigationContainer>
          <PaperProvider theme={PaperTheme}>
            <AuthContextProvider>
              <Navigator />
            </AuthContextProvider>
          </PaperProvider>
        </NavigationContainer>
      </ApolloProvider>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: theme.palette.primary[900],
  },
});

export default App;
