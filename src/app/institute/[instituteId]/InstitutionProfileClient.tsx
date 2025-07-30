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
import { useState } from "react";
import { Institution } from "@/lib/api";

interface InstitutionProfileClientProps {
  institutionData: Institution;
  instituteId: string;
}

export function InstitutionProfileClient({ institutionData, instituteId }: InstitutionProfileClientProps) {
  const [activeTab, setActiveTab] = useState("Posts");

  return (
    <div className="min-h-screen bg-linear-to-br from-gray-50 to-blue-50/30">
      <div className="pt-16 max-w-6xl mx-auto px-4 py-8">
        <div className="grid grid-cols-12 gap-8">
          {/* Left Sidebar - Reused exactly as is */}
          <div className="col-span-3">
            <ProfileSidebar user={{
              id: institutionData?.id || "",
              name: institutionData?.name || "",
              role: institutionData?.type || "",
              profile_picture: institutionData?.profile_picture,
              banner_picture: institutionData?.banner_picture,
              bio: institutionData?.bio,
              about: institutionData?.about,
              followers: institutionData?.followers,
              connections: 0,
              created_at: institutionData?.created_at || "",
              updated_at: institutionData?.updated_at || "",
              email: "",
              location: institutionData?.location,
              verified: institutionData?.verified,
            }} />
            <ProfileAnalyticsCard />
            <ProfileResourcesCard />
          </div>

          {/* Main Content - Reused exactly as is */}
          <div className="col-span-6">
            <Card className="mb-8 rounded-xl shadow-lg border-0 overflow-hidden bg-white/90 backdrop-blur-xs hover:shadow-xl transition-shadow duration-300">
              <ProfileHeader 
                user={{
                  id: institutionData?.id || "",
                  name: institutionData?.name || "",
                  role: institutionData?.type || "",
                  profile_picture: institutionData?.profile_picture,
                  banner_picture: institutionData?.banner_picture,
                  bio: institutionData?.bio,
                  about: institutionData?.about,
                  followers: institutionData?.followers,
                  connections: 0,
                  created_at: institutionData?.created_at || "",
                  updated_at: institutionData?.updated_at || "",
                  email: "",
                  location: institutionData?.location,
                  verified: institutionData?.verified,
                }} 
                institution={institutionData}
                currentUserId={instituteId}
              />
            </Card>

            <ProfileTabs activeTab={activeTab} setActiveTab={setActiveTab} />

            {/* Reuse all tab components */}
            {activeTab === "About" && (
              <ProfileAboutTab userId={instituteId} />
            )}
            {activeTab === "Experience" && (
              <ProfileExperienceTab userId={instituteId} />
            )}
            {activeTab === "Education" && (
              <ProfileEducationTab userId={instituteId} />
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