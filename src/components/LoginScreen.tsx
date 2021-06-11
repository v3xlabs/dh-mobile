import {
  HomeScreenTabNavigatorParamsList,
  LoginTabNavigationProp,
} from '../types/NavigationPropTypes';
import { Linking, StyleSheet, TouchableOpacity, View } from 'react-native';

import FAIcon from 'react-native-vector-icons/FontAwesome5';
import Header from './Header';
import React from 'react';
import { RouteProp } from '@react-navigation/core';
import { Text } from 'react-native-paper';
import { theme } from '../Constants/Colors';
import { useAuthContext } from '../Contexts/AuthContext';

interface LoginScreenProps {
  navigation: LoginTabNavigationProp;
  route: RouteProp<HomeScreenTabNavigatorParamsList, 'Login'>;
}
const LoginScreen: React.FC<LoginScreenProps> = ({ route }) => {
  const { setToken } = useAuthContext();
  if (route.params?.token) {
    setToken(route.params.token);
    return null;
  }
  return (
    <>
      <Header title={route.name} />
      <View style={styles.wrapper}>
        <View style={styles.inner}>
          <View style={{ padding: 10, flexDirection: 'column' }}>
            <View style={{ marginBottom: 20 }}>
              <Text
                style={{
                  textAlign: 'center',
                  color: theme.palette.primary[100],
                  fontWeight: '800',
                  fontSize: 25,
                }}
              >
                Welcome
              </Text>
              <Text
                style={{
                  textAlign: 'center',
                  color: theme.palette.primary[100],
                  fontWeight: '800',
                  fontSize: 20,
                }}
              >
                Please choose one of the following platforms for authentication
              </Text>
            </View>
          </View>
          <TouchableOpacity
            style={{
              marginTop: 10,
              padding: 10,
              borderRadius: 8,
              backgroundColor: theme.palette.primary[100],
            }}
            onPress={async () =>
              Linking.openURL(
                'https://auth.dogehouse.online/discord/login?redirect_uri=dogehouse://login'
              )
            }
          >
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <FAIcon name="discord" size={25} />
              <Text
                style={{
                  fontWeight: 'bold',
                  fontSize: 20,
                  marginLeft: 10,
                  color: theme.palette.primary[900],
                }}
              >
                Discord
              </Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              marginTop: 10,
              padding: 10,
              borderRadius: 8,
              backgroundColor: theme.palette.primary[100],
            }}
            onPress={async () =>
              await Linking.openURL(
                'https://auth.dogehouse.online/google/login?redirect_uri=dogehouse://login'
              )
            }
          >
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <FAIcon name="google" size={25} />
              <Text
                style={{
                  fontWeight: 'bold',
                  fontSize: 20,
                  marginLeft: 10,
                  color: theme.palette.primary[900],
                }}
              >
                Google
              </Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              marginTop: 10,
              padding: 10,
              borderRadius: 8,
              backgroundColor: theme.palette.primary[100],
            }}
            onPress={async () =>
              await Linking.openURL(
                'https://auth.dogehouse.online/github/login?redirect_uri=dogehouse://login'
              )
            }
          >
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <FAIcon name="github" size={25} />
              <Text
                style={{
                  fontWeight: 'bold',
                  fontSize: 20,
                  marginLeft: 10,
                  color: theme.palette.primary[900],
                }}
              >
                Github
              </Text>
            </View>
          </TouchableOpacity>
          <Text>{JSON.stringify(route.params, null, 2)}</Text>
        </View>
      </View>
    </>
  );
};
export default LoginScreen;
const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#151a21',
  },
  inner: {
    flexDirection: 'column',
  },
});
