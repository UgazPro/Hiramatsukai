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
        { key: "list", icon: List },
        { key: "grid", icon: LayoutGrid },
    ];

    return (

        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6 mb-4">

            <div>
                <h2 className="text-3xl font-bold text-gray-900">Alumnos</h2>
                <p className="text-gray-600 mt-2">
                    Gestiona todos los alumnos e instructores del dojo
                </p>
            </div>

            <div className="flex flex-col md:flex-row items-stretch md:items-center gap-4 w-full md:w-auto">

                {/* Filter */}
                <SearchFilterComponent 
                    searchTerm={searchTerm}
                    setSearchTerm={setSearchTerm}
                    placeHolder="Buscar por nombre, apellido, cédula o email..."
                    width="w-full md:w-92"
                />

                {/* Dojo filter */}
                {isAdmin && (
                    <div className="relative">
                        <School className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-4 w-4 pointer-events-none" />
                        <Select
                            value={selectedDojoValue}
                            onValueChange={(value) => setDojoFilter(value === "all" ? null : Number(value))}
                        >
                            <SelectTrigger className="w-full md:w-52 h-9 pl-9 text-sm border-2 border-gray-300 focus:border-yellow-500 focus:ring-yellow-500/20 rounded-lg bg-white shadow-sm text-gray-700">
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

                <div className="hidden lg:flex items-center border border-gray-300 rounded-lg overflow-hidden bg-white">
                    {views.map(({ key, icon: Icon }) => (
                        <Button
                            key={key}
                            variant={viewMode === key ? "secondary" : "ghost"}
                            size="sm"
                            onClick={() => setViewMode(key as ViewMode)}
                            className={`rounded-none border-r border-gray-300 ${viewMode === key ? "bg-yellow-500 text-white hover:bg-yellow-600" : "text-gray-700 hover:bg-gray-100"}`}
                        >
                            <Icon className="h-4 w-4" />
                        </Button>
                    ))}
                </div>

                <Button
                    className="bg-linear-to-r from-yellow-600 to-yellow-400 hover:from-yellow-400 hover:to-yellow-600 text-white shadow-md hover:shadow-lg transition-colors ease-in-out"
                    onClick={startCreate}
                >
                    <UserPlus className="h-4 w-4 mr-2" />
                    Nuevo Estudiante
                </Button>
            </div>

        </div>

    );

}
