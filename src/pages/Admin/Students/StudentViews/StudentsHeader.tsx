import { Button } from "@/components/ui/button";
import { ViewMode } from "@/services/users/user.interface";
import { Grid3X3, IdCard, LayoutGrid, List, UserPlus } from "lucide-react";

interface StudentsHeaderProps {
    viewMode: ViewMode;
    setViewMode: (view: ViewMode) => void;
    openCreateStudent: () => void;
}

export default function StudentsHeader({ viewMode, setViewMode, openCreateStudent }: StudentsHeaderProps) {

    const views = [
        { key: "list", icon: List },
        { key: "grid", icon: Grid3X3 },
        { key: "cards", icon: LayoutGrid },
        { key: "longCards", icon: IdCard },
    ];

    return (

        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6 mb-8">

            <div>
                <h2 className="text-3xl font-bold text-gray-900">Alumnos</h2>
                <p className="text-gray-600 mt-2">
                    Gestiona todos los alumnos e instructores del dojo
                </p>
            </div>

            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">

                <div className="flex items-center border border-gray-300 rounded-lg overflow-hidden bg-white">

                    {views.map(({ key, icon: Icon }) => (
                        <Button
                            key={key}
                            variant={viewMode === key ? "secondary" : "ghost"}
                            size="sm"
                            onClick={() => setViewMode(key as ViewMode)}
                            className={`rounded-none border-r border-gray-300 ${viewMode === key ? "bg-amber-500 text-white hover:bg-amber-600" : "text-gray-700 hover:bg-gray-100" }`}
                        >
                            <Icon className="h-4 w-4" />
                        </Button>
                    ))}

                </div>

                <Button
                    className="bg-linear-to-r from-yellow-600 to-yellow-400 hover:from-yellow-400 hover:to-yellow-600 text-white shadow-md hover:shadow-lg transition-all"
                    onClick={openCreateStudent}
                >
                    <UserPlus className="h-4 w-4 mr-2" />
                    Nuevo Estudiante
                </Button>
            </div>

        </div>

    );

}
