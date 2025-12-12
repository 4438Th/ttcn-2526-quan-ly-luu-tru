import { type SortKey, type SortDirection } from '../types';
import { ChevronDown, ChevronUp } from 'lucide-react';
interface SortableHeaderProps {
  name: string;
  sortKey: SortKey;
  sortConfig: { key: SortKey; direction: SortDirection } | null;
  requestSort: (key: SortKey) => void;
}

const SortableHeader: React.FC<SortableHeaderProps> = ({
  name,
  sortKey,
  sortConfig,
  requestSort,
}) => {
  const isCurrent = sortConfig?.key === sortKey;
  const direction = sortConfig?.direction;

  return (
    <th
      className="px-4 sm:px-6 py-3 text-left items-center justify-center text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer select-none hover:bg-gray-100 transition duration-150"
      onClick={() => requestSort(sortKey)}
    >
      <div className="flex items-center justify-center space-x-1">
        <span>{name}</span>
        <span className="flex flex-col">
          <ChevronUp
            size={12}
            className={`-mb-1 ${isCurrent && direction === 'asc' ? 'text-blue-600' : 'text-gray-300'}`}
          />
          <ChevronDown
            size={12}
            className={`mt-0 ${isCurrent && direction === 'desc' ? 'text-blue-600' : 'text-gray-300'}`}
          />
        </span>
      </div>
    </th>
  );
};
export default SortableHeader;
