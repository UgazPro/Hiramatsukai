import { useStudentsStore } from "@/stores/students.store";
import ErrorMessage from "./ErrorMessage";
import { SelectComponent } from "./SelectComponent";
import { UseFormReturn } from "react-hook-form";
import { IDojoMartialArts } from "@/services/dojos/dojo.interface";
import { StudentFormValues } from "@/services/students/student.schema";

interface MartialRanksComponentProps {
    dojoMartialArts: IDojoMartialArts[];
    ranksOptions: Array<{ label: string; value: number; martialArtId: number }>;
    form: UseFormReturn<StudentFormValues>;
}

const maIcons: Record<string, string> = {
    Karate: "🥋",
    Kobudo: "🔱",
};

function getMaIcon(name: string) {
    return maIcons[name] || "⚔️";
}

export default function MartialRanksComponent({ dojoMartialArts, ranksOptions, form }: MartialRanksComponentProps) {

    const { selectedStudent } = useStudentsStore();
    const isSubmitted = form.formState.isSubmitted;

    const allLocked = !!selectedStudent && dojoMartialArts.length > 0 && dojoMartialArts.every(
        ma => selectedStudent.userRanks.some(r => r.martialArt.id === ma.id)
    );

    return (
        <div className={`border-2 p-5 rounded-lg space-y-3 ${allLocked ? "opacity-60 pointer-events-none" : ""}`}>

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
                    <div key={field.id} className="flex items-center gap-3">
                        <div className="flex items-center gap-2 min-w-0 w-40 shrink-0">
                            <span className="text-base">{getMaIcon(field.martialArt)}</span>
                            <span className="text-sm font-medium text-gray-800 truncate">
                                {field.martialArt}
                            </span>
                        </div>

                        <div className="flex-1">
                            <SelectComponent
                                label=""
                                placeholder={isExistingRank ? "Rango actual" : "Seleccionar rango"}
                                options={[
                                    { label: "Sin rango", value: 0 },
                                    ...ranksOptions.filter(r => r.martialArtId === field.id),
                                ]}
                                value={String(currentValue ?? 0)}
                                onChange={v => {
                                    form.setValue(`martialArtRank.${index}.rankId`, Number(v));
                                    form.trigger("martialArtRank");
                                }}
                                disabled={isExistingRank}
                            />
                        </div>
                    </div>
                );
            })}

            {isSubmitted && form.formState.errors.martialArtRank && (
                <ErrorMessage>{String(form.formState.errors.martialArtRank?.message ?? "")}</ErrorMessage>
            )}

        </div>
    );
}
