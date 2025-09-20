/* eslint-disable @typescript-eslint/no-explicit-any */
import { FormField, FormItem, FormLabel, FormControl } from '@/components/ui/form';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '../ui/label';
import { useEffect } from 'react';

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
}
interface FormSelectFormProps {
    form: any;
    label: string;
    placeholder: string;
    name: string;
    options: IOptions[];
}

export function SelectComponentForm({ form, label, placeholder, name, options }: FormSelectFormProps) {
    return (
        <FormField
            control={form.control}
            name={name}
            render={({ field }) => (
                <FormItem className='w-full'>
                    <FormLabel>{label}</FormLabel>
                    <Select
                        onValueChange={value => field.onChange(value)}
                        value={field.value ? field.value.toString() : ''}
                        defaultValue={field.value ? field.value.toString() : ''}
                    >
                        <FormControl className='w-full'>
                            <SelectTrigger className='w-full overflow-hidden'>
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

export function SelectComponent({ label, value, placeholder, options, onChange }: FormSelectProps) {
useEffect(() => {
    console.log(value);
},[value])
    
    return (
        <div className='space-y-2 w-40'>
            <Label>{label}</Label>
            <Select
                onValueChange={onChange}
                value={value ? value : ''}
                defaultValue={value ? value : ''}
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