import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { format, parseISO } from "date-fns";
import { CalendarDays, Clock, Edit, MapPin } from "lucide-react";
import { IActivity } from "@/services/activities/activity.interface";
import { useActivitiesStore } from "@/stores/activities.store";
import { useDeleteActivity } from "@/queries/useActivityMutations";
import { DeleteDialog } from "@/components/deleteDialog";
import FieldBadge from "@/components/table/RenderTableComponents";
import { useUserData } from "@/helpers/token";

interface ActivityCardViewProps {
    filteredActivities: IActivity[];
}

export default function ActivityCardView({ filteredActivities }: ActivityCardViewProps) {

    const { startEdit, setSelectedActivity, setScreen } = useActivitiesStore();

    const { mutateAsync: deleteActivity } = useDeleteActivity();

    const userData = useUserData();
    const canModify = userData?.roles.some(({ rol }) => rol === "Administrador" || rol === "Líder Instructor" || rol === "Instructor");

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
            {filteredActivities.map((activity) => (
                <Card
                    key={activity.id}
                    className="border border-border bg-card hover:border-brand-gold hover:shadow-lg transition-all duration-200 overflow-hidden group hover:cursor-pointer py-0"
                    onClick={() => {
                        setSelectedActivity(activity);
                        setScreen("detail");
                    }}
                >
                    <CardContent className="p-0">
                        <div className="bg-linear-to-r from-brand-gold/10 to-brand-vermilion/10 p-4 border-b border-border">
                            <div className="flex items-start justify-between gap-2">
                                <div className="min-w-0 flex-1">
                                    <h3 className="font-bold text-sm text-foreground truncate group-hover:text-brand-gold-deep transition-colors">
                                        {activity.name}
                                    </h3>
                                    <p className="text-xs text-muted-foreground mt-1 line-clamp-2">
                                        {activity.description}
                                    </p>
                                </div>
                                <FieldBadge
                                    label={activity.type}
                                    color="blue"
                                />
                            </div>
                        </div>

                        <div className="p-4 space-y-3">
                            <div className="flex items-center gap-2 text-sm text-foreground">
                                <MapPin className="h-4 w-4 text-muted-foreground shrink-0" />
                                <span className="truncate">{activity.place}</span>
                            </div>

                            <div className="flex justify-between items-center">
                                <div className="flex items-center gap-2 text-sm text-foreground">
                                    <CalendarDays className="h-4 w-4 text-muted-foreground shrink-0" />
                                    <span>{format(parseISO(activity.date.toString()), "dd/MM/yyyy")}</span>
                                </div>
                                <div className="flex items-center gap-2 text-sm text-foreground">
                                    <Clock className="h-4 w-4 text-muted-foreground shrink-0" />
                                    <span>{format(parseISO(activity.date.toString()), "hh:mm aaa")}</span>
                                </div>
                            </div>
                        </div>

                        {canModify && (
                            <div className="px-4 py-3 border-t border-border bg-muted/40">
                                <div className="flex justify-between gap-2">
                                    <DeleteDialog
                                        preposition="la actividad"
                                        whatsDeleting={`${activity.name}`}
                                        onConfirm={() => deleteActivity(activity.id)}
                                    />

                                    <Button
                                        variant="outline"
                                        size="sm"
                                        className="h-10 flex-1 border-brand-gold/40 text-xs text-brand-gold-deep hover:border-brand-gold hover:bg-brand-gold/10 sm:h-9"
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            startEdit(activity);
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
            ))}
        </div>
    );
}
