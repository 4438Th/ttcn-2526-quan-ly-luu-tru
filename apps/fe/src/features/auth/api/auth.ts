// Kiểu dữ liệu cho thông tin đăng nhập
export interface LoginData {
  userName: string;
  passWord: string;
}
// Kiểu dữ liệu cho thông tin đăng ký
export interface RegisterData extends LoginData {
  firstName: string;
  lastName: string;
}

// Kiểu dữ liệu cho Phản hồi thành công từ API Auth
export interface AuthResponse {
  code: number;
  message: string;
  result: object;
}
// URL cơ sở cho API xác thực
const AUTH_API_URL = 'http://localhost:8080/quanlyluutru/auth';

// Hàm xử lý đăng ký (Register)
export async function register(userData: RegisterData): Promise<AuthResponse> {
  const url = `${AUTH_API_URL}/register`;

  // Gửi yêu cầu POST đến API đăng ký
  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(userData),
  });

  // 1. Kiểm tra trạng thái phản hồi HTTP
  if (!response.ok) {
    // Đọc thông báo lỗi chi tiết từ body của response
    const errorData = await response.json();
    throw new Error(errorData.message || 'Đăng ký thất bại.');
  }

  // 2. Phân tích cú pháp JSON và trả về dữ liệu
  const data: AuthResponse = await response.json();
  return data;
}
// Hàm xử lý đăng nhập (Login)
export async function login(credentials: LoginData): Promise<AuthResponse> {
  const url = `${AUTH_API_URL}/login`;

  // Gửi yêu cầu POST đến API đăng nhập
  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(credentials),
  });

  // 1. Kiểm tra trạng thái phản hồi HTTP
  if (!response.ok) {
    // Đọc thông báo lỗi chi tiết từ body của response
    const errorData = await response.json();
    throw new Error(errorData.message || 'Đăng nhập thất bại');
  }

  // 2. Phân tích cú pháp JSON và trả về dữ liệu
  const data: AuthResponse = await response.json();
  return data;
}
