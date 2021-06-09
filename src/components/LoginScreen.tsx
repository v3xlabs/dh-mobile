import { Modal, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React, { useState } from 'react';
import { WebView, WebViewNavigation } from 'react-native-webview';

import AsyncStorage from '@react-native-async-storage/async-storage';
import FAIcon from 'react-native-vector-icons/FontAwesome5';
import Header from './Header';
import { IconButton } from 'react-native-paper';
import ParseURL from 'url-parse';
import { theme } from '../Constants/Colors';
import { useAuthContext } from '../Contexts/AuthContext';
import { useRoute } from '@react-navigation/core';

interface LoginScreenProps {}
const LoginScreen: React.FC<LoginScreenProps> = () => {
  const [authUrl, setAuthUrl] = useState<string | null>(null);
  const { setToken } = useAuthContext();

  const handleNavigationChange = (state: WebViewNavigation) => {
    if (ParseURL(state.url, true).query.token) {
      AsyncStorage.setItem(
        '@token',
        ParseURL(state.url, true).query.token ?? ''
      );
      setToken(ParseURL(state.url, true).query.token ?? null);
    }
  };

  const route = useRoute();
  return (
    <>
      <Header title={route.name} />
      <View style={styles.wrapper}>
        <Modal
          visible={!!authUrl}
          animationType="slide"
          presentationStyle="pageSheet"
        >
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'flex-end',
              backgroundColor: theme.palette.primary[800],
            }}
          >
            <IconButton
              icon={() => (
                <FAIcon
                  name="times-circle"
                  size={25}
                  color={theme.palette.accent.default}
                />
              )}
              onPress={() => setAuthUrl(null)}
            />
          </View>
          <View style={{ flex: 1 }}>
            {!!authUrl && (
              <WebView
                sharedCookiesEnabled
                thirdPartyCookiesEnabled
                userAgent="Mozilla/5.0 (iPhone; CPU iPhone OS 13_3_1 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/13.0.5 Mobile/15E148 Safari/604.1"
                onNavigationStateChange={handleNavigationChange}
                source={{ uri: authUrl }}
              />
            )}
          </View>
        </Modal>
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
            onPress={() =>
              setAuthUrl('https://auth.dogehouse.online/discord/login')
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
                style={{ fontWeight: 'bold', fontSize: 20, marginLeft: 10 }}
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
            onPress={() =>
              setAuthUrl('https://auth.dogehouse.online/google/login')
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
                style={{ fontWeight: 'bold', fontSize: 20, marginLeft: 10 }}
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
            onPress={() =>
              setAuthUrl('https://auth.dogehouse.online/github/login')
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
                style={{ fontWeight: 'bold', fontSize: 20, marginLeft: 10 }}
              >
                Github
              </Text>
            </View>
          </TouchableOpacity>
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
