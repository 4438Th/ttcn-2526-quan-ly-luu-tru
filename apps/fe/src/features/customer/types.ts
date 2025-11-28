export interface Customer {
  id: string;
  perId: string;
  firstName: string;
  lastName: string;
  address: string;
  phone: string;
}

// Dữ liệu khởi tạo (Mảng rỗng)
export const defaultListCustomers: Customer[] = [];

// Khởi tạo đối tượng Khách hàng mới (Form reset template)
export const defaultNewCustomer: Customer = {
  id: '',
  perId: '',
  firstName: '',
  lastName: '',
  address: '',
  phone: '',
};
export interface ToastConfig {
  message: string;
  isVisible: boolean;
}
export type SortKey = keyof Customer | 'fullName';
export type SortDirection = 'asc' | 'desc';
