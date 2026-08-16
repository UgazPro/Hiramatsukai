import { FormField } from "@/components/form/formComponent.interface";
import { IOptions } from "@/components/form/renderFormComponents/SelectComponent";

export const dojoLeftFields: () => FormField[] = () => [
  { type: "text", name: "dojo", label: "Nombre del Dojo" },
  { type: "text", name: "code", label: "Código" },
  { type: "text", name: "slogan", label: "Eslogan" },
  { type: "text", name: "translate", label: "Traducción" },
  { type: "date", name: "founded", label: "Fecha de Fundación" },
  { type: "number", name: "latitude", label: "Latitud" },
  { type: "number", name: "longitude", label: "Longitud" },
];

export const dojoRightFields: (parentOptions: IOptions[], martialArtsOptions: IOptions[]) => FormField[] = (parentOptions, martialArtsOptions) => [
  { type: "text", name: "address", label: "Dirección" },
  { type: "text", name: "addressShort", label: "Dirección Corta" },
  { type: "text", name: "phone", label: "Teléfono" },
  { type: "text", name: "email", label: "Email" },
  { type: "textarea", name: "description", label: "Descripción" },
  {
    type: "select",
    name: "parentDojoId",
    label: "Dojo Padre",
    placeholder: "Sin dojo padre",
    options: parentOptions,
  },
  {
    type: "multiselect",
    name: "martialArts",
    label: "Artes Marciales",
    placeholder: "Selecciona las artes marciales",
    options: martialArtsOptions,
  },
];
