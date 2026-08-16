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

    useEffect(() => {
        const isMobile = window.innerWidth < 1024;
        setViewMode(isMobile ? "cards" : "table");
    }, [setViewMode]);

    const views = [
        { key: "table", icon: List },
        { key: "cards", icon: LayoutGrid },
    ];

    return (
        <div className="w-full h-full">

            <PageTransitionComponent

                primaryChildren={

                    <div className="mx-auto p-4 md:p-6">

                        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6">
                            <div>
                                <h1 className="text-3xl font-bold text-gray-900">Dojos</h1>
                                <p className="text-gray-600 mt-2">
                                    Gestión de dojos y su jerarquía
                                </p>
                            </div>

                            <div className="flex flex-wrap items-center gap-3">

                                <div className="w-full lg:w-auto">
                                    <SearchFilterComponent
                                        searchTerm={searchTerm}
                                        setSearchTerm={setSearchTerm}
                                        placeHolder="Buscar por nombre, código o dirección..."
                                        width="w-full lg:w-50"
                                    />
                                </div>

                                {canModify && (
                                    <div className="flex items-center border border-gray-300 rounded-lg overflow-hidden bg-white">
                                        <Button
                                            variant='secondary'
                                            size="sm"
                                            onClick={() => startCreate()}
                                            className={`rounded-none border-r border-gray-300 bg-yellow-500 text-white hover:bg-yellow-600`}
                                        >
                                            <PlusCircle /> Nuevo Dojo
                                        </Button>
                                    </div>
                                )}

                                <div className="hidden lg:flex items-center border border-gray-300 rounded-lg overflow-hidden bg-white">
                                    {views.map(({ key, icon: Icon }) => (
                                        <Button
                                            key={key}
                                            variant={viewMode === key ? "secondary" : "ghost"}
                                            size="sm"
                                            onClick={() => setViewMode(key as DojoViewMode)}
                                            className={`rounded-none border-r border-gray-300 ${viewMode === key ? "bg-yellow-500 text-white hover:bg-yellow-600" : "text-gray-700 hover:bg-gray-100"}`}
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
                                    <div className="hidden lg:block mt-4">
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
                                    <div className="text-center py-20">
                                        <p className="text-gray-500">No se encontraron dojos</p>
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
