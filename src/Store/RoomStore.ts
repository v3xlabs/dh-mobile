import { makeAutoObservable } from 'mobx';
import { IGetRoomsQuery } from '../GQL/GraphqlOperations';

class RoomStoreClass {
  Rooms: IGetRoomsQuery['rooms'] = [];
  refetchRooms: () => Promise<unknown> = async () => {};
  constructor() {
    makeAutoObservable(this);
  }
  setRooms = (
    Rooms: IGetRoomsQuery['rooms'],
    refetchRooms: () => Promise<unknown>
  ) => {
    this.refetchRooms = refetchRooms;
    this.Rooms = Rooms;
  };
  addRoom = (RoomToAdd: IGetRoomsQuery['rooms'][number]) => {
    this.Rooms.push(RoomToAdd);
    this.Rooms.sort((a, b) => a.members.length - b.members.length);
  };
  updateRoom = (RoomToAdd: IGetRoomsQuery['rooms'][number]) => {
    this.Rooms[this.Rooms.findIndex(R => R.id === RoomToAdd.id)] = RoomToAdd;
  };
}
export const RoomStore = new RoomStoreClass();
