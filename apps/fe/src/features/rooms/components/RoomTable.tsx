import { type Room, type SortKey, type SortDirection } from '../types';
import SortableHeader from './SortableHeader';
import { Trash2, Pencil, RefreshCw } from 'lucide-react';
interface RoomTableProps {
  filteredAndSortedRooms: Room[];
  searchTerm: string;
  sortConfig: { key: SortKey; direction: SortDirection } | null;
  requestSort: (key: SortKey) => void;
  handleEditClick: (roomIndex: number) => void;
  handleDeleteClick: (roomIndex: number) => void;
  handleRefreshClick: () => void;
}
const RoomTable: React.FC<RoomTableProps> = ({
  filteredAndSortedRooms,
  searchTerm,
  sortConfig,
  requestSort,
  handleEditClick,
  handleDeleteClick,
  handleRefreshClick,
}) => {
  return (
    <div className="bg-white shadow-2xl rounded-xl ring-1 ring-gray-200 overflow-hidden">
      <div className="flex justify-between items-center p-4 sm:p-6 border-b border-gray-100">
        <h2 className="text-xl font-semibold text-gray-800">Danh sách phòng</h2>
        <button
          title="Tải lại dữ liệu"
          className="p-2 text-blue-600 hover:text-blue-800 hover:bg-blue-50 rounded-full transition duration-150 ease-in-out"
          onClick={handleRefreshClick}
        >
          <RefreshCw size={20} />
        </button>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-4 sm:px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                STT
              </th>
              <SortableHeader
                name="Tên phòng"
                sortKey="roomName"
                sortConfig={sortConfig}
                requestSort={requestSort}
              />
              <SortableHeader
                name="Giá phòng"
                sortKey="price"
                sortConfig={sortConfig}
                requestSort={requestSort}
              />
              <SortableHeader
                name="Sức chứa"
                sortKey="capacity"
                sortConfig={sortConfig}
                requestSort={requestSort}
              />
              <SortableHeader
                name="Trạng thái"
                sortKey="state"
                sortConfig={sortConfig}
                requestSort={requestSort}
              />
              <th className="px-4 sm:px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                Hành Động
              </th>
            </tr>
          </thead>

          <tbody className="bg-white divide-y divide-gray-100">
            {filteredAndSortedRooms.length > 0 ? (
              filteredAndSortedRooms.map((room, index) => (
                <tr key={room.id || index} className="hover:bg-blue-50 transition duration-100">
                  <td className="px-4 sm:px-6 py-4 whitespace-nowrap text-sm font-semibold text-gray-900">
                    {index + 1}
                  </td>
                  <td className="px-4 sm:px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {room.roomName}
                  </td>
                  <td className="px-4 sm:px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                    {room.price.toLocaleString('vi-VN')} VND
                  </td>
                  <td className="px-4 sm:px-6 py-4 whitespace-nowrap text-sm text-center text-gray-900">
                    {room.capacity}
                  </td>
                  <td className="px-4 sm:px-6 py-4 whitespace-nowrap text-sm">
                    <span
                      className={`px-3 py-1 rounded-full font-medium ${
                        room.state.toLowerCase() === 'trống'
                          ? 'bg-green-100 text-green-800'
                          : 'bg-red-100 text-red-800'
                      }`}
                    >
                      {room.state}
                    </span>
                  </td>
                  <td className="px-4 sm:px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <div className="flex justify-center space-x-2">
                      <button
                        title="Sửa thông tin"
                        className="text-yellow-600 hover:text-yellow-800 p-2 rounded-full hover:bg-yellow-100 transition"
                        onClick={() => handleEditClick(index)}
                      >
                        <Pencil size={18} />
                      </button>
                      <button
                        title="Xóa phòng"
                        className="text-red-600 hover:text-red-800 p-2 rounded-full hover:bg-red-100 transition"
                        onClick={() => handleDeleteClick(index)}
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={6} className="px-6 py-10 text-center text-gray-500 text-lg">
                  Không tìm thấy phòng nào phù hợp với từ khóa "{searchTerm}".
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};
export default RoomTable;
