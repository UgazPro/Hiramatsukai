import { useMemo } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ChevronDown } from "lucide-react";
import { format, addMonths, subMonths, isSameDay, isSameMonth, parseISO, } from "date-fns";
import { es } from "date-fns/locale";

export interface CalendarEvent {
    id: number;
    date: string;
    title: string;
    category?: string;
}

interface BigCalendarComponentProps<T extends CalendarEvent> {
    events: T[];
    selectedDate: Date;
    onDateChange: (date: Date) => void;
    onEventSelect?: (event: T) => void;
    selectedEvent?: T | null;
    width?: string;
}

export default function BigCalendarComponent<T extends CalendarEvent>({ events, selectedDate, onDateChange, onEventSelect, selectedEvent, width = "w-80", }: BigCalendarComponentProps<T>) {

    // 📌 Obtener eventos por día
    const getEventsForDay = (date: Date) => {
        return events.filter((e) => isSameDay(parseISO(e.date), date));
    };

    // 📌 Generar días del mes
    const days = useMemo(() => {
        const year = selectedDate.getFullYear();
        const month = selectedDate.getMonth();
        const firstDay = new Date(year, month, 1);
        const lastDay = new Date(year, month + 1, 0);

        const daysArray: {
            date: Date;
            isCurrentMonth: boolean;
            events: T[];
        }[] = [];

        const firstDayOfWeek = (firstDay.getDay() + 6) % 7;
        const prevMonthLastDay = new Date(year, month, 0).getDate();

        for (let i = firstDayOfWeek - 1; i >= 0; i--) {
            daysArray.push({
                date: new Date(year, month - 1, prevMonthLastDay - i),
                isCurrentMonth: false,
                events: [],
            });
        }

        for (let day = 1; day <= lastDay.getDate(); day++) {
            const d = new Date(year, month, day);
            daysArray.push({
                date: d,
                isCurrentMonth: true,
                events: getEventsForDay(d),
            });
        }

        while (daysArray.length < 42) {
            daysArray.push({
                date: new Date(year, month + 1, daysArray.length - lastDay.getDate()),
                isCurrentMonth: false,
                events: [],
            });
        }

        return daysArray;
    }, [selectedDate, events]);

    const nextMonth = () => onDateChange(addMonths(selectedDate, 1));
    const prevMonth = () => onDateChange(subMonths(selectedDate, 1));
    const goToday = () => onDateChange(new Date());

    const dayNames = ["L", "M", "X", "J", "V", "S", "D"];

    return (
        <div className={`${width} transition-all duration-300`}>
            <Card className="border border-gray-300 shadow-sm">
                <CardContent>

                    {/* Header */}
                    <div className="flex justify-between items-center mb-4">
                        <h3 className="font-bold capitalize">
                            {format(selectedDate, "MMMM yyyy", { locale: es })}
                        </h3>

                        <div className="flex gap-2">
                            <Button size="sm" variant="ghost" onClick={prevMonth}>
                                <ChevronDown className="rotate-90 h-4 w-4" />
                            </Button>
                            <Button size="sm" variant="ghost" onClick={nextMonth}>
                                <ChevronDown className="-rotate-90 h-4 w-4" />
                            </Button>
                        </div>
                    </div>

                    <Button size="sm" variant="outline" onClick={goToday} className="w-full mb-3">
                        Hoy
                    </Button>

                    {/* Días */}
                    <div className="grid grid-cols-7 gap-1 text-center text-xs mb-2">
                        {dayNames.map((d) => (
                            <div key={d}>{d}</div>
                        ))}
                    </div>

                    <div className="grid grid-cols-7 gap-1">
                        {days.map((day, i) => {
                            const isToday = isSameDay(day.date, new Date());
                            const isSelected =
                                selectedEvent &&
                                isSameDay(day.date, parseISO(selectedEvent.date));

                            return (
                                <div
                                    key={i}
                                    className={`
                    h-12 p-1 rounded-lg text-sm cursor-pointer
                    ${!day.isCurrentMonth ? "text-gray-400" : ""}
                    ${isToday ? "bg-amber-50 border-amber-500" : ""}
                    ${isSelected ? "ring-2 ring-amber-500 bg-amber-100" : ""}
                    ${day.events.length ? "bg-blue-50" : "hover:bg-gray-50"}
                  `}
                                    onClick={() => {
                                        if (day.events.length && onEventSelect) {
                                            onEventSelect(day.events[0]);
                                        }
                                    }}
                                >
                                    <div>{format(day.date, "d")}</div>

                                    {day.events.length > 0 && (
                                        <div className="flex gap-1 mt-1 justify-center">
                                            {day.events.slice(0, 2).map((_, idx) => (
                                                <div key={idx} className="h-1.5 w-1.5 bg-blue-500 rounded-full" />
                                            ))}
                                        </div>
                                    )}
                                </div>
                            );
                        })}
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
