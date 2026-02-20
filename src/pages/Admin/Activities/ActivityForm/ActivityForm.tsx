import { FormComponent } from "@/components/form/FormComponent";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { useUserData } from "@/helpers/token";
import { useDojos } from "@/hooks/useDojos";
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

    const form = useForm<ActivityFormValues>({
        defaultValues: {
            name: '',
            date: new Date(),
            place: '',
            price: 0,
            type: '',
            description: '',
            ActivityDojos: [],
        }
    });

    useEffect(() => {

        if (!selectedActivity || mode !== "edit") return;

        if (mode === "edit" && selectedActivity) {
            form.reset({
                name: selectedActivity.name,
                date: selectedActivity.date,
                place: selectedActivity.place,
                price: selectedActivity.price,
                type: selectedActivity.type,
                description: selectedActivity.description,
                ActivityDojos: selectedActivity.ActivityDojos,
            });
        }

    }, [mode, selectedActivity]);

    return (

        <Form {...form}>

            <form >

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
