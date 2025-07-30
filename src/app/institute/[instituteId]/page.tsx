import { getInstitutionById, Institution } from "@/lib/api";
import { InstitutionProfileClient } from "./InstitutionProfileClient";

export default async function InstitutionProfilePage({
  params,
}: {
  params: Promise<{ instituteId: string }>;
}) {
  const { instituteId } = await params;
  
  try {
    const institutionData = await getInstitutionById(instituteId);
    return <InstitutionProfileClient institutionData={institutionData} instituteId={instituteId} />;
  } catch (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Institution not found
      </div>
    );
  }
}
