import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { calculateAge } from "@/helpers/formatter";
import { IStudent } from "@/services/users/user.interface";
import { Edit, Eye, School, User } from "lucide-react";

interface StudentCardViewProps {
    filteredStudents: IStudent[];
}

export default function StudentCardView({ filteredStudents }: StudentCardViewProps) {

    return (

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">

            {filteredStudents.map((student) => (
                <Card key={student.id} className="border border-gray-300 bg-white hover:border-amber-400 hover:shadow-md transition-all duration-200 group">
                    <CardContent className="p-4">
                        
                        <div className="flex flex-col items-center text-center space-y-3">
                            
                            <div className="relative">
                                <div className="h-16 w-16 rounded-full bg-linear-to-br from-amber-500 to-red-500 p-0.5">
                                    <div className="h-full w-full rounded-full bg-white flex items-center justify-center">
                                        {student.profileImg ? (
                                            <img src={student.profileImg} className="h-full w-full rounded-full object-cover" alt={student.name} />
                                        ) : (
                                            <User className="h-7 w-7 text-amber-600" />
                                        )}
                                    </div>
                                </div>
                                
                                <div className={`absolute -bottom-1 -right-1 h-5 w-5 rounded-full border-2 border-white ${student.active ? 'bg-green-500' : 'bg-red-500'
                                    }`} />
                            </div>

                            
                            <div>
                                <h4 className="font-bold text-gray-900 text-sm leading-tight">
                                    {student.name} {student.lastName.charAt(0)}.
                                </h4>
                                <p className="text-xs text-gray-600 mt-0.5">@{student.username}</p>
                            </div>

                            
                            <div className="space-y-2 w-full">
                                <div className="flex justify-center">
                                    <Badge className={`text-xs px-2 py-0.5 ${student.rol.rol === 'Instructor' ? 'bg-red-100 text-red-800 border-red-200' :
                                        'bg-amber-100 text-amber-800 border-amber-200'
                                        } border`}>
                                        {student.rol.rol}
                                    </Badge>
                                </div>

                                <div className="text-xs text-gray-600 flex items-center justify-center gap-1">
                                    <School className="h-3 w-3" />
                                    <span className="truncate">{student.dojo.dojo}</span>
                                </div>

                                <div className="text-xs text-gray-500">
                                    {calculateAge(student.birthday)} años
                                </div>
                            </div>

                            <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                                <Button size="sm" variant="ghost" className="h-7 w-7 p-0 hover:bg-gray-100">
                                    <Eye className="h-3 w-3 text-gray-600" />
                                </Button>
                                <Button size="sm" variant="ghost" className="h-7 w-7 p-0 hover:bg-amber-50">
                                    <Edit className="h-3 w-3 text-amber-600" />
                                </Button>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            ))}
        </div>

    );

}
