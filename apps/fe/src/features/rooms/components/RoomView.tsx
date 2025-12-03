import { useRoom } from '../hooks/useRoom';
import RoomTable from './RoomTable';
import RoomFormModal from './RoomFormModal';
import DeleteConfirmationModal from './DeleteConfirmationModal';
import { Plus, Search } from 'lucide-react';
const RoomView: React.FC = () => {
  const {
    Rooms,
    filteredAndSortedRooms,
    searchTerm,
    sortConfig,
    isAddModalOpen,
    isEditModalOpen,
    isDeleteModalOpen,
    newRoom,

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
  } = useRoom();

  return (
    <div className="p-4 sm:p-8 bg-gray-50 min-h-screen w-full font-inter">
      <div className="max-w-7xl mx-auto">
        {/* Thanh công cụ: Tìm kiếm và Thêm mới */}
        <div className="flex flex-col sm:flex-row justify-between items-stretch sm:items-center mb-8 gap-4">
          <div className="relative w-full sm:w-1/3">
            <input
              type="text"
              placeholder="Nhập thông tin tìm kiếm..."
              className="pl-10 pr-4 py-2 border border-gray-300 rounded-xl w-full text-gray-700 focus:ring-blue-500 focus:border-blue-500 transition duration-150 shadow-sm"
              value={searchTerm}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearchTerm(e.target.value)}
            />
            <Search
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
              size={18}
            />
          </div>

          <button
            onClick={() => {
              setNewRoom(defaultNewRoom);
              setIsAddModalOpen(true);
            }}
            className="bg-blue-600 text-white px-6 py-2 rounded-xl hover:bg-blue-700 transition duration-150 shadow-lg flex items-center justify-center space-x-2 w-full sm:w-auto"
          >
            <Plus size={20} />
            <span>Thêm mới</span>
          </button>
        </div>

        {/* Bảng Danh sách Phòng */}
        <RoomTable
          filteredAndSortedRooms={filteredAndSortedRooms}
          searchTerm={searchTerm}
          sortConfig={sortConfig}
          requestSort={requestSort}
          handleEditClick={handleEditClick}
          handleDeleteClick={handleDeleteClick}
          handleRefreshClick={handleRefreshClick}
        />

        {/* Thống kê đơn giản */}
        <div className="mt-6 text-center text-gray-600 text-sm">
          Hiển thị {filteredAndSortedRooms.length} trên tổng số {Rooms.length} phòng.
        </div>
      </div>

      {/* Modal Thêm Phòng */}
      <RoomFormModal
        title="Thêm phòng mới"
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onSubmit={handleSubmitNewRoom}
        submitText="Lưu phòng"
        newRoom={newRoom}
        handleInputChange={handleInputChange}
      />

      {/* Modal Sửa Phòng */}
      <RoomFormModal
        title="Sửa thông tin phòng"
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        onSubmit={handleUpdateRoom}
        submitText="Cập nhật"
        newRoom={newRoom}
        handleInputChange={handleInputChange}
      />

      {/* Modal Xác nhận Xóa */}
      <DeleteConfirmationModal
        isOpen={isDeleteModalOpen}
        rooms={Rooms}
        confirmDelete={confirmDeleteRoom}
        onClose={() => setIsDeleteModalOpen(null)}
      />
    </div>
  );
};
export default RoomView;
