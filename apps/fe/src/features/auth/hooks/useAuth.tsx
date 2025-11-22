// --- IMPORT React Hooks ---
import React, { createContext, useContext, useState, useEffect, useCallback, useMemo } from 'react';

// --- IMPORT API, Types ---
import {
  login as apiLogin,
  register as apiRegister,
  type LoginData,
  type RegisterData,
  type ApiResponse,
  type LoginResponse,
  type UserResponse,
} from '../api/auth';

// --- 1. DEFINITIONS AND TYPES ---=
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

// Kiểu dữ liệu cho phản hồi Đăng nhập và Đăng ký
type LoginResponseType = ApiResponse<LoginResponse>;
type RegisterResponseType = ApiResponse<UserResponse>;

// --- 2. AUTH CONTEXT OBJECT ---
// Giá trị mặc định cho Context
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// --- 3. HELPER COMPONENT (Loading Spinner) ---
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

// --- 4. AUTH PROVIDER COMPONENT (LOGIC CHÍNH) ---
export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // --- A. STATE & HOOKS ---
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true); // Chỉ dùng cho khởi tạo ban đầu
  const [error, setError] = useState<string | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  // --- B. HELPER FUNCTION: Xử lý API response ---
  //
  const processUserResponse = useCallback((newUserResponse: UserResponse) => {
    const newUser: User = {
      id: newUserResponse.id,
      userName: newUserResponse.userName,
      firstName: newUserResponse.firstName,
      lastName: newUserResponse.lastName,
    };
    setUser(newUser);
    localStorage.setItem('authUser', JSON.stringify(newUser));
    setIsLoggedIn(true);
    setError(null);
  }, []);
  const processLoginResponse = useCallback(
    (response: LoginResponseType) => {
      if (response.code === 1000 && response.result) {
        processUserResponse(response.result.userResponse);
      } else {
        throw new Error(response.message || 'Lỗi xử lý phản hồi từ server.');
      }
    },
    [processUserResponse],
  );

  // --- C. useEffect: Khởi tạo/Kiểm tra Local Storage ---
  useEffect(() => {
    const storedUser = localStorage.getItem('authUser');

    if (storedUser) {
      try {
        const parsedUser: User = JSON.parse(storedUser);
        if (parsedUser && parsedUser.id && parsedUser.userName) {
          setUser(parsedUser);
          setIsLoggedIn(true);
        }
      } catch {
        localStorage.removeItem('authUser');
      }
    }
    // Kết thúc tải khi khởi động
    setIsLoading(false);
  }, []);

  // --- D. ACTIONS (useCallback) ---
  // Đăng xuất
  const logout = useCallback(() => {
    setUser(null);
    setError(null);
    setIsLoggedIn(false);
    localStorage.removeItem('authUser');
  }, []);

  // Đăng nhập
  const login = useCallback(
    async (credentials: LoginData) => {
      setError(null); // Reset lỗi context trước khi gọi API
      try {
        const response: LoginResponseType = await apiLogin(credentials);
        processLoginResponse(response);
      } catch (err) {
        let errorMessage = err instanceof Error ? err.message : 'Lỗi đăng nhập không xác định.';
        errorMessage =
          errorMessage === 'Failed to fetch' ? 'Không thể kết nối với máy chủ' : errorMessage;
        setError(errorMessage);
        throw err; // Ném lỗi để component form bắt và quản lý trạng thái loading của nút
      }
    },
    [processLoginResponse],
  );

  // Đăng ký
  const register = useCallback(async (userData: RegisterData) => {
    setError(null); // Reset lỗi context
    try {
      const response: RegisterResponseType = await apiRegister(userData);
      if (response.code === 1000) {
        // TRẢ VỀ THÀNH CÔNG
        return;
      } else {
        // THẤT BẠI: Ném lỗi để RegisterForm bắt
        const apiError = response.message || 'Lỗi đăng ký từ server.';
        throw new Error(apiError);
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Lỗi đăng ký không xác định.';
      setError(errorMessage);
      throw err; // Ném lỗi để component form bắt và quản lý trạng thái loading của nút
    }
  }, []);

  // --- E. CONTEXT VALUE (useMemo) ---
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
    // Thêm các dependency cần thiết
    [user, isLoggedIn, isLoading, error, login, register, logout],
  );

  // --- F. JSX RETURN ---
  return (
    <AuthContext.Provider value={contextValue}>
      {isLoading ? <LoadingSpinner /> : children}
    </AuthContext.Provider>
  );
};

// --- 5. USEAUTH HOOK ---

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);

  if (context === undefined) {
    throw new Error('useAuth phải được sử dụng bên trong AuthProvider');
  }

  return context;
};
