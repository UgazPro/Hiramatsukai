import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { calculateAge, dateFormatter, howLongHasSomeonePracticeInMonths } from "@/helpers/formatter";
import { IStudent } from "@/services/students/student.interface";
import { Cake, Calendar, CheckCircle, Clock, Edit, Eye, Mail, MapPin, MoreVertical, Phone, School, Shield, Trash2, User } from "lucide-react";

interface StudentLongCardViewProps {
    filteredStudents: IStudent[];
}

export default function StudentLongCardView({ filteredStudents } : StudentLongCardViewProps) {

    return (

        <div className="container mx-auto p-4 md:p-6">
            
            <div className="space-y-4">
                {filteredStudents.map((student) => (
                    <Card
                        key={student.id}
                        className="border border-gray-300 bg-white hover:border-amber-400 hover:shadow-lg transition-all duration-200 overflow-hidden group"
                    >
                        <CardContent className="p-0">
                            <div className="flex flex-col md:flex-row items-start md:items-center gap-4 p-6">
                                
                                <div className="flex items-center gap-4 min-w-70 flex-1">
                                    <div className="relative">
                                        <div className="h-16 w-16 rounded-full bg-linear-to-br from-amber-500 to-red-500 p-0.5">
                                            <div className="h-full w-full rounded-full bg-white flex items-center justify-center">
                                                {student.profileImg ? (
                                                    <img
                                                        src={student.profileImg}
                                                        className="h-full w-full rounded-full object-cover"
                                                        alt={`${student.name} ${student.lastName}`}
                                                    />
                                                ) : (
                                                    <User className="h-8 w-8 text-amber-600" />
                                                )}
                                            </div>
                                        </div>
                                        
                                        <div className={`absolute -bottom-1 -right-1 h-5 w-5 rounded-full border-2 border-white ${student.active ? 'bg-green-500' : 'bg-red-500'
                                            }`} />
                                    </div>

                                    <div className="flex-1">
                                        <div className="flex items-center gap-2 mb-1">
                                            <h3 className="font-bold text-xl text-gray-900 group-hover:text-amber-700 transition-colors">
                                                {student.name} {student.lastName}
                                            </h3>
                                            <Badge className={`${student.rol.rol === 'Instructor'
                                                ? 'bg-red-100 text-red-800 border-red-200'
                                                : 'bg-amber-100 text-amber-800 border-amber-200'
                                                } border font-medium`}>
                                                {student.rol.rol}
                                            </Badge>
                                        </div>
                                        <div className="flex items-center gap-3 text-sm text-gray-600">
                                            <div className="flex items-center gap-1">
                                                <Shield className="h-3 w-3" />
                                                <span>ID: {student.identification}</span>
                                            </div>
                                            <div className="flex items-center gap-1">
                                                <Cake className="h-3 w-3" />
                                                <span>{calculateAge(student.birthday)} años</span>
                                            </div>
                                            <div className="flex items-center gap-1">
                                                <span className="text-gray-400">|</span>
                                                <span>@{student.username}</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                
                                <div className="flex-1 min-w-50">
                                    <div className="space-y-2">
                                        <div className="flex items-center gap-2">
                                            <School className="h-4 w-4 text-amber-600" />
                                            <div>
                                                <p className="text-sm text-gray-500">Dojo asignado</p>
                                                <p className="font-semibold text-gray-900">{student.dojo.dojo}</p>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <MapPin className="h-4 w-4 text-gray-500" />
                                            <p className="text-sm text-gray-700 truncate">{student.address}</p>
                                        </div>
                                    </div>
                                </div>

                                
                                <div className="flex-1 min-w-55">
                                    <div className="space-y-3">
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

                                
                                <div className="flex flex-col gap-3 min-w-45">
                                    <div className="space-y-2">
                                        <div className="flex items-center gap-2">
                                            <Calendar className="h-4 w-4 text-gray-500" />
                                            <div>
                                                <p className="text-xs text-gray-500">Inscripción</p>
                                                <p className="text-sm font-medium text-gray-900">
                                                    {dateFormatter(student.enrollmentDate)}
                                                </p>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <Clock className="h-4 w-4 text-gray-500" />
                                            <div>
                                                <p className="text-xs text-gray-500">Antigüedad</p>
                                                <p className="text-sm font-medium text-gray-900">
                                                    {howLongHasSomeonePracticeInMonths(student.enrollmentDate)} meses
                                                </p>
                                            </div>
                                        </div>
                                    </div>

                                    
                                    <div className="flex items-center gap-2 pt-2">
                                        <Button
                                            size="sm"
                                            variant="outline"
                                            className="h-8 border-gray-300 text-gray-700 hover:bg-gray-100 hover:border-gray-400 flex-1"
                                        >
                                            <Eye className="h-3 w-3 mr-1" />
                                            Ver
                                        </Button>
                                        <Button
                                            size="sm"
                                            variant="outline"
                                            className="h-8 border-amber-300 text-amber-700 hover:bg-amber-50 hover:border-amber-400"
                                        >
                                            <Edit className="h-3 w-3" />
                                        </Button>
                                        <DropdownMenu>
                                            <DropdownMenuTrigger asChild>
                                                <Button
                                                    size="sm"
                                                    variant="outline"
                                                    className="h-8 border-gray-300 text-gray-700 hover:bg-gray-100 hover:border-gray-400"
                                                >
                                                    <MoreVertical className="h-3 w-3" />
                                                </Button>
                                            </DropdownMenuTrigger>
                                            <DropdownMenuContent align="end" className="bg-white border-gray-300 shadow-lg">
                                                <DropdownMenuItem className="text-gray-700 hover:bg-gray-100 cursor-pointer">
                                                    <CheckCircle className="h-4 w-4 mr-2 text-green-600" />
                                                    {student.active ? 'Desactivar' : 'Activar'}
                                                </DropdownMenuItem>
                                                <DropdownMenuItem className="text-red-600 hover:bg-red-50 cursor-pointer">
                                                    <Trash2 className="h-4 w-4 mr-2" />
                                                    Eliminar
                                                </DropdownMenuItem>
                                            </DropdownMenuContent>
                                        </DropdownMenu>
                                    </div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>
            
        </div>

    );
    
}
