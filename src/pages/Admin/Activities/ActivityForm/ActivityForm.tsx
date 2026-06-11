import { FormComponent } from "@/components/form/FormComponent";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { useUserData } from "@/helpers/token";
import { useDojos } from "@/hooks/useDojos";
import { useCreateActivity, useUpdateActivity } from "@/queries/useActivityMutations";
import { activityLeftFields, activityRightFields } from "@/services/activities/activitiesForm.data";
import { IDojoEdit } from "@/services/activities/activity.interface";
import { ActivityFormValues, ActivitySchema } from "@/services/activities/activity.schema";
import { useActivitiesStore } from "@/stores/activities.store";
import { zodResolver } from "@hookform/resolvers/zod";
import { format } from "date-fns";
import { ArrowLeft } from "lucide-react";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { Loader } from "@/components/spinner/Loader";

export default function ActivityForm() {

    const { data: dojos = [] } = useDojos();

    const { finishForm, selectedActivity, mode } = useActivitiesStore();

    const user = useUserData();

    const isAdminOrLeader = user?.rol?.rol === "Administrador" || user?.rol?.rol === "Líder Instructor";
    const dojosOptions = dojos.filter(dojo => isAdminOrLeader || dojo.id === user?.dojoId).map(d => ({ label: d.dojo, value: d.id }));

    const { mutateAsync: createActivity, isPending: isCreating } = useCreateActivity();
    const { mutateAsync: updateActivity, isPending: isUpdating } = useUpdateActivity();

    const form = useForm<ActivityFormValues>({
        resolver: zodResolver(ActivitySchema),
        defaultValues: {
            name: '',
            date: new Date(),
            time: '',
            place: '',
            type: '',
            description: '',
            dojoIds: [],
            price: 0,
            latitude: 0,
            longitude: 0,
        }
    });

    useEffect(() => {

        if (mode !== "edit") return;
        if (!selectedActivity) return;

        if (mode === "edit" && selectedActivity) {
            const activityDate = new Date(selectedActivity.date);
            form.reset({
                name: selectedActivity.name,
                date: activityDate,
                time: format(activityDate, "HH:mm"),
                place: selectedActivity.place,
                type: selectedActivity.type,
                description: selectedActivity.description,
                dojoIds: (selectedActivity.ActivityDojos as IDojoEdit[])?.map((dojo: IDojoEdit) => (dojo.dojo.id)) ?? [],
                price: selectedActivity.price,
                latitude: selectedActivity.latitude,
                longitude: selectedActivity.longitude,
            });
        }

    }, [mode, selectedActivity, form]);

    const sendForm = async (data: ActivityFormValues) => {

        const [hours, minutes] = data.time.split(":").map(Number);
        const dateWithTime = new Date(data.date);
        dateWithTime.setHours(hours, minutes, 0, 0);

        const payload = {
            ...(mode === "edit" && selectedActivity?.id ? { id: selectedActivity.id } : {}),
            name: data.name,
            date: dateWithTime,
            place: data.place,
            type: data.type,
            description: data.description,
            dojoIds: Array.isArray(data.dojoIds) ? data.dojoIds.map((d: number) => Number(d)) : [],
            price: 0,
            latitude: 0,
            longitude: 0,
        };

        if (mode === "create") {
            await createActivity(payload);
        } else {
            const { id: _unused, ...updatePayload } = payload;
            await updateActivity({ data: updatePayload, id: selectedActivity!.id });
        }
        finishForm();
    };

    if (isCreating || isUpdating) {
        return (
            <div className="p-6 w-full max-w-5xl mx-auto">
                <div className="bg-white shadow-xl border border-gray-200 rounded-xl overflow-hidden flex items-center justify-center min-h-[400px]">
                    <Loader size="lg" message={isUpdating ? "Actualizando actividad..." : "Guardando actividad..."} />
                </div>
            </div>
        );
    }

    return (

        <div className="p-6 w-full max-w-5xl mx-auto">
            <div className="bg-white shadow-xl border border-gray-200 rounded-xl overflow-hidden">

                {/* Header */}
                <div className="bg-linear-to-r from-amber-50 to-red-50 border-b border-gray-200 px-6 py-4">
                    <div className="flex justify-between items-center">
                        <div>
                            <h2 className="text-xl font-bold text-gray-900">
                                {mode === "create" ? "Nueva Actividad" : "Editar Actividad"}
                            </h2>
                            <p className="text-sm text-gray-600 mt-0.5">
                                {mode === "create"
                                    ? "Complete los campos para agregar una nueva actividad"
                                    : "Modifique los campos de la actividad"}
                            </p>
                        </div>
                        <Button
                            variant="ghost"
                            size="sm"
                            className="text-gray-600 hover:text-gray-900"
                            onClick={finishForm}
                        >
                            <ArrowLeft className="h-4 w-4 mr-2" />
                            Volver
                        </Button>
                    </div>
                </div>

                <div className="p-5">

                    <Form {...form}>

                        <form onSubmit={form.handleSubmit(sendForm, (errors) => console.error("Errores de validación:", errors))}>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-6">

                                <FormComponent
                                    form={form}
                                    fields={activityLeftFields(
                                        dojosOptions,
                                        user?.rol?.rol === "Administrador" || user?.rol?.rol === "Líder Instructor",
                                    )}
                                />

                                <FormComponent
                                    form={form}
                                    fields={activityRightFields}
                                />

                            </div>

                            <div className="flex justify-end space-x-4 pt-5 border-t border-gray-200">
                                <Button
                                    type="button" variant="outline" className="cursor-pointer"
                                    onClick={() => finishForm()}
                                >
                                    Cancelar
                                </Button>
                                <Button
                                    type="submit"
                                    className="bg-red-700 hover:bg-red-800 cursor-pointer"
                                >
                                    {mode === "create" ? "Guardar Actividad" : "Actualizar Actividad"}
                                </Button>
                            </div>

                        </form>

                    </Form>

                </div>

            </div>
        </div>

    );

}
