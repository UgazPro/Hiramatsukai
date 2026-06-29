import { DeleteDialog } from "@/components/deleteDialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { calculateAge, formatNumberWithDots } from "@/helpers/formatter";
import { useDeleteStudent } from "@/queries/useStudentMutations";
import { IStudent } from "@/services/students/student.interface";
import { useStudentsStore } from "@/stores/students.store";
import { Edit, School, User } from "lucide-react";

interface StudentGridViewProps {
    filteredStudents: IStudent[];
}

export default function StudentGridView({ filteredStudents }: StudentGridViewProps) {

    const { startEdit } = useStudentsStore();

    const selectStudent = useStudentsStore((state) => state.selectStudent);

    const { mutateAsync: deleteStudent } = useDeleteStudent();

    return (

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
                                    <p className="font-mono text-xs text-gray-900 font-semibold">{formatNumberWithDots(student.identification)}</p>
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
                                    <Badge className={`${student.rol.rol === 'Instructor' ? 'bg-red-100 text-red-800 border-red-200' :
                                        'bg-yellow-100 text-yellow-800 border-yellow-200'
                                        } border font-medium`}>
                                        {student.rol.rol}
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
                            {student.userRanks.some(r => r.martialArt.martialArt === "Karate" || r.martialArt.martialArt === "Kobudo") && (
                                <div className="pt-3 border-t border-gray-200 flex flex-col gap-2">
                                    {student.userRanks.filter(r => r.martialArt.martialArt === "Karate").map(r => (
                                        <div key={r.rank.id} className="flex items-center gap-1">
                                            <img src="/oki2.png" className="h-7 w-7 shrink-0 rounded object-cover" alt="Karatedo" />
                                            <span className="text-xs text-gray-900 font-medium truncate">{r.rank.code} {r.rank.belt} {r.rank.rank_name && "-"} {r.rank.rank_name}</span>
                                        </div>
                                    ))}
                                    {student.userRanks.filter(r => r.martialArt.martialArt === "Kobudo").map(r => (
                                        <div key={r.rank.id} className="flex items-center gap-2">
                                            <img src="/gi.jpg" className="h-5 w-5 shrink-0 rounded object-cover ml-1" alt="Kobudo" />
                                            <span className="text-xs text-gray-900 font-medium truncate">{r.rank.code} {r.rank.belt} {r.rank.rank_name && "-"} {r.rank.rank_name}</span>
                                        </div>
                                    ))}
                                </div>
                            )}
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

    );

}
