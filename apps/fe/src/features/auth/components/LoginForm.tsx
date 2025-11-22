import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { CheckCircle, Loader2 } from 'lucide-react';

// Component Form Đăng Nhập
const LoginForm: React.FC = () => {
  // Lấy các trạng thái và hàm cần thiết từ Auth Context
  const { login, isLoading, error, isLoggedIn } = useAuth();

  // Khởi tạo hàm chuyển hướng (navigation)
  const navigate = useNavigate();

  // State cục bộ để lưu trữ dữ liệu nhập từ form
  const [userName, setUserName] = useState('');
  const [passWord, setPassWord] = useState('');
  // State cục bộ để hiển thị lỗi phát sinh trong quá trình submit (ví dụ: thiếu input)
  const [loginError, setLoginError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Trạng thái Loading chung cho button
  const showLoading = isLoading || isSubmitting;
  // --- EFFECT: Xử lý chuyển hướng sau khi đăng nhập thành công ---
  useEffect(() => {
    let timer: number;
    if (isLoggedIn) {
      timer = setTimeout(() => {
        navigate('/admin');
      }, 500);
    }
    // Cleanup function để xóa timer
    return () => {
      if (timer) {
        clearTimeout(timer);
      }
    };
    // Dependency array: Chỉ chạy lại khi isLoggedIn hoặc navigate thay đổi
  }, [isLoggedIn, navigate]);

  // --- HANDLER: Xử lý sự kiện gửi form ---
  const handleSubmit = async (e: React.FormEvent) => {
    // Ngăn chặn hành vi mặc định của form (tải lại trang)
    e.preventDefault();

    // 1. BẮT ĐẦU submitting
    setIsSubmitting(true);
    setLoginError(null); // Xóa lỗi cục bộ
    // Lỗi từ AuthContext (error) sẽ tự động được xóa khi hàm login được gọi

    // 2. Kiểm tra validation cơ bản (Lỗi cục bộ)
    if (!userName || !passWord) {
      setLoginError('Vui lòng nhập đầy đủ tên đăng nhập và mật khẩu.');
      setIsSubmitting(false);
      return;
    }

    try {
      // 3. Gọi hàm login bất đồng bộ
      await login({ userName, passWord });
      // Nếu login thành công, isLoggedIn sẽ chuyển thành true và kích hoạt useEffect ở trên
    } catch (err: any) {
      // 4. Bắt lỗi nếu login thất bại (Lỗi từ API/Auth Context)
      // Dùng err.message (lỗi ném ra từ hàm login) nếu error (từ context) chưa kịp cập nhật.
      setLoginError(err.message || error || 'Đăng nhập thất bại. Vui lòng thử lại.');
    } finally {
      // 5. KẾT THÚC submitting
      setIsSubmitting(false); // Kết thúc submit
    }
  };

  // --- Giao diện (UI) của Form Đăng Nhập ---
  return (
    <div className="bg-gray-100 min-h-screen flex items-center justify-center">
      {/* THÔNG BÁO THÀNH CÔNG - Toast*/}
      {isLoggedIn && (
        <div className="fixed top-0 left-1/2 -translate-x-1/2 p-4 z-50 w-full max-w-sm animate-slide-down">
          <div className="bg-linear-to-r from-green-500 to-emerald-600 text-white p-6 rounded-2xl shadow-2xl flex items-center transition-opacity duration-500 transform scale-100 border border-green-700/50">
            {/* Icon lớn và nổi bật */}
            <CheckCircle className="w-8 h-8 mr-4 flex-0 stroke-2 text-white" />

            {/* Nội dung thông báo */}
            <div>
              <p className="text-lg font-bold">Thành Công!</p>
              <p className="text-sm mt-0.5 opacity-90">
                Đăng nhập thành công. Đang chuyển hướng đến trang chủ.
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
        className={`max-w-md mx-auto my-10 bg-white p-8 rounded-xl shadow-2xl border border-gray-200 ${isLoggedIn ? 'opacity-50 pointer-events-none' : 'opacity-100'}`}
      >
        <h2 className="text-3xl font-extrabold text-blue-600 mb-6 text-center">Đăng Nhập</h2>

        {/* Link chuyển đến trang Đăng ký */}
        <p className="text-center text-sm mb-6 text-gray-500">
          Chưa có tài khoản?{' '}
          <a
            href="/register"
            className="text-indigo-600 hover:text-indigo-800 font-medium transition duration-150"
          >
            Đăng ký ngay
          </a>
        </p>

        {/* Hiển thị hộp thoại lỗi (lỗi cục bộ hoặc lỗi từ Auth Context) */}
        {(loginError || error) && (
          <div
            className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4"
            role="alert"
          >
            <span className="block sm:inline">{loginError || error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Input Tên đăng nhập */}
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

          {/* Input Mật khẩu */}
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

          {/* Nút Đăng Nhập */}
          <button
            type="submit"
            disabled={showLoading || isLoggedIn}
            className={`w-full flex items-center justify-center py-3 px-4 rounded-lg shadow-lg text-lg font-medium text-white transition duration-300 transform hover:shadow-xl
                              ${
                                showLoading
                                  ? 'bg-blue-400 cursor-not-allowed'
                                  : 'bg-blue-600 hover:bg-blue-700 hover:scale-[1.01]'
                              }
                          `}
          >
            {showLoading ? (
              <>
                <Loader2 className="animate-spin h-5 w-5 mr-3 text-white" />
                Đang xử lý...
              </>
            ) : (
              'Đăng nhập'
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginForm;
