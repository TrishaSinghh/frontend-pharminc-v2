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
import { useState, useEffect, use } from "react";

import { getUserById, getInstitutionById, getUser } from "@/lib/api";

export default function ProfilePage({
  params,
}: {
  params: Promise<{ userId: string }>;
}) {
  const [activeTab, setActiveTab] = useState("Posts");
  const [profileData, setProfileData] = useState<any>(null);
  const [institution, setInstitution] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  const userId = use(params).userId;

  useEffect(() => {
    if (!userId) return;

    setLoading(true);

    getUserById(userId)
      .then((data) => {
        setProfileData(data);
      })
      .catch((err) => {
        console.error(err);
        setProfileData(null);
      })
      .finally(() => setLoading(false));
  }, [userId]);

  // Fetch institution
  useEffect(() => {
    if (!profileData) return;

    let institutionId = profileData.user?.institutionId;

    // If no institutionId in user object, check educations and experiences
    if (!institutionId) {
      if (profileData.educations) {
        // If educations is an array, take the first one
        const education = Array.isArray(profileData.educations)
          ? profileData.educations[0]
          : profileData.educations;
        institutionId = education?.institutionId;
      }

      if (!institutionId && profileData.experiences) {
        // If experiences is an array, take the first one
        const experience = Array.isArray(profileData.experiences)
          ? profileData.experiences[0]
          : profileData.experiences;
        institutionId = experience?.institutionId;
      }
    }

    if (institutionId) {
      getInstitutionById(institutionId)
        .then(setInstitution)
        .catch(() => setInstitution(null));
    }
  }, [profileData]);
  // Fetch profile data

  if (loading && !profileData) {
    return (
      <div className="min-h-screen bg-linear-to-br from-gray-50 to-blue-50/30 flex items-center justify-center">
        <div className="text-xl text-gray-700">Loading profile...</div>
      </div>
    );
  }

  if (!profileData) {
    return (
      <div className="min-h-screen bg-linear-to-br from-gray-50 to-blue-50/30 flex items-center justify-center">
        <div className="text-xl text-gray-700">No profile data found.</div>
      </div>
    );
  }

  const user = profileData;

  return (
    <div className="min-h-screen bg-linear-to-br from-gray-50 to-blue-50/30">
      <div className="pt-16 max-w-6xl mx-auto px-4 py-8">
        <div className="grid grid-cols-12 gap-8">
          {/* Left Sidebar */}
          <div className="col-span-3">
            <ProfileSidebar user={user} />
            <ProfileAnalyticsCard />
            <ProfileResourcesCard />
          </div>

          {/* Main Content */}
          <div className="col-span-6">
            <Card className="mb-8 rounded-xl shadow-lg border-0 overflow-hidden bg-white/90 backdrop-blur-xs hover:shadow-xl transition-shadow duration-300">
              <ProfileHeader user={user} institution={institution} />
            </Card>

            <ProfileTabs activeTab={activeTab} setActiveTab={setActiveTab} />

            {activeTab === "About" && <ProfileAboutTab userId={userId} />}
            {activeTab === "Experience" && (
              <ProfileExperienceTab userId={userId} />
            )}
            {activeTab === "Education" && (
              <ProfileEducationTab userId={userId} />
            )}
            {activeTab === "Posts" && <ProfilePostsTab />}
            {activeTab === "Activity" && <ProfileActivityTab />}
          </div>

          {/* Right Sidebar: Institution */}
          <div className="col-span-3 space-y-6">
            <ProfileConnectionsCard />
            <ProfileTrendingTagsCard />
          </div>
        </div>
      </div>
    </div>
  );
}
