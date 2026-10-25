import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

function StatCardSkeleton() {
  return (
    <Card className="rounded-2xl border-border/70 bg-card/85 py-0 shadow-soft backdrop-blur-sm">
      <CardContent className="flex items-start justify-between gap-3 p-5 sm:p-6">
        <div className="flex flex-1 flex-col gap-3">
          <Skeleton className="h-4 w-32" />
          <Skeleton className="h-9 w-20" />
          <Skeleton className="h-3 w-28" />
        </div>
        <Skeleton className="size-12 shrink-0 rounded-full sm:size-14" />
      </CardContent>
    </Card>
  );
}

function AttendanceBarSkeleton() {
  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <Skeleton className="h-4 w-8" />
          <Skeleton className="h-4 w-24" />
        </div>
        <Skeleton className="h-4 w-10" />
      </div>
      <Skeleton className="h-2.5 w-full rounded-full" />
    </div>
  );
}

function ActivityItemSkeleton() {
  return (
    <div className="flex items-start gap-3">
      <Skeleton className="size-10 shrink-0 rounded-full" />
      <div className="flex min-w-0 flex-1 flex-col gap-2">
        <Skeleton className="h-4 w-3/4" />
        <Skeleton className="h-3 w-1/2" />
        <Skeleton className="h-4 w-16" />
      </div>
    </div>
  );
}

function BirthdayItemSkeleton() {
  return (
    <div className="flex items-center justify-between gap-2 rounded-xl bg-muted/40 p-2.5">
      <div className="flex min-w-0 items-center gap-3">
        <Skeleton className="size-10 shrink-0 rounded-full" />
        <div className="flex min-w-0 flex-col gap-1.5">
          <Skeleton className="h-4 w-32" />
          <div className="flex items-center gap-2">
            <Skeleton className="h-4 w-14" />
            <Skeleton className="h-4 w-12" />
          </div>
        </div>
      </div>
      <Skeleton className="h-5 w-16 shrink-0 rounded-full" />
    </div>
  );
}

function ExamCardSkeleton() {
  return (
    <Card className="rounded-xl border-border/60 bg-card/60 py-0">
      <CardContent className="flex flex-col gap-3 p-4">
        <div className="flex items-start justify-between gap-2">
          <Skeleton className="size-10 rounded-full" />
          <Skeleton className="h-5 w-16 rounded-full" />
        </div>
        <Skeleton className="h-4 w-full" />
        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-2">
            <Skeleton className="size-3" />
            <Skeleton className="h-3 w-28" />
          </div>
          <div className="flex items-center gap-2">
            <Skeleton className="size-3" />
            <Skeleton className="h-3 w-36" />
          </div>
        </div>
        <Skeleton className="h-5 w-20 rounded-full" />
      </CardContent>
    </Card>
  );
}

function ClassItemSkeleton() {
  return (
    <div className="flex items-center gap-3 rounded-xl bg-muted/40 p-2.5">
      <Skeleton className="size-9 shrink-0 rounded-full" />
      <div className="flex min-w-0 flex-1 flex-col gap-1.5">
        <Skeleton className="h-4 w-3/4" />
        <Skeleton className="h-3 w-1/2" />
      </div>
      <Skeleton className="h-5 w-16 shrink-0 rounded-full" />
    </div>
  );
}

export default function AdminPanelSkeleton() {
  return (
    <div className="flex w-full flex-col gap-6 p-3 sm:p-4 md:p-6 lg:p-8 xl:gap-8">
      {/* Header */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div className="flex flex-col gap-2">
          <Skeleton className="h-3 w-28" />
          <Skeleton className="h-9 w-72 max-w-full" />
          <Skeleton className="h-4 w-56" />
        </div>
        <Skeleton className="h-8 w-40 rounded-full" />
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5 xl:grid-cols-4 xl:gap-6">
        <StatCardSkeleton />
        <StatCardSkeleton />
        <StatCardSkeleton />
        <StatCardSkeleton />
      </div>

      {/* Row 2: Weekly Attendance + Activities / Birthdays */}
      <div className="grid grid-cols-1 gap-4 sm:gap-5 lg:grid-cols-3 lg:gap-6">
        {/* Weekly Attendance */}
        <Card className="rounded-2xl border-border/70 bg-card/85 shadow-soft backdrop-blur-sm lg:col-span-2">
          <CardContent className="flex flex-col gap-6 p-5 sm:p-6">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <Skeleton className="size-9 rounded-lg" />
                <Skeleton className="h-5 w-40" />
              </div>
              <Skeleton className="h-6 w-32 rounded-full" />
            </div>
            <div className="flex flex-col gap-4">
              <AttendanceBarSkeleton />
              <AttendanceBarSkeleton />
              <AttendanceBarSkeleton />
              <AttendanceBarSkeleton />
              <AttendanceBarSkeleton />
            </div>
          </CardContent>
        </Card>

        {/* Right Column */}
        <div className="flex flex-col gap-4 sm:gap-5 lg:gap-6">
          {/* Próximas Actividades */}
          <Card className="overflow-hidden rounded-2xl border-border/70 bg-card/85 py-0 shadow-soft backdrop-blur-sm">
            <div className="bg-brand-sumi px-5 py-4">
              <div className="flex items-center gap-3">
                <Skeleton className="size-9 rounded-lg bg-white/10" />
                <Skeleton className="h-5 w-40 bg-white/10" />
              </div>
            </div>
            <CardContent className="flex flex-col gap-4 p-5">
              <ActivityItemSkeleton />
              <ActivityItemSkeleton />
              <ActivityItemSkeleton />
            </CardContent>
          </Card>

          {/* Próximos Cumpleaños */}
          <Card className="rounded-2xl border-border/70 bg-card/85 shadow-soft backdrop-blur-sm">
            <CardContent className="flex flex-col gap-4 p-5 sm:p-6">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <Skeleton className="size-9 rounded-lg" />
                  <Skeleton className="h-5 w-44" />
                </div>
                <Skeleton className="h-6 w-20 rounded-full" />
              </div>
              <div className="flex flex-col gap-2.5">
                <BirthdayItemSkeleton />
                <BirthdayItemSkeleton />
                <BirthdayItemSkeleton />
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Row 3: Exams + Next Classes */}
      <div className="grid grid-cols-1 gap-4 sm:gap-5 lg:grid-cols-3 lg:gap-6">
        {/* Próximos Exámenes */}
        <Card className="rounded-2xl border-border/70 bg-card/85 shadow-soft backdrop-blur-sm lg:col-span-2">
          <CardContent className="flex flex-col gap-6 p-5 sm:p-6">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <Skeleton className="size-9 rounded-lg" />
                <Skeleton className="h-5 w-40" />
              </div>
              <Skeleton className="h-6 w-20 rounded-full" />
            </div>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
              <ExamCardSkeleton />
              <ExamCardSkeleton />
              <ExamCardSkeleton />
            </div>
          </CardContent>
        </Card>

        {/* Próximas Clases */}
        <Card className="rounded-2xl border-border/70 bg-card/85 shadow-soft backdrop-blur-sm">
          <CardContent className="flex flex-col gap-4 p-5 sm:p-6">
            <div className="flex items-center gap-3">
              <Skeleton className="size-9 rounded-lg" />
              <Skeleton className="h-5 w-36" />
            </div>
            <div className="flex flex-col gap-2.5">
              <ClassItemSkeleton />
              <ClassItemSkeleton />
              <ClassItemSkeleton />
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
