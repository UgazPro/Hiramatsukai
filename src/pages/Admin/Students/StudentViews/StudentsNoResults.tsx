import { Button } from "@/components/ui/button";
import { Plus, Users } from "lucide-react";
import { useStudentsStore } from "@/stores/students.store";

export default function StudentsNoResults() {

    const { startCreate } = useStudentsStore();

    return (

        <div className="rounded-2xl border-2 border-dashed border-border bg-linear-to-b from-card to-muted/40 py-16 text-center">
            <Users className="mx-auto mb-4 h-16 w-16 text-muted-foreground" />
            <h3 className="mb-2 text-xl font-semibold text-heading">
                No se encontraron estudiantes
            </h3>
            <p className="mx-auto mb-8 max-w-md text-muted-foreground">
                No hay estudiantes que coincidan con su búsqueda.
            </p>

            <div className="flex justify-center gap-3">
                <Button
                    variant="default"
                    onClick={startCreate}
                >
                    <Plus className="h-4 w-4 mr-2" />
                    Crear nuevo estudiante
                </Button>
            </div>
        </div>

    );

}
