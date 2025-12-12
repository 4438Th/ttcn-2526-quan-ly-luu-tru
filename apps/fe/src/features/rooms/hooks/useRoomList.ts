import { useMemo } from 'react';
import type { Room, SortKey, SortDirection } from '../types';

export const useRoomList = (
  rooms: Room[],
  searchTerm: string,
  sortConfig: { key: SortKey; direction: SortDirection } | null,
) => {
  const filteredAndSortedRooms = useMemo<Room[]>(() => {
    let list = [...rooms];

    if (searchTerm) {
      const lc = searchTerm.toLowerCase();
      list = list.filter(
        (r) =>
          r.roomName.toLowerCase().includes(lc) ||
          r.state.toLowerCase().includes(lc) ||
          r.price.toString().includes(lc),
      );
    }

    if (sortConfig !== null) {
      list.sort((a, b) => {
        let aValue = '' as string;
        let bValue = '' as string;

        const key = sortConfig.key as keyof Room;
        aValue = (a[key] ?? '') as string;
        bValue = (b[key] ?? '') as string;

        if (aValue < bValue) return sortConfig.direction === 'asc' ? -1 : 1;
        if (aValue > bValue) return sortConfig.direction === 'asc' ? 1 : -1;
        return 0;
      });
    }

    return list;
  }, [rooms, searchTerm, sortConfig]);

  const requestSort = (
    key: SortKey,
    currentSort: { key: SortKey; direction: SortDirection } | null,
  ) => {
    let direction: SortDirection = 'asc';
    if (currentSort && currentSort.key === key && currentSort.direction === 'asc')
      direction = 'desc';
    return { key, direction } as { key: SortKey; direction: SortDirection };
  };

  return { filteredAndSortedRooms, requestSort };
};

export default useRoomList;
