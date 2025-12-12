import { apiClient } from 'lib/apiClient';
import { type Room } from '../types';

const PATH = '/quanlyluutru/rooms';

/**
 * Tạo phòng mới
 * @param data Dữ liệu phòng để tạo
 * @returns Promise<Room> Phòng đã được tạo
 */
export const createRoom = async (data: Room): Promise<Room> => {
  return apiClient.post<Room>(PATH, data);
};

/**
 * Lấy tất cả phòng
 * @returns Promise<Room[]> Mảng phòng
 */
export const fetchRooms = async (): Promise<Room[]> => {
  return apiClient.get<Room[]>(PATH);
};

/**
 * Cập nhật thông tin phòng
 * @param id ID của phòng cần cập nhật
 * @param data Dữ liệu cập nhật
 * @returns Promise<Room> Phòng đã được cập nhật
 */
export const updateRoom = async (id: string, data: Room): Promise<Room> => {
  return apiClient.put<Room>(`${PATH}/${id}`, data);
};

/**
 * Xóa phòng
 * @param id ID của phòng cần xóa
 * @returns Promise<string> Trả về string
 */
export const deleteRoom = async (id: string): Promise<string> => {
  return apiClient.del<string>(`${PATH}/${id}`);
};

/**
 * Lấy thông tin phòng bằng ID
 * @param id ID của phòng
 * @returns Promise<Room | null> Phòng hoặc null nếu không tìm thấy (404)
 */
export const getRoomById = async (id: string): Promise<Room | null> => {
  try {
    return await apiClient.get<Room>(`${PATH}/${id}`);
  } catch (err: any) {
    if (err?.status === 404) return null;
    throw err;
  }
};

export const roomApi = {
  create: createRoom,
  fetchAll: fetchRooms,
  getById: getRoomById,
  update: updateRoom,
  delete: deleteRoom,
};

export default roomApi;
