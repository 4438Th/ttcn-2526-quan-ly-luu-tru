import { useCustomer } from '../hooks/useCustomer';
import CustomerTable from './CustomerTable';
import CustomerFormModal from './CustomerFormModal';
import DeleteConfirmationModal from './DeleteConfirmationModal';
import { Plus, Search } from 'lucide-react';
const CustomerView: React.FC = () => {
  const {
    customers,
    filteredAndSortedCustomers,
    searchTerm,
    sortConfig,
    isAddModalOpen,
    isEditModalOpen,
    isDeleteModalOpen,
    newCustomer,

    setSearchTerm,
    requestSort,
    handleEditClick,
    handleDeleteClick,
    confirmDeleteCustomer,
    handleSubmitNewCustomer,
    handleUpdateCustomer,
    handleInputChange,
    handleRefreshClick,

    setIsAddModalOpen,
    setIsEditModalOpen,
    setIsDeleteModalOpen,
    setNewCustomer,
    defaultNewCustomer,
  } = useCustomer();

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
              setNewCustomer(defaultNewCustomer);
              setIsAddModalOpen(true);
            }}
            className="bg-blue-600 text-white px-6 py-2 rounded-xl hover:bg-blue-700 transition duration-150 shadow-lg flex items-center justify-center space-x-2 w-full sm:w-auto"
          >
            <Plus size={20} />
            <span>Thêm mới</span>
          </button>
        </div>

        {/* Bảng Danh sách Khách hàng */}
        <CustomerTable
          filteredAndSortedCustomers={filteredAndSortedCustomers}
          searchTerm={searchTerm}
          sortConfig={sortConfig}
          requestSort={requestSort}
          handleEditClick={handleEditClick}
          handleDeleteClick={handleDeleteClick}
          handleRefreshClick={handleRefreshClick}
        />

        {/* Thống kê đơn giản */}
        <div className="mt-6 text-center text-gray-600 text-sm">
          Hiển thị {filteredAndSortedCustomers.length} trên tổng số {customers.length} khách hàng.
        </div>
      </div>

      {/* Modal Thêm Khách Hàng */}
      <CustomerFormModal
        title="Thêm khách hàng mới"
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onSubmit={handleSubmitNewCustomer}
        submitText="Lưu khách hàng"
        newCustomer={newCustomer}
        handleInputChange={handleInputChange}
      />

      {/* Modal Sửa Khách Hàng */}
      <CustomerFormModal
        title="Sửa thông tin khách hàng"
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        onSubmit={handleUpdateCustomer}
        submitText="Cập nhật"
        newCustomer={newCustomer}
        handleInputChange={handleInputChange}
      />

      {/* Modal Xác nhận Xóa */}
      <DeleteConfirmationModal
        isOpen={isDeleteModalOpen}
        customers={customers}
        confirmDelete={confirmDeleteCustomer}
        onClose={() => setIsDeleteModalOpen(null)}
      />
    </div>
  );
};
export default CustomerView;
