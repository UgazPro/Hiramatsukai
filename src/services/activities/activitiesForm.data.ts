import { FormField } from "@/components/form/formComponent.interface";
import { IOptions } from "@/components/form/renderFormComponents/SelectComponent";

export const activityLeftFields: ( dojosOptions: IOptions[], isAdmin: boolean ) => FormField[] = ( dojosOptions: IOptions[], isAdmin: boolean ) => [
  { type: "text", name: "name", label: "Actividad" },
  {
    type: "select",
    name: "type",
    label: "Tipo",
    placeholder: "Seleccione un tipo de Actividad",
    options: [
      { label: "Organizacional", value: "Organizacional" },
      { label: "Interna", value: "Interna" },
      { label: "Examen", value: "Examen" },
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
  { type: "date", name: "date", label: "Fecha" },
  { type: "time", name: "time", label: "Hora de Inicio" },
  { type: "textarea", name: "description", label: "Descripción" },
];
