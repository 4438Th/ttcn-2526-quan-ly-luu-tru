import { useMemo } from 'react';
import type { Customer, SortKey, SortDirection } from '../types';

export const useCustomerList = (
  customers: Customer[],
  searchTerm: string,
  sortConfig: { key: SortKey; direction: SortDirection } | null,
) => {
  const filteredAndSortedCustomers = useMemo<Customer[]>(() => {
    let list = [...customers];

    if (searchTerm) {
      const lc = searchTerm.toLowerCase();
      list = list.filter(
        (c) =>
          c.firstName.toLowerCase().includes(lc) ||
          c.lastName.toLowerCase().includes(lc) ||
          c.perId.toLowerCase().includes(lc) ||
          c.phone.toLowerCase().includes(lc) ||
          c.address.toLowerCase().includes(lc),
      );
    }

    if (sortConfig !== null) {
      list.sort((a, b) => {
        let aValue = '' as string;
        let bValue = '' as string;

        if (sortConfig.key === 'fullName') {
          aValue = `${a.lastName} ${a.firstName}`;
          bValue = `${b.lastName} ${b.firstName}`;
        } else {
          const key = sortConfig.key as keyof Customer;
          aValue = (a[key] ?? '') as string;
          bValue = (b[key] ?? '') as string;
        }

        if (aValue < bValue) return sortConfig.direction === 'asc' ? -1 : 1;
        if (aValue > bValue) return sortConfig.direction === 'asc' ? 1 : -1;
        return 0;
      });
    }

    return list;
  }, [customers, searchTerm, sortConfig]);

  const requestSort = (
    key: SortKey,
    currentSort: { key: SortKey; direction: SortDirection } | null,
  ) => {
    let direction: SortDirection = 'asc';
    if (currentSort && currentSort.key === key && currentSort.direction === 'asc')
      direction = 'desc';
    return { key, direction } as { key: SortKey; direction: SortDirection };
  };

  return { filteredAndSortedCustomers, requestSort };
};

export default useCustomerList;
