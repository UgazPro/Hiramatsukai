import { FormComponent } from "@/components/form/FormComponent";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { useUserData } from "@/helpers/token";
import { useDojos } from "@/hooks/useDojos";
import { useCreateActivity, useUpdateActivity } from "@/queries/useActivityMutations";
import { activityLeftFields, activityRightFields } from "@/services/activities/activitiesForm.data";
import { ActivityFormValues } from "@/services/activities/activity.schema";
import { useActivitiesStore } from "@/stores/activities.store";
import { useEffect } from "react";
import { useForm } from "react-hook-form";

export default function ActivityForm() {

    const { data: dojos = [] } = useDojos();

    const { finishForm, selectedActivity, mode } = useActivitiesStore();

    const user = useUserData();

    const dojosOptions = dojos.filter(dojo => user?.rol.rol === "Administrador" || user?.rol.rol === "Líder Instructor" ? dojos.map(d => d) : dojo.id === user?.dojoId).map(d => ({ label: d.dojo, value: d.id }));

    const { mutateAsync: createActivity } = useCreateActivity();
    const { mutateAsync: updateActivity } = useUpdateActivity();

    const form = useForm<ActivityFormValues>({
        defaultValues: {
            name: '',
            date: new Date(),
            place: '',
            price: 0,
            type: '',
            description: '',
            dojoIds: [],
        }
    });

    useEffect(() => {

        if (!selectedActivity || mode !== "edit") return;

        console.log(selectedActivity);

        if (mode === "edit" && selectedActivity) {
            form.reset({
                name: selectedActivity.name,
                date: selectedActivity.date,
                place: selectedActivity.place,
                price: selectedActivity.price,
                type: selectedActivity.type,
                description: selectedActivity.description,
                dojoIds: selectedActivity.dojoIds.map((id) => String(id)),
            });
        }

    }, [mode, selectedActivity]);

    const sendForm = async (data: ActivityFormValues) => {

        console.log(data);

        const payload: any = {
            name: data.name,
            date: data.date,
            place: data.place,
            price: data.price ?? 0,
            type: data.type,
            description: data.description,

            dojoIds: Array.isArray(data.dojoIds) ? data.dojoIds.map((d: any) => Number(d)) : [],

            latitude: 0,
            longitude: 0,
        };

        console.log(payload);

        if (mode === "create") {
            await createActivity(payload);
        } else {
            await updateActivity({ id: selectedActivity!.id, data: { ...payload } });
        }

        finishForm();

    };

    return (

        <Form {...form}>

            <form onSubmit={form.handleSubmit(sendForm)}>

                <div className="grid grid-cols-2 gap-6 my-6">

                    <FormComponent
                        form={form}
                        fields={activityLeftFields(
                            dojosOptions,
                            user?.rol.rol === "Administrador" || user?.rol.rol === "Líder Instructor",
                        )}
                    />

                    <FormComponent
                        form={form}
                        fields={activityRightFields}
                    />

                </div>

                <div className="flex justify-end space-x-4">
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
                        {"Guardar Actividad"}
                    </Button>
                </div>

            </form>

        </Form>

    );

}
