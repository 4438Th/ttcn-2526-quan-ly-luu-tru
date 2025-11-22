import React, { createContext, useContext, useState, useEffect, useCallback, useMemo } from 'react';

// --- IMPORT CÁC GIÁ TRỊ VÀ KIỂU DỮ LIỆU ---
import {
  login as apiLogin,
  register as apiRegister,
  type LoginData,
  type RegisterData,
  type ApiResponse,
  type LoginResponse,
  type UserResponse,
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
  firstName: string;
  lastName: string;
}

// Kiểu dữ liệu cho trạng thái và các hành động (Actions) của Auth Context
interface AuthContextType {
  user: User | null;
  isLoggedIn: boolean | false;
  isLoading: boolean | false;
  error: string | null;
  logout: () => void;
  login: (credentials: LoginData) => Promise<void>;
  register: (userData: RegisterData) => Promise<void>;
  setUser: (user: User | null) => void;
  setIsLoggedIn: (isLoggedIn: boolean) => void;
}

// Giá trị mặc định cho Context
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Định nghĩa kiểu cho phản hồi Đăng nhập và Đăng ký để dễ đọc
type LoginResponseType = ApiResponse<LoginResponse>;
type RegisterResponseType = ApiResponse<UserResponse>;

// --- 2. AUTH PROVIDER COMPONENT ---
export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);

  // Trích xuất User từ result của AuthResponse.
  const extractAndSetUser = (response: LoginResponseType | RegisterResponseType) => {
    // Luôn kiểm tra mã thành công (ví dụ: 1000)
    if (response.code === 1000 && response.result) {
      let newUserResponse: UserResponse | undefined;

      // Xử lý logic trích xuất UserResponse dựa trên kiểu dữ liệu trả về:
      if ('userResponse' in response.result) {
        // Đây là LoginResponse (có userResponse lồng trong result)
        newUserResponse = (response.result as LoginResponse).userResponse;
      } else {
        // Đây là RegisterResponse (result chính là UserResponse)
        newUserResponse = response.result as UserResponse;
      }

      if (!newUserResponse) {
        throw new Error('Lỗi: Không tìm thấy dữ liệu người dùng trong phản hồi.');
      }

      // Tạo đối tượng User từ UserResponse
      const newUser: User = {
        id: newUserResponse.id,
        userName: newUserResponse.userName,
        firstName: newUserResponse.firstName,
        lastName: newUserResponse.lastName,
      };

      setUser(newUser);

      // Lưu trữ thông tin người dùng vào Local Storage
      localStorage.setItem('authUser', JSON.stringify(newUser));
      setIsLoggedIn(true);
    } else {
      // Ném lỗi nếu code không phải 1000 hoặc thiếu result
      throw new Error(response.message || 'Lỗi xử lý phản hồi từ server.');
    }
  };

  // Kiểm tra trạng thái đăng nhập từ Local Storage khi ứng dụng khởi động
  useEffect(() => {
    const storedUser = localStorage.getItem('authUser');

    if (storedUser) {
      try {
        const parsedUser: User = JSON.parse(storedUser);
        // Đảm bảo dữ liệu trong localStorage hợp lệ trước khi set
        if (parsedUser && parsedUser.id && parsedUser.userName) {
          setUser(parsedUser);
          setIsLoggedIn(true);
        }
      } catch (e) {
        // Xóa nếu không phải JSON hợp lệ
        localStorage.removeItem('authUser');
        throw e;
      }
    }
    // Dù có dữ liệu hay không, đều kết thúc quá trình tải
    setIsLoading(false);
  }, []);

  // Hàm Đăng nhập
  const login = useCallback(async (credentials: LoginData) => {
    setIsLoading(true);
    setError(null);
    try {
      // Gọi apiLogin và gán kiểu chính xác
      const response: LoginResponseType = await apiLogin(credentials);
      extractAndSetUser(response);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Lỗi đăng nhập không xác định.';
      setError(errorMessage);
      throw err; // Ném lỗi để component UI có thể bắt và hiển thị thông báo
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Hàm Đăng ký
  const register = useCallback(async (userData: RegisterData) => {
    setIsLoading(true);
    setError(null);
    try {
      // Gọi apiRegister và gán kiểu chính xác
      const response: RegisterResponseType = await apiRegister(userData);
      extractAndSetUser(response);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Lỗi đăng ký không xác định.';
      setError(errorMessage);
      throw err; // Ném lỗi để component UI có thể bắt và hiển thị thông báo
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Hàm Đăng xuất
  const logout = useCallback(() => {
    setUser(null);
    setError(null);
    setIsLoggedIn(false);
    localStorage.removeItem('authUser');
  }, []);

  // Giá trị Context được tính toán
  const contextValue = useMemo(
    () => ({
      user,
      isLoggedIn,
      isLoading,
      error,
      login,
      register,
      logout,
      setUser,
      setIsLoggedIn,
    }),
    [user, isLoggedIn, isLoading, error, login, register, logout, setUser, setIsLoggedIn],
  );

  return (
    <AuthContext.Provider value={contextValue}>
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
