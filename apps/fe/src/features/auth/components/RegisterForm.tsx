import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth'; // Import hook đã tạo

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

  return (
    <div className="max-w-xl mx-auto my-10 bg-white p-8 rounded-xl shadow-2xl border border-gray-200">
      <h2 className="text-3xl font-extrabold text-purple-600 mb-6 text-center">
        Tạo Tài Khoản Mới
      </h2>
      <p className="text-center text-sm mb-6 text-gray-500">
        Đã có tài khoản?{' '}
        <a
          href="/login"
          className="text-indigo-600 hover:text-indigo-800 font-medium transition duration-150"
        >
          Đăng nhập
        </a>
      </p>

      {/* Hiển thị lỗi từ Context hoặc lỗi cục bộ */}
      {(registerError || error) && (
        <div
          className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4"
          role="alert"
        >
          <span className="block sm:inline">{registerError || error}</span>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Họ tên */}
        <div className="flex space-x-4">
          <div className="w-1/2">
            <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-1">
              Họ (First Name)
            </label>
            <input
              id="firstName"
              type="text"
              required
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-purple-500 focus:border-purple-500 transition duration-150"
              placeholder="Nguyễn"
            />
          </div>
          <div className="w-1/2">
            <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-1">
              Tên (Last Name)
            </label>
            <input
              id="lastName"
              type="text"
              required
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-purple-500 focus:border-purple-500 transition duration-150"
              placeholder="Văn A"
            />
          </div>
        </div>

        {/* Tên người dùng */}
        <div>
          <label htmlFor="userName" className="block text-sm font-medium text-gray-700 mb-1">
            Tên người dùng (Username)
          </label>
          <input
            id="userName"
            type="text"
            required
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-purple-500 focus:border-purple-500 transition duration-150"
            placeholder="nguyenvana123"
          />
        </div>

        {/* Mật khẩu */}
        <div>
          <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
            Mật khẩu
          </label>
          <input
            id="password"
            type="password"
            required
            value={passWord}
            onChange={(e) => setPassWord(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-purple-500 focus:border-purple-500 transition duration-150"
            placeholder="••••••••"
          />
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className={`w-full flex justify-center py-2 px-4 border border-transparent rounded-lg shadow-sm text-lg font-medium text-white 
            ${isLoading ? 'bg-purple-400 cursor-not-allowed' : 'bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 transition duration-300 transform hover:scale-[1.01]'}
          `}
        >
          {isLoading ? (
            <svg
              className="animate-spin h-5 w-5 mr-3 text-white"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              ></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              ></path>
            </svg>
          ) : (
            'Đăng ký tài khoản'
          )}
        </button>
      </form>
    </div>
  );
};

export default RegisterForm;
