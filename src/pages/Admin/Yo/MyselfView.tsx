import { useMe } from "@/hooks/useStudents";
import StudentDetailView from "@/pages/Admin/Students/StudentDetailView/StudentDetailView";
import AdminPanelSkeleton from "@/pages/Admin/AdminPanel/AdminPanelSkeleton";

export default function MyselfView() {
  const { data: myStudent, isLoading } = useMe();

  if (isLoading) {
    return <AdminPanelSkeleton />;
  }

  if (!myStudent) {
    return (
      <div className="flex items-center justify-center h-full text-gray-500">
        No se encontraron datos del usuario.
      </div>
    );
  }

  return <StudentDetailView student={myStudent} />;
}
