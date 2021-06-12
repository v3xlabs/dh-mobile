import { ScrollView, View } from 'react-native';

import Header from '../../components/Header';
import React from 'react';
import { RoomsTabNavigationProp } from '../../types/NavigationPropTypes';
import { Text } from 'react-native-paper';
import { observer } from 'mobx-react-lite';
import { theme } from '../../Constants/Colors';
import { useRoute } from '@react-navigation/native';

interface RoomsScreenProps {
  navigation: RoomsTabNavigationProp;
}
const RoomsScreen: React.FC<RoomsScreenProps> = ({ navigation }) => {
  const route = useRoute();

  return (
    <>
      <Header
        title={route.name}
        canGoBack
        onGoBack={() => navigation.navigate('Home')}
      />
      <View style={{ flex: 1, backgroundColor: theme.palette.primary[800] }}>
        <ScrollView>
          <Text>RoomsScreen</Text>
        </ScrollView>
      </View>
    </>
  );
};
export default observer(RoomsScreen);
// const styles = StyleSheet.create({})
