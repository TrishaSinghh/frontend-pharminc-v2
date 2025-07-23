import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";

interface ProfileSidebarProps {
  user: any;
}

export const ProfileSidebar = ({ user }: ProfileSidebarProps) => {
  return (
    <Card className="mb-6 rounded-xl shadow-lg border-0 overflow-hidden bg-white/90 backdrop-blur-xs hover:shadow-xl transition-shadow duration-300">
      <div className="relative">
        <div className="h-20 bg-linear-to-r from-blue-500 via-blue-600 to-indigo-600 rounded-t-xl"></div>
        <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2">
          <Avatar className="h-16 w-16 border-4 border-white shadow-lg">
            <AvatarImage
              src={user?.profilePicture || "/pp.png"}
              alt={user?.firstName || "User"}
            />
            <AvatarFallback className="bg-linear-to-br from-blue-100 to-indigo-100 text-blue-700 font-bold">
              {user?.firstName?.[0] || "U"}
            </AvatarFallback>
          </Avatar>
        </div>
      </div>
      <CardContent className="pt-12 pb-6 text-center">
        <h3 className="font-bold text-lg text-gray-900 mb-1">
          {user?.name || "Loading..."}
        </h3>
        <p className="text-sm text-gray-600 mb-4">
          {user?.role || "Specialization not set"}
        </p>
        <Separator className="my-4" />
        <div className="space-y-3 text-left text-sm">
          <div className="flex justify-between items-center">
            <span className="text-gray-600">Profile viewers</span>
            <span className="text-blue-600 font-semibold">142</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-gray-600">Post impressions</span>
            <span className="text-blue-600 font-semibold">1,247</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
