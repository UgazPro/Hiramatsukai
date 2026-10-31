import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { LayoutGrid, List, PlusCircle } from "lucide-react";
import { getDojosColumns } from "@/services/dojos/dojos.tables";
import { TableComponent } from "@/components/table/TableComponent";
import { PaginationComponent } from "@/components/table/PaginationComponent";
import { useDojos, useDeleteDojo } from "@/hooks/useDojos";
import { useFilteredDojos } from "@/hooks/useFilteredDojos";
import { useDojosStore, DojoViewMode } from "@/stores/dojos.store";
import PageTransitionComponent from "@/components/PageTransitionComponent";
import DojoDetailView from "./DojoDetailView/DojoDetailView";
import DojoForm from "./DojoForm/DojoForm";
import DojoCardView from "./DojoCardView";
import DojosSkeleton from "./DojosSkeleton";
import SearchFilterComponent from "@/components/Filters/SearchFilter";
import { useUserData } from "@/helpers/token";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import { toast } from "sonner";

interface DojoDeleteResponse {
    success?: boolean;
    message?: string;
    statusCode?: number;
}

export default function Dojos() {

    const { data: dojos = [], isLoading } = useDojos();

    const { mutateAsync: deleteDojo } = useDeleteDojo();

    const {
        screen, setScreen,
        viewMode, setViewMode,
        startCreate,
        setSelectedDojo,
        searchTerm, setSearchTerm,
        currentPage, setCurrentPage,
        itemsPerPage, setItemsPerPage,
    } = useDojosStore();

    const userData = useUserData();
    const canModify = userData?.roles.some(({ rol }) => rol === "Administrador" || rol === "Líder Maestro");

    const { visibleDojos, filtered, getParentName } = useFilteredDojos(dojos, searchTerm);

    const totalPages = Math.ceil(filtered.length / itemsPerPage);
    const paginatedDojos = filtered.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage,
    );

    const handleDelete = async (id: number) => {
        const res = await deleteDojo(id) as DojoDeleteResponse | undefined;

        if (res?.success === false || (res?.statusCode && res.statusCode >= 400)) {
            toast.error(res?.message ?? "No se pudo eliminar el dojo");
            return;
        }

        toast.success("Dojo eliminado correctamente");
    };

    const columns = getDojosColumns({
        startEdit: (dojo) => useDojosStore.getState().startEdit(dojo),
        setSelectedDojo,
        setScreen,
        deleteDojo: handleDelete,
        getParentName,
        canModify,
    });

    useEffect(() => {
        setCurrentPage(1);
    }, [filtered.length, setCurrentPage]);

    useEffect(() => {
        setScreen("main");
    }, [setScreen]);

    const isMobile = useMediaQuery("(max-width: 639px)");

    useEffect(() => {
        if (isMobile) setViewMode("cards");
    }, [isMobile, setViewMode]);

    const views = [
        { key: "table", icon: List },
        { key: "cards", icon: LayoutGrid },
    ];

    return (
        <div className="w-full h-full">

            <PageTransitionComponent

                primaryChildren={

                    <div className="mx-auto w-full   p-3 sm:p-4 md:p-6">

                        <div className="flex flex-col justify-between gap-4 lg:flex-row lg:items-center">
                            <div className="min-w-0">
                                <h1 className="text-2xl font-bold text-foreground sm:text-3xl">Dojos</h1>
                                <p className="mt-2 text-muted-foreground">
                                    Gestión de dojos y su jerarquía
                                </p>
                            </div>

                            <div className="flex w-full flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center lg:w-auto lg:flex-nowrap">

                                <div className="w-full sm:w-64 lg:w-72">
                                    <SearchFilterComponent
                                        searchTerm={searchTerm}
                                        setSearchTerm={setSearchTerm}
                                        placeHolder="Buscar por nombre, código o dirección..."
                                        width="w-full"
                                    />
                                </div>

                                {canModify && (
                                    <Button
                                        variant="wood"
                                        onClick={() => startCreate()}
                                        className="h-11 w-full sm:h-10 sm:w-auto"
                                    >
                                        <PlusCircle data-icon="inline-start" /> Nuevo Dojo
                                    </Button>
                                )}

                                <div className="hidden items-center overflow-hidden rounded-lg border border-border bg-card sm:flex">
                                    {views.map(({ key, icon: Icon }) => (
                                        <Button
                                            key={key}
                                            variant="ghost"
                                            size="sm"
                                            onClick={() => setViewMode(key as DojoViewMode)}
                                            aria-label={key === "table" ? "Vista de tabla" : "Vista de tarjetas"}
                                            aria-pressed={viewMode === key}
                                            className={`h-11 rounded-none border-r border-border px-3 last:border-r-0 sm:h-10 ${viewMode === key ? "bg-brand-gold text-brand-sumi hover:bg-brand-gold-deep hover:text-white" : "text-foreground hover:bg-muted"}`}
                                        >
                                            <Icon className="h-4 w-4" />
                                        </Button>
                                    ))}
                                </div>

                            </div>
                        </div>

                        {isLoading ? (
                            <div className="mt-6">
                                <DojosSkeleton />
                            </div>
                        ) : (
                            <div className="mt-6">
                                {viewMode === "table" && (
                                    <TableComponent
                                        data={paginatedDojos}
                                        columns={columns}
                                        onRowClick={(dojo) => {
                                            setSelectedDojo(dojo);
                                            setScreen("detail");
                                        }}
                                    />
                                )}

                                {viewMode === "cards" && (
                                    <DojoCardView
                                        dojos={paginatedDojos}
                                        getParentName={getParentName}
                                        canModify={canModify}
                                    />
                                )}

                                {filtered.length > 0 && (
                                    <div className="mt-4">
                                        <PaginationComponent
                                            currentPage={currentPage}
                                            totalPages={totalPages}
                                            totalItems={filtered.length}
                                            itemsPerPage={itemsPerPage}
                                            onPageChange={setCurrentPage}
                                            onItemsPerPageChange={(n) => {
                                                setItemsPerPage(n);
                                                setCurrentPage(1);
                                            }}
                                        />
                                    </div>
                                )}

                                {filtered.length === 0 && (
                                    <div className="py-20 text-center">
                                        <p className="text-muted-foreground">No se encontraron dojos</p>
                                    </div>
                                )}
                            </div>
                        )}

                    </div>

                }

                secondaryChildren={
                    <div>
                        {screen === "detail" && <DojoDetailView dojos={visibleDojos} />}
                        {screen === "form" && <div className="h-full overflow-y-auto"><DojoForm /></div>}
                    </div>
                }

                toggle={screen === "detail" || screen === "form"}

            />

        </div>
    );
}
