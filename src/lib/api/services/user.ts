import { apiRequest } from "@/lib/api/utils";
import {
  User,
  UserCreateParams,
  UserUpdateParams,
  UserSearchParams,
  PaginatedResponse,
} from "@/lib/api/types";

export const createUser = async (userData: UserCreateParams): Promise<User> => {
  return apiRequest<User>("user", "/private/user", {
    method: "POST",
    body: JSON.stringify(userData),
  });
};

export const getUser = async (): Promise<User> => {
  return apiRequest<User>("user", "/private/user", { method: "GET" });
};

export const getUserById = async (id: string): Promise<User> => {
  return apiRequest<User>("user", `/public/user/${id}`, { method: "GET" });
};

export const updateUser = async (userData: UserUpdateParams): Promise<User> => {
  return apiRequest<User>("user", "/private/user", {
    method: "PUT",
    body: JSON.stringify(userData),
  });
};

export const deleteUser = async (): Promise<void> => {
  return apiRequest<void>("user", "/private/user", { method: "DELETE" });
};

export const searchUsers = async (
  params: UserSearchParams
): Promise<PaginatedResponse<User>> => {
  return apiRequest<PaginatedResponse<User>>(
    "user",
    "/public/user/search",
    { method: "GET" },
    params
  );
};

export const listUsers = async (
  page: number = 1,
  limit: number = 10,
  fields?: string
): Promise<PaginatedResponse<User>> => {
  return apiRequest<PaginatedResponse<User>>(
    "user",
    "/public/user",
    { method: "GET" },
    { page, limit, fields }
  );
};
