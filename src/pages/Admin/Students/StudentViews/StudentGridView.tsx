import { DeleteStudentDialog } from "@/components/deleteStudentDialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { calculateAge } from "@/helpers/formatter";
import { useDeleteStudent } from "@/queries/useStudentMutations";
import { IStudent } from "@/services/students/student.interface";
import { useStudentsStore } from "@/stores/students.store";
import { Edit, Mail, Phone, School, User } from "lucide-react";

interface StudentGridViewProps {
    filteredStudents: IStudent[];
}

export default function StudentGridView({ filteredStudents }: StudentGridViewProps) {

    const { startEdit } = useStudentsStore();

    const selectStudent = useStudentsStore((state) => state.selectStudent);

    const { mutateAsync: deleteStudent } = useDeleteStudent();

    return (

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredStudents.map((student) => (
                <Card 
                    key={student.id} 
                    className="border border-gray-300 bg-white hover:border-amber-400 hover:shadow-lg transition-all duration-200 overflow-hidden group hover:cursor-pointer"
                    onClick={() => {
                        selectStudent(student);
                        window.scrollTo({ top: 0, behavior: "smooth" });
                    }}
                >
                    <CardContent className="p-0">
                        <div className="bg-linear-to-r from-amber-50 to-red-50 p-6 border-b border-gray-200">
                            <div className="flex justify-between items-start">
                                <div className="flex items-center gap-4">
                                    <div className="h-16 w-16 rounded-full bg-linear-to-br from-amber-500 to-red-500 p-0.5">
                                        <div className="h-full w-full rounded-full bg-white flex items-center justify-center">
                                            {student.profileImg ? (
                                                <img src={student.profileImg} className="h-full w-full rounded-full object-cover" alt={student.name} />
                                            ) : (
                                                <User className="h-8 w-8 text-amber-600" />
                                            )}
                                        </div>
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-xl text-gray-900 group-hover:text-amber-700 transition-colors">
                                            {student.name} {student.lastName}
                                        </h3>
                                        <p className="text-sm text-gray-600">@{student.username}</p>
                                    </div>
                                </div>
                                <Badge className={`${student.active
                                    ? 'bg-green-100 text-green-800 border-green-200'
                                    : 'bg-red-100 text-red-800 border-red-200'
                                    } border font-medium`}>
                                    {student.active ? 'Activo' : 'Inactivo'}
                                </Badge>
                            </div>
                        </div>

                        <div className="p-6 space-y-4">
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <p className="text-sm text-gray-500 mb-1">ID</p>
                                    <p className="font-mono text-sm text-gray-900 font-semibold">{student.identification}</p>
                                </div>
                                <div>
                                    <p className="text-sm text-gray-500 mb-1">Edad</p>
                                    <p className="font-semibold text-gray-900">{calculateAge(student.birthday)} años</p>
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <p className="text-sm text-gray-500 mb-1">Rol</p>
                                    <Badge className={`${student.rol.rol === 'Instructor' ? 'bg-red-100 text-red-800 border-red-200' :
                                        'bg-amber-100 text-amber-800 border-amber-200'
                                        } border font-medium`}>
                                        {student.rol.rol}
                                    </Badge>
                                </div>
                                <div>
                                    <p className="text-sm text-gray-500 mb-1">Dojo</p>
                                    <div className="flex items-center gap-2">
                                        <School className="h-4 w-4 text-gray-500" />
                                        <span className="font-medium text-gray-900">{student.dojo.dojo}</span>
                                    </div>
                                </div>
                            </div>

                            <div className="space-y-3 pt-4 border-t border-gray-200">
                                <div className="flex items-center gap-3">
                                    <div className="h-8 w-8 rounded-full bg-gray-100 flex items-center justify-center">
                                        <Phone className="h-4 w-4 text-gray-600" />
                                    </div>
                                    <div>
                                        <p className="text-xs text-gray-500">Teléfono</p>
                                        <p className="font-medium text-gray-900">{student.phone}</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-3">
                                    <div className="h-8 w-8 rounded-full bg-gray-100 flex items-center justify-center">
                                        <Mail className="h-4 w-4 text-gray-600" />
                                    </div>
                                    <div>
                                        <p className="text-xs text-gray-500">Email</p>
                                        <p className="font-medium text-gray-900 truncate">{student.email}</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Buttons */}
                        <div className="px-6 py-4 border-t border-gray-200 bg-gray-50">
                            <div className="flex justify-between gap-2">
                                <DeleteStudentDialog 
                                    studentName={`${student.name} ${student.lastName}`}
                                    onConfirm={() => deleteStudent(student.id)}
                                    buttonText="Eliminar"
                                    buttonStyles="border-red-300 text-red-700 hover:bg-red-100 hover:border-red-400 flex-1"
                                    buttonType='outline'
                                />
                    
                                <Button
                                    variant="outline"
                                    size="sm"
                                    className="border-amber-300 text-amber-700 hover:bg-amber-50 hover:border-amber-400 flex-1"
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        startEdit(student);
                                    }}
                                >
                                    <Edit className="h-4 w-4 mr-2" />
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
