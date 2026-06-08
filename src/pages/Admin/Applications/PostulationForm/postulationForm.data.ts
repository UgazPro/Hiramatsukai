import { FormField } from "@/components/form/formComponent.interface";

export const postulationFields = (
  examOptions: { label: string; value: number }[],
): FormField[] => [
  {
    type: "select",
    name: "activityId",
    label: "Examen",
    placeholder: "Seleccionar examen",
    options: examOptions,
  },
];
