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
                    size="sm"
                    className="border-gray-300 text-gray-700 hover:bg-gray-50 relative"
                >
                    <Filter className="h-4 w-4 mr-2" />
                    Filtros
                    {activeFiltersCount() > 0 && (
                        <Badge className="absolute -top-2 -right-2 h-5 w-5 p-0 flex items-center justify-center bg-amber-500 text-white text-xs">
                            {activeFiltersCount()}
                        </Badge>
                    )}
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-78 p-0 border-gray-300 shadow-xl" align="end">
                <div className="p-4 border-b border-gray-200 bg-linear-to-r from-amber-50 to-red-50">
                    <div className="flex justify-between items-center">
                        <h3 className="font-semibold text-gray-900 flex items-center gap-2">
                            <Filter className="h-4 w-4 text-amber-600" />
                            Filtrar Actividades
                        </h3>
                        <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => setIsFilterOpen(false)}
                            className="h-6 w-6 p-0 hover:bg-gray-200"
                        >
                            <X className="h-4 w-4" />
                        </Button>
                    </div>
                </div>

                <div className="p-4 space-y-4 max-h-[70vh] overflow-y-auto">

                    {/* Date Range */}
                    <div className="space-y-2">
                        <Label className="text-sm font-medium text-gray-900">Rango de Fechas</Label>
                        <Popover>
                            <PopoverTrigger asChild>
                                <Button
                                    variant="outline"
                                    id="date-picker-range"
                                    className="justify-start px-2.5 font-normal"
                                >
                                    <CalendarIcon />
                                    {date?.from ? (
                                        date.to ? (
                                            <>
                                                {format(date.from, "LLL dd, y")} -{" "}
                                                {format(date.to, "LLL dd, y")}
                                            </>
                                        ) : (
                                            format(date.from, "LLL dd, y")
                                        )
                                    ) : (
                                        <span>Seleccione una Fecha</span>
                                    )}
                                </Button>
                            </PopoverTrigger>
                            <PopoverContent className="w-auto p-0" align="start">
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
                    <div className="flex items-center space-x-2 pt-2">
                        <Checkbox
                            id="includePast"
                            checked={localIncludePast}
                            onCheckedChange={(checked) => setLocalIncludePast(checked as boolean)}
                        />
                        <Label htmlFor="includePast" className="text-sm text-gray-700 cursor-pointer">
                            Incluir actividades pasadas
                        </Label>
                    </div>

                    {/* Type of activity */}
                    <div className="space-y-2">
                        <Label className="text-sm font-medium text-gray-900">
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

                <div className="p-4 border-t border-gray-200 bg-gray-50 space-y-3 text-center">
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={handleResetFilters}
                        className="border-gray-300 text-gray-700 hover:bg-gray-100"
                    >
                        Limpiar filtros
                    </Button>

                    <Button
                        size="sm"
                        onClick={handleApplyFilters}
                        className="bg-linear-to-r from-amber-600 to-red-600 hover:from-amber-500 hover:to-red-500 text-white"
                    >
                        Aplicar filtros
                    </Button>
                </div>
            </PopoverContent>
        </Popover>
    );

}
