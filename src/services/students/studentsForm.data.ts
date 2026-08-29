import { FormField } from "@/components/form/formComponent.interface";
import { IOptions } from "@/components/form/renderFormComponents/SelectComponent";
import { IRoles, userRolesNames } from "./student.interface";

export const studentRoleOrder: userRolesNames[] = [
    "Administrador",
    "Líder Maestro",
    "Comisión de Grado",
    "Líder Instructor",
    "Instructor",
    "Estudiante",
    "Representante",
];

// === PASO 1: Datos Personales ===

export const step1Col1Fields: FormField[] = [
  { type: "text", name: "name", label: "Nombres", sanitize: "letters" },
  { type: "text", name: "lastName", label: "Apellidos", sanitize: "letters" },
  { type: "identification", name: "identification", label: "Cédula" },
  { type: "text", name: "username", label: "Usuario", sanitize: "alphanumeric" },
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
  { type: "phone", name: "phone", label: "Teléfono" },
];

export const step1Col3Fields: FormField[] = [
  { type: "other", name: "profileImg", label: "Foto del Estudiante" },
  { type: "textarea", name: "address", label: "Dirección" },
];

// === PASO 2: Datos del Dojo ===

export const step2Col1Fields: (dojosOptions: IOptions[], roles: IRoles[], isAdmin: boolean) => FormField[] = (dojosOptions, roles, isAdmin) => [
  {
    type: "select",
    name: "dojoId",
    label: "Dojo",
    placeholder: "Seleccione un dojo",
    options: dojosOptions,
    disabled: !isAdmin,
  },
  {
    type: "multiselect",
    name: "rolIds",
    label: "Rol",
    placeholder: "Seleccione uno o más roles",
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
