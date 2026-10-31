/* eslint-disable react-hooks/set-state-in-effect */
import { useEffect, useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  X,
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
import { useDojosInfo, useRanks } from "@/hooks/useDojos";
import { dateFormatterIntoLong } from "@/helpers/formatter";
import { ISuggestionStudentApplied } from "@/services/students/student.interface";
import { IRanks } from "@/services/dojos/dojo.interface";
import { IAppliedStudent } from "@/services/activities/activity.interface";
import { useUserData } from "@/helpers/token";
import { IProfile } from "@/services/profile/profile.interface";

const beltColors: Record<string, { bg: string; text: string; stripe: string }> =
  {
    Blanco: {
      bg: "bg-muted",
      text: "text-gray-800",
      stripe: "bg-gray-300",
    },
    Amarillo: {
      bg: "bg-brand-gold/15",
      text: "text-brand-gold-deep",
      stripe: "bg-brand-gold",
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
      bg: "bg-brand-indigo/10",
      text: "text-brand-indigo",
      stripe: "bg-brand-indigo/60",
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

const maLogos: Record<string, string> = {
  Karate: "/oki2.png",
  Kobudo: "/Logo_de_Kobudo-Sin_Fondo mejorado.png",
};

function getMaLogo(name: string) {
  return maLogos[name] || "/kendo-iaido-icono.png";
}

const martialArtColors: Record<string, { tabBorder: string; tabHoverBorder: string; tabText: string; tabBadgeBg: string }> = {
  Karate: {
    tabBorder: "border-red-300",
    tabHoverBorder: "hover:border-red-100",
    tabText: "text-red-700",
    tabBadgeBg: "bg-red-50",
  },
  Kobudo: {
    tabBorder: "border-brand-gold/40",
    tabHoverBorder: "hover:border-brand-gold/30",
    tabText: "text-brand-gold-deep",
    tabBadgeBg: "bg-brand-gold/10",
  },
};

const defaultMaColor = {
  tabBorder: "border-brand-indigo/40",
  tabHoverBorder: "hover:border-brand-indigo/25",
  tabText: "text-brand-indigo",
  tabBadgeBg: "bg-brand-indigo/10",
};

function getMaColor(name: string) {
  return martialArtColors[name] || defaultMaColor;
}

export default function PostulationForm() {
  const { screen, selectedActivityId, closeForm } = useApplicationsStore();
  const { upcomingExams } = useUpcomingExams();
  const { suggestions, isLoading: suggestionsLoading } =
    useAppliedStudentSuggestions();
  const user: IProfile = useUserData() as IProfile;

  const { data: dojo } = useDojosInfo(user.dojo.code || "");
  const { mutateAsync: createPostulation, isPending } =
    useCreateAppliedStudent();
  const { data: ranks = [] } = useRanks();

  const [selectedMartialArtId, setSelectedMartialArtId] = useState<number | null>(null);
  const [selectedStudentIds, setSelectedStudentIds] = useState<Set<number>>(new Set());

  const visibleMartialArts = dojo?.dojoMartialArts || [];

  const ranksMap = useMemo(() => {
    const map = new Map<number, IRanks>();
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
    }
  }, [screen]);

  useEffect(() => {
    if (visibleMartialArts.length > 0 && selectedMartialArtId === null) {
      setSelectedMartialArtId(visibleMartialArts[0].id);
    }
  }, [visibleMartialArts, selectedMartialArtId]);

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
    <div className="m-2 flex h-[calc(100%-1rem)] w-[calc(100%-1rem)] flex-col overflow-hidden rounded-2xl border border-border bg-card shadow-sm sm:m-4 sm:h-[calc(100%-2rem)] sm:w-[calc(100%-2rem)]">
      {/* ─── Header ─── */}
      <div className="flex shrink-0 items-center justify-between border-b border-border bg-muted/60 px-4 py-4 sm:px-6">
        <div className="flex items-center gap-3 min-w-0">
          <div
            className="h-9 w-9 rounded-lg flex items-center justify-center shrink-0"
            style={{ backgroundColor: "var(--brand-blue)" }}
          >
            <UserCheck className="h-5 w-5 text-white" />
          </div>
          <div className="min-w-0">
            <h2 className="text-lg font-semibold text-heading leading-tight">
              Nueva Postulación
            </h2>
            {nextExam && (
              <p className="text-xs text-muted-foreground flex items-center gap-1.5 leading-tight">
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
            <span className="hidden sm:flex items-center gap-1.5 text-xs text-muted-foreground">
              <CalendarDays className="h-3 w-3" />
              {dateFormatterIntoLong(nextExam.date)}
            </span>
          )}
          <Button
            variant="ghost"
            size="icon"
            onClick={closeForm}
            aria-label="Cerrar postulación"
            className="size-11 text-muted-foreground hover:text-foreground"
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
        <div className="flex-1 flex flex-col items-center justify-center gap-3 text-muted-foreground">
          <div className="h-16 w-16 rounded-full bg-muted/40 flex items-center justify-center">
            <Award className="h-8 w-8 text-border" />
          </div>
          <div className="text-center">
            <p className="font-medium text-muted-foreground">No hay exámenes próximos</p>
            <p className="text-sm text-muted-foreground">
              Debe existir al menos un examen programado para postular.
            </p>
          </div>
        </div>
      )}

      {/* ─── No eligible students ─── */}
      {!suggestionsLoading && nextExam && eligibleStudents.length === 0 && (
        <div className="flex-1 flex flex-col items-center justify-center gap-3 text-muted-foreground">
          <div className="h-16 w-16 rounded-full bg-muted/40 flex items-center justify-center">
            <GraduationCap className="h-8 w-8 text-border" />
          </div>
          <div className="text-center">
            <p className="font-medium text-muted-foreground">No hay alumnos para postular</p>
            <p className="text-sm text-muted-foreground">
              Todos los alumnos elegibles ya han sido postulados a este examen.
            </p>
          </div>
        </div>
      )}

      {/* ─── Main Content ─── */}
      {!suggestionsLoading && nextExam && eligibleStudents.length > 0 && (
        <div className="flex-1 flex flex-col min-h-0 overflow-hidden">
          <div className="flex flex-1 flex-col gap-6 overflow-y-auto px-4 py-5 sm:px-6">
            <section>
              <div className="flex gap-2 overflow-x-auto rounded-2xl bg-muted p-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
                {visibleMartialArts.map((ma) => {
                  const count = martialArtCounts[ma.id] || 0;
                  const isSelected = selectedMartialArtId === ma.id;
                  const hasStudents = count > 0;
                  const maColor = getMaColor(ma.martialArt);

                  return (
                    <button
                      key={ma.id}
                      type="button"
                      disabled={!hasStudents}
                      aria-pressed={isSelected}
                      onClick={() =>
                        setSelectedMartialArtId(isSelected ? null : ma.id)
                      }
                      className={`
                        flex min-w-[8rem] flex-1 shrink-0 items-center justify-center gap-2.5 rounded-xl border-2 px-3 py-3 text-sm font-medium transition-all duration-200 sm:px-4
                        ${isSelected
                          ? `bg-card shadow-sm ${maColor.tabBorder} ${maColor.tabText} cursor-pointer`
                          : hasStudents
                            ? `bg-card/60 text-muted-foreground border-transparent ${maColor.tabHoverBorder} hover:bg-card hover:text-foreground hover:cursor-pointer`
                            : "bg-transparent text-border cursor-not-allowed border-transparent"
                        }
                      `}
                    >
                      <img src={getMaLogo(ma.martialArt)} alt={ma.martialArt} className="size-5 shrink-0 rounded-full object-contain" />
                      <span className="truncate">{ma.martialArt}</span>
                      {count > 0 && (
                        <span
                          className={`
                            text-[10px] px-1.5 py-0.5 rounded-full font-medium tabular-nums
                            ${isSelected
                              ? `${maColor.tabBadgeBg} ${maColor.tabText}`
                              : "bg-muted/60 text-muted-foreground"
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
                {studentsForMartialArt.length > 0 ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 pb-1">
                    {studentsForMartialArt.map(
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
                          : "bg-muted";
                        const targetBeltStripe = targetRankBelt
                          ? getBeltStyle(targetRankBelt).stripe
                          : "bg-muted";

                        return (
                          <button
                            type="button"
                            key={student.id}
                            role="checkbox"
                            aria-checked={isSelected}
                            aria-label={`${student.name} ${student.lastName}`}
                            onClick={() => toggleStudent(student.id)}
                            className={`
                              group relative text-left w-full rounded-xl border transition-all duration-200 overflow-visible
                              ${isSelected
                                ? "-translate-y-1 shadow-md border-brand-gold/40 bg-card"
                                : "border-border bg-card hover:border-border hover:shadow-sm hover:bg-muted/40"
                            }
                            `}
                          >
                            {/* Left accent bar */}
                            {isSelected && (
                              <div className="absolute left-0 top-2 bottom-2 w-0.5 bg-brand-gold rounded-full" />
                            )}

                            <div className="p-3.5">
                              <div className="flex items-start gap-3">
                                {/* Avatar */}
                                <div
                                  className={`
                                    h-10 w-10 rounded-full shrink-0 flex items-center justify-center text-xs font-bold
                                    transition-all duration-200
                                    ${currentRankBelt ? getBeltStyle(currentRankBelt).bg : "bg-muted"}
                                    ${currentRankBelt ? getBeltStyle(currentRankBelt).text : "text-muted-foreground"}
                                  `}
                                >
                                  {getInitials(
                                    student.name,
                                    student.lastName,
                                  )}
                                </div>

                                <div className="min-w-0 flex-1 pt-0.5">
                                  <p className="text-sm font-semibold text-foreground truncate leading-tight">
                                    {student.name} {student.lastName}
                                  </p>
                                  <p className="text-xs text-muted-foreground truncate mt-0.5">
                                    {student.identification || "Sin cédula"}
                                  </p>

                                  {/* Current → Target rank */}
                                  <div className="mt-2.5 flex items-center gap-2">
                                    <div className="flex items-center gap-1">
                                      <div
                                        className={`h-2.5 w-2.5 rounded-full ${currentBeltStripe} shrink-0`}
                                      />
                                      <span className="text-[10px] text-muted-foreground leading-none">
                                        {currentRankBelt || "Blanco"}
                                      </span>
                                    </div>
                                    <span className="text-[10px] text-border leading-none">→</span>
                                    <div className="flex items-center gap-1">
                                      <div
                                        className={`h-2.5 w-2.5 rounded-full ${targetBeltStripe} shrink-0`}
                                      />
                                      <span className="text-[10px] font-semibold text-foreground leading-none">
                                        {targetRankBelt}
                                      </span>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>

                            {/* Floating badge */}
                            {isSelected && (
                              <div className="absolute -top-2 -right-2 h-6 w-6 rounded-full bg-brand-gold flex items-center justify-center shadow-md">
                                <Check className="h-3.5 w-3.5 text-white" />
                              </div>
                            )}
                          </button>
                        );
                      },
                    )}
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center py-12 text-muted-foreground">
                    <Users className="h-8 w-8 mb-2 text-border" />
                    <p className="text-sm font-medium text-muted-foreground">
                      No hay alumnos disponibles
                    </p>
                    <p className="text-xs text-muted-foreground mt-0.5">
                      Todos los alumnos elegibles ya fueron postulados
                    </p>
                  </div>
                )}
              </section>
            )}
          </div>

          {/* ─── Footer ─── */}
          <div className="shrink-0 border-t border-border px-4 py-4 sm:px-6">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <p className="text-xs text-muted-foreground hidden sm:block">
                {selectedStudentIds.size > 0
                  ? `${selectedStudentIds.size} ${selectedStudentIds.size === 1 ? "alumno seleccionado" : "alumnos seleccionados"}`
                  : "Selecciona un arte marcial y los alumnos a postular"}
              </p>
              <div className="flex items-center gap-2 ml-auto">
                <Button
                  type="button"
                  variant="outline"
                  onClick={closeForm}
                  className="h-11 border-border px-4 text-sm text-muted-foreground hover:bg-muted/40 hover:text-foreground sm:h-9"
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
                        : "var(--brand-blue)",
                  }}
                  className="h-11 border-0 px-5 text-sm font-medium text-white transition-all disabled:bg-muted sm:h-9"
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
