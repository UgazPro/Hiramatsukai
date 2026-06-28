/* eslint-disable react-hooks/set-state-in-effect */
import { useEffect, useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  X,
  Search,
  Check,
  CalendarDays,
  Users,
  GraduationCap,
  Award,
  UserCheck,
} from "lucide-react";
import { Loader } from "@/components/spinner/Loader";
import { useApplicationsStore } from "@/stores/applications.store";
import {
  useUpcomingExams,
  useAppliedStudentSuggestions,
  useAppliedStudents,
  useCreateAppliedStudent,
} from "@/hooks/useActivities";
import { useDojosInfo, useDojoRanks } from "@/hooks/useDojos";
import { dateFormatterIntoLong } from "@/helpers/formatter";
import { ISuggestionStudentApplied } from "@/services/students/student.interface";
import { IDojoRanks } from "@/services/dojos/dojo.interface";
import { IAppliedStudent } from "@/services/activities/activity.interface";
import { IToken, useUserData } from "@/helpers/token";

const beltColors: Record<string, { bg: string; text: string; stripe: string }> =
  {
    Blanco: {
      bg: "bg-gray-100",
      text: "text-gray-800",
      stripe: "bg-gray-300",
    },
    Amarillo: {
      bg: "bg-yellow-100",
      text: "text-yellow-800",
      stripe: "bg-yellow-400",
    },
    Naranja: {
      bg: "bg-orange-100",
      text: "text-orange-800",
      stripe: "bg-orange-400",
    },
    Verde: {
      bg: "bg-green-100",
      text: "text-green-800",
      stripe: "bg-green-400",
    },
    Azul: {
      bg: "bg-blue-100",
      text: "text-blue-800",
      stripe: "bg-blue-400",
    },
    Marrón: {
      bg: "bg-amber-800",
      text: "text-white",
      stripe: "bg-amber-700",
    },
    Negro: {
      bg: "bg-gray-900",
      text: "text-white",
      stripe: "bg-gray-800",
    },
    Rojo: {
      bg: "bg-red-800",
      text: "text-white",
      stripe: "bg-red-600",
    },
  };

const getBeltStyle = (belt: string) =>
  beltColors[belt] || beltColors["Blanco"];

const martialArtIcons: Record<string, string> = {
  Karate: "🥋",
  Kobudo: "🔱",
};

function getMartialArtIcon(name: string) {
  return martialArtIcons[name] || "🥋";
}

function onlyKarateAndKobudo(ma: { martialArt: string }) {
  return ma.martialArt === "Karate" || ma.martialArt === "Kobudo";
}

export default function PostulationForm() {
  const { screen, selectedActivityId, closeForm } = useApplicationsStore();
  const { upcomingExams } = useUpcomingExams();
  const { suggestions, isLoading: suggestionsLoading } =
    useAppliedStudentSuggestions();
  const user: IToken = useUserData() as IToken;

  const { data: dojo } = useDojosInfo(user.dojo.code || "");
  const { mutateAsync: createPostulation, isPending } =
    useCreateAppliedStudent();
  const { data: ranks = [] } = useDojoRanks();

  const [selectedMartialArtId, setSelectedMartialArtId] = useState<number | null>(null);
  const [selectedStudentIds, setSelectedStudentIds] = useState<Set<number>>(new Set());
  const [searchTerm, setSearchTerm] = useState("");

  const visibleMartialArts = useMemo(
    () => (dojo?.dojoMartialArts || []).filter(onlyKarateAndKobudo),
    [dojo],
  );

  const ranksMap = useMemo(() => {
    const map = new Map<number, IDojoRanks>();
    for (const r of ranks) {
      map.set(Number(r.id), r);
    }
    return map;
  }, [ranks]);

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
    <div className="m-4 h-[calc(100%-2rem)] w-[calc(100%-2rem)] flex flex-col bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
      {/* ─── Header ─── */}
      <div className="flex items-center justify-between px-6 py-4 shrink-0 bg-gray-50/80 border-b border-gray-100">
        <div className="flex items-center gap-3 min-w-0">
          <div
            className="h-9 w-9 rounded-lg flex items-center justify-center shrink-0"
            style={{ backgroundColor: "var(--redColor)" }}
          >
            <UserCheck className="h-5 w-5 text-white" />
          </div>
          <div className="min-w-0">
            <h2 className="text-lg font-semibold text-gray-900 leading-tight">
              Nueva Postulación
            </h2>
            {nextExam && (
              <p className="text-xs text-gray-500 flex items-center gap-1.5 leading-tight">
                <CalendarDays className="h-3 w-3" />
                <span className="truncate">
                  {nextExam.name} — {dateFormatterIntoLong(nextExam.date)}
                </span>
              </p>
            )}
          </div>
        </div>

        <div className="flex items-center gap-3 shrink-0">
          {nextExam && (
            <span className="hidden sm:flex items-center gap-1.5 text-xs text-gray-400">
              <CalendarDays className="h-3 w-3" />
              {dateFormatterIntoLong(nextExam.date)}
            </span>
          )}
          <Button
            variant="ghost"
            size="icon"
            onClick={closeForm}
            className="h-8 w-8 text-gray-400 hover:text-gray-600"
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* ─── Loading ─── */}
      {suggestionsLoading && (
        <div className="flex-1 flex items-center justify-center">
          <Loader size="sm" message="Cargando alumnos sugeridos..." />
        </div>
      )}

      {/* ─── No exam ─── */}
      {!suggestionsLoading && !nextExam && (
        <div className="flex-1 flex flex-col items-center justify-center gap-3 text-gray-400">
          <div className="h-16 w-16 rounded-full bg-gray-50 flex items-center justify-center">
            <Award className="h-8 w-8 text-gray-300" />
          </div>
          <div className="text-center">
            <p className="font-medium text-gray-600">No hay exámenes próximos</p>
            <p className="text-sm text-gray-400">
              Debe existir al menos un examen programado para postular.
            </p>
          </div>
        </div>
      )}

      {/* ─── No eligible students ─── */}
      {!suggestionsLoading && nextExam && eligibleStudents.length === 0 && (
        <div className="flex-1 flex flex-col items-center justify-center gap-3 text-gray-400">
          <div className="h-16 w-16 rounded-full bg-gray-50 flex items-center justify-center">
            <GraduationCap className="h-8 w-8 text-gray-300" />
          </div>
          <div className="text-center">
            <p className="font-medium text-gray-600">No hay alumnos para postular</p>
            <p className="text-sm text-gray-400">
              Todos los alumnos elegibles ya han sido postulados a este examen.
            </p>
          </div>
        </div>
      )}

      {/* ─── Main Content ─── */}
      {!suggestionsLoading && nextExam && eligibleStudents.length > 0 && (
        <div className="flex-1 flex flex-col min-h-0 overflow-hidden">
          <div className="flex-1 overflow-y-auto px-6 py-5 space-y-6">
            <section>
              <div className="flex gap-1 p-1 bg-gray-100 rounded-xl">
                {visibleMartialArts.map((ma) => {
                  const count = martialArtCounts[ma.id] || 0;
                  const isSelected = selectedMartialArtId === ma.id;
                  const hasStudents = count > 0;

                  return (
                    <button
                      key={ma.id}
                      type="button"
                      disabled={!hasStudents}
                      onClick={() =>
                        setSelectedMartialArtId(isSelected ? null : ma.id)
                      }
                      className={`
                        flex-1 flex items-center justify-center gap-2 px-3 py-2.5 rounded-lg text-sm font-medium transition-all
                        ${isSelected
                          ? "shadow-sm"
                          : hasStudents
                            ? "bg-transparent text-gray-500 hover:bg-gray-200 hover:text-gray-800"
                            : "bg-transparent text-gray-300 cursor-not-allowed"
                        }
                      `}
                      style={{
                        backgroundColor: isSelected ? "#000" : undefined,
                        color: isSelected ? "#fff" : undefined,
                      }}
                    >
                      <span className="text-base">{getMartialArtIcon(ma.martialArt)}</span>
                      <span>{ma.martialArt}</span>
                      {count > 0 && (
                        <span
                          className={`
                            text-[10px] px-1.5 py-0.5 rounded-full font-medium tabular-nums
                            ${isSelected
                              ? "bg-white/20 text-white"
                              : "bg-gray-200 text-gray-500"
                            }
                          `}
                        >
                          {count}
                        </span>
                      )}
                    </button>
                  );
                })}
              </div>
            </section>

            {selectedMartialArtId && (
              <section>
                <div className="flex items-center gap-3 mb-4">
                  <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider whitespace-nowrap">
                    Alumnos para postular
                  </h3>
                  <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-300 pointer-events-none" />
                    <Input
                      placeholder="Buscar alumno por nombre o cédula..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-9 h-9 text-sm bg-gray-50 border-gray-100 rounded-lg placeholder:text-gray-300 focus-visible:bg-white focus-visible:border-gray-300 transition-all w-full"
                    />
                  </div>
                  <span className="text-xs font-medium text-gray-500 tabular-nums whitespace-nowrap">
                    {selectedStudentIds.size} de{" "}
                    {studentsForMartialArt.length} seleccionados
                  </span>
                </div>

                {filteredStudents.length > 0 ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 pb-1">
                    {filteredStudents.map(
                      (student: ISuggestionStudentApplied) => {
                        const isSelected = selectedStudentIds.has(student.id);
                        const targetInfo =
                          student.suggestedByMartialArt.find(
                            (ma) =>
                              ma.martialArtId === selectedMartialArtId,
                          ) as (typeof student.suggestedByMartialArt)[number] & {
                            lastExamDate: string | null;
                          } | undefined;
                        const postulationRank =
                          targetInfo?.postulationRank;
                        const hasLastExam =
                          targetInfo?.lastExamDate ?? null;
                        const currentRank =
                          hasLastExam && postulationRank
                            ? ranksMap.get(postulationRank.id - 1) ?? null
                            : null;
                        const currentRankBelt =
                          currentRank?.belt || "";
                        const targetRankBelt =
                          postulationRank?.belt || "";
                        const currentBeltStripe = currentRankBelt
                          ? getBeltStyle(currentRankBelt).stripe
                          : "bg-gray-200";
                        const targetBeltStripe = targetRankBelt
                          ? getBeltStyle(targetRankBelt).stripe
                          : "bg-gray-200";

                        return (
                          <button
                            type="button"
                            key={student.id}
                            onClick={() => toggleStudent(student.id)}
                            className={`
                              group relative text-left w-full rounded-xl border transition-all duration-200 overflow-hidden
                              ${isSelected
                                ? "shadow-sm"
                                : "border-gray-100 bg-white hover:border-gray-200 hover:shadow-sm hover:bg-gray-50/50"
                            }
                            `}
                            style={{
                              borderColor: isSelected
                                ? "#000"
                                : undefined,
                              backgroundColor: isSelected
                                ? "#f3f4f6"
                                : undefined,
                            }}
                          >
                            <div className="p-3.5">
                              <div className="flex items-start gap-3">
                                {/* Avatar */}
                                <div
                                  className={`
                                    h-10 w-10 rounded-full shrink-0 flex items-center justify-center text-xs font-bold
                                    transition-all duration-200
                                    ${currentRankBelt ? getBeltStyle(currentRankBelt).bg : "bg-gray-100"}
                                    ${currentRankBelt ? getBeltStyle(currentRankBelt).text : "text-gray-500"}
                                  `}
                                  style={{
                                    outline: isSelected
                                      ? "2px solid #000"
                                      : undefined,
                                    outlineOffset: isSelected
                                      ? "2px"
                                      : undefined,
                                  }}
                                >
                                  {getInitials(
                                    student.name,
                                    student.lastName,
                                  )}
                                </div>

                                <div className="min-w-0 flex-1 pt-0.5">
                                  <p className="text-sm font-semibold text-gray-900 truncate leading-tight">
                                    {student.name} {student.lastName}
                                  </p>
                                  <p className="text-xs text-gray-400 truncate mt-0.5">
                                    {student.identification || "Sin cédula"}
                                  </p>

                                  {/* Current → Target rank */}
                                  <div className="mt-2.5 flex items-center gap-2">
                                    <div className="flex items-center gap-1">
                                      <div
                                        className={`h-2.5 w-2.5 rounded-full ${currentBeltStripe} shrink-0`}
                                      />
                                      <span className="text-[10px] text-gray-400 leading-none">
                                        {currentRankBelt || "Blanco"}
                                      </span>
                                    </div>
                                    <span className="text-[10px] text-gray-300 leading-none">→</span>
                                    <div className="flex items-center gap-1">
                                      <div
                                        className={`h-2.5 w-2.5 rounded-full ${targetBeltStripe} shrink-0`}
                                      />
                                      <span className="text-[10px] font-semibold text-gray-700 leading-none">
                                        {targetRankBelt}
                                      </span>
                                    </div>
                                    {isSelected && (
                                      <Check
                                        className="h-3 w-3 ml-auto shrink-0"
                                        style={{
                                          color: "#000",
                                        }}
                                      />
                                    )}
                                  </div>
                                </div>
                              </div>
                            </div>

                            {/* Selection bar */}
                            <div
                              className="h-0.5 w-full transition-all duration-300"
                              style={{
                                backgroundColor: isSelected
                                  ? "#000"
                                  : "transparent",
                              }}
                            />
                          </button>
                        );
                      },
                    )}
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center py-12 text-gray-400">
                    <Users className="h-8 w-8 mb-2 text-gray-200" />
                    <p className="text-sm font-medium text-gray-500">
                      {searchTerm
                        ? "No se encontraron alumnos"
                        : "No hay alumnos disponibles"}
                    </p>
                    <p className="text-xs text-gray-400 mt-0.5">
                      {searchTerm
                        ? "Intenta con otro nombre o cédula"
                        : "Todos los alumnos elegibles ya fueron postulados"}
                    </p>
                  </div>
                )}
              </section>
            )}
          </div>

          {/* ─── Footer ─── */}
          <div className="shrink-0 border-t border-gray-100 px-6 py-4">
            <div className="flex items-center justify-between gap-3">
              <p className="text-xs text-gray-400 hidden sm:block">
                {selectedStudentIds.size > 0
                  ? `${selectedStudentIds.size} ${selectedStudentIds.size === 1 ? "alumno seleccionado" : "alumnos seleccionados"}`
                  : "Selecciona un arte marcial y los alumnos a postular"}
              </p>
              <div className="flex items-center gap-2 ml-auto">
                <Button
                  type="button"
                  variant="outline"
                  onClick={closeForm}
                  className="h-9 px-4 text-sm text-gray-500 border-gray-200 hover:text-gray-700 hover:bg-gray-50"
                >
                  Cancelar
                </Button>
                <Button
                  type="button"
                  disabled={
                    !selectedMartialArtId ||
                    selectedStudentIds.size === 0 ||
                    isPending
                  }
                  onClick={handleSubmit}
                  style={{
                    backgroundColor:
                      !selectedMartialArtId || selectedStudentIds.size === 0
                        ? undefined
                        : "var(--redColor)",
                  }}
                  className="h-9 px-5 text-sm text-white font-medium border-0 transition-all disabled:bg-gray-300"
                >
                  {isPending ? (
                    <span className="flex items-center gap-2">
                      <span className="h-3.5 w-3.5 rounded-full border-2 border-white/30 border-t-white animate-spin" />
                      Postulando...
                    </span>
                  ) : selectedStudentIds.size > 0 ? (
                    `Postular (${selectedStudentIds.size})`
                  ) : (
                    "Postular"
                  )}
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
