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
import { Card } from "@/components/ui/card";
import { useState, useEffect } from "react";
import { getInstitutionById } from "@/lib/api";

export default function InstitutionProfilePage({
  params,
}: {
  params: { instituteId: string };
}) {
  const [activeTab, setActiveTab] = useState("Posts");
  const [institutionData, setInstitutionData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!params.instituteId) return;

    setLoading(true);
    getInstitutionById(params.instituteId)
      .then((data) => {
        // Transform institution data to match user profile structure
        const transformedData = {
          ...data,
          name: data.name,
          role: data.type, // Institution type becomes "role"
          bio: data.bio || data.about,
          profile_picture: data.profile_picture,
          banner_picture: data.banner_picture,
          // Map other fields as needed
        };
        setInstitutionData(transformedData);
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, [params.instituteId]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Loading...
      </div>
    );
  }

  if (!institutionData) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Institution not found
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-linear-to-br from-gray-50 to-blue-50/30">
      <div className="pt-16 max-w-6xl mx-auto px-4 py-8">
        <div className="grid grid-cols-12 gap-8">
          {/* Left Sidebar - Reused exactly as is */}
          <div className="col-span-3">
            <ProfileSidebar user={institutionData} />
            <ProfileAnalyticsCard />
            <ProfileResourcesCard />
          </div>

          {/* Main Content - Reused exactly as is */}
          <div className="col-span-6">
            <Card className="mb-8 rounded-xl shadow-lg border-0 overflow-hidden bg-white/90 backdrop-blur-xs hover:shadow-xl transition-shadow duration-300">
              <ProfileHeader user={institutionData} />
            </Card>

            <ProfileTabs activeTab={activeTab} setActiveTab={setActiveTab} />

            {/* Reuse all tab components */}
            {activeTab === "About" && (
              <ProfileAboutTab userId={params.instituteId} />
            )}
            {activeTab === "Experience" && (
              <ProfileExperienceTab userId={params.instituteId} />
            )}
            {activeTab === "Education" && (
              <ProfileEducationTab userId={params.instituteId} />
            )}
            {activeTab === "Posts" && <ProfilePostsTab />}
            {activeTab === "Activity" && <ProfileActivityTab />}
          </div>

          {/* Right Sidebar - Reused exactly as is */}
          <div className="col-span-3 space-y-6">
            <ProfileConnectionsCard />
          </div>
        </div>
      </div>
    </div>
  );
}
