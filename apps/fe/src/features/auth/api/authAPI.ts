import {
  type LoginData,
  type LoginResponseType,
  type RegisterData,
  type RegisterResponseType,
} from '../types';
import { apiClient } from 'lib/apiClient';

const PATH = '/quanlyluutru/auth';

export const login = async (loginData: LoginData): Promise<LoginResponseType> => {
  return apiClient.post(`${PATH}/login`, loginData) as Promise<LoginResponseType>;
};

export const register = async (userData: RegisterData): Promise<RegisterResponseType> => {
  return apiClient.post(`${PATH}/register`, userData) as Promise<RegisterResponseType>;
};

export const authApi = { login, register };
export default authApi;
