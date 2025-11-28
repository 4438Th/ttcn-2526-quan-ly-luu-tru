import React, { useState, useCallback, useEffect } from 'react';
import { type Customer, type SortKey, type SortDirection } from '../types';
import { defaultListCustomers, defaultNewCustomer } from '../types';
import { validateCustomer, isDuplicatePerId } from '../utils/validation';
import { useToast } from 'lib/toast';
import { useCustomerList } from './useCustomerList';
import { createCustomer, deleteCustomer, fetchCustomers, updateCustomer } from '../api/customerAPI';
export const useCustomer = () => {
  const [customers, setCustomers] = useState<Customer[]>(defaultListCustomers);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [sortConfig, setSortConfig] = useState<{ key: SortKey; direction: SortDirection } | null>(
    null,
  );

  // State quản lý modals
  const [isAddModalOpen, setIsAddModalOpen] = useState<boolean>(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState<boolean>(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState<number | null>(null);

  // State cho form
  const [newCustomer, setNewCustomer] = useState<Customer>(defaultNewCustomer);
  const [currentCustomerIndex, setCurrentCustomerIndex] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  // State cho Toast Notification
  // Global toast
  const { showToast } = useToast();

  // Tách lọc/sắp xếp ra hook riêng
  const { filteredAndSortedCustomers, requestSort: buildSort } = useCustomerList(
    customers,
    searchTerm,
    sortConfig,
  );

  const requestSort = (key: SortKey): void => setSortConfig((prev) => buildSort(key, prev));

  // Xử lý thay đổi form nhập (Dùng chung cho Add và Edit)
  const handleInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>): void => {
      const { name, value } = e.target;
      if (name in newCustomer) {
        // Ép kiểu 'name' thành keyof Customer để đảm bảo tính an toàn kiểu
        setNewCustomer((prev) => ({ ...prev, [name as keyof Customer]: value }));
      }
    },
    [newCustomer],
  );

  // Hàm xử lý thêm khách hàng mới
  const handleSubmitNewCustomer = async (e: React.FormEvent): Promise<void> => {
    e.preventDefault();

    const customerToAdd: Customer = {
      ...newCustomer,
      firstName: newCustomer.firstName.trim() || 'No Name',
      lastName: newCustomer.lastName.trim() || 'No Last Name',
    };

    // Validate customer data
    const validationErrors = validateCustomer(customerToAdd);
    if (validationErrors.length > 0) {
      showToast(`❌ ${validationErrors[0]}`);
      return;
    }

    // Kiểm tra trùng lặp PerId
    if (isDuplicatePerId(customerToAdd.perId, customers)) {
      showToast('❌ Lỗi: CCCD đã tồn tại.');
      return;
    }

    // Gọi API để tạo khách hàng
    setIsLoading(true);
    try {
      const cusResponse = await createCustomer(customerToAdd);
      // Chỉ cập nhật state nếu API thành công
      setCustomers((prev) => [...prev, cusResponse]);
      setIsAddModalOpen(false);
      setNewCustomer(defaultNewCustomer);
      showToast(
        `✅ Đã thêm khách hàng "${customerToAdd.lastName} ${customerToAdd.firstName}" thành công!`,
      );
    } catch (err) {
      // Xử lý lỗi từ API
      const errorMsg = err instanceof Error ? err.message : 'Lỗi không xác định';
      showToast(`❌ Lỗi: ${errorMsg}`);
    } finally {
      setIsLoading(false);
    }
  };

  // Xử lý khi nhấn nút Xóa
  const handleDeleteClick = (customerIndex: number): void => {
    // Tìm khách hàng gốc dựa trên khách hàng đã lọc/sắp xếp
    const customerToDelete = filteredAndSortedCustomers[customerIndex];
    // Tìm index gốc trong mảng 'customers' không bị lọc/sắp xếp
    const originalIndex = customers.findIndex((c) => c.perId === customerToDelete.perId);

    if (originalIndex !== -1) {
      setIsDeleteModalOpen(originalIndex);
    }
  };

  // Xử lý xóa khách hàng
  const confirmDeleteCustomer = async (): Promise<void> => {
    if (isDeleteModalOpen !== null) {
      const customer = customers[isDeleteModalOpen];
      const fullName = `${customer.lastName} ${customer.firstName}`;

      // Gọi API để tạo khách hàng
      setIsLoading(true);
      try {
        await deleteCustomer(customer.id);
        // Chỉ cập nhật state nếu API thành công
        setCustomers((prevCustomers) =>
          prevCustomers.filter((_, idx) => idx !== isDeleteModalOpen),
        );
        setIsDeleteModalOpen(null);
        showToast(`✅ Đã xóa khách hàng "${fullName}" thành công!`);
      } catch (err) {
        // Xử lý lỗi từ API
        const errorMsg = err instanceof Error ? err.message : 'Lỗi không xác định';
        showToast(`❌ Lỗi: ${errorMsg}`);
      } finally {
        setIsLoading(false);
      }
    }
  };
  // Xử lý khi nhấn nút Sửa
  const handleEditClick = (customerIndex: number): void => {
    // Tìm khách hàng gốc dựa trên khách hàng đã lọc/sắp xếp
    const customerToEdit = filteredAndSortedCustomers[customerIndex];
    // Tìm index gốc trong mảng 'customers' không bị lọc/sắp xếp
    const originalIndex = customers.findIndex((c) => c.perId === customerToEdit.perId);

    if (originalIndex !== -1) {
      setNewCustomer(customerToEdit);
      setCurrentCustomerIndex(originalIndex);
      setIsEditModalOpen(true);
    }
  };
  // Hàm xử lý sửa thông tin khách hàng
  const handleUpdateCustomer = async (e: React.FormEvent): Promise<void> => {
    e.preventDefault();
    if (currentCustomerIndex === null) return;

    const customerToUpdate: Customer = {
      ...newCustomer,
      firstName: newCustomer.firstName.trim() || 'No Name',
      lastName: newCustomer.lastName.trim() || 'No Last Name',
    };

    // Validate customer data
    const validationErrors = validateCustomer(customerToUpdate);
    if (validationErrors.length > 0) {
      showToast(`❌ ${validationErrors[0]}`);
      return;
    }

    // Kiểm tra trùng lặp PerId (nếu đang sửa, bỏ qua chính khách hàng đó)
    if (isDuplicatePerId(customerToUpdate.perId, customers, currentCustomerIndex)) {
      showToast('❌ Lỗi: ID Cá nhân đã tồn tại.');
      return;
    }

    // Gọi API để tạo khách hàng
    setIsLoading(true);
    try {
      const cusResponse = await updateCustomer(customerToUpdate.id, customerToUpdate);
      // Chỉ cập nhật state nếu API thành công
      setCustomers((prevCustomers) =>
        prevCustomers.map((customer, idx) =>
          idx === currentCustomerIndex ? cusResponse : customer,
        ),
      );
      setIsEditModalOpen(false);
      setNewCustomer(defaultNewCustomer);
      setCurrentCustomerIndex(null);
      showToast(
        `✅ Đã cập nhật thông tin khách hàng "${customerToUpdate.lastName} ${customerToUpdate.firstName}" thành công!`,
      );
    } catch (err) {
      // Xử lý lỗi từ API
      const errorMsg = err instanceof Error ? err.message : 'Lỗi không xác định';
      showToast(`❌ Lỗi: ${errorMsg}`);
    } finally {
      setIsLoading(false);
    }
  };

  //Hàm xử lý refreshClick
  const handleRefreshClick = async (): Promise<void> => {
    // Gọi API để làm mới danh sách
    setIsLoading(true);
    try {
      const customers = await fetchCustomers();
      setCustomers(customers);
      showToast(`✅ Đã làm mới thành công!`);
    } catch (err) {
      // Xử lý lỗi từ API
      const errorMsg = err instanceof Error ? err.message : 'Lỗi không xác định';
      showToast(`❌ Lỗi: ${errorMsg}`);
    } finally {
      setIsLoading(false);
    }
  };

  //Hàm loadCustomers
  const loadCustomers = async () => {
    // 1. Reset trạng thái
    setIsLoading(true);
    try {
      // 2. Thực hiện fetch
      const fetchedCustomers = await fetchCustomers();
      // 3. Cập nhật state
      setCustomers(fetchedCustomers);
      showToast(`✅ Đã nạp dữ liệu thành công!`);
    } catch (err: any) {
      // Xử lý lỗi từ API
      const errorMsg = err instanceof Error ? err.message : 'Lỗi không xác định';
      showToast(`❌ Lỗi: ${errorMsg}`);
    } finally {
      setIsLoading(false);
    }
  };
  // Load dữ liệu khi reder
  useEffect(() => {
    loadCustomers();
  }, []);
  return {
    // State
    customers,
    filteredAndSortedCustomers,
    searchTerm,
    sortConfig,
    isAddModalOpen,
    isEditModalOpen,
    isDeleteModalOpen,
    newCustomer,
    isLoading,

    // Handlers
    setSearchTerm,
    requestSort,
    handleEditClick,
    handleDeleteClick,
    confirmDeleteCustomer,
    handleSubmitNewCustomer,
    handleUpdateCustomer,
    handleInputChange,
    handleRefreshClick,
    // Modal Controllers
    setIsAddModalOpen,
    setIsEditModalOpen,
    setIsDeleteModalOpen,
    setNewCustomer,
    defaultNewCustomer,
  };
};
