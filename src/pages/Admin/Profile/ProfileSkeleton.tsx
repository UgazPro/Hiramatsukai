import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export default function ProfileSkeleton() {
  return (
    <div className="min-h-screen bg-linear-to-b from-gray-50 to-gray-100 p-4 md:p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-center mb-8">
          <Skeleton className="h-8 w-48" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Columna izquierda */}
          <div className="lg:col-span-1 space-y-6">
            {/* Tarjeta de perfil */}
            <Card className="border-yellow-200 shadow-lg overflow-hidden">
              <div className="h-24 bg-linear-to-r from-yellow-500 to-yellow-600" />
              <CardContent className="relative pt-16">
                {/* Avatar */}
                <div className="absolute -top-16 left-1/2 transform -translate-x-1/2">
                  <Skeleton className="h-32 w-32 rounded-full" />
                </div>

                {/* Información básica */}
                <div className="text-center mt-2 space-y-3">
                  <Skeleton className="h-7 w-40 mx-auto" />
                  <Skeleton className="h-4 w-32 mx-auto" />

                  <div className="flex flex-wrap justify-center gap-2">
                    <Skeleton className="h-6 w-24 rounded-full" />
                    <Skeleton className="h-6 w-32 rounded-full" />
                  </div>

                  <div className="pt-4 space-y-2">
                    <div className="flex items-center justify-center gap-2">
                      <Skeleton className="h-4 w-4" />
                      <Skeleton className="h-4 w-48" />
                    </div>
                    <div className="flex items-center justify-center gap-2">
                      <Skeleton className="h-4 w-4" />
                      <Skeleton className="h-4 w-32" />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Estadísticas */}
            <Card className="border-blue-200">
              <CardHeader className="pb-3">
                <Skeleton className="h-5 w-32" />
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {Array.from({ length: 4 }).map((_, i) => (
                    <div key={i} className="flex justify-between items-center">
                      <Skeleton className="h-4 w-32" />
                      <Skeleton className="h-4 w-16" />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Columna derecha */}
          <div className="lg:col-span-2">
            {/* Tabs */}
            <div className="grid grid-cols-4 mb-6">
              {Array.from({ length: 3 }).map((_, i) => (
                <Skeleton key={i} className="h-10" />
              ))}
            </div>

            {/* Contenido del tab */}
            <Card>
              <CardHeader>
                <Skeleton className="h-6 w-48" />
                <Skeleton className="h-4 w-64" />
              </CardHeader>
              <CardContent className="space-y-4">
                {Array.from({ length: 4 }).map((_, i) => (
                  <div key={i} className="space-y-2">
                    <Skeleton className="h-4 w-32" />
                    <div className="flex gap-2">
                      <Skeleton className="h-10 flex-1" />
                      <Skeleton className="h-10 w-10" />
                    </div>
                  </div>
                ))}
                <div className="space-y-2">
                  <Skeleton className="h-4 w-24" />
                  <Skeleton className="h-20 w-full" />
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
