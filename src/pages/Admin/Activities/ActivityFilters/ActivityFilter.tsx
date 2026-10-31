import { Button } from "@/components/ui/button";
import { Calendar as CalendarIcon, Filter, X } from "lucide-react";
import { format } from "date-fns";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import { useState } from "react";
import { DateRange } from "node_modules/react-day-picker/dist/esm/types/shared";
import { useActivitiesStore } from "@/stores/activities.store";

export default function ActivityFilter() {

    const { filters, setFilters, resetFilters } = useActivitiesStore();

    const [isFilterOpen, setIsFilterOpen] = useState(false);

    const [localIncludePast, setLocalIncludePast] = useState(filters.includePast);
    const [localActivityType, setLocalActivityType] = useState(filters.type);

    const [date, setDate] = useState<DateRange | undefined>({
        from: filters.startDate ?? undefined,
        to: filters.endDate ?? undefined,
    });

    const activeFiltersCount = () => {
        let count = 0;
        if (filters.type) count++;
        if (filters.includePast) count++;
        if (filters.startDate) count++;
        if (filters.endDate) count++;
        return count;
    };

    const handleApplyFilters = () => {
        setFilters({
            type: localActivityType,
            includePast: localIncludePast,
            startDate: date?.from ?? null,
            endDate: date?.to ?? null,
        });

        setIsFilterOpen(false);
    };

    const handleResetFilters = () => {
        resetFilters();
        setLocalActivityType("");
        setLocalIncludePast(false);
        setDate(undefined);
    };

    return (
        <Popover open={isFilterOpen} onOpenChange={setIsFilterOpen}>
            <PopoverTrigger asChild>
                <Button
                    variant="outline"
                    className="relative h-11 border-border text-foreground hover:bg-muted sm:h-10"
                >
                    <Filter data-icon="inline-start" />
                    Filtros
                    {activeFiltersCount() > 0 && (
                        <Badge className="absolute -top-2 -right-2 flex h-5 w-5 items-center justify-center bg-brand-gold p-0 text-xs text-brand-sumi">
                            {activeFiltersCount()}
                        </Badge>
                    )}
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-[calc(100vw-2rem)] border-border p-0 shadow-xl sm:w-78" align="end">
                <div className="border-b border-border bg-linear-to-r from-brand-gold/10 to-brand-vermilion/10 p-4">
                    <div className="flex items-center justify-between gap-2">
                        <h3 className="flex items-center gap-2 font-semibold text-heading">
                            <Filter className="h-4 w-4 text-brand-gold-deep" />
                            Filtrar Actividades
                        </h3>
                        <Button
                            variant="ghost"
                            onClick={() => setIsFilterOpen(false)}
                            aria-label="Cerrar filtros"
                            className="size-9 p-0 hover:bg-muted"
                        >
                            <X className="h-4 w-4" />
                        </Button>
                    </div>
                </div>

                <div className="flex max-h-[70vh] flex-col gap-4 overflow-y-auto p-4">

                    {/* Date Range */}
                    <div className="flex flex-col gap-2">
                        <Label className="text-sm font-medium text-foreground">Rango de Fechas</Label>
                        <Popover>
                            <PopoverTrigger asChild>
                                <Button
                                    variant="outline"
                                    id="date-picker-range"
                                    className="h-auto min-h-11 w-full justify-start px-2.5 text-left font-normal whitespace-normal"
                                >
                                    <CalendarIcon className="shrink-0" />
                                    {date?.from ? (
                                        date.to ? (
                                            <>
                                                {format(date.from, "dd/MM/yy")} -
                                                {format(date.to, "dd/MM/yy")}
                                            </>
                                        ) : (
                                            format(date.from, "dd/MM/yy")
                                        )
                                    ) : (
                                        <span>Seleccione una Fecha</span>
                                    )}
                                </Button>
                            </PopoverTrigger>
                            <PopoverContent className="w-auto max-w-[calc(100vw-2rem)] overflow-x-auto p-0" align="start">
                                <Calendar
                                    mode="range"
                                    defaultMonth={date?.from}
                                    selected={date}
                                    onSelect={setDate}
                                />
                            </PopoverContent>
                        </Popover>
                    </div>

                    {/* Include past activities */}
                    <div className="flex items-center gap-2 pt-2">
                        <Checkbox
                            id="includePast"
                            checked={localIncludePast}
                            onCheckedChange={(checked) => setLocalIncludePast(checked as boolean)}
                        />
                        <Label htmlFor="includePast" className="cursor-pointer text-sm text-foreground">
                            Incluir actividades pasadas
                        </Label>
                    </div>

                    {/* Type of activity */}
                    <div className="flex flex-col gap-2">
                        <Label className="text-sm font-medium text-foreground">
                            Tipo de actividad
                        </Label>
                        <Select
                            value={localActivityType}
                            onValueChange={(value) => setLocalActivityType(value)}
                        >
                            <SelectTrigger className="w-full">
                                <SelectValue placeholder="Seleccione un Tipo de Actividad" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectGroup>
                                    <SelectItem value="Examen">Examen</SelectItem>
                                    <SelectItem value="Interna">Interna</SelectItem>
                                    <SelectItem value="Organizacional">Organizacional</SelectItem>
                                </SelectGroup>
                            </SelectContent>
                        </Select>
                    </div>
                </div>

                <div className="flex flex-col gap-2 border-t border-border bg-muted/40 p-4 sm:flex-row sm:justify-center">
                    <Button
                        variant="outline"
                        onClick={handleResetFilters}
                        className="h-11 w-full border-border text-foreground hover:bg-muted sm:h-9 sm:w-auto"
                    >
                        Limpiar filtros
                    </Button>

                    <Button
                        onClick={handleApplyFilters}
                        className="h-11 w-full bg-linear-to-r from-brand-gold to-brand-vermilion text-white hover:from-brand-gold-deep hover:to-brand-vermilion-dark sm:h-9 sm:w-auto"
                    >
                        Aplicar filtros
                    </Button>
                </div>
            </PopoverContent>
        </Popover>
    );

}
