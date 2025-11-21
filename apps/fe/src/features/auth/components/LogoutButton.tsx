import { useAuth } from '../hooks/useAuth';
import { useNavigate } from 'react-router-dom';

const LogoutButton: React.FC = () => {
  // Lấy hàm logout từ context
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout(); // Thực hiện hủy trạng thái
    navigate('/login'); // Chuyển hướng người dùng về trang đăng nhập
  };

  return (
    <button
      onClick={handleLogout}
      className="py-2 px-4 bg-red-600 text-white rounded-lg hover:bg-red-700 transition"
    >
      Đăng Xuất
    </button>
  );
};

export default LogoutButton;
