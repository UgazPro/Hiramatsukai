import { IStudent } from "@/services/users/user.interface";
import { User, Phone, Calendar, CheckCircle, XCircle, MoreVertical, Eye, Edit, Trash2 } from "lucide-react";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { calculateAge, dateFormatter } from "@/helpers/formatter";

interface StudentListViewProps {
    filteredStudents: IStudent[];
}

export default function StudentListView({ filteredStudents }: StudentListViewProps) {

    return (

        <div className="rounded-lg border border-gray-300 shadow-sm overflow-hidden bg-white">

            <Table>

                <TableHeader className="bg-gray-50">
                    <TableRow className="border-b border-gray-300 hover:bg-gray-50">
                        <TableHead className="text-gray-900 font-semibold py-4">Alumno</TableHead>
                        <TableHead className="text-gray-900 font-semibold py-4">Identificación</TableHead>
                        <TableHead className="text-gray-900 font-semibold py-4">Edad</TableHead>
                        <TableHead className="text-gray-900 font-semibold py-4">Rol</TableHead>
                        <TableHead className="text-gray-900 font-semibold py-4">Dojo</TableHead>
                        <TableHead className="text-gray-900 font-semibold py-4">Contacto</TableHead>
                        <TableHead className="text-gray-900 font-semibold py-4">Inscripción</TableHead>
                        <TableHead className="text-gray-900 font-semibold py-4">Estado</TableHead>
                        <TableHead className="text-gray-900 font-semibold py-4 text-right">Acciones</TableHead>
                    </TableRow>
                </TableHeader>

                <TableBody>

                    {filteredStudents.map((student: IStudent) => (
                        <TableRow key={student.id} className="border-b border-gray-200 hover:bg-gray-50/80">
                            <TableCell className="py-4">
                                <div className="flex items-center gap-3">
                                    <div className="h-10 w-10 rounded-full bg-linear-to-br from-amber-100 to-red-100 border border-amber-200 flex items-center justify-center">
                                        {student.profileImg ? (
                                            <img src={student.profileImg} className="h-10 w-10 rounded-full object-cover" alt={student.name} />
                                        ) : (
                                            <User className="h-5 w-5 text-amber-600" />
                                        )}
                                    </div>
                                    <div>
                                        <div className="font-semibold text-gray-900">
                                            {student.name} {student.lastName}
                                        </div>
                                        <div className="text-sm text-gray-600">@{student.username}</div>
                                    </div>
                                </div>
                            </TableCell>
                            <TableCell className="font-mono text-gray-800 py-4">{student.identification}</TableCell>
                            <TableCell className="text-gray-800 py-4">{calculateAge(student.birthday)} años</TableCell>
                            <TableCell className="py-4">
                                <Badge className={`${student.rol.rol === 'Líder Instructor' ? 'bg-red-100 text-red-800 border-red-200' :
                                    student.rol.rol === 'Estudiante' ? 'bg-amber-100 text-amber-800 border-amber-200' :
                                        'bg-gray-100 text-gray-800 border-gray-200'
                                    } border font-medium`}>
                                    {student.rol.rol}
                                </Badge>
                            </TableCell>
                            <TableCell className="py-4">
                                <Badge variant="outline" className="border-gray-300 text-gray-700 bg-white">
                                    {student.dojo.dojo}
                                </Badge>
                            </TableCell>
                            <TableCell className="py-4">
                                <div className="space-y-1">
                                    <div className="flex items-center gap-2">
                                        <Phone className="h-3 w-3 text-gray-500" />
                                        <span className="text-sm text-gray-700">{student.phone}</span>
                                    </div>
                                </div>
                            </TableCell>
                            <TableCell className="py-4">
                                <div className="flex items-center gap-2">
                                    <Calendar className="h-4 w-4 text-gray-500" />
                                    <span className="text-sm text-gray-700">{dateFormatter(student.enrollmentDate)}</span>
                                </div>
                            </TableCell>
                            <TableCell className="py-4">
                                {student.active ? (
                                    <Badge className="bg-green-100 text-green-800 border-green-200">
                                        <CheckCircle className="h-3 w-3 mr-1" />
                                        Activo
                                    </Badge>
                                ) : (
                                    <Badge className="bg-red-100 text-red-800 border-red-200">
                                        <XCircle className="h-3 w-3 mr-1" />
                                        Inactivo
                                    </Badge>
                                )}
                            </TableCell>
                            <TableCell className="text-right py-4">
                                <DropdownMenu>
                                    <DropdownMenuTrigger asChild>
                                        <Button variant="ghost" size="sm" className="h-8 w-8 p-0 hover:bg-gray-100">
                                            <MoreVertical className="h-4 w-4 text-gray-600" />
                                        </Button>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent align="end" className="bg-white border-gray-300 shadow-lg">
                                        <DropdownMenuItem className="text-gray-700 hover:bg-gray-100 cursor-pointer">
                                            <Eye className="h-4 w-4 mr-2 text-gray-600" />
                                            Ver detalles
                                        </DropdownMenuItem>
                                        <DropdownMenuItem className="text-gray-700 hover:bg-gray-100 cursor-pointer">
                                            <Edit className="h-4 w-4 mr-2 text-gray-600" />
                                            Editar
                                        </DropdownMenuItem>
                                        <DropdownMenuItem className="text-red-600 hover:bg-red-50 cursor-pointer">
                                            <Trash2 className="h-4 w-4 mr-2" />
                                            Eliminar
                                        </DropdownMenuItem>
                                    </DropdownMenuContent>
                                </DropdownMenu>
                            </TableCell>
                        </TableRow>
                    ))}

                </TableBody>

            </Table>

        </div>

    );

}






