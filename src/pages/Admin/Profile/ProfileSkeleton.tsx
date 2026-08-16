import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export default function ProfileSkeleton() {
  return (
    <div className="w-full px-2 sm:px-4 lg:px-6 pb-6">
      <div className="flex flex-col lg:flex-row items-start justify-between gap-4 w-full h-full">
        {/* Header de perfil */}
        <Card className="border-yellow-200 shadow-lg overflow-hidden">
          <div className="h-24 bg-linear-to-r from-yellow-500/60 to-yellow-600/60" />
          <CardContent className="relative pt-16 pb-4">
            {/* Avatar */}
            <div className="absolute -top-16 left-1/2 transform -translate-x-1/2">
              <Skeleton className="h-32 w-32 rounded-full border-4 border-white" />
            </div>

            {/* Información básica */}
            <div className="text-center mt-2 space-y-3">
              <Skeleton className="h-7 w-48 mx-auto" />
              <Skeleton className="h-4 w-32 mx-auto" />

              <div className="flex flex-wrap justify-center gap-2">
                <Skeleton className="h-6 w-24 rounded-full" />
                <Skeleton className="h-6 w-20 rounded-full" />
              </div>

              <div className="flex flex-wrap justify-center gap-2">
                <Skeleton className="h-6 w-40 rounded-full" />
              </div>

              <div className="flex flex-wrap justify-center gap-2">
                <Skeleton className="h-6 w-56 rounded-full" />
              </div>

              <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-6">
                <Skeleton className="h-4 w-44" />
                <Skeleton className="h-4 w-32" />
                <Skeleton className="h-4 w-28" />
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="w-full flex flex-col gap-2">
          {/* Información personal */}
          <Card className="shadow-lg border-gray-200">
            <CardHeader className="pt-4">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between w-full gap-3">
                <div className="space-y-2">
                  <Skeleton className="h-6 w-52" />
                  <Skeleton className="h-4 w-64" />
                </div>
                <Skeleton className="h-9 w-24" />
              </div>
            </CardHeader>
            <CardContent className="px-4 pb-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-5">
                {Array.from({ length: 9 }).map((_, i) => (
                  <div key={i} className="space-y-1.5">
                    <Skeleton className="h-3 w-24" />
                    <Skeleton className="h-4 w-full max-w-40" />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Seguridad */}
          <Card className="shadow-lg border-gray-200">
            <CardHeader className="pt-4">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between w-full gap-3">
                <Skeleton className="h-6 w-52" />
                <Skeleton className="h-8 w-24" />
              </div>
            </CardHeader>
            <CardContent className="px-4 pb-4">
              <div className="space-y-4 max-w-lg">
                {Array.from({ length: 3 }).map((_, i) => (
                  <div key={i} className="space-y-2">
                    <Skeleton className="h-3 w-32" />
                    <Skeleton className="h-10 w-full" />
                  </div>
                ))}
                <Skeleton className="h-10 w-full sm:w-48" />
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
