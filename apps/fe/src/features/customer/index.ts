// Barrel export for customer feature - public API
export { default as CustomerView } from './components/CustomerView';
export { useCustomer } from './hooks/useCustomer';
export type { Customer, ToastConfig, SortKey, SortDirection } from './types';
export { validateCustomer, isDuplicatePerId } from './utils/validation';
export {
  createCustomer,
  fetchCustomers,
  updateCustomer,
  deleteCustomer,
  getCustomerById,
  customerApi,
} from './api/customerAPI';
