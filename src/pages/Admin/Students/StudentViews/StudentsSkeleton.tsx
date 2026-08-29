import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { TableComponent, Column } from "@/components/table/TableComponent";
import { useStudentsStore } from "@/stores/students.store";

function StudentCardSkeleton() {
    return (
        <Card className="border border-gray-300 overflow-hidden hover:shadow-lg transition-all duration-200 py-0">
            <CardContent className="p-0">
                <div className="bg-linear-to-r from-yellow-50 to-red-50 p-4 border-b border-gray-200">
                    <div className="flex items-start justify-between gap-2">
                        <div className="flex items-center gap-3 min-w-0 flex-1">
                            <Skeleton className="h-12 w-12 rounded-full flex-shrink-0" />
                            <div className="min-w-0 flex-1 space-y-2">
                                <Skeleton className="h-4 w-3/4" />
                                <Skeleton className="h-3 w-1/2" />
                            </div>
                        </div>
                        <Skeleton className="h-5 w-16 flex-shrink-0 rounded-full" />
                    </div>
                </div>

                <div className="p-4 space-y-3">
                    <div className="grid grid-cols-2 gap-3">
                        <div className="space-y-1.5">
                            <Skeleton className="h-3 w-12" />
                            <Skeleton className="h-3 w-20" />
                        </div>
                        <div className="space-y-1.5">
                            <Skeleton className="h-3 w-8" />
                            <Skeleton className="h-3 w-12" />
                        </div>
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                        <div className="space-y-1.5">
                            <Skeleton className="h-3 w-6" />
                            <Skeleton className="h-5 w-16 rounded-full" />
                        </div>
                        <div className="space-y-1.5">
                            <Skeleton className="h-3 w-8" />
                            <Skeleton className="h-3 w-24" />
                        </div>
                    </div>
                    <div className="pt-3 border-t border-gray-200 flex flex-col gap-2">
                        <div className="flex items-center gap-2">
                            <Skeleton className="h-7 w-7 rounded" />
                            <Skeleton className="h-3 w-2/3" />
                        </div>
                        <div className="flex items-center gap-2">
                            <Skeleton className="h-7 w-7 rounded" />
                            <Skeleton className="h-3 w-1/2" />
                        </div>
                    </div>
                </div>

                <div className="px-4 py-3 border-t border-gray-200 bg-gray-50">
                    <div className="flex justify-between gap-2">
                        <Skeleton className="h-8 flex-1" />
                        <Skeleton className="h-8 flex-1" />
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}

const skeletonColumns: Column<unknown>[] = [
    { header: "Alumno" },
    { header: "Cédula" },
    { header: "Edad" },
    { header: "Cinturón" },
    { header: "Rol" },
    { header: "Dojo" },
    { header: "Contacto" },
    { header: "Inscripción" },
    { header: "Estado" },
    { header: "Acciones" },
];

export default function StudentsSkeleton() {
    const { viewMode } = useStudentsStore();

    return (
        <div className="space-y-6">
            {viewMode === "list" ? (
                <TableComponent
                    data={[]}
                    columns={skeletonColumns}
                    loading
                    skeletonRows={7}
                />
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                    {Array.from({ length: 8 }).map((_, i) => (
                        <StudentCardSkeleton key={i} />
                    ))}
                </div>
            )}
        </div>
    );
}