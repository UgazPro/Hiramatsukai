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
    ChevronRight,
    Eye,
    Loader2,
    Search,
    User,
    Users
} from "lucide-react";

interface ApplyStudentsProps {
    activeTab: string;
    appliedStudents: any[];
    isLoading: boolean;
    getCinturonColor: (grado: string) => string;
    searchTerm: string;
    setSearchTerm: (term: string) => void;
    martialArtsMap: Record<number, string>;
}

export default function ApplyStudents({ activeTab, appliedStudents, isLoading, getCinturonColor, searchTerm, setSearchTerm, martialArtsMap }: ApplyStudentsProps) {

    const filtered =
        appliedStudents.filter((p: any) => {
            if (!searchTerm) return true;
            const fullName = `${p.user?.name ?? ""} ${p.user?.lastName ?? ""}`.toLowerCase();
            return fullName.includes(searchTerm.toLowerCase());
        });

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

                    {/* Loading */}
                    {isLoading && (
                        <div className="flex items-center justify-center py-16">
                            <Loader2 className="h-8 w-8 animate-spin text-amber-600" />
                            <span className="ml-3 text-gray-600">Cargando postulaciones...</span>
                        </div>
                    )}

                    {/* Empty */}
                    {!isLoading && !filtered.length && (
                        <div className="flex flex-col items-center justify-center py-16 text-gray-500">
                            <Users className="h-16 w-16 mb-4 text-gray-300" />
                            <p className="text-lg font-medium">No hay postulaciones activas</p>
                            <p className="text-sm">Las postulaciones de alumnos aparecerán aquí.</p>
                        </div>
                    )}

                    {/* Grid de postulaciones */}
                    {!isLoading && filtered.length > 0 && (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                            {filtered.map((postulacion: any) => {
                                const martialArtId = postulacion.ranks?.martialArtId ?? postulacion.martialArtId;
                                const martialArtName = martialArtsMap[martialArtId] || "—";
                                return (
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
                                                            {postulacion.user?.name} {postulacion.user?.lastName}
                                                        </h3>
                                                        <div className="flex gap-2 mt-1">
                                                            <Badge className={getCinturonColor(postulacion.currentRank?.belt || "")}>
                                                                {postulacion.currentRank?.belt || "Sin grado"}
                                                            </Badge>
                                                            <ChevronRight className="h-4 w-4 text-gray-400" />
                                                            <Badge className={getCinturonColor(postulacion.ranks?.belt || "")}>
                                                                {postulacion.ranks?.belt || "?"}
                                                            </Badge>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="p-5 space-y-4">
                                                <div className="flex items-center gap-2 text-sm">
                                                    <span className="text-gray-500">Arte marcial:</span>
                                                    <span className="font-medium text-gray-900">
                                                        {martialArtName}
                                                    </span>
                                                </div>

                                                <div className="flex items-center gap-2 text-sm">
                                                    <span className="text-gray-500">Examen:</span>
                                                    <span className="font-medium text-gray-900 truncate">
                                                        {postulacion.activity?.name || "—"}
                                                    </span>
                                                </div>

                                                <div className="pt-4 flex gap-2">
                                                    <Button variant="outline" size="sm" className="flex-1 border-gray-300 text-gray-700 hover:bg-gray-100">
                                                        <Eye className="h-4 w-4 mr-2" />
                                                        Ver
                                                    </Button>
                                                </div>
                                            </div>
                                        </CardContent>
                                    </Card>
                                );
                            })}
                        </div>
                    )}
                </div>
            )}
        </>
    );
}
