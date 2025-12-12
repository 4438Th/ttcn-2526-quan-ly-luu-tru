import { type Room } from '../types';
import { X, Save } from 'lucide-react';

interface RoomFormModalProps {
  title: string;
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (e: React.FormEvent) => void;
  submitText: string;
  newRoom: Room;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}
const RoomFormModal: React.FC<RoomFormModalProps> = ({
  title,
  isOpen,
  onClose,
  onSubmit,
  submitText,
  newRoom,
  handleInputChange,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm backdrop-opacity-50 transition-opacity">
      <div
        className="bg-white rounded-2xl shadow-2xl w-full max-w-lg mx-4 p-6 sm:p-8 transform transition-all duration-300 scale-100"
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
      >
        <div className="flex justify-between items-center border-b pb-3 mb-6">
          <h3 id="modal-title" className="text-2xl font-bold text-gray-800">
            {title}
          </h3>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 p-1 rounded-full hover:bg-gray-100 transition"
            title="Đóng"
          >
            <X size={24} />
          </button>
        </div>

        <form onSubmit={onSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Tên phòng (*)</label>
            <input
              type="text"
              name="roomName"
              value={newRoom.roomName}
              onChange={handleInputChange}
              required
              className="w-full p-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
              placeholder="Ví dụ: Phòng 101"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Giá phòng (*)</label>
              <input
                type="number"
                name="price"
                value={newRoom.price}
                onChange={handleInputChange}
                required
                className="w-full p-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                placeholder="Ví dụ: 500000"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Sức chứa (*)</label>
              <input
                type="number"
                name="capacity"
                value={newRoom.capacity}
                onChange={handleInputChange}
                required
                className="w-full p-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                placeholder="Ví dụ: 4"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Trạng thái (*)</label>
            <input
              type="text"
              name="state"
              value={newRoom.state}
              onChange={handleInputChange}
              required
              className="w-full p-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
              placeholder="Ví dụ: Trống"
            />
          </div>

          <div className="flex justify-end space-x-3 pt-4 border-t mt-6">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-gray-200 text-gray-800 rounded-xl hover:bg-gray-300 transition duration-150"
            >
              Hủy
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition duration-150 shadow-md flex items-center space-x-1"
            >
              <Save size={18} />
              <span>{submitText}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
export default RoomFormModal;
