import { apiRequest } from "@/lib/api/utils";
import {
  Institution,
  InstitutionCreateParams,
  InstitutionUpdateParams,
  InstitutionSearchParams,
  PaginatedResponse,
} from "@/lib/api/types";

export const createInstitution = async (
  institutionData: InstitutionCreateParams
): Promise<Institution> => {
  return apiRequest<Institution>("institute", "/private/institution", {
    method: "POST",
    body: JSON.stringify(institutionData),
  });
};

export const getInstitution = async (): Promise<Institution> => {
  return apiRequest<Institution>("institute", "/private/institution", {
    method: "GET",
  });
};

export const getInstitutionById = async (id: string): Promise<Institution> => {
  return apiRequest<Institution>("institute", `/public/institution/${id}`, {
    method: "GET",
  });
};

export const updateInstitution = async (
  institutionData: InstitutionUpdateParams
): Promise<Institution> => {
  return apiRequest<Institution>("institute", "/private/institution", {
    method: "PUT",
    body: JSON.stringify(institutionData),
  });
};

export const deleteInstitution = async (): Promise<void> => {
  return apiRequest<void>("institute", "/private/institution", {
    method: "DELETE",
  });
};

export const searchInstitutions = async (
  params: InstitutionSearchParams
): Promise<PaginatedResponse<Institution>> => {
  return apiRequest<PaginatedResponse<Institution>>(
    "user",
    "/public/institution/search",
    { method: "GET" },
    params as unknown as Record<string, unknown>
  );
};

export const listInstitutions = async (
  page: number = 1,
  limit: number = 10,
  fields?: string
): Promise<PaginatedResponse<Institution>> => {
  return apiRequest<PaginatedResponse<Institution>>(
    "institute",
    "/public/institution",
    { method: "GET" },
    { page, limit, fields }
  );
};
