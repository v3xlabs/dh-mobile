import { Appbar, Avatar, Menu } from 'react-native-paper';
import React, { FC, useState } from 'react';

import { TouchableOpacity } from 'react-native';
import { observer } from 'mobx-react-lite';
import { theme } from '../Constants/Colors';
import { useAuthContext } from '../Contexts/AuthContext';

interface HeaderProps {
  title: string;
  canGoBack?: boolean;
  onGoBack?: () => void;
  subtitle?: string;
}
const Header: FC<HeaderProps> = ({
  title,
  canGoBack = false,
  subtitle,
  onGoBack,
}) => {
  const [isMenuVisible, setIsMenuVisible] = useState(false);
  const { Me, logout } = useAuthContext();
  const _handleSearch = () => console.log('Searching');

  //const _handleMore = () => console.log('Shown more');

  return (
    <Appbar.Header style={{ backgroundColor: theme.palette.primary[900] }}>
      {canGoBack && <Appbar.BackAction onPress={() => onGoBack?.()} />}
      <Appbar.Content title={title} subtitle={subtitle ?? undefined} />
      <Appbar.Action icon="magnify" onPress={_handleSearch} />
      {Me && (
        <Menu
          anchor={
            <TouchableOpacity onPress={() => setIsMenuVisible(true)}>
              <Avatar.Image
                style={{
                  marginHorizontal: 5,
                  borderRadius: 8,
                }}
                size={24}
                source={{ uri: Me.avatar }}
              />
            </TouchableOpacity>
          }
          contentStyle={{ backgroundColor: theme.palette.primary[800] }}
          visible={isMenuVisible}
          onDismiss={() => setIsMenuVisible(false)}
        >
          <Menu.Item onPress={() => {}} title="Profile" />
          <Menu.Item onPress={async () => await logout()} title="Logout" />
        </Menu>
      )}
    </Appbar.Header>
  );
};
export default observer(Header);
