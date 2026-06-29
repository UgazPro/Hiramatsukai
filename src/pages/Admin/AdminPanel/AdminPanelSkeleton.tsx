import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

function StatCardSkeleton() {
  return (
    <Card className="border border-gray-300">
      <CardContent className="p-6">
        <div className="flex items-start justify-between">
          <div className="space-y-3 flex-1">
            <Skeleton className="h-4 w-32" />
            <Skeleton className="h-9 w-16" />
            <Skeleton className="h-4 w-28 mt-2" />
          </div>
          <Skeleton className="h-14 w-14 rounded-full" />
        </div>
      </CardContent>
    </Card>
  );
}

function AttendanceBarSkeleton() {
  return (
    <div className="space-y-2">
      <div className="flex justify-between items-center text-sm">
        <div className="flex items-center gap-2">
          <Skeleton className="h-4 w-8" />
          <Skeleton className="h-4 w-24" />
        </div>
        <Skeleton className="h-4 w-10" />
      </div>
      <Skeleton className="h-3 w-full rounded-full" />
    </div>
  );
}

function ActivityItemSkeleton() {
  return (
    <div className="flex items-start gap-3">
      <Skeleton className="h-10 w-10 rounded-full flex-shrink-0" />
      <div className="space-y-2 flex-1 min-w-0">
        <Skeleton className="h-4 w-3/4" />
        <Skeleton className="h-3 w-1/2" />
        <Skeleton className="h-4 w-16 mt-1" />
      </div>
    </div>
  );
}

function BirthdayItemSkeleton() {
  return (
    <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
      <div className="flex items-center gap-3 min-w-0">
        <Skeleton className="h-10 w-10 rounded-full flex-shrink-0" />
        <div className="space-y-1.5 min-w-0">
          <Skeleton className="h-4 w-32" />
          <div className="flex items-center gap-2">
            <Skeleton className="h-4 w-14" />
            <Skeleton className="h-4 w-12" />
          </div>
        </div>
      </div>
      <Skeleton className="h-5 w-16 flex-shrink-0" />
    </div>
  );
}

function ExamCardSkeleton() {
  return (
    <Card className="border border-gray-200">
      <CardContent className="p-4">
        <div className="flex items-start justify-between mb-3">
          <Skeleton className="h-10 w-10 rounded-full" />
          <Skeleton className="h-5 w-16" />
        </div>
        <Skeleton className="h-4 w-full mb-2" />
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <Skeleton className="h-3 w-3" />
            <Skeleton className="h-3 w-28" />
          </div>
          <div className="flex items-center gap-2">
            <Skeleton className="h-3 w-3" />
            <Skeleton className="h-3 w-36" />
          </div>
        </div>
        <Skeleton className="h-5 w-20 mt-3" />
      </CardContent>
    </Card>
  );
}

function ClassItemSkeleton() {
  return (
    <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
      <Skeleton className="h-9 w-9 rounded-full flex-shrink-0" />
      <div className="space-y-1.5 flex-1 min-w-0">
        <Skeleton className="h-4 w-3/4" />
        <Skeleton className="h-3 w-1/2" />
      </div>
      <Skeleton className="h-5 w-16 flex-shrink-0" />
    </div>
  );
}

export default function AdminPanelSkeleton() {
  return (
    <div className="p-4 md:p-6 space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div className="space-y-2">
          <Skeleton className="h-10 w-72" />
          <Skeleton className="h-4 w-56" />
        </div>
        <Skeleton className="h-8 w-40 rounded-full" />
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCardSkeleton />
        <StatCardSkeleton />
        <StatCardSkeleton />
        <StatCardSkeleton />
      </div>

      {/* Row 2: Weekly Attendance + Activities / Birthdays */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Weekly Attendance */}
        <Card className="lg:col-span-2 border border-gray-300 shadow-sm">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-2">
                <Skeleton className="h-5 w-5" />
                <Skeleton className="h-5 w-40" />
              </div>
              <Skeleton className="h-6 w-32 rounded-full" />
            </div>
            <div className="space-y-4">
              <AttendanceBarSkeleton />
              <AttendanceBarSkeleton />
              <AttendanceBarSkeleton />
              <AttendanceBarSkeleton />
              <AttendanceBarSkeleton />
            </div>
          </CardContent>
        </Card>

        {/* Right Column */}
        <div className="space-y-6">
          {/* Próximas Actividades */}
          <Card className="border border-gray-300 shadow-sm">
            <CardContent className="p-0">
              <div className="bg-linear-to-r from-yellow-50 to-red-50 border-b border-gray-200 p-4">
                <div className="flex items-center gap-2">
                  <Skeleton className="h-5 w-5" />
                  <Skeleton className="h-5 w-40" />
                </div>
              </div>
              <div className="p-5 space-y-4">
                <ActivityItemSkeleton />
                <ActivityItemSkeleton />
                <ActivityItemSkeleton />
              </div>
            </CardContent>
          </Card>

          {/* Próximos Cumpleaños */}
          <Card className="border border-gray-300 shadow-sm">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <Skeleton className="h-5 w-5" />
                  <Skeleton className="h-5 w-44" />
                </div>
                <Skeleton className="h-6 w-20 rounded-full" />
              </div>
              <div className="space-y-3">
                <BirthdayItemSkeleton />
                <BirthdayItemSkeleton />
                <BirthdayItemSkeleton />
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Row 3: Exams + Next Classes */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Próximos Exámenes */}
        <Card className="lg:col-span-2 border border-gray-300 shadow-sm">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-2">
                <Skeleton className="h-5 w-5" />
                <Skeleton className="h-5 w-40" />
              </div>
              <Skeleton className="h-6 w-20 rounded-full" />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <ExamCardSkeleton />
              <ExamCardSkeleton />
              <ExamCardSkeleton />
            </div>
          </CardContent>
        </Card>

        {/* Próximas Clases */}
        <Card className="border border-gray-300 shadow-sm">
          <CardContent className="p-6">
            <div className="flex items-center gap-2 mb-4">
              <Skeleton className="h-5 w-5" />
              <Skeleton className="h-5 w-36" />
            </div>
            <div className="space-y-4">
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
