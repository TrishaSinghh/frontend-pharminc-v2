import { apiRequest } from "@/lib/api/utils";
import { Follow, FollowParams, Connect, ConnectParams } from "@/lib/api/types";

// Follow endpoints
export const followUser = async (params: FollowParams): Promise<Follow> => {
  console.log("Following user with params:", params);
  return apiRequest<Follow>("network", "/private/follow", {
    method: "POST",
    body: JSON.stringify(params),
  });
};

export const unfollowUser = async (params: FollowParams): Promise<void> => {
  return apiRequest<void>("network", "/private/follow", {
    method: "DELETE",
    body: JSON.stringify(params),
  });
};

export const getUserFollowers = async (userId: string): Promise<Follow[]> => {
  return apiRequest<Follow[]>("network", `/public/follow/${userId}/followers`, {
    method: "GET",
  });
};

export const getFollowerCount = async (
  userId: string
): Promise<{ userId: string; followersCount: number }> => {
  return apiRequest<{ userId: string; followersCount: number }>(
    "network",
    `/public/follow/${userId}/followers/count`,
    { method: "GET" }
  );
};

// Connect endpoints
export const connectUser = async (params: ConnectParams): Promise<Connect> => {
  return apiRequest<Connect>("network", "/private/connect", {
    method: "POST",
    body: JSON.stringify(params),
  });
};

export const disconnectUser = async (params: ConnectParams): Promise<void> => {
  return apiRequest<void>("network", "/private/connect", {
    method: "DELETE",
    body: JSON.stringify(params),
  });
};

export const acceptConnection = async (user1Id: string): Promise<Connect> => {
  return apiRequest<Connect>("network", "/private/connect/accept", {
    method: "PUT",
    body: JSON.stringify({ user1Id }),
  });
};

export const getUserConnections = async (
  userId: string
): Promise<Connect[]> => {
  return apiRequest<Connect[]>(
    "network",
    `/public/connect/${userId}/connects`,
    { method: "GET" }
  );
};

export const getConnectionCount = async (
  userId: string
): Promise<{ userId: string; connectionsCount: number }> => {
  return apiRequest<{ userId: string; connectionsCount: number }>(
    "network",
    `/public/connect/${userId}/connects/count`,
    { method: "GET" }
  );
};
