import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Edit } from "lucide-react";

interface ProfileExperienceTabProps {
  experience: any;
}

export const ProfileExperienceTab = ({
  experience,
}: ProfileExperienceTabProps) => {
  return (
    <Card className="rounded-xl shadow-lg border-0 bg-white/90 backdrop-blur-xs">
      <CardHeader className="flex flex-row items-center justify-between pb-6">
        <CardTitle className="text-2xl">Experience</CardTitle>
        <Button variant="ghost" size="sm" className="hover:bg-gray-100 rounded">
          <Edit className="h-4 w-4" />
        </Button>
      </CardHeader>
      <CardContent>
        {experience ? (
          <div key={experience.id} className="flex gap-4 items-start mb-6">
            <img
              src={experience.institutionLogo || "/default-institution.png"}
              alt={experience.institutionName}
              className="h-10 w-10 rounded shadow-sm"
            />
            <div>
              <div className="font-semibold text-lg">
                {experience.institutionName || "Institution"}
              </div>
              <div className="text-sm text-gray-600">
                {experience.title || "Title"}
              </div>
              <div className="text-xs text-gray-500">
                {experience.startDate
                  ? new Date(experience.startDate).toLocaleDateString()
                  : "Start"}{" "}
                -
                {experience.endDate
                  ? new Date(experience.endDate).toLocaleDateString()
                  : "Present"}
              </div>
              <div className="text-xs text-gray-500 mt-1">
                {experience.description || "Description"}
              </div>
            </div>
          </div>
        ) : (
          <div>No experience found.</div>
        )}
      </CardContent>
    </Card>
  );
};
