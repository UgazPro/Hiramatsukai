import { FormField } from "@/components/form/formComponent.interface";

export const studentLeftFields: FormField[] = [
  { type: "text", name: "username", label: "Nombre de Usuario" },
  { type: "text", name: "name", label: "Nombres" },
  { type: "text", name: "lastName", label: "Apellidos" },
  { type: "text", name: "identification", label: "Cédula" },
  { type: "other", name: "profileImg", label: "Foto del Estudiante" },
];

export const studentMiddleFields: FormField[] = [
  { type: "date", name: "birthday", label: "Fecha de Nacimiento" },
  {
    type: "select",
    name: "sex",
    label: "Sexo",
    placeholder: "Seleccione un sexo",
    options: [
      { label: "Masculino", value: "masculino" },
      { label: "Femenino", value: "femenino" },
    ],
  },
  { type: "text", name: "email", label: "Correo Electrónico" },
  { type: "text", name: "phone", label: "Teléfono" },
  { type: "textarea", name: "address", label: "Dirección" },
];

export const studentRightFields: (dojosOptions: any[], roles: any[], isAdmin: boolean) => FormField[] = (dojosOptions: any[], roles: any[], isAdmin: boolean) => [
  {
    type: "select",
    name: "dojoId",
    label: "Dojo",
    placeholder: "Seleccione un dojo",
    options: dojosOptions,
    disabled: !isAdmin,
  },
  {
    type: "select",
    name: "rolId",
    label: "Rol",
    placeholder: "Seleccione un rol",
    options: roles.map(r => ({ label: r.rol, value: r.id })),
  },
  {
    type: "date",
    name: "enrollmentDate",
    label: "Fecha de Inscripción",
  },
  {
    type: "other",
    name: "martialArtRank",
    label: "Artes Marciales y Rangos",
  }
];






