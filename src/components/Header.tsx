import React, {FC} from 'react';

import {Appbar} from 'react-native-paper';

interface HeaderProps {
  title: string;
  canGoBack?: boolean;
  subtitle?: string;
}
const Header: FC<HeaderProps> = ({title, canGoBack = false, subtitle}) => {
  const _goBack = () => console.log('Went back');

  const _handleSearch = () => console.log('Searching');

  const _handleMore = () => console.log('Shown more');

  return (
    <Appbar.Header>
      {canGoBack && <Appbar.BackAction onPress={_goBack} />}
      <Appbar.Content title={title} subtitle={subtitle ?? undefined} />
      <Appbar.Action icon="magnify" onPress={_handleSearch} />
      <Appbar.Action icon="dots-vertical" onPress={_handleMore} />
    </Appbar.Header>
  );
};
export default Header;
