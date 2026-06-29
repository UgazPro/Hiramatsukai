import { Button } from "@/components/ui/button";
import { Plus, Users } from "lucide-react";
import { useStudentsStore } from "@/stores/students.store";

export default function StudentsNoResults() {

    const { startCreate } = useStudentsStore();

    return (

        <div className="text-center py-16 border-2 border-dashed border-gray-300 rounded-2xl bg-linear-to-b from-white to-gray-50">
            <Users className="h-16 w-16 mx-auto text-gray-400 mb-4" />
            <h3 className="text-xl font-semibold mb-2">
                No se encontraron estudiantes
            </h3>
            <p className="text-gray-600 mb-8 max-w-md mx-auto">
                No hay estudiantes que coincidan con su búsqueda.
            </p>

            <div className="flex gap-3 justify-center">
                <Button
                    className="bg-yellow-600 hover:bg-yellow-700 text-white"
                    onClick={startCreate}
                >
                    <Plus className="h-4 w-4 mr-2" />
                    Crear nuevo estudiante
                </Button>
            </div>
        </div>

    );

}
