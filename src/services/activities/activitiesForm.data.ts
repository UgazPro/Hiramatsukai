import { FormField } from "@/components/form/formComponent.interface";

export const activityLeftFields: ( dojosOptions: any[], isAdmin: boolean ) => FormField[] = ( dojosOptions: any[], isAdmin: boolean ) => [
  { type: "text", name: "name", label: "Actividad" },
  {
    type: "select",
    name: "type",
    label: "Tipo",
    placeholder: "Seleccione un tipo de Actividad",
    options: [
      { label: "Organizacional", value: "Organizacional" },
      { label: "Interna", value: "Interna" },
    ],
  },
  {
    name: "dojoIds",
    label: "Dojos",
    type: "multiselect",
    options: dojosOptions,
    placeholder: "Selecciona los dojos que participarán",
    disabled: !isAdmin ? true : false,
  },
];

export const activityRightFields: FormField[] = [
  { type: "text", name: "place", label: "Lugar" },
  { type: "date", name: "date", label: "Fecha y Hora" },
  { type: "textarea", name: "description", label: "Descripción" },
];
