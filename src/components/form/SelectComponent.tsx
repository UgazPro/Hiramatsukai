/* eslint-disable @typescript-eslint/no-explicit-any */
import { FormField, FormItem, FormLabel, FormControl } from '@/components/ui/form';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

export interface IOptions {
    label: string;
    value: string | number;
}

interface FormSelectProps {
    form: any;
    label: string;
    placeholder: string;
    name: string;
    options: IOptions[];
}

export function SelectComponent ({ form, label, placeholder, name, options }: FormSelectProps) {
    return (
        <FormField
            control={form.control}
            name={name}
            render={({ field }) => (
                <FormItem className='w-full'>
                    <FormLabel>{label}</FormLabel>
                    <Select onValueChange={field.onChange} value={field.value.toString()} defaultValue={field.value.toString()}>
                        <FormControl className='w-full'>
                            <SelectTrigger>
                                <SelectValue placeholder={placeholder} />
                            </SelectTrigger>
                        </FormControl>
                        <SelectContent className='w-full'>
                            {options && options.map((opt: IOptions, index: number) => (
                                <SelectItem key={index} value={opt.value.toString()}>{opt.label}</SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </FormItem>
            )}
        />
    )
}