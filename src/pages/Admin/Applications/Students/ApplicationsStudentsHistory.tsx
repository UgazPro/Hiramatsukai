import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
    Search, User
} from "lucide-react";

interface ApplicationsStudentsHistoryProps {
    activeTab: string;
    alumnosMock: any[];
    setSelectedAlumno: (alumno: any) => void;
    setShowAlumnoModal: (show: boolean) => void;
    getCinturonColor: (grado: string) => string;
}

export default function ApplicationsStudentsHistory({ activeTab, alumnosMock, setSelectedAlumno, setShowAlumnoModal, getCinturonColor }: ApplicationsStudentsHistoryProps) {



    return (
        <>
            {activeTab === 'alumnos' && (
                <div className="space-y-6">
                    {/* Búsqueda */}
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                        <Input
                            placeholder="Buscar alumno..."
                            className="pl-10 bg-white border-gray-300"
                        />
                    </div>

                    {/* Grid de alumnos */}
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
                        {alumnosMock.map((alumno: any) => (
                            <Card
                                key={alumno.id}
                                className="border border-gray-300 hover:border-amber-400 hover:shadow-lg transition-all duration-300 cursor-pointer group"
                                onClick={() => {
                                    setSelectedAlumno(alumno);
                                    setShowAlumnoModal(true);
                                }}
                            >
                                <CardContent className="p-5">
                                    <div className="flex flex-col items-center text-center">
                                        <div className="relative mb-4">
                                            <div className="h-20 w-20 rounded-full bg-gradient-to-br from-amber-500 to-red-500 p-1">
                                                <div className="h-full w-full rounded-full bg-white flex items-center justify-center">
                                                    <User className="h-10 w-10 text-amber-600" />
                                                </div>
                                            </div>
                                            <div className={`absolute -bottom-1 -right-1 h-5 w-5 rounded-full border-2 border-white ${alumno.gradoActualColor}`} />
                                        </div>

                                        <h3 className="font-bold text-gray-900 group-hover:text-amber-700 transition-colors">
                                            {alumno.nombre} {alumno.apellido}
                                        </h3>
                                        <p className="text-sm text-gray-600 mt-1">C.I: {alumno.cedula}</p>

                                        <div className="mt-3">
                                            <Badge className={getCinturonColor(alumno.gradoActual)}>
                                                {alumno.gradoActual}
                                            </Badge>
                                        </div>

                                        <div className="mt-4 opacity-0 group-hover:opacity-100 transition-opacity">
                                            <Badge className="bg-amber-100 text-amber-800 border-amber-200">
                                                Ver historial →
                                            </Badge>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </div>
            )}
        </>
    );
}
