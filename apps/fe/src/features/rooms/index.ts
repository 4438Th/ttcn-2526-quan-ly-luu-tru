// Barrel export for rooms feature - public API
export { default as RoomView } from './components/RoomView';
export { useRoom } from './hooks/useRoom';
export type { Room, ToastConfig, SortKey, SortDirection } from './types';
export { validateRoom, isDuplicateRoomName } from './utils/validation';
export {
  createRoom,
  fetchRooms,
  updateRoom,
  deleteRoom,
  getRoomById,
  roomApi,
} from './api/RoomAPI';
