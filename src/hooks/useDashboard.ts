import { useQuery } from "@tanstack/react-query";
import { useStudents } from "./useStudents";
import { useUpcomingExams } from "./useActivities";
import { getUserDataSafe } from "@/helpers/token";
import { getActivities, getActivityAttendance, getCurrentActivity } from "@/services/activities/activity.service";
import { postDataApi } from "@/services/api";
import { useMemo } from "react";
import { startOfWeek, endOfWeek } from "date-fns";

const dayNames = ["Dom", "Lun", "Mar", "Mié", "Jue", "Vie", "Sáb"];

export const useWeeklyAttendance = (dojoId?: number) => {
  return useQuery({
    queryKey: ["weeklyAttendance", dojoId],
    queryFn: async () => {
      const today = new Date();
      const start = startOfWeek(today, { weekStartsOn: 1 });
      const end = endOfWeek(today, { weekStartsOn: 1 });

      const activities = await getActivities({
        includePast: true,
        dateRange: { startDate: start, endDate: end },
      });

      const attendancePromises = activities.map((a) =>
        getActivityAttendance(a.id).then((att: any[]) => ({
          activityId: a.id,
          date: a.date,
          attendees: att ?? [],
        }))
      );
      const results = await Promise.allSettled(attendancePromises);

      const dailyMap: Record<number, number> = {};
      for (const r of results) {
        if (r.status === "fulfilled") {
          const day = new Date(r.value.date).getDay();
          dailyMap[day] = (dailyMap[day] ?? 0) + r.value.attendees.length;
        }
      }

      return dayNames.map((dia, idx) => ({
        dia,
        estudiantes: dailyMap[idx] ?? 0,
      }));
    },
    enabled: Boolean(dojoId),
    staleTime: 1000 * 60 * 5,
  });
};

export const useCurrentActivityQuery = (dojoId?: number) => {
  return useQuery({
    queryKey: ["currentActivity", dojoId],
    queryFn: () => getCurrentActivity(dojoId),
    enabled: Boolean(dojoId),
    staleTime: 1000 * 60 * 5,
    retry: false,
  });
};

export const useMonthlyIncome = (dojoId?: number) => {
  return useQuery({
    queryKey: ["monthlyIncome", dojoId],
    queryFn: async () => {
      const now = new Date();
      const start = new Date(now.getFullYear(), now.getMonth(), 1);
      const end = new Date(now.getFullYear(), now.getMonth() + 1, 0, 23, 59, 59, 999);
      const filters: any = { startDate: start, endDate: end };
      if (dojoId) filters.dojoId = dojoId;
      const payments = await postDataApi("/payments/search", filters);
      const total = (payments ?? []).reduce((sum: number, p: any) => sum + Number(p.amount ?? 0), 0);
      return total;
    },
    enabled: Boolean(dojoId),
    staleTime: 1000 * 60 * 5,
  });
};

export const useBirthdays = (students: any[]) => {
  return useMemo(() => {
    const now = new Date();
    const thirtyDaysFromNow = new Date();
    thirtyDaysFromNow.setDate(now.getDate() + 30);

    const withBirthday = students.filter((s: any) => {
      if (!s.birthday) return false;
      const bd = new Date(s.birthday);
      const thisYear = new Date(now.getFullYear(), bd.getMonth(), bd.getDate());
      const nextYear = new Date(now.getFullYear() + 1, bd.getMonth(), bd.getDate());
      return (thisYear >= now && thisYear <= thirtyDaysFromNow) ||
             (nextYear >= now && nextYear <= thirtyDaysFromNow);
    });

    return withBirthday
      .map((s: any) => {
        const bd = new Date(s.birthday);
        const thisYear = new Date(now.getFullYear(), bd.getMonth(), bd.getDate());
        const candidateDate = thisYear >= now ? thisYear : new Date(now.getFullYear() + 1, bd.getMonth(), bd.getDate());
        return {
          id: s.id,
          nombre: s.name,
          apellido: s.lastName,
          fecha: candidateDate,
          edad: now.getFullYear() - bd.getFullYear(),
          grado: s.userRanks?.[0]?.rank?.belt ?? "Sin grado",
          imagen: s.profileImg,
        };
      })
      .sort((a, b) => a.fecha.getTime() - b.fecha.getTime())
      .slice(0, 5);
  }, [students]);
};

export const useAdvancedStudents = (students: any[]) => {
  return useMemo(() => {
    return students.filter((s: any) =>
      s.userRanks?.some((r: any) => {
        const belt = r.rank?.belt ?? "";
        return belt.includes("Marrón") || belt.includes("Negro");
      })
    ).length;
  }, [students]);
};

export const useDashboard = () => {
  const user = getUserDataSafe();
  const dojoId = user?.dojoId;

  const { data: students = [], isLoading: studentsLoading } = useStudents();
  const { upcomingExams, isLoading: examsLoading } = useUpcomingExams();
  const { data: currentActivity, isLoading: currentLoading } = useCurrentActivityQuery(dojoId);
  const { data: weeklyAttendance, isLoading: attendanceLoading } = useWeeklyAttendance(dojoId);
  const { data: monthlyIncome, isLoading: incomeLoading } = useMonthlyIncome(dojoId);

  const totalEstudiantes = students.length;
  const advancedCount = useAdvancedStudents(students);
  const birthdays = useBirthdays(students);

  const nextExams = useMemo(
    () => [...upcomingExams].sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()).slice(0, 3),
    [upcomingExams],
  );

  const nextActivities = useMemo(() => {
    const now = new Date();
    return upcomingExams
      .filter((a) => new Date(a.date) >= now)
      .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
      .slice(0, 2);
  }, [upcomingExams]);

  const classesThisMonth = useMemo(() => {
    const now = new Date();
    const start = new Date(now.getFullYear(), now.getMonth(), 1);
    const end = new Date(now.getFullYear(), now.getMonth() + 1, 0, 23, 59, 59, 999);
    return upcomingExams.filter((a) => {
      const d = new Date(a.date);
      return d >= start && d <= end;
    }).length;
  }, [upcomingExams]);

  const averageAttendance = useMemo(() => {
    if (!weeklyAttendance || weeklyAttendance.length === 0) return 0;
    const total = weeklyAttendance.reduce((s, d) => s + d.estudiantes, 0);
    const daysWithActivity = weeklyAttendance.filter((d) => d.estudiantes > 0).length;
    if (daysWithActivity === 0 || totalEstudiantes === 0) return 0;
    return Math.round((total / daysWithActivity / totalEstudiantes) * 100);
  }, [weeklyAttendance, totalEstudiantes]);

  const upcomingClassesNext = useMemo(() => {
    const now = new Date();
    return upcomingExams
      .filter((a) => a.type !== "Examen" && new Date(a.date) >= now)
      .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
      .slice(0, 3);
  }, [upcomingExams]);

  return {
    user,
    students,
    totalEstudiantes,
    advancedCount,
    birthdays,
    nextExams,
    nextActivities,
    classesThisMonth,
    monthlyIncome,
    weeklyAttendance,
    averageAttendance,
    currentActivity,
    upcomingClassesNext,
    isLoading: studentsLoading || examsLoading || currentLoading || attendanceLoading || incomeLoading,
  };
};