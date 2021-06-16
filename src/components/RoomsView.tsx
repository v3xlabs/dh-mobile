import React from 'react';
import { FlatList } from 'react-native';
import { List } from 'react-native-paper';
import { IGetRoomsQuery } from '../GQL/GraphqlOperations';
import RoomView from './RoomView';
interface RoomsViewProps {
  Rooms: IGetRoomsQuery['rooms'];
}
const RoomsView: React.FC<RoomsViewProps> = ({ Rooms }) => {
  return (
    <FlatList
      data={Rooms}
      keyExtractor={item => item.id}
      renderItem={({ item }) => (
        <List.AccordionGroup>
          <RoomView Room={item} />
        </List.AccordionGroup>
      )}
    />
  );
};
export default RoomsView;
// const styles = StyleSheet.create({})
