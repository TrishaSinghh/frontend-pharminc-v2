import { apiRequest } from "@/lib/api/utils";
import {
  Post,
  PostCreateParams,
  PostUpdateParams,
  PostSearchParams,
  Comment,
  CommentCreateParams,
  CommentUpdateParams,
  CommentSearchParams,
  Application,
  ApplicationCreateParams,
  ApplicationUpdateParams,
  PaginatedResponse,
} from "@/lib/api/types";

// Post endpoints
export const createPost = async (postData: PostCreateParams): Promise<Post> => {
  return apiRequest<Post>("content", "/private/post", {
    method: "POST",
    body: JSON.stringify(postData),
  });
};

export const updatePost = async (
  id: string,
  postData: PostUpdateParams
): Promise<Post> => {
  return apiRequest<Post>("content", `/private/post/${id}`, {
    method: "PUT",
    body: JSON.stringify(postData),
  });
};

export const deletePost = async (id: string): Promise<void> => {
  return apiRequest<void>("content", `/private/post/${id}`, {
    method: "DELETE",
  });
};

export const getPost = async (id: string): Promise<Post> => {
  return apiRequest<Post>("content", `/public/post/${id}`, { method: "GET" });
};

export const listPosts = async (
  page: number = 1,
  limit: number = 10,
  sortBy: string = "created_at",
  sortOrder: "asc" | "desc" = "desc"
): Promise<PaginatedResponse<Post>> => {
  return apiRequest<PaginatedResponse<Post>>(
    "content",
    "/public/post",
    { method: "GET" },
    { page, limit, sortBy, sortOrder }
  );
};

export const getUserPosts = async (
  auth: string,
  page: number = 1,
  limit: number = 10,
  sortBy: string = "created_at",
  sortOrder: "asc" | "desc" = "desc"
): Promise<PaginatedResponse<Post>> => {
  return apiRequest<PaginatedResponse<Post>>(
    "content",
    `/public/post/user/${auth}`,
    { method: "GET" },
    { page, limit, sortBy, sortOrder }
  );
};

export const searchPosts = async (
  params: PostSearchParams
): Promise<PaginatedResponse<Post>> => {
  return apiRequest<PaginatedResponse<Post>>(
    "content",
    "/public/post/search",
    { method: "GET" },
    params as unknown as Record<string, unknown>
  );
};

export const getTrendingPosts = async (
  timeframe: "day" | "week" | "month" | "year" = "week",
  page: number = 1,
  limit: number = 10
): Promise<PaginatedResponse<Post>> => {
  return apiRequest<PaginatedResponse<Post>>(
    "content",
    "/public/post/trending",
    { method: "GET" },
    { timeframe, page, limit }
  );
};

export const getPopularPosts = async (
  metric: "reactions" | "shares" | "saves" | "engagement" = "reactions",
  page: number = 1,
  limit: number = 10
): Promise<PaginatedResponse<Post>> => {
  return apiRequest<PaginatedResponse<Post>>(
    "content",
    "/public/post/popular",
    { method: "GET" },
    { metric, page, limit }
  );
};

// Comment endpoints
export const createComment = async (
  commentData: CommentCreateParams
): Promise<Comment> => {
  return apiRequest<Comment>("content", "/private/comment", {
    method: "POST",
    body: JSON.stringify(commentData),
  });
};

export const replyToComment = async (
  parent_id: string,
  content: string
): Promise<Comment> => {
  return apiRequest<Comment>("content", `/private/comment/${parent_id}/reply`, {
    method: "POST",
    body: JSON.stringify({ content }),
  });
};

export const updateComment = async (
  id: string,
  commentData: CommentUpdateParams
): Promise<Comment> => {
  return apiRequest<Comment>("content", `/private/comment/${id}`, {
    method: "PUT",
    body: JSON.stringify(commentData),
  });
};

export const deleteComment = async (id: string): Promise<void> => {
  return apiRequest<void>("content", `/private/comment/${id}`, {
    method: "DELETE",
  });
};

export const getComment = async (id: string): Promise<Comment> => {
  return apiRequest<Comment>("content", `/public/comment/${id}`, {
    method: "GET",
  });
};

export const listComments = async (
  page: number = 1,
  limit: number = 10,
  sortBy: string = "created_at",
  sortOrder: "asc" | "desc" = "desc"
): Promise<PaginatedResponse<Comment>> => {
  return apiRequest<PaginatedResponse<Comment>>(
    "content",
    "/public/comment",
    { method: "GET" },
    { page, limit, sortBy, sortOrder }
  );
};

export const getPostComments = async (
  post_id: string,
  page: number = 1,
  limit: number = 10,
  sortBy: string = "created_at",
  sortOrder: "asc" | "desc" = "desc",
  includeReplies: boolean = true
): Promise<PaginatedResponse<Comment>> => {
  return apiRequest<PaginatedResponse<Comment>>(
    "content",
    `/public/comment/post/${post_id}`,
    { method: "GET" },
    { page, limit, sortBy, sortOrder, includeReplies }
  );
};

export const getUserComments = async (
  auth: string,
  page: number = 1,
  limit: number = 10,
  sortBy: string = "created_at",
  sortOrder: "asc" | "desc" = "desc"
): Promise<PaginatedResponse<Comment>> => {
  return apiRequest<PaginatedResponse<Comment>>(
    "content",
    `/public/comment/user/${auth}`,
    { method: "GET" },
    { page, limit, sortBy, sortOrder }
  );
};

export const getCommentReplies = async (
  commentId: string,
  page: number = 1,
  limit: number = 10,
  sortBy: string = "created_at",
  sortOrder: "asc" | "desc" = "asc",
  nested: boolean = false
): Promise<PaginatedResponse<Comment>> => {
  return apiRequest<PaginatedResponse<Comment>>(
    "content",
    `/public/comment/${commentId}/replies`,
    { method: "GET" },
    { page, limit, sortBy, sortOrder, nested }
  );
};

export const searchComments = async (
  params: CommentSearchParams
): Promise<PaginatedResponse<Comment>> => {
  return apiRequest<PaginatedResponse<Comment>>(
    "content",
    "/public/comment/search",
    { method: "GET" },
    params as unknown as Record<string, unknown>
  );
};

export const getCommentThread = async (
  commentId: string,
  depth: number = 5,
  sortBy: "created_at" | "reactions" = "created_at"
): Promise<{
  comment: Comment;
  replies: Comment[];
  totalReplies: number;
}> => {
  return apiRequest<{
    comment: Comment;
    replies: Comment[];
    totalReplies: number;
  }>(
    "content",
    `/public/comment/${commentId}/thread`,
    { method: "GET" },
    { depth, sortBy }
  );
};

// Application endpoints
export const createApplication = async (
  applicationData: ApplicationCreateParams
): Promise<Application> => {
  return apiRequest<Application>("content", "/private/application", {
    method: "POST",
    body: JSON.stringify(applicationData),
  });
};

export const updateApplication = async (
  id: string,
  applicationData: ApplicationUpdateParams
): Promise<Application> => {
  return apiRequest<Application>("content", `/private/application/${id}`, {
    method: "PUT",
    body: JSON.stringify(applicationData),
  });
};

export const deleteApplication = async (id: string): Promise<void> => {
  return apiRequest<void>("content", `/private/application/${id}`, {
    method: "DELETE",
  });
};

export const getApplication = async (id: string): Promise<Application> => {
  return apiRequest<Application>("content", `/private/application/${id}`, {
    method: "GET",
  });
};

export const getUserApplications = async (): Promise<Application[]> => {
  return apiRequest<Application[]>("content", "/private/application/my", {
    method: "GET",
  });
};

export const getJobApplications = async (
  jobId: string
): Promise<Application[]> => {
  return apiRequest<Application[]>(
    "content",
    `/private/application/job/${jobId}`,
    { method: "GET" }
  );
};
