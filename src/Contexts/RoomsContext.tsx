import { useContext, useEffect } from 'react';
import React, { createContext } from 'react';
import { RoomStore } from '../Store/RoomStore';
import {
  useGetRoomsQuery,
  useRoomChangedSubscription,
} from '../GQL/GraphqlOperations';

const RoomsContext = createContext<typeof RoomStore>(RoomStore);
export const useRoomsContext = () => useContext(RoomsContext);

const RoomsContextProvider: React.FC = ({ children }) => {
  const { data: RoomsData, refetch } = useGetRoomsQuery();

  useEffect(() => {
    RoomStore.setRooms(RoomsData?.rooms || [], refetch);
  }, [RoomsData, refetch]);
  useRoomChangedSubscription({
    onSubscriptionData: Data => {
      console.log(`DAta`, Data.subscriptionData);
      if (
        Data.subscriptionData.data?.roomChange.event === 'UPDATE' &&
        Data.subscriptionData.data.roomChange.room
      ) {
        RoomStore.updateRoom(Data.subscriptionData.data.roomChange.room);
      }
      if (
        Data.subscriptionData.data?.roomChange.event === 'CREATE' &&
        Data.subscriptionData.data.roomChange.room
      ) {
        RoomStore.addRoom(Data.subscriptionData.data.roomChange.room);
      }
    },
  });
  return (
    <RoomsContext.Provider value={RoomStore}>{children}</RoomsContext.Provider>
  );
};
export default RoomsContextProvider;
