import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { format, parseISO } from "date-fns";
import { CalendarDays, Clock, Edit, MapPin } from "lucide-react";
import { IActivity } from "@/services/activities/activity.interface";
import { useActivitiesStore } from "@/stores/activities.store";
import { useDeleteActivity } from "@/queries/useActivityMutations";
import { DeleteDialog } from "@/components/deleteDialog";
import FieldBadge from "@/components/table/RenderTableComponents";

interface ActivityCardViewProps {
    filteredActivities: IActivity[];
}

export default function ActivityCardView({ filteredActivities }: ActivityCardViewProps) {

    const { startEdit, setSelectedActivity, setScreen } = useActivitiesStore();

    const { mutateAsync: deleteActivity } = useDeleteActivity();

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
            {filteredActivities.map((activity) => (
                <Card
                    key={activity.id}
                    className="border border-gray-300 bg-white hover:border-amber-400 hover:shadow-lg transition-all duration-200 overflow-hidden group hover:cursor-pointer py-0"
                    onClick={() => {
                        setSelectedActivity(activity);
                        setScreen("detail");
                    }}
                >
                    <CardContent className="p-0">
                        <div className="bg-linear-to-r from-amber-50 to-red-50 p-4 border-b border-gray-200">
                            <div className="flex items-start justify-between gap-2">
                                <div className="min-w-0 flex-1">
                                    <h3 className="font-bold text-sm text-gray-900 truncate group-hover:text-amber-700 transition-colors">
                                        {activity.name}
                                    </h3>
                                    <p className="text-xs text-gray-600 mt-1 line-clamp-2">
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
                            <div className="flex items-center gap-2 text-sm text-gray-700">
                                <MapPin className="h-4 w-4 text-gray-500 shrink-0" />
                                <span className="truncate">{activity.place}</span>
                            </div>

                            <div className="flex justify-between items-center">
                                <div className="flex items-center gap-2 text-sm text-gray-700">
                                    <CalendarDays className="h-4 w-4 text-gray-500 shrink-0" />
                                    <span>{format(parseISO(activity.date.toString()), "dd/MM/yyyy")}</span>
                                </div>
                                <div className="flex items-center gap-2 text-sm text-gray-700">
                                    <Clock className="h-4 w-4 text-gray-500 shrink-0" />
                                    <span>{format(parseISO(activity.date.toString()), "hh:mm aaa")}</span>
                                </div>
                            </div>
                        </div>

                        <div className="px-4 py-3 border-t border-gray-200 bg-gray-50">
                            <div className="flex justify-between gap-2">
                                <DeleteDialog
                                    preposition="la actividad"
                                    whatsDeleting={`${activity.name}`}
                                    onConfirm={() => deleteActivity(activity.id)}
                                />

                                <Button
                                    variant="outline"
                                    size="sm"
                                    className="border-amber-300 text-amber-700 hover:bg-amber-50 hover:border-amber-400 flex-1 text-xs"
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
                    </CardContent>
                </Card>
            ))}
        </div>
    );
}
