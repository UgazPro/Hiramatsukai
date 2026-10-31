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

    const isAdminOrLeader = user?.roles?.some(({ rol }) => rol === "Administrador" || rol === "Líder Instructor");
    const dojosOptions = dojos.filter(dojo => isAdminOrLeader || dojo.id === user?.dojo.id).map(d => ({ label: d.dojo, value: d.id }));

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
            const { ...updatePayload } = payload;
            await updateActivity({ data: updatePayload, id: selectedActivity!.id });
        }
        finishForm();
    };

    if (isCreating || isUpdating) {
        return (
            <div className="mx-auto my-3 w-full max-w-5xl p-3 sm:my-6 sm:p-6">
                <div className="overflow-hidden rounded-xl border border-border bg-card shadow-xl flex items-center justify-center min-h-[400px]">
                    <Loader size="lg" message={isUpdating ? "Actualizando actividad..." : "Guardando actividad..."} />
                </div>
            </div>
        );
    }

    return (

        <div className="mx-auto my-3 w-full max-w-5xl p-3 sm:my-6 sm:p-6">
            <div className="overflow-hidden rounded-xl border border-border bg-card shadow-xl">

                {/* Header */}
                <div className="border-b border-border bg-linear-to-r from-brand-gold/10 to-brand-vermilion/10 px-4 py-4 sm:px-6">
                    <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                        <div className="min-w-0">
                            <h2 className="text-lg font-bold text-foreground sm:text-xl">
                                {mode === "create" ? "Nueva Actividad" : "Editar Actividad"}
                            </h2>
                            <p className="mt-0.5 text-sm text-muted-foreground">
                                {mode === "create"
                                    ? "Complete los campos para agregar una nueva actividad"
                                    : "Modifique los campos de la actividad"}
                            </p>
                        </div>
                        <Button
                            variant="ghost"
                            className="h-11 shrink-0 self-start text-muted-foreground hover:text-foreground sm:h-9"
                            onClick={finishForm}
                        >
                            <ArrowLeft data-icon="inline-start" />
                            Volver
                        </Button>
                    </div>
                </div>

                <div className="p-5">

                    <Form {...form}>

                        <form onSubmit={form.handleSubmit(sendForm, (errors) => console.error("Errores de validación:", errors))}>

                            <div className="my-6 grid grid-cols-1 gap-6 md:grid-cols-2">

                                <FormComponent
                                    form={form}
                                    fields={activityLeftFields(
                                        dojosOptions,
                                        user?.roles?.some(({ rol }) => rol === "Administrador" || rol === "Líder Instructor") ?? false,
                                    )}
                                />

                                <FormComponent
                                    form={form}
                                    fields={activityRightFields}
                                />

                            </div>

                            <div className="flex flex-col-reverse gap-2 border-t border-border pt-5 sm:flex-row sm:justify-end">
                                <Button
                                    type="button" variant="outline" className="h-11 w-full cursor-pointer sm:h-9 sm:w-auto"
                                    onClick={() => finishForm()}
                                >
                                    Cancelar
                                </Button>
                                <Button
                                    type="submit"
                                    className="h-11 w-full cursor-pointer bg-brand-vermilion hover:bg-brand-vermilion-dark sm:h-9 sm:w-auto"
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
