import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export const ProfileAnalyticsCard = () => {
  return (
    <Card className="mb-6 rounded-xl shadow-lg border-0 bg-white/90 backdrop-blur-xs hover:shadow-xl transition-shadow duration-300">
      <CardHeader className="pb-4">
        <CardTitle className="text-lg">Analytics</CardTitle>
      </CardHeader>
      <CardContent className="text-sm">
        <div className="flex items-center justify-between mb-2">
          <span className="text-gray-600">Connections</span>
          <span className="font-semibold text-blue-600">42</span>
        </div>
        <div className="flex items-center justify-between mb-2">
          <span className="text-gray-600">Posts</span>
          <span className="font-semibold text-blue-600">18</span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-gray-600">Comments</span>
          <span className="font-semibold text-blue-600">76</span>
        </div>
      </CardContent>
    </Card>
  );
};
