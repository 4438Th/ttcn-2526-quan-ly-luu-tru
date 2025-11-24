import { useRef, useState } from 'react';
import { useAuth } from 'features/auth/hooks/useAuth';
import TopBar from 'components/common/Topbar';
const HomeHeader: React.FC = () => {
  const profileRef = useRef<HTMLDivElement | null>(null);
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const { user, logout, isLoggedIn } = useAuth();

  const fullName = isLoggedIn
    ? user?.firstName && user?.lastName
      ? `${user.firstName} ${user.lastName}`
      : user?.userName || 'Người dùng'
    : 'Khách';

  return (
    <>
      <TopBar
        profileRef={profileRef}
        isProfileMenuOpen={isProfileMenuOpen}
        setIsProfileMenuOpen={setIsProfileMenuOpen}
        fullName={fullName}
        isLoggedIn={isLoggedIn}
        logout={logout}
      />
    </>
  );
};
export default HomeHeader;
