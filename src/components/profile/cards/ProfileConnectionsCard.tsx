import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";

export const ProfileConnectionsCard = () => {
  return (
    <Card className="rounded-xl shadow-lg border-0 bg-white/90 backdrop-blur-xs hover:shadow-xl transition-shadow duration-300">
      <CardHeader className="pb-4">
        <CardTitle className="text-lg">Connections</CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="flex items-center gap-3">
          <Avatar className="h-10 w-10">
            <AvatarImage src="/user1.png" alt="User 1" />
            <AvatarFallback>U1</AvatarFallback>
          </Avatar>
          <div>
            <div className="font-medium">Dr. Smith</div>
            <div className="text-sm text-gray-600">Cardiologist</div>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <Avatar className="h-10 w-10">
            <AvatarImage src="/user2.png" alt="User 2" />
            <AvatarFallback>U2</AvatarFallback>
          </Avatar>
          <div>
            <div className="font-medium">Dr. Lee</div>
            <div className="text-sm text-gray-600">Researcher</div>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <Avatar className="h-10 w-10">
            <AvatarImage src="/user3.png" alt="User 3" />
            <AvatarFallback>U3</AvatarFallback>
          </Avatar>
          <div>
            <div className="font-medium">Dr. Patel</div>
            <div className="text-sm text-gray-600">Pharmacist</div>
          </div>
        </div>
        <Button variant="ghost" className="w-full mt-2 text-sm text-blue-600">
          See all connections
        </Button>
      </CardContent>
    </Card>
  );
};
