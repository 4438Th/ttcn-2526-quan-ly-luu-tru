import React, { createContext, useContext, useState, useEffect, useCallback, useMemo } from 'react';

// --- IMPORT CÁC GIÁ TRỊ VÀ KIỂU DỮ LIỆU ---
import {
  login as apiLogin,
  register as apiRegister,
  type LoginData,
  type RegisterData,
  type AuthResponse,
} from '../api/auth';

// --- Loading Spinner Component (Tách biệt để đảm bảo tính toàn vẹn của JSX) ---
const LoadingSpinner: React.FC = () => (
  <div className="flex justify-center items-center h-screen w-full fixed inset-0 bg-white/70 backdrop-blur-sm z-50">
    <div className="flex items-center p-4 bg-white rounded-xl shadow-2xl border border-gray-100">
      {/* SVG Spinner tiêu chuẩn */}
      <svg
        className="animate-spin -ml-1 mr-3 h-6 w-6 text-blue-600"
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
      <span className="text-lg font-medium text-gray-700">Đang tải dữ liệu người dùng...</span>
    </div>
  </div>
);

// --- 1. DEFINITIONS AND TYPES ---

// Kiểu dữ liệu cho User đã đăng nhập
interface User {
  id: string;
  userName: string;
  passWord: string;
  firstName: string;
  lastName: string;
}

// Kiểu dữ liệu cho trạng thái và các hành động (Actions) của Auth Context
interface AuthContextType {
  user: User | null;
  isLoggedIn: boolean;
  isLoading: boolean;
  error: string | null;
  logout: () => void;
  login: (credentials: LoginData) => Promise<void>;
  register: (userData: RegisterData) => Promise<void>;
}

// Giá trị mặc định cho Context
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// --- 2. AUTH PROVIDER COMPONENT ---

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Trích xuất User từ result của AuthResponse.
  const extractAuthData = (response: AuthResponse) => {
    if (response.code === 0 && response.result) {
      const newUser: User = response.result as User;

      setUser(newUser);

      // CHỈ lưu trữ thông tin người dùng vào Local Storage
      localStorage.setItem('authUser', JSON.stringify(newUser));
    } else {
      throw new Error(response.message || 'Lỗi xử lý phản hồi từ server.');
    }
  };

  // Kiểm tra trạng thái đăng nhập từ Local Storage khi ứng dụng khởi động
  useEffect(() => {
    const storedUser = localStorage.getItem('authUser');

    if (storedUser) {
      setUser(JSON.parse(storedUser));
      localStorage.removeItem('authUser');
    }
    setIsLoading(false);
  }, []);

  // Hàm Đăng nhập
  const login = useCallback(async (credentials: LoginData) => {
    setIsLoading(true);
    setError(null);
    try {
      const response: AuthResponse = await apiLogin(credentials);
      extractAuthData(response);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Lỗi đăng nhập không xác định.';
      setError(errorMessage);
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Hàm Đăng ký
  const register = useCallback(async (userData: RegisterData) => {
    setIsLoading(true);
    setError(null);
    try {
      const response: AuthResponse = await apiRegister(userData);
      extractAuthData(response);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Lỗi đăng ký không xác định.';
      setError(errorMessage);
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Hàm Đăng xuất
  const logout = useCallback(() => {
    setUser(null);
    setError(null);
    localStorage.removeItem('authUser');
  }, []);

  // Giá trị Context được tính toán
  const contextValue = useMemo(
    () => ({
      user,
      isLoggedIn: !!user,
      isLoading,
      error,
      login,
      register,
      logout,
    }),
    [user, isLoading, error, login, register, logout],
  );

  return (
    // Dòng này sử dụng AuthContext đã được định nghĩa ở trên (dòng 52)
    <AuthContext.Provider value={contextValue}>
      {/* Hiển thị màn hình tải trong lần khởi động đầu tiên */}
      {isLoading ? <LoadingSpinner /> : children}
    </AuthContext.Provider>
  );
};

// --- 3. USEAUTH HOOK ---

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);

  if (context === undefined) {
    throw new Error('useAuth phải được sử dụng bên trong AuthProvider');
  }

  return context;
};
