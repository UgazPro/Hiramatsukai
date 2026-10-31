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
      <div className="flex min-h-[50vh] items-center justify-center p-4 text-center text-muted-foreground">
        No se encontraron datos del usuario.
      </div>
    );
  }

  return <StudentDetailView student={myStudent} />;
}
