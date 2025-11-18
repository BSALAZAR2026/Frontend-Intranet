import { environment } from '../../../enviroments/enviroment.prod';

export const API_BASE_URL = environment.apiGatewayUrl;

export const API_ENDPOINTS = {
  auth: `${API_BASE_URL}/auth`,
  users: `${API_BASE_URL}/users`,
  documents: `${API_BASE_URL}/documents`,
};
