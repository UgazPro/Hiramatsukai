import { Button } from "@/components/ui/button";
import { ViewMode } from "@/services/students/student.interface";
import { LayoutGrid, List, UserPlus, School } from "lucide-react";
import { useStudentsStore } from "@/stores/students.store";
import SearchFilterComponent from "@/components/Filters/SearchFilter";
import { useDojos } from "@/hooks/useDojos";
import { useUserData } from "@/helpers/token";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

interface StudentsHeaderProps {
    viewMode: ViewMode;
    setViewMode: (view: ViewMode) => void;
}

export default function StudentsHeader({ viewMode, setViewMode }: StudentsHeaderProps) {

    const { searchTerm, setSearchTerm, startCreate, dojoFilter, setDojoFilter } = useStudentsStore();

    const { data: dojos = [] } = useDojos();

    const user = useUserData();

    const isAdmin = user?.roles?.some(({ rol }) => rol === "Administrador") ?? false;

    const selectableDojos = isAdmin ? dojos : [];

    const selectedDojoValue = isAdmin ? (dojoFilter == null ? "all" : String(dojoFilter)) : "all";

    const views = [
        { key: "list", icon: List, label: "Vista de lista" },
        { key: "grid", icon: LayoutGrid, label: "Vista de tarjetas" },
    ];

    return (

        <div className="mb-4 flex flex-col justify-between gap-4 lg:flex-row lg:items-center">

            <div className="min-w-0">
                <h2 className="text-2xl font-bold text-foreground sm:text-3xl">Alumnos</h2>
                <p className="mt-2 text-muted-foreground">
                    Gestiona todos los alumnos e instructores del dojo
                </p>
            </div>

            <div className="flex w-full flex-col items-stretch gap-3 sm:flex-row sm:flex-wrap sm:items-center lg:w-auto lg:flex-nowrap">

                {/* Filter */}
                <SearchFilterComponent
                    searchTerm={searchTerm}
                    setSearchTerm={setSearchTerm}
                    placeHolder="Buscar por nombre, apellido, cédula o email..."
                    width="w-full sm:w-56 lg:w-72 xl:w-92"
                />

                {/* Dojo filter */}
                {isAdmin && (
                    <div className="relative w-full sm:w-auto">
                        <School className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                        <Select
                            value={selectedDojoValue}
                            onValueChange={(value) => setDojoFilter(value === "all" ? null : Number(value))}
                        >
                            <SelectTrigger className="h-11 w-full rounded-lg pl-9 text-base sm:h-10 sm:w-52 sm:text-sm">
                                <SelectValue placeholder="Todos los dojos" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="all">Todos los dojos</SelectItem>
                                {selectableDojos.map((dojo) => (
                                    <SelectItem key={dojo.id} value={String(dojo.id)}>
                                        {dojo.dojo}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>
                )}

                <div className="hidden items-center overflow-hidden rounded-lg border border-border bg-card sm:flex">
                    {views.map(({ key, icon: Icon, label }) => (
                        <Button
                            key={key}
                            variant="ghost"
                            size="sm"
                            onClick={() => setViewMode(key as ViewMode)}
                            aria-label={label}
                            aria-pressed={viewMode === key}
                            className={`h-11 rounded-none border-r border-border px-3 last:border-r-0 sm:h-10 ${viewMode === key ? "bg-brand-gold text-brand-sumi hover:bg-brand-gold-deep hover:text-white" : "text-foreground hover:bg-muted"}`}
                        >
                            <Icon className="h-4 w-4" />
                        </Button>
                    ))}
                </div>

                <Button
                    variant="wood"
                    onClick={startCreate}
                    className="h-11 w-full sm:h-10 sm:w-auto"
                >
                    <UserPlus data-icon="inline-start" />
                    Nuevo Estudiante
                </Button>
            </div>

        </div>

    );

}
