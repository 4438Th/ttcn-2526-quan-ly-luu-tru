import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { CalendarPlus, Menu } from 'lucide-react';
import type { NavItem } from 'components/layouts/AdminHeader';
// Import NavItem type từ Header

// --- Định nghĩa kiểu Props cho BottomMenu ---
interface BottomMenuProps {
  navItems: NavItem[]; // Danh sách các mục điều hướng
  setIsMenuOpen: React.Dispatch<React.SetStateAction<boolean>>;
  isMenuOpen: boolean;
  isLoggedIn: boolean;
  logout: () => void;
}

const BottomMenu: React.FC<BottomMenuProps> = ({ navItems, setIsMenuOpen, isMenuOpen }) => {
  // Màu cho item
  const myDarkBlue = 'bg-blue-700';
  const myBlue = 'bg-blue-600';
  const [menuItems, setMenuItems] = useState(navItems);

  const handleMenuItemClick = (name: string) => {
    // 1. Tạo một mảng newMenuItems dựa trên item được click
    const newMenuItems = menuItems.map((item) => ({
      ...item,
      // Nếu tên item trùng với item được click, set current=true, ngược lại set current=false
      current: item.name === name,
    }));

    // 4. Cập nhật State, kích hoạt re-render
    setMenuItems(newMenuItems);
  };
  return (
    <div className={`flex items-center justify-between h-14 px-4 ${myBlue} text-white`}>
      {/* Menu chính (Desktop) */}
      <nav className="hidden md:flex space-x-1">
        {navItems.map((item) => {
          const Icon = item.icon;
          return (
            <button
              key={item.name}
              className={`
            relative px-4 py-2 text-sm font-medium rounded-t-lg transition duration-200 
            ${
              item.current
                ? `text-white ${myDarkBlue} shadow-inner` // Style khi được chọn
                : 'text-blue-600 bg-white' // Style khi không được chọn
            }`}
              onClick={() => handleMenuItemClick(item.name)}
            >
              <Link
                to={item.href}
                // Áp dụng style cho mục đang được chọn
              >
                <div className="flex items-center">
                  <Icon className="w-5 h5 me-2"></Icon>
                  {item.name}
                </div>
              </Link>
            </button>
          );
        })}
      </nav>

      {/* Nút Lễ tân */}
      <button
        className="flex items-center px-4 py-2 bg-white text-blue-600 font-bold rounded-lg shadow-md hover:bg-gray-100 transition duration-150 text-sm"
        title="Chuyển đến giao diện Lễ tân"
      >
        <Link to="/receptionist">
          <div className="flex items-center">
            <CalendarPlus className="w-4 h-4 mr-2" />
            <div>Lễ tân</div>
          </div>
        </Link>
      </button>

      {/* Menu Icon cho Mobile (Ẩn trên Desktop) */}
      <button
        className="md:hidden p-2 rounded-full hover:bg-blue-500 transition"
        onClick={() => setIsMenuOpen(!isMenuOpen)}
      >
        <Menu className="w-6 h-6" />
      </button>
    </div>
  );
};

export default BottomMenu;
