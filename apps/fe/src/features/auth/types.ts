// Kiểu dữ liệu cho thông tin đăng nhập
export interface LoginData {
  userName: string;
  passWord: string;
}

// Kiểu dữ liệu cho thông tin đăng ký (kế thừa từ LoginData)
export interface RegisterData extends LoginData {
  firstName: string;
  lastName: string;
}

// --- 2. KIỂU DỮ LIỆU ĐẦU RA ---
// Kiểu dữ liệu cho thông tin người dùng chi tiết
export interface UserResponse {
  id: string;
  userName: string;
  firstName: string;
  lastName: string;
}

// Kiểu dữ liệu cho LoginResponse
export interface LoginResponse {
  userResponse: UserResponse;
  success: boolean;
}

// Kiểu dữ liệu API ApiResponse (Cấu trúc của mọi phản hồi từ Backend)
export interface ApiResponse<T> {
  code: number; // 1000 là mã thành công mặc định
  message: string;
  result?: T;
}

// Kiểu dữ liệu thực tế cho phản hồi Đăng nhập
export type LoginResponseType = ApiResponse<LoginResponse>;

// Kiểu dữ liệu thực tế cho phản hồi Đăng ký
export type RegisterResponseType = ApiResponse<UserResponse>;
