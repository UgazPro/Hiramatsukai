import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { calculateAge } from "@/helpers/formatter";
import { IStudent } from "@/services/users/user.interface";
import { Edit, Eye, Mail, Phone, School, User } from "lucide-react";

interface StudentGridViewProps {
    filteredStudents: IStudent[];
}

export default function StudentGridView({ filteredStudents }: StudentGridViewProps) {

    return (

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredStudents.map((alumno) => (
                <Card key={alumno.id} className="border border-gray-300 bg-white hover:border-amber-400 hover:shadow-lg transition-all duration-200 overflow-hidden group">
                    <CardContent className="p-0">
                        <div className="bg-linear-to-r from-amber-50 to-red-50 p-6 border-b border-gray-200">
                            <div className="flex justify-between items-start">
                                <div className="flex items-center gap-4">
                                    <div className="h-16 w-16 rounded-full bg-linear-to-br from-amber-500 to-red-500 p-0.5">
                                        <div className="h-full w-full rounded-full bg-white flex items-center justify-center">
                                            {alumno.profileImg ? (
                                                <img src={alumno.profileImg} className="h-full w-full rounded-full object-cover" alt={alumno.name} />
                                            ) : (
                                                <User className="h-8 w-8 text-amber-600" />
                                            )}
                                        </div>
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-xl text-gray-900 group-hover:text-amber-700 transition-colors">
                                            {alumno.name} {alumno.lastName}
                                        </h3>
                                        <p className="text-sm text-gray-600">@{alumno.username}</p>
                                    </div>
                                </div>
                                <Badge className={`${alumno.active
                                    ? 'bg-green-100 text-green-800 border-green-200'
                                    : 'bg-red-100 text-red-800 border-red-200'
                                    } border font-medium`}>
                                    {alumno.active ? 'Activo' : 'Inactivo'}
                                </Badge>
                            </div>
                        </div>

                        <div className="p-6 space-y-4">
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <p className="text-sm text-gray-500 mb-1">ID</p>
                                    <p className="font-mono text-sm text-gray-900 font-semibold">{alumno.identification}</p>
                                </div>
                                <div>
                                    <p className="text-sm text-gray-500 mb-1">Edad</p>
                                    <p className="font-semibold text-gray-900">{calculateAge(alumno.birthday)} años</p>
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <p className="text-sm text-gray-500 mb-1">Rol</p>
                                    <Badge className={`${alumno.rol.rol === 'Instructor' ? 'bg-red-100 text-red-800 border-red-200' :
                                        'bg-amber-100 text-amber-800 border-amber-200'
                                        } border font-medium`}>
                                        {alumno.rol.rol}
                                    </Badge>
                                </div>
                                <div>
                                    <p className="text-sm text-gray-500 mb-1">Dojo</p>
                                    <div className="flex items-center gap-2">
                                        <School className="h-4 w-4 text-gray-500" />
                                        <span className="font-medium text-gray-900">{alumno.dojo.dojo}</span>
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
                                        <p className="font-medium text-gray-900">{alumno.phone}</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-3">
                                    <div className="h-8 w-8 rounded-full bg-gray-100 flex items-center justify-center">
                                        <Mail className="h-4 w-4 text-gray-600" />
                                    </div>
                                    <div>
                                        <p className="text-xs text-gray-500">Email</p>
                                        <p className="font-medium text-gray-900 truncate">{alumno.email}</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Buttons */}
                        <div className="px-6 py-4 border-t border-gray-200 bg-gray-50">
                            <div className="flex justify-between gap-2">
                                <Button
                                    variant="outline"
                                    size="sm"
                                    className="border-gray-300 text-gray-700 hover:bg-gray-100 hover:border-gray-400 flex-1"
                                >
                                    <Eye className="h-4 w-4 mr-2" />
                                    Ver
                                </Button>
                                <Button
                                    variant="outline"
                                    size="sm"
                                    className="border-amber-300 text-amber-700 hover:bg-amber-50 hover:border-amber-400 flex-1"
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
