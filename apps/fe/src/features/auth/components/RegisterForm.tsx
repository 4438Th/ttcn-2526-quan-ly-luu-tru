import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth'; // Import hook đã tạo
import { User, Lock, Loader2 } from 'lucide-react';
// Component Form Đăng Ký
const RegisterForm: React.FC = () => {
  // Lấy hàm register, trạng thái, và lỗi từ Auth Context
  const { register, isLoading, error, isLoggedIn } = useAuth();
  const navigate = useNavigate();

  // State quản lý dữ liệu nhập
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [userName, setUserName] = useState('');
  const [passWord, setPassWord] = useState('');
  const [registerError, setRegisterError] = useState<string | null>(null);

  // Nếu người dùng đã đăng nhập, chuyển hướng ngay lập tức
  useEffect(() => {
    if (isLoggedIn) {
      navigate('/');
    }
  }, [isLoggedIn, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setRegisterError(null);

    // Kiểm tra cơ bản
    if (!firstName || !lastName || !userName || !passWord) {
      setRegisterError('Vui lòng nhập đầy đủ tất cả các trường.');
      return;
    }

    try {
      // Gọi hàm register từ Auth Context
      await register({ firstName, lastName, userName, passWord });

      // Chuyển hướng sau khi đăng ký thành công
      navigate('/');
    } catch (err: any) {
      // Lỗi từ useAuth đã được xử lý từ API
      setRegisterError(error || err.message || 'Đăng ký thất bại. Vui lòng thử lại.');
    }
  };
  const inputClasses =
    'w-full px-4 py-3 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-150 shadow-sm placeholder:text-gray-400';

  return (
    // Nền xám nhạt, đặt form ở giữa
    <div className="bg-gray-100 min-h-screen flex items-center justify-center">
      {/* Form Container (Đơn cột) */}
      <div className="max-w-xl w-full bg-white p-8 rounded-xl shadow-2xl border border-gray-200">
        <h2 className="text-3xl font-extrabold text-blue-600 mb-6 text-center">
          Tạo tài khoản mới
        </h2>
        <p className="text-center text-sm mb-6 text-gray-500">
          Đã có tài khoản?{' '}
          <a
            href="/login" // Link chuyển giao diện đăng nhập
            className="text-blue-600 hover:text-blue-800 font-medium transition duration-150"
          >
            Đăng nhập ngay
          </a>
        </p>

        {/* Hiển thị lỗi từ Context hoặc lỗi cục bộ */}
        {(registerError || error) && (
          <div
            className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg relative mb-6 text-sm"
            role="alert"
          >
            <span className="block sm:inline">{registerError || error}</span>
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
                                isLoading
                                  ? 'bg-blue-400 cursor-not-allowed'
                                  : 'bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 hover:scale-[1.01]'
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
