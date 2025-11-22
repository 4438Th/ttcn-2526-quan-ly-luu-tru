import { User as UserIcon, ChevronDown, LogOut, Settings, LogIn, UserPlus } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
// --- Định nghĩa kiểu Props cho TopBar ---
interface TopBarProps {
  profileRef: React.RefObject<HTMLDivElement | null>;
  isProfileMenuOpen: boolean;
  setIsProfileMenuOpen: React.Dispatch<React.SetStateAction<boolean>>;
  fullName: string;
  isLoggedIn: boolean;
  logout: () => void;
}

const TopBar: React.FC<TopBarProps> = ({
  profileRef,
  isProfileMenuOpen,
  setIsProfileMenuOpen,
  fullName,
  isLoggedIn,
  logout,
}) => {
  const navigate = useNavigate();
  const handleLogout = () => {
    logout(); // Xóa trạng thái Auth
    navigate('/'); // Dùng hook navigate để chuyển hướng mượt mà
  };
  return (
    // Gán profileRef cho phần tử chứa nút Profile và Dropdown
    <div className="flex items-center justify-between h-16 px-4 bg-white border-b border-gray-100 shadow-sm">
      {/* 1. Logo */}
      <a href="/">
        <div className="flex items-center">
          <div className="w-12 h-12 mr-2 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold text-lg">
            QLLT
          </div>
          <div className="hidden sm:block">
            <span className="text-xl font-extrabold text-gray-800">Quản lý lưu trú</span>
          </div>
        </div>
      </a>

      {/* 2. Right Section (Tên người dùng & Profile Dropdown) */}
      <div className="flex items-center space-x-3 relative" ref={profileRef}>
        {/* Nút Profile */}
        <button
          className="flex items-center p-1 rounded-full hover:bg-gray-100 transition focus:outline-none"
          onClick={() => setIsProfileMenuOpen(!isProfileMenuOpen)}
        >
          {/* Tên người dùng động */}
          <span className="text-sm font-semibold text-gray-700 sm:block mr-2">{fullName}</span>

          {/* Avatar User */}
          <div className="w-9 h-9 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 border border-blue-300">
            <UserIcon className="w-5 h-5" />
          </div>
          {/* Thêm ChevronDown icon để báo hiệu Dropdown */}
          <ChevronDown
            className={`w-4 h-4 ml-1 text-gray-500 transition-transform duration-200 ${isProfileMenuOpen ? 'rotate-180' : ''}`}
          />
        </button>

        {/* Menu Dropdown */}
        {isProfileMenuOpen && (
          <div className="absolute right-0 top-12 mt-2 w-56 rounded-lg shadow-xl bg-white ring-1 ring-black ring-opacity-5 z-40 transform translate-y-1">
            <div className="py-1">
              {isLoggedIn ? (
                // HIỂN THỊ KHI ĐÃ ĐĂNG NHẬP
                <>
                  <a
                    href="#profile"
                    className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition"
                    onClick={() => setIsProfileMenuOpen(false)}
                  >
                    <Settings className="w-4 h-4 mr-3" />
                    Thông tin tài khoản
                  </a>

                  <button
                    className="w-full text-left flex items-center px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition border-t border-gray-100 mt-1 pt-2"
                    onClick={() => {
                      handleLogout();
                      setIsProfileMenuOpen(false);
                    }}
                  >
                    <LogOut className="w-4 h-4 mr-3" />
                    Đăng xuất
                  </button>
                </>
              ) : (
                // HIỂN THỊ KHI CHƯA ĐĂNG NHẬP
                <>
                  <a
                    href="/login"
                    className="w-full text-left flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition"
                    onClick={() => setIsProfileMenuOpen(false)}
                  >
                    <LogIn className="w-4 h-4 mr-3 text-blue-500" />
                    Đăng nhập
                  </a>
                  <a
                    href="/register"
                    className="w-full text-left flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition border-t border-gray-100 mt-1 pt-2"
                    onClick={() => setIsProfileMenuOpen(false)}
                  >
                    <UserPlus className="w-4 h-4 mr-3 text-green-500" />
                    Đăng ký
                  </a>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default TopBar;
