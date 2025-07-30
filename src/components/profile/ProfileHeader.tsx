import { useState, useEffect } from "react";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Camera, MessageSquare, UserPlus, Heart, Check, X } from "lucide-react";
import Image from "next/image";
import {
  followUser,
  unfollowUser,
  getFollowerCount,
  connectUser,
  disconnectUser,
  acceptConnection,
  getConnectionCount,
  getUserConnections,
  getUserFollowers,
  User,
  Institution,
} from "@/lib/api";

interface ProfileHeaderProps {
  user: User | null;
  institution: Institution | null;
  currentUserId: string;
}

export const ProfileHeader = ({
  user,
  institution,
  currentUserId,
}: ProfileHeaderProps) => {
  const [isFollowing, setIsFollowing] = useState(false);
  const [followersCount, setFollowersCount] = useState(user?.followers || 0);
  const [isConnected, setIsConnected] = useState(false);
  const [hasPendingRequest, setHasPendingRequest] = useState(false);
  const [hasIncomingRequest, setHasIncomingRequest] = useState(false);
  const [connectionsCount, setConnectionsCount] = useState(
    user?.connections || 0
  );
  const [isLoading, setIsLoading] = useState({
    follow: false,
    connect: false,
    accept: false,
    reject: false,
  });

  // Don't show buttons if viewing own profile
  const isOwnProfile = currentUserId === user?.id;

  // Check initial follow and connection status
  useEffect(() => {
    const checkStatus = async () => {
      if (!user?.id || !currentUserId || isOwnProfile) return;

      try {
        // Check follow status
        const followers = await getUserFollowers(user.id);
        const isFollowing = followers.some((f) => f.user1Id === currentUserId);
        setIsFollowing(isFollowing);

        // Get followers count
        const followersCountData = await getFollowerCount(user.id);
        setFollowersCount(followersCountData.followersCount);

        // Check connection status
        const connections = await getUserConnections(user.id);
        const connection = connections.find(
          (c) =>
            (c.user1Id === currentUserId && c.user2_id === user.id) ||
            (c.user1Id === user.id && c.user2_id === currentUserId)
        );

        if (connection) {
          if (connection.accepted) {
            setIsConnected(true);
            setHasPendingRequest(false);
            setHasIncomingRequest(false);
          } else {
            // Check if current user sent the request or received it
            if (connection.user1Id === currentUserId) {
              // Current user sent the request
              setHasPendingRequest(true);
              setHasIncomingRequest(false);
            } else {
              // Current user received the request
              setHasIncomingRequest(true);
              setHasPendingRequest(false);
            }
          }
        }

        // Get connections count
        const connectionsCountData = await getConnectionCount(user.id);
        setConnectionsCount(connectionsCountData.connectionsCount);
      } catch (error) {
        console.error("Error checking status:", error);
      }
    };

    checkStatus();
  }, [user?.id, currentUserId, isOwnProfile]);

  const handleFollow = async () => {
    if (!user?.id || !currentUserId || isLoading.follow || isOwnProfile) return;

    setIsLoading((prev) => ({ ...prev, follow: true }));
    try {
      if (isFollowing) {
        await unfollowUser({ user2_id: user.id }); // Changed to user2_id
        setFollowersCount((prev) => prev - 1);
      } else {
        await followUser({ user2_id: user.id }); // Changed to user2_id
        setFollowersCount((prev) => prev + 1);
      }
      setIsFollowing((prev) => !prev);
    } catch (error) {
      console.error("Error toggling follow:", error);
    } finally {
      setIsLoading((prev) => ({ ...prev, follow: false }));
    }
  };

  const handleConnect = async () => {
    if (!user?.id || !currentUserId || isLoading.connect || isOwnProfile)
      return;

    setIsLoading((prev) => ({ ...prev, connect: true }));
    try {
      if (isConnected || hasPendingRequest) {
        await disconnectUser({ user2_id: user.id });
        setIsConnected(false);
        setHasPendingRequest(false);
        if (isConnected) {
          setConnectionsCount((prev) => prev - 1);
        }
      } else {
        await connectUser({ user2_id: user.id });
        setHasPendingRequest(true);
      }
    } catch (error) {
      console.error("Error toggling connection:", error);
    } finally {
      setIsLoading((prev) => ({ ...prev, connect: false }));
    }
  };

  const handleAcceptConnection = async () => {
    if (!user?.id || !currentUserId || isLoading.accept || isOwnProfile) return;

    setIsLoading((prev) => ({ ...prev, accept: true }));
    try {
      // According to your API, we need to pass user1Id (the person who sent the request)
      await acceptConnection(user.id);
      setIsConnected(true);
      setHasIncomingRequest(false);
      setConnectionsCount((prev) => prev + 1);
    } catch (error) {
      console.error("Error accepting connection:", error);
    } finally {
      setIsLoading((prev) => ({ ...prev, accept: false }));
    }
  };

  const handleRejectConnection = async () => {
    if (!user?.id || !currentUserId || isLoading.reject || isOwnProfile) return;

    setIsLoading((prev) => ({ ...prev, reject: true }));
    try {
      await disconnectUser({ user2_id: user.id });
      setHasIncomingRequest(false);
    } catch (error) {
      console.error("Error rejecting connection:", error);
    } finally {
      setIsLoading((prev) => ({ ...prev, reject: false }));
    }
  };

  return (
    <div className="bg-white rounded-b-lg">
      {/* banner  */}
      <div className="relative mb-4">
        <div className="h-52 relative overflow-hidden rounded-xl">
          <Image
            src="/banner.png"
            alt="Medical Banner"
            className="w-full h-full object-cover"
            width={1200}
            height={400}
          />
          <div className="absolute inset-0 bg-linear-to-t from-black/20 to-transparent"></div>
          {isOwnProfile && (
            <button className="absolute top-6 right-6 bg-white/20 hover:bg-white/30 text-white backdrop-blur-xs px-4 py-2 text-sm rounded-md flex items-center">
              <Camera className="h-4 w-4 mr-2" />
              Edit cover photo
            </button>
          )}
        </div>
      </div>

      {/* Name and Online Status */}
      <div className="flex items-center gap-4 mb-4 pl-4 pr-4">
        {/* Profile Picture */}
        <div className="">
          <Avatar className="h-24 w-24 border-4 border-white shadow-lg">
            <AvatarImage
              src={user?.profile_picture || "/pp.png"}
              alt={user?.name || "User"}
            />
            <AvatarFallback className="text-xl bg-gradient-to-br from-blue-100 to-indigo-100 text-blue-700 font-bold">
              {user?.name?.[0] || "U"}
            </AvatarFallback>
          </Avatar>
        </div>

        {/* name and info */}
        <div className="flex flex-col">
          <div className="flex justify-between items-start">
            <div>
              <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
                {user?.name || "Loading..."}
                <span className="flex items-center gap-1 text-sm font-normal text-green-600">
                  <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                  Online
                </span>
              </h1>
              <p className="text-lg text-gray-700 font-bold">
                {user?.role || "Specialization not set"}
              </p>
            </div>
          </div>
          {/* location and stats */}
          <div className="flex items-center gap-2 text-gray-600">
            <span>{user?.location || "Location not set"}</span>
            <span>•</span>
            <span>{followersCount} followers</span>
            <span>•</span>
            <span>{connectionsCount} connections</span>
          </div>
        </div>
      </div>

      {/* Badges */}
      <div className="mb-6 pl-4 pr-4">
        <div className="flex flex-wrap gap-2">
          <Badge variant="outline" className="px-3 py-1 text-sm">
            {user?.role || "Doctor"}
          </Badge>
          <Badge variant="outline" className="px-3 py-1 text-sm">
            Pharmacist
          </Badge>
          <Badge variant="outline" className="px-3 py-1 text-sm">
            Researcher
          </Badge>
        </div>
      </div>

      {/* Institution */}
      {institution && (
        <div className="mb-6 pl-4 pr-4">
          <p className="text-sm text-gray-600">{institution.name}</p>
        </div>
      )}

      {/* Action Buttons - Only show if not viewing own profile */}
      {!isOwnProfile && (
        <div className="flex gap-3 pl-4 pr-4 pb-6">
          {/* Connect Button */}
          {hasIncomingRequest ? (
            <div className="flex gap-2">
              <Button
                variant="default"
                size="sm"
                onClick={handleAcceptConnection}
                disabled={isLoading.accept}
              >
                <Check className="h-4 w-4 mr-2" />
                {isLoading.accept ? "Accepting..." : "Accept"}
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={handleRejectConnection}
                disabled={isLoading.reject}
              >
                <X className="h-4 w-4 mr-2" />
                {isLoading.reject ? "Rejecting..." : "Reject"}
              </Button>
            </div>
          ) : (
            <Button
              variant={
                isConnected
                  ? "default"
                  : hasPendingRequest
                  ? "outline"
                  : "default"
              }
              className="flex items-center gap-2"
              onClick={handleConnect}
              disabled={isLoading.connect}
            >
              <UserPlus className="h-4 w-4" />
              {isLoading.connect
                ? "Processing..."
                : isConnected
                ? "Connected"
                : hasPendingRequest
                ? "Request Sent"
                : "Connect"}
            </Button>
          )}

          {/* Follow Button */}
          <Button
            variant={isFollowing ? "default" : "outline"}
            className="flex items-center gap-2"
            onClick={handleFollow}
            disabled={isLoading.follow}
          >
            <Heart
              className="h-4 w-4"
              fill={isFollowing ? "currentColor" : "none"}
            />
            {isLoading.follow
              ? "Processing..."
              : isFollowing
              ? "Following"
              : "Follow"}
          </Button>

          {/* Message Button */}
          <Button variant="outline" className="flex items-center gap-2">
            <MessageSquare className="h-4 w-4" />
            Message
          </Button>
        </div>
      )}
    </div>
  );
};
