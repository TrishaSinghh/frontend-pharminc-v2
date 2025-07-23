import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Edit } from "lucide-react";

interface ProfileAboutTabProps {
  user: any;
}

export const ProfileAboutTab = ({ user }: ProfileAboutTabProps) => {
  return (
    <Card className="rounded-xl shadow-lg border-0 bg-white/90 backdrop-blur-xs">
      <CardHeader className="flex flex-row items-center justify-between pb-6">
        <CardTitle className="text-2xl">About</CardTitle>
        <Button variant="ghost" size="sm" className="hover:bg-gray-100">
          <Edit className="h-4 w-4" />
        </Button>
      </CardHeader>
      <CardContent>
        <p className="text-base text-gray-700 leading-relaxed mb-8">
          {user?.about || "No about info set."}
        </p>
      </CardContent>
    </Card>
  );
};
