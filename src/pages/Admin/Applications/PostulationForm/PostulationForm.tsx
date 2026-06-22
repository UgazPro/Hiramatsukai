/* eslint-disable react-hooks/set-state-in-effect */
import { useEffect, useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  X,
  UserCheck,
  GraduationCap,
  Search,
  Check,
  CalendarDays,
  Award,
  Users,
} from "lucide-react";
import { Loader } from "@/components/spinner/Loader";
import { useApplicationsStore } from "@/stores/applications.store";
import {
  useUpcomingExams,
  useAppliedStudentSuggestions,
  useAppliedStudents,
  useCreateAppliedStudent,
} from "@/hooks/useActivities";
import { useDojosInfo } from "@/hooks/useDojos";
import { dateFormatterIntoLong } from "@/helpers/formatter";
import { ISuggestionStudentApplied } from "@/services/students/student.interface";
import { IAppliedStudent } from "@/services/activities/activity.interface";
import { IToken, useUserData } from "@/helpers/token";

const getBeltColor = (grado: string) => {
  const colors: Record<string, string> = {
    Blanco: "bg-gray-100 text-gray-800 border-gray-300",
    Amarillo: "bg-yellow-100 text-yellow-800 border-yellow-300",
    Naranja: "bg-orange-100 text-orange-800 border-orange-300",
    Verde: "bg-green-100 text-green-800 border-green-300",
    Azul: "bg-blue-100 text-blue-800 border-blue-300",
    Marrón: "bg-yellow-800 text-white border-yellow-900",
    Negro: "bg-gray-900 text-white border-gray-950",
    Rojo: "bg-red-800 text-white border-red-900",
  };
  return colors[grado] || "bg-gray-100 text-gray-800 border-gray-300";
};

export default function PostulationForm() {
  const { screen, selectedActivityId, closeForm } = useApplicationsStore();
  const { upcomingExams } = useUpcomingExams();
  const { suggestions, isLoading: suggestionsLoading } =
    useAppliedStudentSuggestions();
  // const { data: martialArts = [] } = useDojoMartialArts();
  const user: IToken = useUserData() as IToken;

  const { data: dojo } = useDojosInfo(user.dojo.code || "");
  const { mutateAsync: createPostulation, isPending } =
    useCreateAppliedStudent();

  const [selectedMartialArtId, setSelectedMartialArtId] = useState<number | null>(null);
  const [selectedStudentIds, setSelectedStudentIds] = useState<Set<number>>(new Set());
  const [searchTerm, setSearchTerm] = useState("");

  const nextExam = useMemo(() => {
    const sorted = [...upcomingExams].sort(
      (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime(),
    );
    return selectedActivityId
      ? upcomingExams.find((e) => e.id === selectedActivityId) || sorted[0]
      : sorted[0];
  }, [upcomingExams, selectedActivityId]);

  const nextExamId = nextExam?.id;

  const { appliedStudents } = useAppliedStudents(nextExamId);

  const appliedUserMartialArtPairs = useMemo(
    () => new Set(appliedStudents.map((a: IAppliedStudent) => `${a.userId}-${a.martialArtId}`)),
    [appliedStudents],
  );

  const eligibleStudents = useMemo(
    () =>
      suggestions.filter(
        (s: ISuggestionStudentApplied) => s.suggested,
      ),
    [suggestions],
  );

  const studentsForMartialArt = useMemo(
    () =>
      eligibleStudents.filter((s: ISuggestionStudentApplied) =>
        s.suggestedByMartialArt.some(
          (ma) => ma.martialArtId === selectedMartialArtId && ma.suggested,
        ) && !appliedUserMartialArtPairs.has(`${s.id}-${selectedMartialArtId}`),
      ),
    [eligibleStudents, selectedMartialArtId, appliedUserMartialArtPairs],
  );

  const filteredStudents = useMemo(
    () =>
      studentsForMartialArt.filter((s: ISuggestionStudentApplied) => {
        if (!searchTerm) return true;
        const fullName = `${s.name} ${s.lastName}`.toLowerCase();
        const id = s.identification?.toLowerCase() || "";
        return (
          fullName.includes(searchTerm.toLowerCase()) ||
          id.includes(searchTerm.toLowerCase())
        );
      }),
    [studentsForMartialArt, searchTerm],
  );

  const martialArtCounts = useMemo(() => {
    const counts: Record<number, number> = {};
    for (const ma of dojo?.dojoMartialArts || []) {
      counts[ma.id] = eligibleStudents.filter((s: ISuggestionStudentApplied) =>
        s.suggestedByMartialArt.some(
          (sma) => sma.martialArtId === ma.id && sma.suggested,
        ) && !appliedUserMartialArtPairs.has(`${s.id}-${ma.id}`),
      ).length;
    }
    return counts;
  }, [dojo, eligibleStudents, appliedUserMartialArtPairs]);

  useEffect(() => {
    if (selectedMartialArtId) {
      const ids = new Set<number>(studentsForMartialArt.map((s: ISuggestionStudentApplied) => s.id));
      setSelectedStudentIds(ids);
    }
  }, [selectedMartialArtId]);

  useEffect(() => {
    if (screen !== "postulationForm") {
      setSelectedMartialArtId(null);
      setSelectedStudentIds(new Set());
      setSearchTerm("");
    }
  }, [screen]);

  const toggleStudent = (id: number) => {
    setSelectedStudentIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const getInitials = (name: string, lastName: string) => {
    return `${name?.charAt(0) || ""}${lastName?.charAt(0) || ""}`.toUpperCase();
  };

  const handleSubmit = async () => {
    if (!nextExamId || !selectedMartialArtId || selectedStudentIds.size === 0) return;
    await createPostulation({
      activityId: nextExamId,
      appliedStudents: [...selectedStudentIds].map((id) => ({
        userId: id,
        martialArtId: selectedMartialArtId,
      })),
    });
    closeForm();
  };

  return (
    <div className="min-h-full p-6 w-full my-6">
      <div className="bg-white shadow-xl border border-gray-200 rounded-xl overflow-hidden">
        <div className="bg-linear-to-r from-yellow-50 to-red-50 border-b border-gray-200 p-6">
          <div className="flex justify-between items-start">
            <div className="flex items-center gap-4">
              <div className="h-14 w-14 rounded-full bg-linear-to-br from-yellow-500 to-red-500 p-0.5">
                <div className="h-full w-full rounded-full bg-white flex items-center justify-center">
                  <UserCheck className="h-7 w-7 text-yellow-600" />
                </div>
              </div>
              <div>
                <h2 className="text-2xl font-bold text-gray-900">
                  Nueva Postulación
                </h2>
                {nextExam && (
                  <p className="text-gray-600 text-sm mt-1 flex items-center gap-2">
                    <CalendarDays className="h-4 w-4" />
                    {nextExam.name} —{" "}
                    {dateFormatterIntoLong(nextExam.date)}
                  </p>
                )}
              </div>
            </div>
            <Button variant="ghost" size="sm" onClick={closeForm}>
              <X className="h-4 w-4" />
            </Button>
          </div>
        </div>

        <div className="p-4 space-y-4">
          {suggestionsLoading && (
            <div className="flex items-center justify-center py-12">
              <Loader size="sm" message="Cargando alumnos sugeridos..." />
            </div>
          )}

          {!suggestionsLoading && !nextExam && (
            <div className="text-center py-12 text-gray-500">
              <Award className="h-12 w-12 mx-auto mb-3 text-gray-300" />
              <p className="font-medium">No hay exámenes próximos</p>
              <p className="text-sm">
                Debe existir al menos un examen programado para postular.
              </p>
            </div>
          )}

          {!suggestionsLoading && nextExam && eligibleStudents.length === 0 && (
            <div className="text-center py-12 text-gray-500">
              <GraduationCap className="h-12 w-12 mx-auto mb-3 text-gray-300" />
              <p className="font-medium">No hay alumnos para postular</p>
              <p className="text-sm">
                Todos los alumnos elegibles ya han sido postulados a este
                examen.
              </p>
            </div>
          )}

          {!suggestionsLoading && nextExam && eligibleStudents.length > 0 && (
            <>
              <div>
                <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-3">
                  Arte Marcial
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {dojo?.dojoMartialArts.map((ma) => {
                    const count = martialArtCounts[ma.id] || 0;
                    const isSelected = selectedMartialArtId === ma.id;
                    return (
                      <button
                        key={ma.id}
                        type="button"
                        disabled={count === 0}
                        onClick={() =>
                          setSelectedMartialArtId(
                            isSelected ? null : ma.id,
                          )
                        }
                        className={`p-4 rounded-xl border-2 transition-all duration-200 text-left ${isSelected
                            ? "border-yellow-500 bg-yellow-50 shadow-md"
                            : count > 0
                              ? "border-gray-200 bg-white hover:border-yellow-300 hover:shadow-sm"
                              : "border-gray-100 bg-gray-50 opacity-50 cursor-not-allowed"
                          }`}
                      >
                        <div className="flex items-center gap-3">
                          <div
                            className={`h-10 w-10 rounded-lg flex items-center justify-center text-lg flex-shrink-0 ${isSelected
                                ? "bg-linear-to-br from-yellow-500 to-red-500 text-white"
                                : "bg-yellow-100 text-yellow-700"
                              }`}
                          >
                            🥋
                          </div>
                          <div className="min-w-0 flex-1">
                            <p className="font-semibold text-gray-900 truncate">
                              {ma.martialArt}
                            </p>
                            <p className="text-xs text-gray-500">
                              {count} alumnos
                            </p>
                          </div>
                          {isSelected && (
                            <div className="ml-auto h-6 w-6 rounded-full bg-yellow-500 flex items-center justify-center flex-shrink-0">
                              <Check className="h-4 w-4 text-white" />
                            </div>
                          )}
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

              {selectedMartialArtId && (
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider">
                      Alumnos para postular
                    </h3>
                    <span className="text-sm text-gray-500">
                      {selectedStudentIds.size} de{" "}
                      {studentsForMartialArt.length} seleccionados
                    </span>
                  </div>

                  <div className="relative mb-4">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                    <Input
                      placeholder="Buscar alumno..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10 bg-white border-gray-300"
                    />
                  </div>

                  {filteredStudents.length > 0 && (
                    <div className="grid grid-cols-1 sm:grid-cols-4 gap-3 max-h-80 overflow-y-auto pr-1">
                      {filteredStudents.map((student: ISuggestionStudentApplied) => {
                        const isSelected =
                          selectedStudentIds.has(student.id);
                        const targetInfo =
                          student.suggestedByMartialArt.find(
                            (ma) =>
                              ma.martialArtId === selectedMartialArtId,
                          );

                        return (
                          <button
                            type="button"
                            key={student.id}
                            onClick={() => toggleStudent(student.id)}
                            className={`text-left w-full p-4 rounded-xl border-2 transition-all duration-200 ${isSelected
                                ? "border-yellow-500 bg-yellow-50 shadow-md"
                                : "border-gray-200 bg-white hover:border-yellow-300 hover:shadow-sm"
                              }`}
                          >
                            <div className="flex items-center gap-3">
                              <div
                                className={`h-10 w-10 rounded-full flex-shrink-0 flex items-center justify-center text-xs font-bold ${isSelected
                                    ? "bg-linear-to-br from-yellow-500 to-red-500 text-white"
                                    : "bg-gray-200 text-gray-600"
                                  }`}
                              >
                                {getInitials(
                                  student.name,
                                  student.lastName,
                                )}
                              </div>
                              <div className="min-w-0 flex-1">
                                <p className="font-semibold text-gray-900 text-sm truncate">
                                  {student.name} {student.lastName}
                                </p>
                                <p className="text-xs text-gray-500 truncate">
                                  {student.identification || "Sin cédula"}
                                </p>
                              </div>
                              <div
                                className={`h-5 w-5 rounded border-2 flex-shrink-0 flex items-center justify-center ${isSelected
                                    ? "bg-yellow-500 border-yellow-500"
                                    : "border-gray-300"
                                  }`}
                              >
                                {isSelected && (
                                  <Check className="h-3 w-3 text-white" />
                                )}
                              </div>
                            </div>

                            {targetInfo?.postulationRank && (
                              <div className="mt-2 flex items-center gap-2">
                                <Badge
                                  variant="outline"
                                  className={`text-xs ${getBeltColor(targetInfo.postulationRank.belt)}`}
                                >
                                  {targetInfo.martialArt} →{" "}
                                  {targetInfo.postulationRank.belt}
                                </Badge>
                              </div>
                            )}
                          </button>
                        );
                      })}
                    </div>
                  )}

                  {filteredStudents.length === 0 && (
                    <div className="text-center py-8 text-gray-500">
                      <Users className="h-10 w-10 mx-auto mb-2 text-gray-300" />
                      <p className="text-sm">No se encontraron alumnos</p>
                    </div>
                  )}
                </div>
              )}
            </>
          )}

          <div className="flex justify-end gap-3 pt-4 border-t border-gray-200">
            <Button
              type="button"
              variant="outline"
              className="border-gray-300 text-gray-700 hover:bg-gray-100"
              onClick={closeForm}
            >
              Cancelar
            </Button>
            {eligibleStudents.length > 0 && (
              <Button
                type="button"
                disabled={
                  !selectedMartialArtId ||
                  selectedStudentIds.size === 0 ||
                  isPending
                }
                className="bg-linear-to-r from-yellow-600 to-red-600 hover:from-yellow-500 hover:to-red-500 text-white disabled:bg-gray-400 disabled:cursor-not-allowed"
                onClick={handleSubmit}
              >
                {isPending
                  ? "Postulando..."
                  : selectedStudentIds.size > 0
                    ? `Postular (${selectedStudentIds.size})`
                    : "Postular"}
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
