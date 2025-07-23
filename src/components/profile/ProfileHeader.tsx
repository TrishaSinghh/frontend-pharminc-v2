import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Camera, MessageSquare, UserPlus } from "lucide-react";
import Image from "next/image";

interface ProfileHeaderProps {
  user: any;
  institution: any;
}

export const ProfileHeader = ({ user, institution }: ProfileHeaderProps) => {
  return (
    <div className="bg-white rounded-b-lg">
      {/* banner  */}
      <div className="relative mb-4">
        <div className="h-52 relative overflow-hidden rounded-xl">
          <Image
            src="/banner.png"
            alt="Medical Banner"
            className="w-full h-full object-cover"
            width={1200} // Set appropriate width
            height={400} // Set appropriate height
          />
          <div className="absolute inset-0 bg-linear-to-t from-black/20 to-transparent"></div>
          <button className="absolute top-6 right-6 bg-white/20 hover:bg-white/30 text-white backdrop-blur-xs px-4 py-2 text-sm rounded-md flex items-center">
            <Camera className="h-4 w-4 mr-2" />
            Edit cover photo
          </button>
        </div>
      </div>
      {/* Name and Online Status */}
      <div className="flex items-center gap-4 mb-4 pl-4 pr-4">
        {/* Profile Picture (Absolute positioned) */}
        <div className="">
          <Avatar className="h-24 w-24 border-4 border-white shadow-lg">
            <AvatarImage
              src={user?.profilePicture || "/pp.png"}
              alt={user?.firstName || "User"}
            />
            <AvatarFallback className="text-xl bg-gradient-to-br from-blue-100 to-indigo-100 text-blue-700 font-bold">
              {user?.firstName?.[0] || "U"}
            </AvatarFallback>
          </Avatar>
        </div>

        {/* name and shit */}
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
          {/* location */}
          <div className="flex items-center gap-2 text-gray-600">
            <span>{user?.location || "Location not set"}</span>
          </div>
        </div>
      </div>

      {/* Location and Badges */}
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

      {/* Connect Buttons */}
      <div className="flex gap-3 pl-4 pr-4">
        <Button variant="default" className="flex items-center gap-2">
          <UserPlus className="h-4 w-4" />
          Connect
        </Button>
        <Button variant="outline" className="flex items-center gap-2">
          <MessageSquare className="h-4 w-4" />
          Message
        </Button>
      </div>
    </div>
  );
};
