import { AuthResponse } from './types';

export const API_BASE_URLS = {
  auth: process.env.NEXT_PUBLIC_API_AUTH!,
  user: process.env.NEXT_PUBLIC_API_USER!,
  network: process.env.NEXT_PUBLIC_API_NETWORK!,
  background: process.env.NEXT_PUBLIC_API_BACKGROUND!,
  institute: process.env.NEXT_PUBLIC_API_INSTITUTE!,
  job: process.env.NEXT_PUBLIC_API_JOB!,
  content: process.env.NEXT_PUBLIC_API_CONTENT!,
};

let authToken: string | null = null;

export const setAuthToken = (token: string) => {
  authToken = token;
};

export const getAuthToken = (): string | null => {
  return authToken;
};

export const clearAuthToken = () => {
  authToken = null;
};

export const apiRequest = async <T>(
  service: keyof typeof API_BASE_URLS,
  endpoint: string,
  options: RequestInit = {},
  params?: Record<string, any>
): Promise<T> => {
  // Add query params if they exist
  let url = `${API_BASE_URLS[service]}${endpoint}`;
  if (params) {
    const queryParams = new URLSearchParams();
    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined) {
        queryParams.append(key, String(value));
      }
    });
    url += `?${queryParams.toString()}`;
  }

  // Add auth header if token exists
  const headers: HeadersInit = {
    'Content-Type': 'application/json',
    ...options.headers,
  };

  if (authToken) {
    headers['Authorization'] = `Bearer ${authToken}`;
  }

  const response = await fetch(url, {
    ...options,
    headers,
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(
      errorData.message || `API request failed with status ${response.status}`
    );
  }

  // Handle cases where response might be empty (e.g., 204 No Content)
  if (response.status === 204) {
    return {} as T;
  }

  return response.json();
};

export const handleLogin = async (credentials: {
  email: string;
  password: string;
}): Promise<AuthResponse> => {
  const response = await apiRequest<AuthResponse>(
    'auth',
    '/public/login',
    {
      method: 'POST',
      body: JSON.stringify(credentials),
    }
  );
  setAuthToken(response.token);
  return response;
};

export const handleRegister = async (credentials: {
  email: string;
  password: string;
  type?: string;
}): Promise<void> => {
  await apiRequest<void>(
    'auth',
    '/public/register',
    {
      method: 'POST',
      body: JSON.stringify(credentials),
    }
  );
};