import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Building2, Edit, MapPin, Users } from "lucide-react";
import { IDojo } from "@/services/dojos/dojo.interface";
import { useDojosStore } from "@/stores/dojos.store";
import { useDeleteDojo } from "@/hooks/useDojos";
import { DeleteDialog } from "@/components/deleteDialog";
import FieldBadge from "@/components/table/RenderTableComponents";
import { useUserData } from "@/helpers/token";

interface DojoCardViewProps {
    dojos: IDojo[];
    getParentName?: (dojo: IDojo) => string;
    canModify?: boolean;
}

const getDojoLogo = (logo: string) => `${import.meta.env.VITE_API_URL}/api${logo}`;

export default function DojoCardView({ dojos, getParentName, canModify = true }: DojoCardViewProps) {

    const { startEdit, setSelectedDojo, setScreen } = useDojosStore();

    const { mutateAsync: deleteDojo } = useDeleteDojo();

    const userData = useUserData();
    const isAdmin = userData?.roles.some(({ rol }) => rol === "Administrador");

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
            {dojos.map((dojo) => {
                const parentName = getParentName?.(dojo);
                return (
                    <Card
                        key={dojo.id}
                        className="border border-border bg-card hover:border-brand-gold hover:shadow-lg transition-all duration-200 overflow-hidden group hover:cursor-pointer py-0"
                        onClick={() => {
                            setSelectedDojo(dojo);
                            setScreen("detail");
                        }}
                    >
                        <CardContent className="p-0">
                            <div className="bg-linear-to-r from-brand-gold/10 to-brand-vermilion/10 p-4 border-b border-border">
                                <div className="flex items-start justify-between gap-2">
                                    <div className="min-w-0 flex-1">
                                        <h3 className="font-bold text-sm text-foreground truncate group-hover:text-brand-gold-deep transition-colors">
                                            {dojo.dojo}
                                        </h3>
                                        <p className="text-xs text-muted-foreground mt-0.5">
                                            {dojo.code} {isAdmin && parentName ? `· ${parentName}` : ""}
                                        </p>
                                    </div>
                                    <div className="h-11 w-11 rounded-full overflow-hidden bg-muted flex items-center justify-center shrink-0 border border-border">
                                        {dojo.logo ? (
                                            <img src={getDojoLogo(dojo.logo)} alt={dojo.dojo} className="w-full h-full object-cover" />
                                        ) : (
                                            <Building2 className="h-5 w-5 text-muted-foreground" />
                                        )}
                                    </div>
                                </div>
                            </div>

                            <div className="p-4 space-y-3">
                                <div className="flex items-center gap-2 text-sm text-foreground">
                                    <MapPin className="h-4 w-4 text-muted-foreground shrink-0" />
                                    <span className="truncate">{dojo.addressShort || dojo.address}</span>
                                </div>

                                <div className="flex flex-wrap gap-1">
                                    {dojo.dojoMartialArts.map((ma) => (
                                        <FieldBadge key={ma.id} label={ma.martialArt} color="yellow" />
                                    ))}
                                </div>

                                <div className="flex justify-between items-center text-sm text-foreground">
                                    <div className="flex items-center gap-2">
                                        <Users className="h-4 w-4 text-muted-foreground shrink-0" />
                                        <span>{dojo.students} estudiantes</span>
                                    </div>
                                    <div className="flex items-center gap-1 text-xs text-muted-foreground">
                                        <Building2 className="h-3.5 w-3.5" />
                                        <span>{dojo.childDojos.length} hijos</span>
                                    </div>
                                </div>
                            </div>

                            {canModify && (
                                <div className="px-4 py-3 border-t border-border bg-muted/40">
                                    <div className="flex justify-between gap-2">
                                        <DeleteDialog
                                            preposition="el dojo"
                                            whatsDeleting={dojo.dojo}
                                            onConfirm={() => deleteDojo(dojo.id)}
                                        />

                                        <Button
                                            variant="outline"
                                            size="sm"
                                            className="h-10 flex-1 border-brand-gold/40 text-xs text-brand-gold-deep hover:border-brand-gold hover:bg-brand-gold/10 sm:h-9"
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                startEdit(dojo);
                                            }}
                                        >
                                            <Edit className="h-3 w-3 mr-1" />
                                            Editar
                                        </Button>
                                    </div>
                                </div>
                            )}
                        </CardContent>
                    </Card>
                );
            })}
        </div>
    );
}
