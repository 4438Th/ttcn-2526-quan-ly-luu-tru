// --- 1. KIỂU DỮ LIỆU ĐẦU VÀO ---
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

// --- 3. HẰNG SỐ (CONSTANTS) ---
// URL cơ sở cho API xác thực
const AUTH_API_URL = 'http://localhost:8080/quanlyluutru/auth';

// --- 4. CÁC HÀM GỌI API ---
// Hàm login
export async function login(loginData: LoginData): Promise<LoginResponseType> {
  const url = `${AUTH_API_URL}/login`;

  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(loginData),
  });

  // 1. Kiểm tra trạng thái phản hồi HTTP (200-299)
  if (!response.ok) {
    // Nếu có lỗi HTTP, đọc lỗi chi tiết từ body (nếu có)
    const errorData = await response.json();
    throw new Error(errorData.message || 'Đăng nhập thất bại');
  }

  // 2. Phân tích cú pháp JSON và trả về dữ liệu
  const data: LoginResponseType = await response.json();
  return data;
}
// Hàm register
export async function register(userData: RegisterData): Promise<RegisterResponseType> {
  const url = `${AUTH_API_URL}/register`;

  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(userData),
  });

  // 1. Kiểm tra trạng thái phản hồi HTTP (200-299)
  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || 'Đăng ký thất bại.');
  }

  // 2. Phân tích cú pháp JSON và trả về dữ liệu
  const data: RegisterResponseType = await response.json();
  return data;
}
