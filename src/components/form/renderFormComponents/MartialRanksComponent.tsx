import { useStudentsStore } from "@/stores/students.store";
import ErrorMessage from "./ErrorMessage";
import { SelectComponent } from "./SelectComponent";

interface MartialRanksComponentProps {
    dojoMartialArts: Array<{ id: number; martialArt: string }>;
    martialArtsOptions: Array<{ label: string; value: number }>;
    ranksOptions: Array<{ label: string; value: number; martialArtId: number }>;
    form: any;
}

export default function MartialRanksComponent({ dojoMartialArts, martialArtsOptions, ranksOptions, form }: MartialRanksComponentProps) {

    const { selectedStudent } = useStudentsStore(); 
    const isSubmitted = form.formState.isSubmitted;

    return (
        <>

            <div className="border-2 p-5 rounded-lg space-y-2">

                {dojoMartialArts.length > 0 && dojoMartialArts.map((field, index) => (
                    
                    <div key={field.id} className="flex items-center gap-2">
                        <SelectComponent
                            label={index === 0 ? "Arte Marcial" : ""}
                            placeholder="Arte marcial"
                            options={martialArtsOptions.filter(ma => ma.value === field.id)}
                            value={
                                selectedStudent
                                    ? String(selectedStudent.userRanks[index]?.martialArt?.id && selectedStudent.userRanks[index].martialArt.id)
                                    : String(form.watch(`martialArtRank.${index}.martialArtId`))
                            }
                            onChange={v => {
                                form.setValue(`martialArtRank.${index}.martialArtId`, Number(v));
                                form.trigger("martialArtRank");
                            }}
                            disabled={selectedStudent?.userRanks[index]?.martialArt?.id ? true : false}
                        />

                        <SelectComponent
                            label={index === 0 ? "Rango" : ""}
                            placeholder="Rango"
                            options={ranksOptions.filter(   
                                r => r.martialArtId === form.watch(`martialArtRank.${index}.martialArtId`)
                            )}
                            value={
                                selectedStudent 
                                    ? String(selectedStudent.userRanks[index]?.rank?.id ?? "")
                                    : String(form.watch(`martialArtRank.${index}.rankId`))
                            }
                            onChange={v => {
                                form.setValue(`martialArtRank.${index}.rankId`, Number(v));
                                form.trigger("martialArtRank");
                            }}
                            disabled={!form.watch(`martialArtRank.${index}.martialArtId`) || !!selectedStudent}
                        />


                    </div>
                ))}

                {isSubmitted && form.formState.errors.martialArtRank && (
                    <ErrorMessage>{form.formState.errors.martialArtRank?.message}</ErrorMessage>
                )}


            </div>

        </>
    )
}
