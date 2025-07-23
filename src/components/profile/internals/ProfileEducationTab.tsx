import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Edit } from "lucide-react";

interface ProfileEducationTabProps {
  education: any;
}

export const ProfileEducationTab = ({
  education,
}: ProfileEducationTabProps) => {
  return (
    <Card className="rounded-xl shadow-lg border-0 bg-white/90 backdrop-blur-xs">
      <CardHeader className="flex flex-row items-center justify-between pb-6">
        <CardTitle className="text-2xl">Education</CardTitle>
        <Button variant="ghost" size="sm" className="hover:bg-gray-100 rounded">
          <Edit className="h-4 w-4" />
        </Button>
      </CardHeader>
      <CardContent>
        {education ? (
          <div key={education.id} className="flex gap-4 items-start mb-6">
            <img
              src={education.institutionLogo || "/default-institution.png"}
              alt={education.institutionName}
              className="h-10 w-10 rounded shadow-sm"
            />
            <div>
              <div className="font-semibold text-lg">
                {education.institutionName || "Institution"}
              </div>
              <div className="text-sm text-gray-600">
                {education.title || "Degree"}
              </div>
              <div className="text-xs text-gray-500">
                {education.startDate
                  ? new Date(education.startDate).toLocaleDateString()
                  : "Start"}{" "}
                -
                {education.endDate
                  ? new Date(education.endDate).toLocaleDateString()
                  : "Present"}
              </div>
              <div className="text-xs text-gray-500 mt-1">
                {education.description || "Description"}
              </div>
            </div>
          </div>
        ) : (
          <div>No education found.</div>
        )}
      </CardContent>
    </Card>
  );
};
