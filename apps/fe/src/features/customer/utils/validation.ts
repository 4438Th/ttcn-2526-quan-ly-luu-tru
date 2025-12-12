import { type Customer } from '../types';

/**
 * Validate customer data and return array of error messages
 * @param customer Customer object to validate
 * @returns Array of error messages (empty if valid)
 */
export const validateCustomer = (customer: Customer): string[] => {
  const errors: string[] = [];

  // Validate firstName
  if (!customer.firstName || !customer.firstName.trim()) {
    errors.push('Tên không được rỗng');
  }

  // Validate lastName
  if (!customer.lastName || !customer.lastName.trim()) {
    errors.push('Họ không được rỗng');
  }

  // Validate phone
  if (!customer.phone || !customer.phone.trim()) {
    errors.push('Số điện thoại không được rỗng');
  } else if (!/^[0-9]{10,11}$/.test(customer.phone.replace(/[^\d]/g, ''))) {
    errors.push('Số điện thoại phải có 10-11 chữ số');
  }

  // Validate address (optional but if provided should not be empty)
  if (customer.address && customer.address.trim().length > 100) {
    errors.push('Địa chỉ không được vượt quá 100 ký tự');
  }

  // Validate perId (optional but if provided should be valid)
  if (customer.perId && customer.perId.trim().length > 0) {
    if (!/^[0-9]{9,12}$/.test(customer.perId)) {
      errors.push('ID Cá nhân phải là 9-12 chữ số');
    }
  }

  return errors;
};

/**
 * Check if a perId already exists in customer list
 * @param perId ID to check
 * @param customers List of existing customers
 * @param excludeIndex Index to exclude (for edit operations)
 * @returns true if duplicate found
 */
export const isDuplicatePerId = (
  perId: string,
  customers: Customer[],
  excludeIndex?: number,
): boolean => {
  if (!perId || perId.trim() === '') return false;
  return customers.some((c, idx) => c.perId === perId && idx !== excludeIndex);
};
