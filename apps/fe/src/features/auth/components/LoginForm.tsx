import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth'; // Import hook đã tạo

// Component Form Đăng Nhập
const LoginForm: React.FC = () => {
  const { login, isLoading, error, isLoggedIn } = useAuth();
  const navigate = useNavigate();

  const [userName, setUserName] = useState('');
  const [passWord, setPassWord] = useState('');
  const [loginError, setLoginError] = useState<string | null>(null);
  useEffect(() => {
    if (isLoggedIn) {
      navigate('/');
    }
  }, [isLoggedIn, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError(null);

    if (!userName || !passWord) {
      setLoginError('Vui lòng nhập đầy đủ tên đăng nhập và mật khẩu.');
      return;
    }

    try {
      await login({ userName, passWord });
    } catch (err: any) {
      setLoginError(error || err.message || 'Đăng nhập thất bại. Vui lòng thử lại.');
    }
  };
  if (isLoggedIn) {
    return null;
  }

  return (
    <div className="max-w-md mx-auto my-10 bg-white p-8 rounded-xl shadow-2xl border border-gray-200">
      <h2 className="text-3xl font-extrabold text-blue-600 mb-6 text-center">Đăng Nhập</h2>
      <p className="text-center text-sm mb-6 text-gray-500">
        Chưa có tài khoản?{' '}
        <a
          href="/register"
          className="text-indigo-600 hover:text-indigo-800 font-medium transition duration-150"
        >
          Đăng ký ngay
        </a>
      </p>
      {(loginError || error) && (
        <div
          className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4"
          role="alert"
        >
          <span className="block sm:inline">{loginError || error}</span>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="userName" className="block text-sm font-medium text-gray-700 mb-1">
            Tên đăng nhập
          </label>
          <input
            id="userName"
            type="text"
            required
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 transition duration-150"
            placeholder="nguyenvana123"
          />
        </div>

        <div>
          <label htmlFor="passWord" className="block text-sm font-medium text-gray-700 mb-1">
            Mật khẩu
          </label>
          <input
            id="passWord"
            type="password"
            required
            value={passWord}
            onChange={(e) => setPassWord(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 transition duration-150"
            placeholder="••••••••"
          />
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className={`w-full flex justify-center py-2 px-4 border border-transparent rounded-lg shadow-sm text-lg font-medium text-white 
            ${isLoading ? 'bg-blue-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition duration-300 transform hover:scale-[1.01]'}
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
            'Đăng Nhập'
          )}
        </button>
      </form>
    </div>
  );
};

export default LoginForm;
