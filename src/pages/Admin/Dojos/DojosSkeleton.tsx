import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { TableComponent } from "@/components/table/TableComponent";
import { Column } from "@/components/table/TableComponent";
import { useDojosStore } from "@/stores/dojos.store";

function DojoCardSkeleton() {
    return (
        <Card className="border border-gray-300 overflow-hidden py-0">
            <CardContent className="p-0">
                <div className="bg-linear-to-r from-yellow-50 to-red-50 p-4 border-b border-gray-200">
                    <div className="flex items-start justify-between gap-2">
                        <div className="min-w-0 flex-1 space-y-2">
                            <Skeleton className="h-5 w-3/4" />
                            <Skeleton className="h-4 w-full" />
                        </div>
                        <Skeleton className="h-10 w-10 rounded-full flex-shrink-0" />
                    </div>
                </div>

                <div className="p-4 space-y-3">
                    <div className="flex items-center gap-2">
                        <Skeleton className="h-4 w-4" />
                        <Skeleton className="h-4 w-2/3" />
                    </div>
                    <div className="flex flex-wrap gap-1">
                        <Skeleton className="h-5 w-20" />
                        <Skeleton className="h-5 w-24" />
                        <Skeleton className="h-5 w-16" />
                    </div>
                    <div className="flex justify-between items-center">
                        <Skeleton className="h-4 w-24" />
                        <Skeleton className="h-4 w-16" />
                    </div>
                </div>

                <div className="px-4 py-3 border-t border-gray-200 bg-gray-50">
                    <div className="flex justify-end gap-2">
                        <Skeleton className="h-8 w-8" />
                        <Skeleton className="h-8 w-8" />
                        <Skeleton className="h-8 w-8" />
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}

const skeletonColumns: Column<unknown>[] = [
    { header: "Dojo" },
    { header: "Dirección" },
    { header: "Artes Marciales" },
    { header: "Estudiantes" },
    { header: "Dojo Padre" },
    { header: "Hijos" },
    { header: "Acciones" },
];

export default function DojosSkeleton() {
    const { viewMode } = useDojosStore();

    return (
        <div className="space-y-6">
            <div className="flex-1 overflow-x-auto">
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
                            <DojoCardSkeleton key={i} />
                        ))}
                    </div>
                )}

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
        </div>
    );
}
