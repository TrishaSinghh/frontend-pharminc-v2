"use client";

import { ProfileHeader } from "@/components/profile/ProfileHeader";
import { ProfileSidebar } from "@/components/profile/ProfileSidebar";
import { ProfileTabs } from "@/components/profile/ProfileTabs";
import { ProfileAboutTab } from "@/components/profile/internals/ProfileAboutTab";
import { ProfileExperienceTab } from "@/components/profile/internals/ProfileExperienceTab";
import { ProfileEducationTab } from "@/components/profile/internals/ProfileEducationTab";
import { ProfilePostsTab } from "@/components/profile/internals/ProfilePostsTab";
import { ProfileActivityTab } from "@/components/profile/internals/ProfileActivityTab";
import { ProfileAnalyticsCard } from "@/components/profile/cards/ProfileAnalyticsCard";
import { ProfileResourcesCard } from "@/components/profile/cards/ProfileResourcesCard";
import { ProfileConnectionsCard } from "@/components/profile/cards/ProfileConnectionsCard";
import { ProfileTrendingTagsCard } from "@/components/profile/cards/ProfileTrendingTagsCard";
import { Card } from "@/components/ui/card";
import { useState, useEffect } from "react";
import { getUserById, getUser } from "@/lib/api";
import { getAuthToken } from "@/lib/api/utils";

export default function ProfilePage({
  params,
}: {
  params: { userId: string };
}) {
  const [activeTab, setActiveTab] = useState("Posts");
  const [profileData, setProfileData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [currentUserId, setCurrentUserId] = useState<string | null>(null);

  // Get current user ID from token or API
  useEffect(() => {
    const getCurrentUserId = async () => {
      try {
        const token = getAuthToken();
        if (token) {
          try {
            // First try to decode from JWT token
            const payload = JSON.parse(atob(token.split(".")[1]));
            const userId = payload.userId || payload.sub || payload.id;
            if (userId) {
              setCurrentUserId(userId);
              return;
            }
          } catch (error) {
            console.warn("Error decoding token, fetching user data:", error);
          }

          // If token decode fails, fetch current user data
          try {
            const currentUser = await getUser();
            setCurrentUserId(currentUser.id);
          } catch (error) {
            console.error("Error fetching current user:", error);
          }
        }
      } catch (error) {
        console.error("Error getting current user ID:", error);
      }
    };

    getCurrentUserId();
  }, []);

  // Fetch profile data
  useEffect(() => {
    if (!params.userId) return;

    const fetchData = async () => {
      setLoading(true);
      try {
        const data = await getUserById(params.userId);
        setProfileData(data);
      } catch (err) {
        console.error("Error fetching profile data:", err);
        setProfileData(null);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [params.userId]);

  if (loading) {
    return (
      <div className="min-h-screen bg-linear-to-br from-gray-50 to-blue-50/30 flex items-center justify-center">
        <div className="text-xl text-gray-700">Loading profile...</div>
      </div>
    );
  }

  if (!profileData) {
    return (
      <div className="min-h-screen bg-linear-to-br from-gray-50 to-blue-50/30 flex items-center justify-center">
        <div className="text-xl text-gray-700">Profile not found</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-linear-to-br from-gray-50 to-blue-50/30">
      <div className="pt-16 max-w-6xl mx-auto px-4 py-8">
        <div className="grid grid-cols-12 gap-8">
          {/* Left Sidebar */}
          <div className="col-span-3">
            <ProfileSidebar user={profileData} />
            <ProfileAnalyticsCard />
            <ProfileResourcesCard />
          </div>

          {/* Main Content */}
          <div className="col-span-6">
            <Card className="mb-8 rounded-xl shadow-lg border-0 overflow-hidden bg-white/90 backdrop-blur-xs hover:shadow-xl transition-shadow duration-300">
              <ProfileHeader
                user={profileData}
                institution={null}
                currentUserId={currentUserId || ""}
              />
            </Card>

            <ProfileTabs activeTab={activeTab} setActiveTab={setActiveTab} />

            {activeTab === "About" && (
              <ProfileAboutTab userId={params.userId} />
            )}
            {activeTab === "Experience" && (
              <ProfileExperienceTab userId={params.userId} />
            )}
            {activeTab === "Education" && (
              <ProfileEducationTab userId={params.userId} />
            )}
            {activeTab === "Posts" && <ProfilePostsTab />}
            {activeTab === "Activity" && <ProfileActivityTab />}
          </div>

          {/* Right Sidebar */}
          <div className="col-span-3 space-y-6">
            <ProfileConnectionsCard />
            <ProfileTrendingTagsCard />
          </div>
        </div>
      </div>
    </div>
  );
}
