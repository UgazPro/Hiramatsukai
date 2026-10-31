import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { COUNTRY_PHONE_CODES, formatPhoneByCountry, sanitizeDigits } from '@/helpers/formatter';

interface PhoneFieldComponentProps {
    value: string;
    countryCode: string;
    onValueChange: (value: string) => void;
    onCountryChange: (countryCode: string) => void;
    disabled?: boolean;
    className?: string;
    id?: string;
}

const selectClass = "h-11 w-full overflow-hidden rounded-lg border-input transition-all duration-200 focus:border-ring focus:ring-2 focus:ring-ring/40 sm:h-9";
const inputClass = "h-11 rounded-lg border-input transition-all duration-200 focus:border-ring focus:ring-2 focus:ring-ring/40 sm:h-9";

export function PhoneFieldComponent({
    value,
    countryCode,
    onValueChange,
    onCountryChange,
    disabled,
    className,
    id,
}: PhoneFieldComponentProps) {
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const digits = sanitizeDigits(e.target.value);
        onValueChange(digits);
    };

    return (
        <div className={`flex gap-2 ${className ?? ""}`}>
            <Select
                value={countryCode}
                onValueChange={onCountryChange}
                disabled={disabled}
            >
                <SelectTrigger className={`${selectClass} w-20 shrink-0`}>
                    <SelectValue placeholder="País" />
                </SelectTrigger>
                <SelectContent>
                    {COUNTRY_PHONE_CODES.map((country) => (
                        <SelectItem key={country.code} value={country.code}>
                            {country.label}
                        </SelectItem>
                    ))}
                </SelectContent>
            </Select>

            <Input
                id={id}
                type="text"
                inputMode="numeric"
                className={inputClass}
                value={formatPhoneByCountry(countryCode, value)}
                onChange={handleInputChange}
                disabled={disabled}
                placeholder={(countryCode === "+56" ? "9 1234 5678" : "(414) 123-4567")}
            />
        </div>
    );
}