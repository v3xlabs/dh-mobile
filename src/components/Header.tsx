import React, { FC } from 'react';

import { Appbar } from 'react-native-paper';
import { theme } from '../Constants/Colors';

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
  const _handleSearch = () => console.log('Searching');

  const _handleMore = () => console.log('Shown more');

  return (
    <Appbar.Header style={{ backgroundColor: theme.palette.primary[900] }}>
      {canGoBack && <Appbar.BackAction onPress={() => onGoBack?.()} />}
      <Appbar.Content title={title} subtitle={subtitle ?? undefined} />
      <Appbar.Action icon="magnify" onPress={_handleSearch} />
      <Appbar.Action icon="dots-vertical" onPress={_handleMore} />
    </Appbar.Header>
  );
};
export default Header;
