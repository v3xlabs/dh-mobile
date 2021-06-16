import { useContext, useEffect } from 'react';
import React, { createContext } from 'react';
import { Device } from 'mediasoup-client';

import { RoomStore } from '../Store/RoomStore';
import {
  useGetRoomsQuery,
  useRoomChangedSubscription,
} from '../GQL/GraphqlOperations';
import { useAuthContext } from './AuthContext';
import { observer } from 'mobx-react-lite';

const RoomsContext = createContext<typeof RoomStore>(RoomStore);
export const useRoomsContext = () => useContext(RoomsContext);

const RoomsContextProvider: React.FC = ({ children }) => {
  const { data: RoomsData, refetch } = useGetRoomsQuery();
  const { Me, isLoggedIn } = useAuthContext();
  const device = new Device();
  console.log(`ObserverCLS`, device.observer);
  useEffect(() => {
    RoomStore.setRooms(RoomsData?.rooms || [], refetch);
  }, [RoomsData, refetch, Me, isLoggedIn]);

  useRoomChangedSubscription({
    onSubscriptionData: (Data) => {
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
export default observer(RoomsContextProvider);
