import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export default function ProfileSkeleton() {
  return (
    <div className="w-full p-3 sm:p-4 md:p-6">
      <div className="mx-auto w-full  ">
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-3 lg:gap-6">
          {/* Header de perfil */}
          <Card className="overflow-hidden border-brand-gold/30 shadow-lg lg:col-span-1">
            <div className="h-24 bg-linear-to-r from-brand-gold/60 to-brand-gold-deep/60" />
            <CardContent className="relative pt-16 pb-4">
              {/* Avatar */}
              <div className="absolute -top-16 left-1/2 -translate-x-1/2">
                <Skeleton className="h-32 w-32 rounded-full border-4 border-card" />
              </div>

              {/* Información básica */}
              <div className="mt-2 flex flex-col items-center gap-3 text-center">
                <Skeleton className="h-7 w-3/4 max-w-48" />
                <Skeleton className="h-4 w-1/2 max-w-32" />

                <div className="flex flex-wrap justify-center gap-2">
                  <Skeleton className="h-6 w-24 rounded-full" />
                  <Skeleton className="h-6 w-20 rounded-full" />
                </div>

                <div className="flex flex-wrap justify-center gap-2">
                  <Skeleton className="h-6 w-3/4 max-w-40 rounded-full" />
                </div>

                <div className="flex flex-wrap justify-center gap-2">
                  <Skeleton className="h-6 w-3/4 max-w-56 rounded-full" />
                </div>

                <div className="flex flex-col items-center justify-center gap-2 pt-2 sm:flex-row sm:gap-6">
                  <Skeleton className="h-4 w-44 max-w-full" />
                  <Skeleton className="h-4 w-32 max-w-full" />
                  <Skeleton className="h-4 w-28 max-w-full" />
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="flex w-full flex-col gap-2 lg:col-span-2">
            {/* Información personal */}
            <Card className="border-border shadow-lg">
              <CardHeader className="pt-4">
                <div className="flex w-full flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                  <div className="flex flex-col gap-2">
                    <Skeleton className="h-6 w-52 max-w-full" />
                    <Skeleton className="h-4 w-64 max-w-full" />
                  </div>
                  <Skeleton className="h-9 w-24" />
                </div>
              </CardHeader>
              <CardContent className="px-4 pb-4">
                <div className="grid grid-cols-1 gap-x-6 gap-y-5 md:grid-cols-2">
                  {Array.from({ length: 9 }).map((_, i) => (
                    <div key={i} className="flex flex-col gap-1.5">
                      <Skeleton className="h-3 w-24" />
                      <Skeleton className="h-4 w-full max-w-40" />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Seguridad */}
            <Card className="border-border shadow-lg">
              <CardHeader className="pt-4">
                <div className="flex w-full flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                  <Skeleton className="h-6 w-52 max-w-full" />
                  <Skeleton className="h-8 w-24" />
                </div>
              </CardHeader>
              <CardContent className="px-4 pb-4">
                <div className="flex max-w-lg flex-col gap-4">
                  {Array.from({ length: 3 }).map((_, i) => (
                    <div key={i} className="flex flex-col gap-2">
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
    </div>
  );
}
