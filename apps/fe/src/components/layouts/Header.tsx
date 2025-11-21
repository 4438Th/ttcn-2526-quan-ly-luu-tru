import LogoutButton from 'features/auth/components/LogoutButton';
const UserIcon: React.FC = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="18"
    height="18"
    fill="currentColor"
    className="bi bi-person-fill"
    viewBox="0 0 16 16"
  >
    <path d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H3zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6z" />
  </svg>
);
const Header: React.FC = () => {
  const userName: string = 'Nguyễn Văn A';
  return (
    // Header chính: sticky top, border bottom, shadow nhẹ
    <header className="sticky top-0 z-10 bg-white shadow-md">
      {/* Container: Tối đa hóa chiều rộng, căn giữa, padding ngang */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-3 flex justify-between items-center">
        {/* Logo/Thương hiệu */}
        <div className="logo">
          <a href="#" className="text-decoration-none focus:outline-none">
            <h1 className="text-xl md:text-2xl font-extrabold text-blue-600 hover:text-blue-700 transition duration-150">
              Khách sạn
            </h1>
          </a>
        </div>

        {/* Profile Section */}
        <div className="profile">
          <ul className="flex items-center space-x-4 list-none p-0 m-0">
            {/* Tên người dùng */}
            <li className="text-gray-600 font-medium text-sm md:text-base hidden sm:block">
              {userName}
            </li>

            {/* Icon User */}
            <li>
              <a href="#" aria-label="Profile" className="block focus:outline-none">
                <UserIcon />
              </a>
            </li>
          </ul>
          <LogoutButton></LogoutButton>
        </div>
      </div>
    </header>
  );
};
export default Header;
