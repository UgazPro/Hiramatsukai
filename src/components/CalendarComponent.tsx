import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar } from "./ui/calendar";
import { Button } from "./ui/button";
import { ChevronDownIcon } from "lucide-react";
import { format } from "date-fns";
import { es } from "date-fns/locale";

interface CalendarComponentProps {
    value?: Date;
    onChange: (date: Date | undefined) => void;
    placeholder?: string;
}

export function CalendarComponent({value, onChange, placeholder = "Selecciona una fecha", }: CalendarComponentProps) {

    return (
        <Popover>
            <PopoverTrigger asChild>
                <Button
                    type="button"
                    variant="outline"
                    data-empty={!value}
                    className="w-full justify-between text-left font-normal data-[empty=true]:text-muted-foreground"
                >
                    {value
                        ? format(value, "PPP", { locale: es })
                        : <span>{placeholder}</span>
                    }
                    <ChevronDownIcon className="ml-2 h-4 w-4" />
                </Button>
            </PopoverTrigger>

            <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                    locale={es}
                    mode="single"
                    selected={value}
                    onSelect={onChange}
                    defaultMonth={value}
                    captionLayout="dropdown"
                />
            </PopoverContent>
        </Popover>
    );
}
