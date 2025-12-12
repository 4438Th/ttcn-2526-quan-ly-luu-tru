export interface Room {
  id: string;
  roomName: string;
  price: number;
  capacity: number;
  state: string;
}

// Default room list
export const defaultListRooms: Room[] = [];
// Default new room template
export const defaultNewRoom: Room = {
  id: '',
  roomName: '',
  price: 500000,
  capacity: 1,
  state: 'Trống',
};
export interface ToastConfig {
  message: string;
  isVisible: boolean;
}

export type SortKey = keyof Room;
export type SortDirection = 'asc' | 'desc';
