import { IOptions } from "./renderFormComponents/SelectComponent";

export type FieldType = "text" | "textarea" | "select" | "date" | "time" | "multiselect" | "number" | "other";

export interface BaseField {
  name: string;
  label: string;
  type: FieldType;
  className?: string;
}

export interface TextField extends BaseField {
  type: "text";
  inputType?: string;
}

export interface TextareaField extends BaseField {
  type: "textarea";
}

export interface SelectField extends BaseField {
  type: "select";
  placeholder: string;
  options: IOptions[];
  disabled?: boolean;
}

export interface DateField extends BaseField {
  type: "date";
  disabled?: boolean;
}

export interface TimeField extends BaseField {
  type: "time";
}

export interface OtherField extends BaseField {
    type: "other";
}

export interface NumberField extends BaseField {
  type: "number";
}

export interface MultiSelectField {
  name: string;
  label: string;
  type: "multiselect";
  placeholder?: string;
  options?: IOptions[];
  disabled?: boolean;
  inputType?: string;
}


export type FormField = TextField | TextareaField | SelectField | DateField | TimeField | OtherField | MultiSelectField | NumberField;