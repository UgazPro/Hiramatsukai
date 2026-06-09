import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { SelectComponentForm } from "./renderFormComponents/SelectComponent";
import { CalendarFieldComponent } from "./renderFormComponents/CalendarFieldComponent";
import { FormField } from "./formComponent.interface";
import { Controller, UseFormReturn } from "react-hook-form";
import ErrorMessage from "./renderFormComponents/ErrorMessage";
import { MultiSelectField } from "./renderFormComponents/MultiSelectField";

const inputClass =
  "border-gray-300 focus:border-[var(--yellowColor)] focus:ring-2 focus:ring-[var(--yellowColor)] focus:ring-opacity-40 transition-all duration-200 rounded-lg";
const labelClass =
  "text-sm font-medium text-[var(--blueColor)]";

interface FormComponentProps {
    fields: FormField[];
    form: UseFormReturn;
    otherType?: React.ReactNode;
    className?: string;
}

export function FormComponent({ fields, form, otherType, className }: FormComponentProps) {

    return (

        <div className={`bg-white shadow-sm border border-gray-200 rounded-xl p-6 space-y-5 ${className ?? ""}`}>

            {fields.map((field) => {

                switch (field.type) {
                    case "number":
                        return (
                            <div key={field.name} className="space-y-1.5 relative">
                                <Label className={labelClass}>{field.label}</Label>
                                <Input
                                    className={inputClass}
                                    type="number"
                                    {...form.register(field.name, { valueAsNumber: true })}
                                />
                                {form.formState.errors[field.name] && (<ErrorMessage>{String(form.formState.errors[field.name]?.message ?? "")}</ErrorMessage>)}
                            </div>
                        );

                    case "text":
                        return (
                            <div key={field.name} className="space-y-1.5 relative">
                                <Label className={labelClass}>{field.label}</Label>
                                <Input
                                    className={inputClass}
                                    type={field.inputType ?? "text"}
                                    {...form.register(field.name)}
                                />
                                {form.formState.errors[field.name] && (<ErrorMessage>{String(form.formState.errors[field.name]?.message ?? "")}</ErrorMessage>)}
                            </div>

                        );

                    case "textarea":
                        return (
                            <div key={field.name} className="space-y-1.5 relative">
                                <Label className={labelClass}>{field.label}</Label>
                                <Textarea
                                  className={inputClass}
                                  {...form.register(field.name)}
                                />
                                {form.formState.errors[field.name] && (<ErrorMessage>{String(form.formState.errors[field.name]?.message ?? "")}</ErrorMessage>)}
                            </div>
                        );

                    case "select":
                        return (
                            <div key={field.name} className="space-y-1.5 relative">

                                <SelectComponentForm
                                    form={form}
                                    name={field.name}
                                    label={field.label}
                                    placeholder={field.placeholder}
                                    options={field.options}
                                    disabled={field.disabled}
                                />
                                {form.formState.errors[field.name] && (<ErrorMessage>{String(form.formState.errors[field.name]?.message ?? "")}</ErrorMessage>)}

                            </div>
                        );

                    case "date":
                        return (
                            <div key={field.name} className="space-y-1.5 relative">
                                <Label className={labelClass}>{field.label}</Label>
                                <Controller
                                    control={form.control}
                                    name={field.name}
                                    render={({ field: controllerField }) => (
                    <CalendarFieldComponent
                        value={controllerField.value}
                        onChange={controllerField.onChange}
                        disabled={field.disabled}
                    />
                                    )}
                                />
                                {form.formState.errors[field.name] && (<ErrorMessage>{String(form.formState.errors[field.name]?.message ?? "")}</ErrorMessage>)}
                            </div>
                        );

                    case "time":
                        return (
                            <div key={field.name} className="space-y-1.5 relative">
                                <Label className={labelClass}>{field.label}</Label>
                                <Input
                                    className={inputClass}
                                    type="time"
                                    {...form.register(field.name)}
                                />
                                {form.formState.errors[field.name] && (<ErrorMessage>{String(form.formState.errors[field.name]?.message ?? "")}</ErrorMessage>)}
                            </div>
                        );

                    case "multiselect":
                        return (
                            <div key={field.name} className="space-y-1.5 relative">
                                <MultiSelectField
                                    form={form}
                                    name={field.name}
                                    label={field.label}
                                    options={field.options}
                                    disabled={field.disabled}
                                    placeholder={field.placeholder!}
                                />
                                {form.formState.errors[field.name] && (
                                    <ErrorMessage>
                                        {String(form.formState.errors[field.name]?.message ?? "")}
                                    </ErrorMessage>
                                )}
                            </div>
                        );


                    case "other":
                        return (
                            <div key={field.name} className="space-y-1.5 relative">
                                {otherType}
                            </div>
                        );

                    default:
                        return null;

                }

            })}

        </div>

    );

}
