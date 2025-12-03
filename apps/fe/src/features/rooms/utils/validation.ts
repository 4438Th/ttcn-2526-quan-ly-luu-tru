import { type Room } from '../types';

/**
 * Validate customer data and return array of error messages
 * @param customer Customer object to validate
 * @returns Array of error messages (empty if valid)
 */
export const validateRoom = (room: Room): string[] => {
  const errors: string[] = [];
  if (!room.roomName || room.roomName.trim() === '') {
    errors.push('Tên phòng không được để trống.');
  }

  return errors;
};

/**
 * Check if a perId already exists in customer list
 * @param perId ID to check
 * @param customers List of existing customers
 * @param excludeIndex Index to exclude (for edit operations)
 * @returns true if duplicate found
 */
export const isDuplicateRoomName = (
  roomName: string,
  rooms: Room[],
  excludeIndex?: number,
): boolean => {
  if (!roomName || roomName.trim() === '') return false;
  return rooms.some((r, idx) => r.roomName === roomName && idx !== excludeIndex);
};
