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
import { useUserData } from "@/helpers/token";

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

  const userData = useUserData();
  const canManage = !userData?.roles.some(({ rol }) => rol === "Estudiante");

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
          {canManage && (
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                <Input
                  aria-label="Buscar postulante"
                  placeholder="Buscar postulante..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="h-11 border-border bg-card pl-10 text-base"
                />
              </div>
            </div>
          )}

          {isLoading && (
            <div className="flex items-center justify-center py-16">
              <Loader message="Cargando postulaciones..." />
            </div>
          )}

          {!isLoading && !filtered.length && (
            <div className="flex flex-col items-center justify-center py-16 text-muted-foreground">
              <Users className="h-16 w-16 mb-4 text-border" />
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
                    className="h-full border border-border hover:border-brand-gold hover:shadow-lg transition-all duration-300 overflow-hidden group"
                  >
                    <CardContent className="flex flex-col h-full">
                      <div className="p-4 bg-linear-to-br from-card to-brand-gold/15 border-b border-border flex flex-col items-center text-center shrink-0">
                        <div className="h-14 w-14 rounded-full bg-linear-to-br from-brand-gold to-brand-vermilion p-0.5 mb-3">
                          <div className="h-full w-full rounded-full bg-card flex items-center justify-center">
                            <User className="h-7 w-7 text-brand-gold-deep" />
                          </div>
                        </div>
                        <h3 className="font-bold text-heading line-clamp-2 max-w-full">
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
                          <ChevronRight className="h-4 w-4 text-muted-foreground flex-shrink-0" />
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
                          <span className="text-muted-foreground flex-shrink-0">
                            Arte marcial:
                          </span>
                          <span className="font-medium text-foreground truncate">
                            {martialArtName}
                          </span>
                        </div>

                        <div className="flex items-center gap-2 text-sm">
                          <span className="text-muted-foreground flex-shrink-0">
                            Examen:
                          </span>
                          <span className="font-medium text-foreground truncate">
                            {postulacion.activity?.name || "—"}
                          </span>
                        </div>

                        {passed && (
                          <div className="flex items-center gap-2 text-sm">
                            <span className="text-muted-foreground flex-shrink-0">
                              Fecha:
                            </span>
                            <span className="font-medium text-foreground truncate">
                              {dateFormatterIntoLong(
                                postulacion.activity?.date,
                              )}
                            </span>
                          </div>
                        )}

                        <div className="pt-4 mt-auto flex gap-2">
                          {passed && canManage ? (
                            <Button
                              variant="outline"
                              className="h-11 flex-1 border-brand-gold/40 text-brand-gold-deep hover:bg-brand-gold/10"
                              onClick={() =>
                                openManageDialog(
                                  postulacion.activityId,
                                )
                              }
                            >
                              <ClipboardCheck data-icon="inline-start" />
                              Gestionar
                            </Button>
                          ) : (
                            <Button
                              variant="outline"
                              className="h-11 flex-1 border-border text-foreground hover:bg-muted"
                            >
                              <Eye data-icon="inline-start" />
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
        <DialogContent className="flex max-w-2xl flex-col border-0 bg-card shadow-2xl">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold text-foreground">
              Registrar Resultados
            </DialogTitle>
            {manageActivity && (
              <DialogDescription className="text-muted-foreground">
                {manageActivity.name} —{" "}
                {dateFormatterIntoLong(manageActivity.date ?? new Date())}
              </DialogDescription>
            )}
          </DialogHeader>

          <div className="-mx-4 flex-1 overflow-y-auto px-4 sm:-mx-6 sm:px-6">
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
                              <p className="font-semibold text-foreground truncate">
                                {student.user?.name}{" "}
                                {student.user?.lastName}
                              </p>
                              <p className="text-xs text-muted-foreground">
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
                              <ChevronRight className="h-3 w-3 text-muted-foreground" />
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

          <div className="mt-4 flex flex-col-reverse gap-2 border-t border-border pt-4 sm:flex-row sm:justify-end">
            <Button
              variant="outline"
              className="h-11 border-border text-foreground hover:bg-muted sm:h-9 sm:w-auto"
              onClick={() => {
                setManageDialogOpen(false);
                setManageActivity(null);
              }}
            >
              Cancelar
            </Button>
            <Button
              disabled={isSaving}
              className="h-11 bg-brand-blue text-white hover:bg-brand-blue-dark sm:h-9 sm:w-auto"
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
