import { FormField } from "@/components/form/formComponent.interface";

// === PASO 1: Datos Personales ===

export const step1Col1Fields: FormField[] = [
  { type: "text", name: "username", label: "Nombre de Usuario" },
  { type: "text", name: "name", label: "Nombres" },
  { type: "text", name: "lastName", label: "Apellidos" },
  { type: "text", name: "identification", label: "Cédula" },
];

export const step1Col2Fields: FormField[] = [
  { type: "date", name: "birthday", label: "Fecha de Nacimiento" },
  {
    type: "select",
    name: "sex",
    label: "Sexo",
    placeholder: "Seleccione un sexo",
    options: [
      { label: "Masculino", value: "Masculino" },
      { label: "Femenino", value: "Femenino" },
    ],
  },
  { type: "text", name: "email", label: "Correo Electrónico" },
  { type: "text", name: "phone", label: "Teléfono" },
];

export const step1Col3Fields: FormField[] = [
  { type: "other", name: "profileImg", label: "Foto del Estudiante" },
  { type: "textarea", name: "address", label: "Dirección" },
];

// === PASO 2: Datos del Dojo ===

export const step2Col1Fields: (dojosOptions: any[], roles: any[], isAdmin: boolean) => FormField[] = (dojosOptions, roles, isAdmin) => [
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
];

export const step2Col2Fields: FormField[] = [
  {
    type: "date",
    name: "enrollmentDate",
    label: "Fecha de Inscripción",
  },
];

export const step2Col3Fields: FormField[] = [
  {
    type: "other",
    name: "martialArtRank",
    label: "Artes Marciales y Rangos",
  },
];
