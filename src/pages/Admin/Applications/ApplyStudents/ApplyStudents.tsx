import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import {
    BookOpen,
    ChevronRight,
    Clock,
    Edit,
    Eye,
    Search, User
} from "lucide-react";

interface ApplyStudentsProps {
    activeTab: string;
    postulacionesMock: any[];
    getCinturonColor: (grado: string) => string;
    searchTerm: string;
    setSearchTerm: (term: string) => void;
}

export default function ApplyStudents({ activeTab, postulacionesMock, getCinturonColor, searchTerm, setSearchTerm }: ApplyStudentsProps) {

    return (
        <>
            {activeTab === 'postulaciones' && (
                <div className="space-y-6">
                    {/* Filtros y búsqueda */}
                    <div className="flex flex-col sm:flex-row gap-4">
                        <div className="relative flex-1">
                            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                            <Input
                                placeholder="Buscar postulante..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="pl-10 bg-white border-gray-300"
                            />
                        </div>
                        <Select defaultValue="todos">
                            <SelectTrigger className="w-full sm:w-48 border-gray-300">
                                <SelectValue placeholder="Filtrar por grado" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="todos">Todos los grados</SelectItem>
                                <SelectItem value="amarillo">Amarillo</SelectItem>
                                <SelectItem value="naranja">Naranja</SelectItem>
                                <SelectItem value="verde">Verde</SelectItem>
                                <SelectItem value="azul">Azul</SelectItem>
                                <SelectItem value="marron">Marrón</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>

                    {/* Grid de postulaciones */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                        {postulacionesMock.map((postulacion: any) => (
                            <Card key={postulacion.id} className="border border-gray-300 hover:border-amber-400 hover:shadow-lg transition-all duration-300 group">
                                <CardContent className="p-0">
                                    <div className="p-5 bg-gradient-to-br from-white to-amber-50 border-b border-gray-200">
                                        <div className="flex items-center gap-3">
                                            <div className="h-14 w-14 rounded-full bg-gradient-to-br from-amber-500 to-red-500 p-0.5">
                                                <div className="h-full w-full rounded-full bg-white flex items-center justify-center">
                                                    <User className="h-7 w-7 text-amber-600" />
                                                </div>
                                            </div>
                                            <div>
                                                <h3 className="font-bold text-lg text-gray-900">
                                                    {postulacion.alumnoNombre} {postulacion.alumnoApellido}
                                                </h3>
                                                <div className="flex gap-2 mt-1">
                                                    <Badge className={getCinturonColor(postulacion.gradoActual)}>
                                                        {postulacion.gradoActual}
                                                    </Badge>
                                                    <ChevronRight className="h-4 w-4 text-gray-400" />
                                                    <Badge className={getCinturonColor(postulacion.gradoAspira)}>
                                                        {postulacion.gradoAspira}
                                                    </Badge>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="p-5 space-y-4">
                                        <div>
                                            <p className="text-sm text-gray-500 mb-1">Kata a presentar</p>
                                            <div className="flex items-center gap-2">
                                                <BookOpen className="h-4 w-4 text-amber-600" />
                                                <span className="font-medium text-gray-900">{postulacion.kata}</span>
                                            </div>
                                        </div>

                                        <div>
                                            <p className="text-sm text-gray-500 mb-1">Bunkai</p>
                                            <p className="text-sm text-gray-700 line-clamp-2">{postulacion.bunkai}</p>
                                        </div>

                                        <div className="flex items-center gap-2 text-sm">
                                            <Clock className="h-4 w-4 text-gray-500" />
                                            <span className="text-gray-600">
                                                Último examen: <span className="font-semibold text-gray-900">{postulacion.tiempoUltimoExamen}</span>
                                            </span>
                                        </div>

                                        <div className="pt-4 flex gap-2">
                                            <Button variant="outline" size="sm" className="flex-1 border-gray-300 text-gray-700 hover:bg-gray-100">
                                                <Eye className="h-4 w-4 mr-2" />
                                                Ver
                                            </Button>
                                            <Button size="sm" className="flex-1 bg-amber-600 hover:bg-amber-700 text-white">
                                                <Edit className="h-4 w-4 mr-2" />
                                                Editar
                                            </Button>
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
