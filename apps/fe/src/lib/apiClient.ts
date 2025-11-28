// Đơn giản hoá các request HTTP, dùng `import.meta.env.VITE_API_BASE_URL` khi có
type RequestOptions = Omit<RequestInit, 'body'> & { body?: any };

const getBaseUrl = (): string => {
  // Vite env variable (được inject vào lúc build/dev)
  const base = (import.meta as any).env?.VITE_API_BASE_URL as string | undefined;
  if (base && base.length > 0) return base.replace(/\/$/, '');
  // Fallback: cùng origin
  if (typeof window !== 'undefined' && window.location) {
    return `${window.location.protocol}//${window.location.host}`;
  }
  return '';
};

const parseJsonSafe = async (res: Response) => {
  const text = await res.text();
  try {
    return text ? JSON.parse(text) : null;
  } catch {
    return text;
  }
};
// Cấu trúc chuẩn hóa cho Server response
export interface ApiResponse<T> {
  code: number;
  message: string;
  result: T;
}
// Hàm Request
const request = async <T>(path: string, options: RequestOptions = {}): Promise<T> => {
  const base = getBaseUrl();
  const url = path.startsWith('http') ? path : `${base}${path.startsWith('/') ? '' : '/'}${path}`;

  const headers: HeadersInit = {
    Accept: 'application/json',
    ...(options.headers || {}),
  };

  const fetchOptions: RequestInit = {
    ...options,
    headers,
  };

  if (options.body !== undefined && !(options.body instanceof FormData)) {
    fetchOptions.body = JSON.stringify(options.body);
    (fetchOptions.headers as any)['Content-Type'] = 'application/json';
  }

  const res = await fetch(url, fetchOptions);

  // 1. XỬ LÝ LỖI HTTP CẤP THẤP (4xx, 5xx)
  if (!res.ok) {
    const data = await parseJsonSafe(res);
    const message = data?.message || res.statusText || 'HTTP Error';
    const err: any = new Error(message);
    err.status = res.status; // status: 404, 500...
    err.data = data;
    throw err;
  }

  // 2. PHÂN TÍCH CÚ PHÁP PHẢN HỒI CHUẨN HÓA (ApiResponse<T>)
  const responseData = (await parseJsonSafe(res)) as ApiResponse<T> | null;

  // 3. XỬ LÝ LỖI NGHIỆP VỤ (BUSINESS LOGIC ERROR) TỪ SERVER
  // Kiểm tra trường 'code' của server. Giả sử code = 1000 là thành công.
  if (!responseData || responseData.code !== 1000) {
    const message = responseData?.message || 'Server responded with an unknown error code';
    const err: any = new Error(message);
    err.status = responseData?.code || 500; // Sử dụng code của server làm status lỗi
    err.data = responseData;
    throw err;
  }

  // 4. TRẢ VỀ DỮ LIỆU THỰC TẾ (TRƯỜNG 'result')
  return responseData.result;
};

export const apiClient = {
  get: <T>(path: string) => request<T>(path, { method: 'GET' }),
  post: <T>(path: string, body?: any) => request<T>(path, { method: 'POST', body }),
  put: <T>(path: string, body?: any) => request<T>(path, { method: 'PUT', body }),
  del: <T>(path: string) => request<T>(path, { method: 'DELETE' }),
};

export default apiClient;
