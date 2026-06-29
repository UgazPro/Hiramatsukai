import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { TableComponent } from "@/components/table/TableComponent";
import { Column } from "@/components/table/TableComponent";
import { useActivitiesStore } from "@/stores/activities.store";

function ActivityCardSkeleton() {
    return (
        <Card className="border border-gray-300 overflow-hidden py-0">
            <CardContent className="p-0">
                <div className="bg-linear-to-r from-yellow-50 to-red-50 p-4 border-b border-gray-200">
                    <div className="flex items-start justify-between gap-2">
                        <div className="min-w-0 flex-1 space-y-2">
                            <Skeleton className="h-5 w-3/4" />
                            <Skeleton className="h-4 w-full" />
                        </div>
                        <Skeleton className="h-5 w-16 flex-shrink-0" />
                    </div>
                </div>

                <div className="p-4 space-y-3">
                    <div className="flex items-center gap-2">
                        <Skeleton className="h-4 w-4" />
                        <Skeleton className="h-4 w-2/3" />
                    </div>
                    <div className="flex justify-between items-center">
                        <div className="flex items-center gap-2">
                            <Skeleton className="h-4 w-4" />
                            <Skeleton className="h-4 w-20" />
                        </div>
                        <div className="flex items-center gap-2">
                            <Skeleton className="h-4 w-4" />
                            <Skeleton className="h-4 w-16" />
                        </div>
                    </div>
                </div>

                <div className="px-4 py-3 border-t border-gray-200 bg-gray-50">
                    <div className="flex justify-between gap-2">
                        <Skeleton className="h-8 w-8" />
                        <Skeleton className="h-8 flex-1" />
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}

const skeletonColumns: Column<unknown>[] = [
    { header: "Actividad" },
    { header: "Tipo" },
    { header: "Lugar" },
    { header: "Fecha/Hora" },
    { header: "Acciones" },
];

export default function ActivitiesSkeleton() {
    const { viewMode } = useActivitiesStore();

    return (
        <div className="space-y-6">
            {/* Content */}
            <div className="flex flex-col lg:flex-row items-start justify-between gap-8">
                <div className="flex-1 overflow-x-auto order-2 lg:order-1">
                    {viewMode === "table" ? (
                        <TableComponent
                            data={[]}
                            columns={skeletonColumns}
                            loading
                            skeletonRows={7}
                        />
                    ) : (
                        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
                            {Array.from({ length: 6 }).map((_, i) => (
                                <ActivityCardSkeleton key={i} />
                            ))}
                        </div>
                    )}

                    {/* Pagination skeleton */}
                    <div className="hidden lg:block mt-4">
                        <div className="flex items-center justify-between">
                            <Skeleton className="h-4 w-48" />
                            <div className="flex items-center gap-2">
                                <Skeleton className="h-8 w-8" />
                                <Skeleton className="h-8 w-8" />
                                <Skeleton className="h-8 w-8" />
                                <Skeleton className="h-8 w-8" />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Calendar sidebar skeleton */}
                <div className="order-1 lg:order-2 w-80">
                    <Card className="border border-gray-300">
                        <CardContent className="p-4 space-y-4">
                            <div className="flex items-center justify-between">
                                <Skeleton className="h-6 w-6" />
                                <Skeleton className="h-6 w-32" />
                                <Skeleton className="h-6 w-6" />
                            </div>
                            <div className="grid grid-cols-7 gap-1">
                                {Array.from({ length: 7 }).map((_, i) => (
                                    <Skeleton key={`header-${i}`} className="h-4 w-full" />
                                ))}
                                {Array.from({ length: 35 }).map((_, i) => (
                                    <Skeleton key={`day-${i}`} className="h-8 w-full" />
                                ))}
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
}
