import { useState, useRef, useEffect } from 'react';
import { useAuth } from 'features/auth/hooks/useAuth';
import TopBar from 'components/common/Topbar';
import BottomMenu from 'components/common/BottomMenu';
// Import các icon cần thiết từ lucide-react
import { House, CalendarDays, CreditCard, Users } from 'lucide-react';

// 1. ĐỊNH NGHĨA KIỂU DỮ LIỆU (INTERFACE)
export interface NavItem {
  name: string;
  href: string;
  current: boolean;
  icon: React.ElementType; // Sử dụng React.ElementType cho icon component
}
// 2. KHAI BÁO MẢNG GIÁ TRỊ (CONST)
const navItems: NavItem[] = [
  { name: 'Phòng', href: '#phong', current: true, icon: House },
  { name: 'Lưu trú', href: '#luutru', current: false, icon: CalendarDays },
  { name: 'Hóa đơn', href: '#hoadon', current: false, icon: CreditCard },
  { name: 'Khách hàng', href: '#khachhang', current: false, icon: Users },
];

// Component Header
const Header: React.FC = () => {
  const profileRef = useRef<HTMLDivElement | null>(null);

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);

  const { user, logout, isLoggedIn } = useAuth();

  const fullName = isLoggedIn
    ? user?.firstName && user?.lastName
      ? `${user.firstName} ${user.lastName}`
      : user?.userName || 'Người dùng'
    : 'Khách';

  // Logic đóng menu khi click ra ngoài
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        profileRef.current &&
        event.target instanceof Node &&
        !profileRef.current.contains(event.target)
      ) {
        setIsProfileMenuOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside as (e: MouseEvent) => void);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside as (e: MouseEvent) => void);
    };
  }, [profileRef]);

  return (
    <header className="sticky top-0 left-0 right-0 z-30">
      {/* TRUYỀN PROPS ĐẦY ĐỦ VÀO TOPBAR */}
      <TopBar
        profileRef={profileRef}
        isProfileMenuOpen={isProfileMenuOpen}
        setIsProfileMenuOpen={setIsProfileMenuOpen}
        fullName={fullName}
        isLoggedIn={isLoggedIn}
        logout={logout}
      />

      {/* TRUYỀN PROPS ĐẦY ĐỦ VÀO BOTTOMMENU */}
      <BottomMenu
        navItems={navItems}
        isMenuOpen={isMenuOpen}
        setIsMenuOpen={setIsMenuOpen}
        isLoggedIn={isLoggedIn}
        logout={logout}
      />

      {/* Menu Mobile Dropdown */}
      {isMenuOpen && (
        <div className="md:hidden bg-blue-700 p-4 space-y-2">
          {navItems.map((item) => (
            <a
              key={item.name}
              href={item.href}
              className="block px-3 py-2 text-white hover:bg-blue-600 rounded-md text-base font-medium"
              onClick={() => setIsMenuOpen(false)}
            >
              {item.name}
            </a>
          ))}
        </div>
      )}
    </header>
  );
};
export default Header;
