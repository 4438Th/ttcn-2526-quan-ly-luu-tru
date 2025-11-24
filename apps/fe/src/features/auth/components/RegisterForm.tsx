import { useState, useEffect, useCallback } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth'; // Import hook đã tạo
import { User, Lock, Loader2, CheckCircle } from 'lucide-react';
// Component Form Đăng Ký
const RegisterForm: React.FC = () => {
  // Lấy hàm register, trạng thái, và lỗi từ Auth Context
  const { register, isLoading, error } = useAuth();
  const navigate = useNavigate();

  // State quản lý dữ liệu nhập
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [userName, setUserName] = useState('');
  const [passWord, setPassWord] = useState('');
  const [registerError, setRegisterError] = useState<string | null>(null);
  const [isRegistered, setIsRegistered] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Hàm xử lý submit
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setRegisterError(null);
    // Kiểm tra cơ bản
    if (!firstName || !lastName || !userName || !passWord) {
      setRegisterError('Vui lòng nhập đầy đủ tất cả các trường.');
      setIsSubmitting(false);
      return;
    }

    try {
      // Gọi hàm register từ Auth Context
      await register({ firstName, lastName, userName, passWord });
      // sau khi re-render từ isLoading=false đã ổn định.
      setTimeout(() => {
        setIsRegistered(true);
        setRegisterError(null);
      }, 0);
    } catch (err: any) {
      // Lỗi từ useAuth đã được xử lý từ API
      setIsRegistered(false);
      setRegisterError(err.message);
    } finally {
      setIsSubmitting(false); // Kết thúc submit
    }
  };
  const inputClasses =
    'w-full px-4 py-3 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-150 shadow-sm placeholder:text-gray-400';

  // Hàm xử lý điều hướng đến login
  const handleNavigateToLogin = useCallback(() => {
    setIsRegistered(false);
    navigate('/login'); // Chuyển hướng
  }, [navigate]);

  // Tự chuyển hướng
  useEffect(() => {
    let timer: number;
    if (isRegistered) {
      timer = setTimeout(() => {
        handleNavigateToLogin();
      }, 500);
    }
    // Cleanup function để xóa timer
    return () => {
      if (timer) {
        clearTimeout(timer);
      }
    };
  }, [isRegistered, handleNavigateToLogin]);

  // Biến hiển thị lỗi cuối cùng (ưu tiên lỗi cục bộ, sau đó là lỗi API/Context)
  const displayError = registerError || error;
  return (
    // Nền xám nhạt, đặt form ở giữa
    <div className="bg-gray-100 min-h-screen flex items-center justify-center">
      {/* THÔNG BÁO THÀNH CÔNG - Toast*/}
      {isRegistered && (
        <div className="fixed top-0 left-1/2 -translate-x-1/2 p-4 z-50 w-full max-w-sm animate-slide-down">
          <div className="bg-linear-to-r from-green-500 to-emerald-600 text-white p-6 rounded-2xl shadow-2xl flex items-center transition-opacity duration-500 transform scale-100 border border-green-700/50">
            {/* Icon lớn và nổi bật */}
            <CheckCircle className="w-8 h-8 mr-4 flex-0 stroke-2 text-white" />

            {/* Nội dung thông báo */}
            <div>
              <p className="text-lg font-bold">Thành Công!</p>
              <p className="text-sm mt-0.5 opacity-90">
                Đăng ký hoàn tất. Đang chuyển hướng đến trang đăng nhập.
              </p>
              {/* Thanh tiến trình chuyển hướng giả lập (Tùy chọn) */}
              <div className="mt-2 h-1 bg-white/30 rounded-full overflow-hidden">
                <div
                  className="h-full bg-white animate-pulse"
                  style={{ width: '100%', animationDuration: '3s' }}
                ></div>
              </div>
            </div>
          </div>
        </div>
      )}
      {/* Form container */}
      <div
        className={`max-w-xl w-full bg-white p-8 rounded-xl shadow-2xl border border-gray-200 transition duration-300 ${isRegistered ? 'opacity-50 pointer-events-none' : 'opacity-100'}`}
      >
        <h2 className="text-3xl font-extrabold text-blue-600 mb-6 text-center">
          Tạo tài khoản mới
        </h2>
        <p className="text-center text-sm mb-6 text-gray-500">
          Đã có tài khoản?
          <Link
            to="/login" // Link chuyển giao diện đăng nhập
            className="text-blue-600 hover:text-blue-800 font-medium transition duration-150 ml-1"
          >
            Đăng nhập ngay
          </Link>
        </p>

        {/* Hiển thị lỗi từ Context hoặc lỗi cục bộ */}
        {displayError && !isRegistered && (
          <div
            className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg relative mb-6 text-sm"
            role="alert"
          >
            {/* Sử dụng displayError đã tính toán ở trên */}
            <span className="block sm:inline font-medium">{displayError}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Họ và Tên (Đã tách) */}
          <div className="flex space-x-4">
            <div className="w-1/2">
              <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-1">
                Họ
              </label>
              <input
                id="firstName"
                type="text"
                required
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                className={inputClasses}
                placeholder="Nguyễn"
              />
            </div>
            <div className="w-1/2">
              <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-1">
                Tên
              </label>
              <input
                id="lastName"
                type="text"
                required
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                className={inputClasses}
                placeholder="Văn A"
              />
            </div>
          </div>

          {/* Tên người dùng */}
          <div>
            <label htmlFor="userName" className="block text-sm font-medium text-gray-700 mb-1">
              Tên người dùng
            </label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                id="userName"
                type="text"
                required
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
                className={`${inputClasses} pl-10`}
                placeholder="nguyenvana123"
              />
            </div>
          </div>

          {/* Mật khẩu */}
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
              Mật khẩu
            </label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                id="password"
                type="password"
                required
                value={passWord}
                onChange={(e) => setPassWord(e.target.value)}
                className={`${inputClasses} pl-10`}
                placeholder="••••••••"
              />
            </div>
          </div>

          {/* Nút Đăng ký (Sử dụng gradient xanh dương) */}
          <button
            type="submit"
            disabled={isLoading}
            className={`w-full flex items-center justify-center py-3 px-4 rounded-lg shadow-lg text-lg font-medium text-white transition duration-300 transform hover:shadow-xl
                              ${
                                isSubmitting
                                  ? 'bg-blue-400 cursor-not-allowed'
                                  : 'bg-blue-600 hover:bg-blue-700 hover:scale-[1.01]'
                              }
                          `}
          >
            {isLoading ? (
              <>
                <Loader2 className="animate-spin h-5 w-5 mr-3 text-white" />
                Đang xử lý...
              </>
            ) : (
              'Đăng ký tài khoản'
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default RegisterForm;
