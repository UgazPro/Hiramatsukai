import { DeleteDialog } from "@/components/deleteDialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { calculateAge, formatIdentification } from "@/helpers/formatter";
import { useDeleteStudent } from "@/queries/useStudentMutations";
import { IStudent } from "@/services/students/student.interface";
import { useStudentsStore } from "@/stores/students.store";
import { Edit, School, SlidersHorizontal, User, X } from "lucide-react";
import { useState } from "react";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { studentSortFields } from "@/services/students/student.tables";
import { useDojos } from "@/hooks/useDojos";
import { useUserData } from "@/helpers/token";

interface StudentGridViewProps {
    filteredStudents: IStudent[];
}

export default function StudentGridView({ filteredStudents }: StudentGridViewProps) {

    const { startEdit } = useStudentsStore();

    const selectStudent = useStudentsStore((state) => state.selectStudent);

    const { mutateAsync: deleteStudent } = useDeleteStudent();

    const { dojoFilter, setDojoFilter, sort, setSort, resetSort } = useStudentsStore();

    const { data: dojos = [] } = useDojos();

    const user = useUserData();

    const isAdmin = user?.roles?.some(({ rol }) => rol === "Administrador") ?? false;

    const selectableDojos = isAdmin ? dojos : dojos.filter((d) => d.id === user?.dojo.id);

    const [isOpen, setIsOpen] = useState(false);
    const [localDojo, setLocalDojo] = useState<string>(dojoFilter == null ? "all" : String(dojoFilter));
    const [localField, setLocalField] = useState<string>(sort.field ?? "");
    const [localDirection, setLocalDirection] = useState<string>(sort.direction ?? "");

    const openPopover = () => {
        setLocalDojo(dojoFilter == null ? "all" : String(dojoFilter));
        setLocalField(sort.field ?? "");
        setLocalDirection(sort.direction ?? "");
        setIsOpen(true);
    };

    const handleApply = () => {
        setDojoFilter(localDojo === "all" ? null : Number(localDojo));
        setSort({
            field: localField || null,
            direction: localDirection === "asc" || localDirection === "desc" ? localDirection : null,
        });
        setIsOpen(false);
    };

    const handleReset = () => {
        setDojoFilter(null);
        resetSort();
        setLocalDojo("all");
        setLocalField("");
        setLocalDirection("");
        setIsOpen(false);
    };

    const hasActiveControls = dojoFilter != null || sort.field != null || sort.direction != null;

    return (

        <div>
            {/* Controls */}
            <div className="flex justify-end mb-4">
                <Popover open={isOpen} onOpenChange={setIsOpen}>
                    <PopoverTrigger asChild>
                        <Button
                            variant="outline"
                            size="sm"
                            className="border-gray-300 text-gray-700 hover:bg-gray-50 relative"
                            onClick={openPopover}
                        >
                            <SlidersHorizontal className="h-4 w-4 mr-2" />
                            Filtros y orden
                            {hasActiveControls && (
                                <Badge className="absolute -top-2 -right-2 h-5 w-5 p-0 flex items-center justify-center bg-yellow-500 text-white text-xs">
                                    !
                                </Badge>
                            )}
                        </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-[calc(100vw-2rem)] sm:w-80 p-0 border-gray-300 shadow-xl" align="end">
                        <div className="p-4 border-b border-gray-200 bg-linear-to-r from-yellow-50 to-red-50">
                            <div className="flex justify-between items-center">
                                <h3 className="font-semibold text-gray-900 flex items-center gap-2">
                                    <SlidersHorizontal className="h-4 w-4 text-yellow-600" />
                                    Filtros y orden
                                </h3>
                                <Button
                                    variant="ghost"
                                    size="sm"
                                    onClick={() => setIsOpen(false)}
                                    className="h-6 w-6 p-0 hover:bg-gray-200"
                                >
                                    <X className="h-4 w-4" />
                                </Button>
                            </div>
                        </div>

                        <div className="p-4 space-y-4">
                            {/* Dojo filter */}
                            {isAdmin && (
                                <div className="space-y-2">
                                    <Label className="text-sm font-medium text-gray-900">Dojo</Label>
                                    <Select
                                        value={localDojo}
                                        onValueChange={setLocalDojo}
                                    >
                                        <SelectTrigger className="w-full">
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

                            {/* Sort field */}
                            <div className="space-y-2">
                                <Label className="text-sm font-medium text-gray-900">Ordenar por</Label>
                                <Select
                                    value={localField}
                                    onValueChange={setLocalField}
                                >
                                    <SelectTrigger className="w-full">
                                        <SelectValue placeholder="Sin ordenar" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {studentSortFields.map((field) => (
                                            <SelectItem key={field.value} value={field.value}>
                                                {field.label}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>

                            {/* Sort direction */}
                            {localField && (
                                <div className="space-y-2">
                                    <Label className="text-sm font-medium text-gray-900">Dirección</Label>
                                    <Select
                                        value={localDirection}
                                        onValueChange={setLocalDirection}
                                    >
                                        <SelectTrigger className="w-full">
                                            <SelectValue placeholder="Seleccione una dirección" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="asc">Ascendente (menor a mayor)</SelectItem>
                                            <SelectItem value="desc">Descendente (mayor a menor)</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                            )}
                        </div>

                        <div className="p-4 border-t border-gray-200 bg-gray-50 space-y-3 text-center">
                            <Button
                                variant="outline"
                                size="sm"
                                onClick={handleReset}
                                className="border-gray-300 text-gray-700 hover:bg-gray-100"
                            >
                                Restaurar
                            </Button>

                            <Button
                                size="sm"
                                onClick={handleApply}
                                className="bg-linear-to-r from-yellow-600 to-red-600 hover:from-yellow-500 hover:to-red-500 text-white"
                            >
                                Aplicar
                            </Button>
                        </div>
                    </PopoverContent>
                </Popover>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">

                {filteredStudents.map((student) => (
                    <Card
                        key={student.id}
                        className="border border-gray-300 bg-white hover:border-yellow-400 hover:shadow-lg transition-all duration-200 overflow-hidden group hover:cursor-pointer py-0"
                        onClick={() => {
                            selectStudent(student);
                            window.scrollTo({ top: 0, behavior: "smooth" });
                        }}
                    >
                        <CardContent className="p-0">
                            {/* Header */}
                            <div className="bg-linear-to-r from-yellow-50 to-red-50 p-4 border-b border-gray-200">
                                <div className="flex items-start justify-between gap-2">
                                    <div className="flex items-center gap-3 min-w-0">
                                        <div className="h-12 w-12 shrink-0 rounded-full bg-linear-to-br from-yellow-500 to-red-500 p-0.5">
                                            <div className="h-full w-full rounded-full bg-white flex items-center justify-center">
                                                {student.profileImg ? (
                                                    <img src={student.profileImg} className="h-full w-full rounded-full object-cover" alt={student.name} />
                                                ) : (
                                                    <User className="h-6 w-6 text-yellow-600" />
                                                )}
                                            </div>
                                        </div>
                                        <div className="min-w-0">
                                            <h3 className="font-bold text-sm text-gray-900 truncate group-hover:text-yellow-700 transition-colors">
                                                {student.name} {student.lastName}
                                            </h3>
                                            <p className="text-xs text-gray-600 truncate">@{student.username}</p>
                                        </div>
                                    </div>
                                    <Badge className={`shrink-0 ${student.active
                                        ? 'bg-green-100 text-green-800 border-green-200'
                                        : 'bg-red-100 text-red-800 border-red-200'
                                        } border font-medium`}>
                                        {student.active ? 'Activo' : 'Inactivo'}
                                    </Badge>
                                </div>
                            </div>

                            {/* Content */}
                            <div className="p-4 space-y-3">
                                {/* Cédula + Edad */}
                                <div className="grid grid-cols-2 gap-3">
                                    <div>
                                        <p className="text-xs text-gray-500 mb-1">Cédula</p>
                                        <p className="font-mono text-xs text-gray-900 font-semibold">{formatIdentification(student.identification)}</p>
                                    </div>
                                    <div>
                                        <p className="text-xs text-gray-500 mb-1">Edad</p>
                                        <p className="font-semibold text-xs text-gray-900">{calculateAge(student.birthday)} años</p>
                                    </div>
                                </div>

                                {/* Rol + Dojo */}
                                <div className="grid grid-cols-2 gap-3">
                                    <div>
                                        <p className="text-xs text-gray-500 mb-1">Rol</p>
                                        <Badge className={`${student.roles && student.roles.some(r => r.rol === 'Instructor') ? 'bg-red-100 text-red-800 border-red-200' :
                                            'bg-yellow-100 text-yellow-800 border-yellow-200'
                                            } border font-medium`}>
                                            {student.roles[0].rol}
                                        </Badge>
                                    </div>
                                    <div>
                                        <p className="text-xs text-gray-500 mb-1">Dojo</p>
                                        <div className="flex items-center gap-2">
                                            <School className="h-3 w-3 text-gray-500 shrink-0" />
                                            <span className="font-medium text-gray-900 text-xs truncate">{student.dojo.dojo}</span>
                                        </div>
                                    </div>
                                </div>

                                {/* Ranks */}
                                <div className="pt-3 border-t border-gray-200 flex flex-col gap-2">
                                    {student.userRanks.map(r => (
                                        <div key={r.rank.id} className="flex items-center gap-1">
                                            <img src={r.martialArt.icon} className="h-7 w-7 shrink-0 rounded object-contain" alt={r.martialArt.martialArt} />
                                            <span className="text-xs text-gray-900 font-medium truncate">{r.rank.rank_name} {r.rank.code} Cinturón {r.rank.belt}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Buttons */}
                            <div className="px-4 py-3 border-t border-gray-200 bg-gray-50">
                                <div className="flex justify-between gap-2">
                                    <DeleteDialog
                                        whatsDeleting={`${student.name} ${student.lastName}`}
                                        onConfirm={() => deleteStudent(student.id)}
                                        buttonText="Eliminar"
                                        buttonStyles="border-red-300 text-red-700 hover:bg-red-100 hover:border-red-400 flex-1 text-xs"
                                        buttonType='outline'
                                        preposition="a"
                                    />

                                    <Button
                                        variant="outline"
                                        size="sm"
                                        className="border-yellow-300 text-yellow-700 hover:bg-yellow-50 hover:border-yellow-400 flex-1 text-xs"
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            startEdit(student);
                                        }}
                                    >
                                        <Edit className="h-3 w-3 mr-1" />
                                        Editar
                                    </Button>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </div>

    );

}