import React from 'react';
import { List } from 'react-native-paper';
import { theme } from '../Constants/Colors';
import { IGetRoomsQuery } from '../GQL/GraphqlOperations';
interface RoomViewProps {
  Room: IGetRoomsQuery['rooms'][number];
}
const RoomView: React.FC<RoomViewProps> = ({ Room }) => {
  return (
    <List.Accordion
      style={{ backgroundColor: theme.palette.primary[900], padding: 5 }}
      title={Room.name}
      titleStyle={{ color: theme.palette.primary[100] }}
      id="1"
    >
      <List.Item title="Item 1" />
    </List.Accordion>
  );
};
export default RoomView;
// const styles = StyleSheet.create({})
