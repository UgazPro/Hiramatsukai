import { useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import {
  ChevronRight,
  Eye,
  Search,
  User,
  Users,
  ClipboardCheck,
  CheckCircle,
  XCircle,
} from "lucide-react";
import { Loader } from "@/components/spinner/Loader";
import { useSaveExam } from "@/hooks/useActivities";
import { dateFormatterIntoLong } from "@/helpers/formatter";
import { IAppliedStudent } from "@/services/activities/activity.interface";

interface ApplyStudentsProps {
  activeTab: string;
  appliedStudents: IAppliedStudent[];
  isLoading: boolean;
  getBeltColor: (grado: string) => string;
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  martialArtsMap: Record<number, string>;
}

export default function ApplyStudents({
  activeTab,
  appliedStudents,
  isLoading,
  getBeltColor,
  searchTerm,
  setSearchTerm,
  martialArtsMap,
}: ApplyStudentsProps) {
  const { mutateAsync: saveExam, isPending: isSaving } = useSaveExam();

  const [manageDialogOpen, setManageDialogOpen] = useState(false);
  const [manageActivity, setManageActivity] = useState<{ id: number; name?: string; date?: Date } | null>(null);
  const [examStatuses, setExamStatuses] = useState<
    Record<string, "Aprobado" | "Reprobado">
  >({});

  const filtered = useMemo(
    () =>
      appliedStudents.filter((p: IAppliedStudent) => {
        if (!searchTerm) return true;
        const fullName = `${p.user?.name ?? ""} ${p.user?.lastName ?? ""}`.toLowerCase();
        return fullName.includes(searchTerm.toLowerCase());
      }),
    [appliedStudents, searchTerm],
  );

  const openManageDialog = (activityId: number) => {
    const studentsForActivity = appliedStudents.filter(
      (s: IAppliedStudent) => s.activityId === activityId,
    );
    const activity = studentsForActivity[0]?.activity;
    if (!activity) return;

    const initialStatuses: Record<string, "Aprobado" | "Reprobado"> = {};
    for (const s of studentsForActivity) {
      const key = `${s.userId}-${s.martialArtId}`;
      initialStatuses[key] = "Aprobado";
    }

    setManageActivity({ ...activity, id: activityId });
    setExamStatuses(initialStatuses);
    setManageDialogOpen(true);
  };

  const toggleExamStatus = (key: string) => {
    setExamStatuses((prev) => ({
      ...prev,
      [key]: prev[key] === "Aprobado" ? "Reprobado" : "Aprobado",
    }));
  };

  const handleSaveResults = async () => {
    if (!manageActivity) return;

    const studentsForActivity = appliedStudents.filter(
      (s: IAppliedStudent) => s.activityId === manageActivity.id,
    );

    const exams = studentsForActivity.map((s: IAppliedStudent) => {
      const key = `${s.userId}-${s.martialArtId}`;
      return {
        userId: s.userId,
        martialArtId: s.martialArtId,
        status: examStatuses[key] || "Aprobado",
      };
    });

    await saveExam({ exams });
    setManageDialogOpen(false);
    setManageActivity(null);
  };

  const isDatePassed = (date: string | Date) => {
    return new Date(date) < new Date();
  };

  return (
    <>
      {activeTab === "postulaciones" && (
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Buscar postulante..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 bg-white border-gray-300"
              />
            </div>
          </div>

          {isLoading && (
            <div className="flex items-center justify-center py-16">
              <Loader message="Cargando postulaciones..." />
            </div>
          )}

          {!isLoading && !filtered.length && (
            <div className="flex flex-col items-center justify-center py-16 text-gray-500">
              <Users className="h-16 w-16 mb-4 text-gray-300" />
              <p className="text-lg font-medium">
                No hay postulaciones activas
              </p>
              <p className="text-sm">
                Las postulaciones de alumnos aparecerán aquí.
              </p>
            </div>
          )}

          {!isLoading && filtered.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filtered.map((postulacion: IAppliedStudent) => {
                const martialArtId =
                  postulacion.ranks?.martialArtId ??
                  postulacion.martialArtId;
                const martialArtName =
                  martialArtsMap[martialArtId] || "—";
                const passed = isDatePassed(postulacion.activity?.date);

                return (
                  <Card
                    key={postulacion.id}
                    className="h-full border border-gray-300 hover:border-amber-400 hover:shadow-lg transition-all duration-300 group"
                  >
                    <CardContent className="p-0 flex flex-col h-full">
                      <div className="p-5 bg-gradient-to-br from-white to-amber-50 border-b border-gray-200 flex flex-col items-center text-center flex-shrink-0">
                        <div className="h-14 w-14 rounded-full bg-gradient-to-br from-amber-500 to-red-500 p-0.5 mb-3">
                          <div className="h-full w-full rounded-full bg-white flex items-center justify-center">
                            <User className="h-7 w-7 text-amber-600" />
                          </div>
                        </div>
                        <h3 className="font-bold text-gray-900 line-clamp-2 max-w-full">
                          {postulacion.user?.name}{" "}
                          {postulacion.user?.lastName}
                        </h3>
                        <div className="flex items-center gap-2 mt-2 flex-wrap justify-center">
                          <Badge
                            className={getBeltColor(
                              postulacion.currentRank?.belt ||
                                "",
                            )}
                          >
                            {postulacion.currentRank?.belt ||
                              "Sin grado"}
                          </Badge>
                          <ChevronRight className="h-4 w-4 text-gray-400 flex-shrink-0" />
                          <Badge
                            className={getBeltColor(
                              postulacion.ranks?.belt || "",
                            )}
                          >
                            {postulacion.ranks?.belt || "?"}
                          </Badge>
                        </div>
                      </div>

                      <div className="p-5 space-y-4 flex flex-col flex-1">
                        <div className="flex items-center gap-2 text-sm">
                          <span className="text-gray-500 flex-shrink-0">
                            Arte marcial:
                          </span>
                          <span className="font-medium text-gray-900 truncate">
                            {martialArtName}
                          </span>
                        </div>

                        <div className="flex items-center gap-2 text-sm">
                          <span className="text-gray-500 flex-shrink-0">
                            Examen:
                          </span>
                          <span className="font-medium text-gray-900 truncate">
                            {postulacion.activity?.name || "—"}
                          </span>
                        </div>

                        {passed && (
                          <div className="flex items-center gap-2 text-sm">
                            <span className="text-gray-500 flex-shrink-0">
                              Fecha:
                            </span>
                            <span className="font-medium text-gray-900 truncate">
                              {dateFormatterIntoLong(
                                postulacion.activity?.date,
                              )}
                            </span>
                          </div>
                        )}

                        <div className="pt-4 mt-auto flex gap-2">
                          {passed ? (
                            <Button
                              variant="outline"
                              size="sm"
                              className="flex-1 border-amber-300 text-amber-700 hover:bg-amber-50"
                              onClick={() =>
                                openManageDialog(
                                  postulacion.activityId,
                                )
                              }
                            >
                              <ClipboardCheck className="h-4 w-4 mr-2" />
                              Gestionar
                            </Button>
                          ) : (
                            <Button
                              variant="outline"
                              size="sm"
                              className="flex-1 border-gray-300 text-gray-700 hover:bg-gray-100"
                            >
                              <Eye className="h-4 w-4 mr-2" />
                              Ver
                            </Button>
                          )}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          )}
        </div>
      )}

      <Dialog open={manageDialogOpen} onOpenChange={setManageDialogOpen}>
        <DialogContent className="max-w-2xl bg-white border-0 shadow-2xl max-h-[90vh] flex flex-col">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold text-gray-900">
              Registrar Resultados
            </DialogTitle>
            {manageActivity && (
              <DialogDescription className="text-gray-600">
                {manageActivity.name} —{" "}
                {dateFormatterIntoLong(manageActivity.date ?? new Date())}
              </DialogDescription>
            )}
          </DialogHeader>

          <div className="overflow-y-auto flex-1 -mx-6 px-6">
            <div className="space-y-3 py-2">
              {manageActivity &&
                appliedStudents
                  .filter(
                    (s: IAppliedStudent) =>
                      s.activityId === manageActivity.id,
                  )
                  .map((student: IAppliedStudent) => {
                    const key = `${student.userId}-${student.martialArtId}`;
                    const martialArtId =
                      student.ranks?.martialArtId ??
                      student.martialArtId;
                    const martialArtName =
                      martialArtsMap[martialArtId] || "—";
                    const isApproved =
                      examStatuses[key] === "Aprobado";

                    return (
                      <div
                        key={student.id}
                        className={`p-4 rounded-xl border-2 transition-all cursor-pointer ${
                          isApproved
                            ? "border-green-200 bg-green-50/30"
                            : "border-red-200 bg-red-50/30"
                        }`}
                        onClick={() => toggleExamStatus(key)}
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3 min-w-0">
                            <div
                              className={`h-10 w-10 rounded-full flex items-center justify-center flex-shrink-0 ${
                                isApproved
                                  ? "bg-green-100 text-green-700"
                                  : "bg-red-100 text-red-700"
                              }`}
                            >
                              <User className="h-5 w-5" />
                            </div>
                            <div className="min-w-0">
                              <p className="font-semibold text-gray-900 truncate">
                                {student.user?.name}{" "}
                                {student.user?.lastName}
                              </p>
                              <p className="text-xs text-gray-500">
                                {martialArtName}
                              </p>
                            </div>
                          </div>
                          <div className="flex items-center gap-3 ml-3 flex-shrink-0">
                            <div className="hidden sm:flex items-center gap-1 text-sm">
                              <Badge
                                className={getBeltColor(
                                  student.currentRank?.belt ||
                                    "",
                                )}
                              >
                                {student.currentRank?.belt ||
                                  "?"}
                              </Badge>
                              <ChevronRight className="h-3 w-3 text-gray-400" />
                              <Badge
                                className={getBeltColor(
                                  student.ranks?.belt || "",
                                )}
                              >
                                {student.ranks?.belt || "?"}
                              </Badge>
                            </div>
                            <Badge
                              className={
                                isApproved
                                  ? "bg-green-100 text-green-800 border-green-200"
                                  : "bg-red-100 text-red-800 border-red-200"
                              }
                            >
                              {isApproved ? (
                                <>
                                  <CheckCircle className="h-3 w-3 mr-1" />
                                  Aprobado
                                </>
                              ) : (
                                <>
                                  <XCircle className="h-3 w-3 mr-1" />
                                  Reprobado
                                </>
                              )}
                            </Badge>
                          </div>
                        </div>
                      </div>
                    );
                  })}
            </div>
          </div>

          <div className="flex justify-end gap-3 pt-4 border-t border-gray-200 mt-4">
            <Button
              variant="outline"
              className="border-gray-300 text-gray-700 hover:bg-gray-100"
              onClick={() => {
                setManageDialogOpen(false);
                setManageActivity(null);
              }}
            >
              Cancelar
            </Button>
            <Button
              disabled={isSaving}
              className="bg-linear-to-r from-amber-600 to-red-600 hover:from-amber-500 hover:to-red-500 text-white"
              onClick={handleSaveResults}
            >
              {isSaving ? "Guardando..." : "Guardar Resultados"}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
