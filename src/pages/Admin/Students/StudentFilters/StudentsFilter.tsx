import { Search, Filter, School, Crown, ChevronDown, Users } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import { Badge } from "@/components/ui/badge";
import { useStudentsStore } from "@/stores/students.store";
import { IStudent } from "@/services/students/student.interface";
import { useDojos } from "@/hooks/useDojos";
import { useRoles } from "@/hooks/useStudents";

import SpinnerComponent from "@/components/SpinnerComponent";
import StudentDropDown from "./StudentDropDown";


interface StudentFilterProps {
    filteredStudents: IStudent[];
    students: IStudent[];
}

export default function StudentsFilter({ filteredStudents, students } : StudentFilterProps) {

    const { searchTerm, setSearchTerm, filterDojo, setFilterDojo, filterRol, setFilterRol, filterActivo, setFilterActivo, showFilters, toggleFilters } = useStudentsStore();
    
    const { data: dojos = [], isLoading : isLoadingDojos } = useDojos();
    const { data: roles = [], isLoading : isLoadingRoles } = useRoles();

    return (

        <div className="space-y-6 mb-8">
            <div className="relative max-w-2xl">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 h-5 w-5" />
                <Input
                    placeholder="Buscar por nombre, apellido, cédula o email..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-12 h-12 text-base border-2 border-gray-300 focus:border-amber-500 focus:ring-amber-500/20 rounded-xl bg-white shadow-sm"
                />
            </div>

            <div className="space-y-4">

                <div className="flex items-center justify-between">

                    <div className="flex items-center gap-3">

                        <Button
                            variant="outline"
                            size="sm"
                            onClick={toggleFilters}
                            className="border-gray-300 text-gray-700 hover:bg-gray-50 hover:border-gray-400"
                        >
                            <Filter className="h-4 w-4 mr-2" />
                            Filtros
                            <ChevronDown
                                className={`h-4 w-4 ml-2 transition-transform ${showFilters ? "rotate-180" : ""
                                    }`}
                            />
                        </Button>

                        <div className="flex flex-wrap gap-2">

                            {filterDojo !== "all" && (
                                <Badge className="bg-amber-100 text-amber-800 border-amber-200">
                                    Dojo: {filterDojo}
                                    <button
                                        onClick={() => setFilterDojo("all")}
                                        className="ml-2"
                                    >
                                        ×
                                    </button>
                                </Badge>
                            )}

                            {filterRol !== "all" && (
                                <Badge className="bg-red-100 text-red-800 border-red-200">
                                    Rol: {filterRol}
                                    <button
                                        onClick={() => setFilterRol("all")}
                                        className="ml-2"
                                    >
                                        ×
                                    </button>
                                </Badge>
                            )}

                            {filterActivo !== "all" && (
                                <Badge
                                    className={
                                        filterActivo === "active"
                                            ? "bg-green-100 text-green-800 border-green-200"
                                            : "bg-red-100 text-red-800 border-red-200"
                                    }
                                >
                                    {filterActivo === "active" ? "Activos" : "Inactivos"}
                                    <button
                                        onClick={() => setFilterActivo("all")}
                                        className="ml-2"
                                    >
                                        ×
                                    </button>
                                </Badge>
                            )}

                        </div>

                    </div>

                    <div className="text-sm text-gray-600">
                        {filteredStudents.length} de {students.length} estudiantes
                    </div>

                </div>

                {/* Filters panel */}
                {showFilters && (

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-6 border border-gray-300 rounded-xl bg-white shadow-sm">

                        {/* Dojo */}
                        {isLoadingDojos ? <SpinnerComponent /> : (
                            <StudentDropDown
                                label="Dojo"
                                icon={<School className="h-4 w-4 text-amber-600" />}
                                value={filterDojo}
                                onChange={setFilterDojo}
                                options={[
                                    "all",
                                    ...dojos.map(d => d.dojo),
                                ]}
                                renderLabel={(v) => v === "all" ? "Todos" : v}
                            />
                        )}

                        {/* Rol */}
                        <StudentDropDown
                            label="Rol"
                            icon={<Crown className="h-4 w-4 text-amber-600" />}
                            value={filterRol}
                            onChange={setFilterRol}
                            options={[
                                "all",
                                ...roles.map(r => r.rol)
                            ]}
                            renderLabel={(v) => v === "all" ? "Todos" : v}
                        />

                        {/* State */}
                        <StudentDropDown
                            label="Estado"
                            icon={<Users className="h-4 w-4 text-amber-600" />}
                            value={filterActivo}
                            onChange={setFilterActivo}
                            options={["all", "active", "inactive"]}
                            renderLabel={(v) =>
                                v === "active"
                                    ? "Solo activos"
                                    : v === "inactive"
                                        ? "Solo inactivos"
                                        : "Todos"
                            }
                        />

                    </div>

                )}

            </div>

        </div>

    );

}
