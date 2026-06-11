import { FormField, FormItem, FormLabel, FormControl } from '@/components/ui/form';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { FieldValues, Path, UseFormReturn } from 'react-hook-form';

export interface IOptions {
    label: string;
    value: string | number;
}

interface FormSelectProps {
    label: string;
    placeholder: string;
    options: IOptions[];
    value: string;
    onChange: (value: string) => void;
    disabled?: boolean;
}
interface FormSelectFormProps<TFieldValues extends FieldValues> {
    form: UseFormReturn<TFieldValues>;
    label: string;
    placeholder: string;
    name: Path<TFieldValues>;
    options: IOptions[];
    disabled?: boolean;
}

const triggerClass =
  "border-gray-300 focus:border-[var(--yellowColor)] focus:ring-2 focus:ring-[var(--yellowColor)] focus:ring-opacity-40 transition-all duration-200 rounded-lg w-full overflow-hidden";
const labelClass =
  "text-sm font-medium text-[var(--blueColor)]";

export function SelectComponentForm<TFieldValues extends FieldValues>({ form, label, placeholder, name, options, disabled }: FormSelectFormProps<TFieldValues>) {

    const isNumberSelect = typeof options?.[0]?.value === 'number';

    return (
        <FormField
            control={form.control}
            name={name}
            render={({ field }) => (
                <FormItem className="w-full">
                    <FormLabel className={labelClass}>{label}</FormLabel>

                    <Select
                        key={String(field.value)}
                        value={field.value !== undefined && field.value !== null ? String(field.value) : ''}
                        onValueChange={(value) => {
                            field.onChange(isNumberSelect ? Number(value) : value);
                        }}
                        disabled={disabled}
                    >
                        <FormControl className="w-full">
                            <SelectTrigger className={triggerClass}>
                                <SelectValue placeholder={placeholder} />
                            </SelectTrigger>
                        </FormControl>

                        <SelectContent className="w-full">
                            {options.map((opt, index) => (
                                <SelectItem
                                    key={index}
                                    value={String(opt.value)}
                                >
                                    {opt.label}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </FormItem>
            )}
        />
    )
}

export function SelectComponent({ label, value, placeholder, options, onChange, disabled }: FormSelectProps) {

    return (
        <div className='space-y-2 w-40'>
            <Label>{label}</Label>
            <Select
                onValueChange={onChange}
                value={value ? value : ''}
                defaultValue={value ? value : ''}
                disabled={disabled}
            >
                <SelectTrigger className='w-full overflow-hidden'>
                    <SelectValue placeholder={placeholder} />
                </SelectTrigger>
                <SelectContent className='w-full'>
                    {options && options.map((opt: IOptions, index: number) => (
                        <SelectItem key={index} value={opt.value.toString()}>{opt.label}</SelectItem>
                    ))}
                </SelectContent>
            </Select>
        </div>
    )
}