import { useState, useCallback, useEffect } from 'react';
import { type Room, type SortKey, type SortDirection } from '../types';
import { defaultListRooms, defaultNewRoom } from '../types';
import { validateRoom, isDuplicateRoomName } from '../utils/validation';
import { useToast } from 'lib/toast';
import { useRoomList } from './useRoomList';
import { createRoom, deleteRoom, fetchRooms, updateRoom } from '../index';
export const useRoom = () => {
  const [Rooms, setRooms] = useState<Room[]>(defaultListRooms);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [sortConfig, setSortConfig] = useState<{ key: SortKey; direction: SortDirection } | null>(
    null,
  );
  const [isAddModalOpen, setIsAddModalOpen] = useState<boolean>(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState<boolean>(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState<number | null>(null);
  const [newRoom, setNewRoom] = useState<Room>(defaultNewRoom);
  const [currentRoomIndex, setCurrentRoomIndex] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const { showToast } = useToast();

  const { filteredAndSortedRooms, requestSort: buildSort } = useRoomList(
    Rooms,
    searchTerm,
    sortConfig,
  );

  const requestSort = (key: SortKey): void => setSortConfig((prev) => buildSort(key, prev));

  const handleInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>): void => {
      const { name, value } = e.target;
      if (name in newRoom) {
        const fieldName = name as keyof Room;
        const fieldValue = ['price', 'capacity'].includes(name) ? Number(value) : value;
        setNewRoom((prev) => ({ ...prev, [fieldName]: fieldValue }));
      }
    },
    [newRoom],
  );

  const handleSubmitNewRoom = async (e: React.FormEvent): Promise<void> => {
    e.preventDefault();

    const roomToAdd: Room = {
      ...newRoom,
      roomName: newRoom.roomName.trim() || 'No Name',
    };

    const validationErrors = validateRoom(roomToAdd);
    if (validationErrors.length > 0) {
      showToast(`❌ ${validationErrors[0]}`);
      return;
    }

    if (isDuplicateRoomName(roomToAdd.roomName, Rooms)) {
      showToast('❌ Lỗi: Tên phòng đã tồn tại.');
      return;
    }

    setIsLoading(true);
    try {
      const roomResponse = await createRoom(roomToAdd);
      setRooms((prev) => [...prev, roomResponse]);
      setIsAddModalOpen(false);
      setNewRoom(defaultNewRoom);
      showToast(`✅ Đã thêm phòng "${roomToAdd.roomName}" thành công!`);
    } catch (err) {
      // Xử lý lỗi từ API
      const errorMsg = err instanceof Error ? err.message : 'Lỗi không xác định';
      showToast(`❌ Lỗi: ${errorMsg}`);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteClick = (roomIndex: number): void => {
    const roomToDelete = filteredAndSortedRooms[roomIndex];
    const originalIndex = Rooms.findIndex((r) => r.id === roomToDelete.id);

    if (originalIndex !== -1) {
      setIsDeleteModalOpen(originalIndex);
    }
  };

  const confirmDeleteRoom = async (): Promise<void> => {
    if (isDeleteModalOpen !== null) {
      const room = Rooms[isDeleteModalOpen];
      const roomName = room.roomName;

      setIsLoading(true);
      try {
        await deleteRoom(room.id);
        setRooms((prevRooms) => prevRooms.filter((_, idx) => idx !== isDeleteModalOpen));
        setIsDeleteModalOpen(null);
        showToast(`✅ Đã xóa phòng "${roomName}" thành công!`);
      } catch (err) {
        const errorMsg = err instanceof Error ? err.message : 'Lỗi không xác định';
        showToast(`❌ Lỗi: ${errorMsg}`);
      } finally {
        setIsLoading(false);
      }
    }
  };
  const handleEditClick = (roomIndex: number): void => {
    const roomToEdit = filteredAndSortedRooms[roomIndex];
    const originalIndex = Rooms.findIndex((r) => r.id === roomToEdit.id);

    if (originalIndex !== -1) {
      setNewRoom(roomToEdit);
      setCurrentRoomIndex(originalIndex);
      setIsEditModalOpen(true);
    }
  };
  const handleUpdateRoom = async (e: React.FormEvent): Promise<void> => {
    e.preventDefault();
    if (currentRoomIndex === null) return;

    const roomToUpdate: Room = {
      ...newRoom,
      roomName: newRoom.roomName.trim() || 'No Name',
    };

    const validationErrors = validateRoom(roomToUpdate);
    if (validationErrors.length > 0) {
      showToast(`❌ ${validationErrors[0]}`);
      return;
    }

    if (isDuplicateRoomName(roomToUpdate.roomName, Rooms, currentRoomIndex)) {
      showToast('❌ Lỗi: Tên phòng đã tồn tại.');
      return;
    }

    setIsLoading(true);
    try {
      const roomResponse = await updateRoom(roomToUpdate.id, roomToUpdate);
      setRooms((prevRooms) =>
        prevRooms.map((room, idx) => (idx === currentRoomIndex ? roomResponse : room)),
      );
      setIsEditModalOpen(false);
      setNewRoom(defaultNewRoom);
      setCurrentRoomIndex(null);
      showToast(`✅ Đã cập nhật thông tin phòng "${roomToUpdate.roomName}" thành công!`);
    } catch (err) {
      const errorMsg = err instanceof Error ? err.message : 'Lỗi không xác định';
      showToast(`❌ Lỗi: ${errorMsg}`);
    } finally {
      setIsLoading(false);
    }
  };

  const handleRefreshClick = async (): Promise<void> => {
    setIsLoading(true);
    try {
      const fetchedRooms = await fetchRooms();
      setRooms(fetchedRooms);
      showToast(`✅ Đã làm mới thành công!`);
    } catch (err) {
      const errorMsg = err instanceof Error ? err.message : 'Lỗi không xác định';
      showToast(`❌ Lỗi: ${errorMsg}`);
    } finally {
      setIsLoading(false);
    }
  };

  const loadRooms = async (): Promise<void> => {
    setIsLoading(true);
    try {
      const fetchedRooms = await fetchRooms();
      setRooms(fetchedRooms);
      showToast(`✅ Đã nạp dữ liệu phòng thành công!`);
    } catch (err) {
      const errorMsg = err instanceof Error ? err.message : 'Lỗi không xác định';
      showToast(`❌ Lỗi: ${errorMsg}`);
    } finally {
      setIsLoading(false);
    }
  };
  useEffect(() => {
    loadRooms();
  }, []);

  return {
    Rooms,
    filteredAndSortedRooms,
    searchTerm,
    sortConfig,
    isAddModalOpen,
    isEditModalOpen,
    isDeleteModalOpen,
    newRoom,
    isLoading,
    setSearchTerm,
    requestSort,
    handleEditClick,
    handleDeleteClick,
    confirmDeleteRoom,
    handleSubmitNewRoom,
    handleUpdateRoom,
    handleInputChange,
    handleRefreshClick,
    setIsAddModalOpen,
    setIsEditModalOpen,
    setIsDeleteModalOpen,
    setNewRoom,
    defaultNewRoom,
  };
};
