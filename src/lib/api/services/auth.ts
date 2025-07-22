import { apiRequest } from "@/lib/api/utils";
import { AuthParams, AuthResponse } from "@/lib/api/types";

export const login = async (credentials: AuthParams): Promise<AuthResponse> => {
  return apiRequest<AuthResponse>("auth", "/public/login", {
    method: "POST",
    body: JSON.stringify(credentials),
  });
};

export const register = async (credentials: AuthParams): Promise<void> => {
  return apiRequest<void>("auth", "/public/register", {
    method: "POST",
    body: JSON.stringify(credentials),
  });
};
