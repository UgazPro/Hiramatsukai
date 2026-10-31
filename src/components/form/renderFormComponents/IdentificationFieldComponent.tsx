import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import {
    IDENTIFICATION_TYPES,
    formatNumberWithDots,
    IdentificationType,
    sanitizeDigits,
} from '@/helpers/formatter';

interface IdentificationFieldComponentProps {
    value: string;
    typeValue: IdentificationType;
    onValueChange: (value: string) => void;
    onTypeChange: (type: IdentificationType) => void;
    disabled?: boolean;
    className?: string;
    id?: string;
}

const selectClass = "h-11 w-full overflow-hidden rounded-lg border-input transition-all duration-200 focus:border-ring focus:ring-2 focus:ring-ring/40 sm:h-9";
const inputClass = "h-11 rounded-lg border-input transition-all duration-200 focus:border-ring focus:ring-2 focus:ring-ring/40 sm:h-9";

export function IdentificationFieldComponent({
    value,
    typeValue,
    onValueChange,
    onTypeChange,
    disabled,
    className,
    id,
}: IdentificationFieldComponentProps) {
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const digits = sanitizeDigits(e.target.value);
        onValueChange(digits);
    };

    return (
        <div className={`flex gap-2 ${className ?? ""}`}>
            <Select
                value={typeValue}
                onValueChange={(v) => onTypeChange(v as IdentificationType)}
                disabled={disabled}
            >
                <SelectTrigger className={`${selectClass} w-24 shrink-0`}>
                    <SelectValue placeholder="Tipo" />
                </SelectTrigger>
                <SelectContent>
                    {IDENTIFICATION_TYPES.map((type) => (
                        <SelectItem key={type} value={type}>
                            {type}
                        </SelectItem>
                    ))}
                </SelectContent>
            </Select>

            <Input
                id={id}
                type="text"
                inputMode="numeric"
                className={inputClass}
                value={formatNumberWithDots(value)}
                onChange={handleInputChange}
                disabled={disabled}
                placeholder="123.456.789"
            />
        </div>
    );
}