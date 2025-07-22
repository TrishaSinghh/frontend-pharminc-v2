import { apiRequest } from "@/lib/api/utils";
import {
  Job,
  JobCreateParams,
  JobUpdateParams,
  JobSearchParams,
  PaginatedResponse,
} from "@/lib/api/types";

export const createJob = async (jobData: JobCreateParams): Promise<Job> => {
  return apiRequest<Job>("job", "/private/job", {
    method: "POST",
    body: JSON.stringify(jobData),
  });
};

export const updateJob = async (
  id: string,
  jobData: JobUpdateParams
): Promise<Job> => {
  return apiRequest<Job>("job", `/private/job/${id}`, {
    method: "PUT",
    body: JSON.stringify(jobData),
  });
};

export const deleteJob = async (id: string): Promise<void> => {
  return apiRequest<void>("job", `/private/job/${id}`, { method: "DELETE" });
};

export const getJob = async (id: string): Promise<Job> => {
  return apiRequest<Job>("job", `/public/job/${id}`, { method: "GET" });
};

export const searchJobs = async (
  params: JobSearchParams
): Promise<PaginatedResponse<Job>> => {
  return apiRequest<PaginatedResponse<Job>>(
    "job",
    "/public/job/search",
    { method: "GET" },
    params
  );
};

export const listJobs = async (
  page: number = 1,
  limit: number = 10,
  fields?: string,
  active?: boolean,
  institute_id?: string
): Promise<PaginatedResponse<Job>> => {
  return apiRequest<PaginatedResponse<Job>>(
    "job",
    "/public/job",
    { method: "GET" },
    { page, limit, fields, active, institute_id }
  );
};

export const getInstituteJobs = async (
  institute_id: string,
  page: number = 1,
  limit: number = 10,
  fields?: string,
  active?: boolean
): Promise<PaginatedResponse<Job>> => {
  return apiRequest<PaginatedResponse<Job>>(
    "job",
    `/public/job/institute/${institute_id}`,
    { method: "GET" },
    { page, limit, fields, active }
  );
};
