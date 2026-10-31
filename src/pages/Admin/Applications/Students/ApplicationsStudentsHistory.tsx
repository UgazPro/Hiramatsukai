import { useMemo, useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
    Search,
    GraduationCap,
    ChevronRight,
} from "lucide-react";
import { useStudents } from "@/hooks/useStudents";
import { useApplicationsStore } from "@/stores/applications.store";
import { Loader } from "@/components/spinner/Loader";
import { IStudent, StudentRanks } from "@/services/students/student.interface";

interface ApplicationsStudentsHistoryProps {
    activeTab: string;
    getBeltColor: (grado: string) => string;
}

export default function ApplicationsStudentsHistory({ activeTab, getBeltColor, }: ApplicationsStudentsHistoryProps) {

    const { openStudentDetail } = useApplicationsStore();
    const { data: allUsers = [], isLoading } = useStudents();
    const [searchTerm, setSearchTerm] = useState("");

    const students = useMemo(
        () =>
            (allUsers as IStudent[]).filter(
                (u: IStudent) => !u.deleted && u.roles?.some((r) => r.rol === "Estudiante" || r.rol === "Líder Instructor" || r.rol === "Instructor"),
            ),
        [allUsers],
    );

    const filteredStudents = useMemo(
        () =>
            students.filter((s: IStudent) => {
                if (!searchTerm) return true;
                const q = searchTerm.toLowerCase();
                const fullName = `${s.name} ${s.lastName}`.toLowerCase();
                const id = (s.identification ?? "").toLowerCase();
                return fullName.includes(q) || id.includes(q);
            }),
        [students, searchTerm],
    );

    const getInitials = (name: string, lastName: string) => {
        return `${name?.charAt(0) ?? ""}${lastName?.charAt(0) ?? ""}`.toUpperCase();
    };

    return (
        <>
            {activeTab === "alumnos" && (
                <div className="space-y-6">
                    {isLoading && (
                        <div className="flex items-center justify-center py-16">
                            <Loader message="Cargando alumnos..." />
                        </div>
                    )}

                    {!isLoading && students.length === 0 && (
                        <div className="flex flex-col items-center justify-center py-16 text-muted-foreground">
                            <GraduationCap className="h-16 w-16 mb-4 text-border" />
                            <p className="text-lg font-medium">
                                No hay alumnos registrados
                            </p>
                            <p className="text-sm">
                                Los alumnos aparecerán aquí una vez creados.
                            </p>
                        </div>
                    )}

                    {!isLoading && students.length > 0 && (
                        <>
                            <div className="relative">
                                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                                <Input
                                    aria-label="Buscar alumno por nombre o cédula"
                                    placeholder="Buscar alumno por nombre o cédula..."
                                    value={searchTerm}
                                    onChange={(e) =>
                                        setSearchTerm(e.target.value)
                                    }
                                    className="h-11 border-border bg-card pl-10 text-base"
                                />
                            </div>

                            <div className="grid grid-cols-1 gap-3 min-[400px]:grid-cols-2 sm:gap-4 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
                                {filteredStudents.map((student: IStudent) => (
                                    <Card
                                        key={student.id}
                                        className="border border-border hover:border-brand-gold hover:shadow-lg transition-all duration-300 cursor-pointer group"
                                        onClick={() =>
                                            openStudentDetail(student.id)
                                        }
                                    >
                                        <CardContent className="p-4 sm:p-5">
                                            <div className="flex flex-col items-center text-center">
                                                <div className="relative mb-4">
                                                    <div className="h-20 w-20 rounded-full bg-linear-to-br from-brand-gold to-brand-vermilion p-1">
                                                        <div className="h-full w-full rounded-full bg-card flex items-center justify-center overflow-hidden">
                                                            {student.profileImg ? (
                                                                <img
                                                                    src={
                                                                        student.profileImg
                                                                    }
                                                                    alt=""
                                                                    className="h-full w-full object-cover"
                                                                />
                                                            ) : (
                                                                <span className="text-lg font-bold text-brand-gold-deep">
                                                                    {getInitials(
                                                                        student.name,
                                                                        student.lastName,
                                                                    )}
                                                                </span>
                                                            )}
                                                        </div>
                                                    </div>
                                                </div>

                                                <h3 className="font-bold text-foreground group-hover:text-brand-gold-deep transition-colors truncate w-full">
                                                    {student.name}{" "}
                                                    {student.lastName}
                                                </h3>
                                                <p className="text-sm text-muted-foreground mt-1 truncate w-full">
                                                    C.I:{" "}
                                                    {student.identification ??
                                                        "—"}
                                                </p>

                                                {student.userRanks?.length >
                                                    0 && (
                                                        <div className="mt-3 flex flex-wrap justify-center gap-1">
                                                            {(
                                                                student.userRanks as StudentRanks[]
                                                            ).map(
                                                                (
                                                                    ur: StudentRanks,
                                                                    i: number,
                                                                ) => (
                                                                    <Badge
                                                                        key={i}
                                                                        className={getBeltColor(
                                                                            ur.rank
                                                                                ?.belt ??
                                                                            "",
                                                                        )}
                                                                    >
                                                                        {ur.rank
                                                                            ?.belt ??
                                                                            ""}
                                                                    </Badge>
                                                                ),
                                                            )}
                                                        </div>
                                                    )}

                                                <div className="mt-4 transition-opacity sm:opacity-0 sm:group-hover:opacity-100">
                                                    <Badge className="bg-brand-gold/15 text-brand-gold-deep border-brand-gold/30">
                                                        Ver historial{" "}
                                                        <ChevronRight className="h-3 w-3 ml-1 inline" />
                                                    </Badge>
                                                </div>
                                            </div>
                                        </CardContent>
                                    </Card>
                                ))}
                            </div>

                            {filteredStudents.length === 0 && (
                                <div className="text-center py-8 text-muted-foreground">
                                    <Search className="h-10 w-10 mx-auto mb-2 text-border" />
                                    <p className="text-sm">
                                        No se encontraron alumnos con ese
                                    </p>
                                </div>
                            )}
                        </>
                    )}
                </div>
            )}
        </>
    );
}
