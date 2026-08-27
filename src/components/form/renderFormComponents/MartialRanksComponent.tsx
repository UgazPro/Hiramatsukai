import { useStudentsStore } from "@/stores/students.store";
import ErrorMessage from "./ErrorMessage";
import { SelectComponent } from "./SelectComponent";
import { UseFormReturn } from "react-hook-form";
import { IDojoMartialArts } from "@/services/dojos/dojo.interface";
import { StudentFormValues } from "@/services/students/student.schema";
import { Loader } from "@/components/spinner/Loader";

interface MartialRanksComponentProps {
    dojoMartialArts: IDojoMartialArts[];
    ranksOptions: Array<{ label: string; value: number; martialArtId: number }>;
    form: UseFormReturn<StudentFormValues>;
    isLoadingRanks?: boolean;
}

const maLogos: Record<string, string> = {
    Karate: "/oki2.png",
    Kobudo: "/Logo_de_Kobudo-Sin_Fondo mejorado.png",
};

function getMaLogo(name: string) {
    return maLogos[name] || "/kendo-iaido-icono.png";
}

export default function MartialRanksComponent({ dojoMartialArts, ranksOptions, form, isLoadingRanks }: MartialRanksComponentProps) {

    const { selectedStudent } = useStudentsStore();
    const isSubmitted = form.formState.isSubmitted;

    return (
        <div className="border-2 p-5 rounded-lg space-y-3">

            {isLoadingRanks ? (
                <div className="flex items-center justify-center py-4">
                    <Loader size="sm" message="Cargando rangos..." />
                </div>
            ) : (
                <>
                    {dojoMartialArts.length === 0 && (
                        <p className="text-sm text-gray-400 text-center py-2">
                            Selecciona un dojo para ver sus artes marciales
                        </p>
                    )}

                    {dojoMartialArts.map((field: IDojoMartialArts, index: number) => {
                        const isExistingRank = !!selectedStudent?.userRanks.some(
                            r => r.martialArt.id === field.id
                        );

                        const currentValue = form.watch(`martialArtRank.${index}.rankId`);

                        return (
                            <div key={field.id} className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3">
                                <div className="flex items-center gap-2 min-w-0 sm:w-40 shrink-0">
                                    <img src={getMaLogo(field.martialArt)} alt={field.martialArt} className="w-6 h-6 md:w-8 md:h-8 rounded-full object-contain shrink-0" />
                                    <span className="text-sm md:text-base font-medium text-gray-800 truncate">
                                        {field.martialArt}
                                    </span>
                                </div>

                                <div className="flex-1 w-full">
                                    <SelectComponent
                                        label=""
                                        placeholder={isExistingRank ? "Rango actual" : "Seleccionar rango"}
                                        options={[
                                            ...ranksOptions.filter(r => r.martialArtId === field.id),
                                        ]}
                                        value={String(currentValue)}
                                        onChange={v => {
                                            form.setValue(`martialArtRank.${index}.rankId`, Number(v));
                                            form.trigger("martialArtRank");
                                        }}
                                        disabled={false}
                                    />
                                </div>
                            </div>
                        );
                    })}
                </>
            )}

            {isSubmitted && form.formState.errors.martialArtRank && (
                <ErrorMessage>{String(form.formState.errors.martialArtRank?.message ?? "")}</ErrorMessage>
            )}

        </div>
    );
}
