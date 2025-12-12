import { type LoginData, type RegisterData, type LoginResponse, type UserResponse } from '../types';
import { apiClient } from 'lib/apiClient';

const PATH = '/quanlyluutru/auth';

export const login = async (loginData: LoginData): Promise<LoginResponse> => {
  return apiClient.post<LoginResponse>(`${PATH}/login`, loginData);
};

export const register = async (userData: RegisterData): Promise<UserResponse> => {
  return apiClient.post<UserResponse>(`${PATH}/register`, userData);
};

export const authApi = { login, register };
export default authApi;
