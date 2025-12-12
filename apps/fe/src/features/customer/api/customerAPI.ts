import { apiClient } from 'lib/apiClient';
import { type Customer } from '../types';

// Đường dẫn cơ sở cho API khách hàng
const PATH = '/quanlyluutru/customers';

/**
 * Tạo khách hàng mới
 * @param data Dữ liệu khách hàng để tạo
 * @returns Promise<Customer> Khách hàng đã được tạo (từ trường 'result' của ApiResponse)
 */
export const createCustomer = async (data: Customer): Promise<Customer> => {
  return apiClient.post<Customer>(PATH, data);
};

/**
 * Lấy tất cả khách hàng
 * @returns Promise<Customer[]> Mảng khách hàng (từ trường 'result' của ApiResponse)
 */
export const fetchCustomers = async (): Promise<Customer[]> => {
  return apiClient.get<Customer[]>(PATH);
};

/**
 * Cập nhật thông tin khách hàng
 * @param id ID của khách hàng cần cập nhật
 * @param data Dữ liệu cập nhật
 * @returns Promise<Customer> Khách hàng đã được cập nhật
 */
export const updateCustomer = async (id: string, data: Customer): Promise<Customer> => {
  return apiClient.put<Customer>(`${PATH}/${id}`, data);
};

/**
 * Xóa khách hàng
 * @param id ID của khách hàng cần xóa
 * @returns Promise<void> Trả về void (từ trường 'result' của ApiResponse, có thể là null/void)
 */
export const deleteCustomer = async (id: string): Promise<string> => {
  return apiClient.del<string>(`${PATH}/${id}`);
};

/**
 * Lấy thông tin khách hàng bằng ID
 * @param id ID của khách hàng
 * @returns Promise<Customer | null> Khách hàng hoặc null nếu không tìm thấy (404)
 */
export const getCustomerById = async (id: string): Promise<Customer | null> => {
  try {
    return await apiClient.get<Customer>(`${PATH}/${id}`);
  } catch (err: any) {
    // Xử lý lỗi HTTP 404 được ném ra từ apiClient
    if (err?.status === 404) return null;
    throw err;
  }
};

export const customerApi = {
  create: createCustomer,
  fetchAll: fetchCustomers,
  getById: getCustomerById,
  update: updateCustomer,
  delete: deleteCustomer,
};

export default customerApi;
