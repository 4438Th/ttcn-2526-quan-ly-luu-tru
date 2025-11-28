import { type Customer } from '../types';
import { Trash2 } from 'lucide-react';
interface DeleteConfirmationModalProps {
  isOpen: number | null;
  customers: Customer[];
  confirmDelete: () => void;
  onClose: () => void;
}

const DeleteConfirmationModal: React.FC<DeleteConfirmationModalProps> = ({
  isOpen,
  customers,
  confirmDelete,
  onClose,
}) => {
  if (isOpen === null) return null;

  // Lấy thông tin khách hàng cần xóa từ index (isOpen chính là index)
  const customer = customers[isOpen];
  const fullName = customer ? `${customer.lastName} ${customer.firstName}` : 'Khách hàng này';

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm backdrop-opacity-50 transition-opacity">
      <div
        className="bg-white rounded-2xl shadow-2xl w-full max-w-sm mx-4 p-6 transform transition-all duration-300 scale-100"
        role="alertdialog"
        aria-modal="true"
        aria-labelledby="delete-title"
      >
        <div className="text-center">
          <Trash2 className="mx-auto h-12 w-12 text-red-500" />
          <h3 id="delete-title" className="mt-4 text-lg font-bold text-gray-900">
            Xác nhận xóa
          </h3>
          <p className="mt-2 text-sm text-gray-500">
            Bạn có chắc chắn muốn xóa khách hàng **{fullName}**?
          </p>
        </div>
        <div className="mt-5 sm:mt-6 flex justify-between space-x-3">
          <button
            type="button"
            className="inline-flex justify-center w-full rounded-xl border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 transition sm:text-sm"
            onClick={onClose}
          >
            Hủy
          </button>
          <button
            type="button"
            className="inline-flex justify-center w-full rounded-xl border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 transition sm:text-sm"
            onClick={confirmDelete}
          >
            Xóa ngay
          </button>
        </div>
      </div>
    </div>
  );
};
export default DeleteConfirmationModal;
