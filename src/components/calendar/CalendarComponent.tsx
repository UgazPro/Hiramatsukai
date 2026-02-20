import { addMonths, format, isSameDay, parseISO, subMonths } from "date-fns";
import { Card, CardContent } from "../ui/card";
import { es } from "date-fns/locale";
import { Button } from "../ui/button";
import { ChevronDown } from "lucide-react";
import { IActivity } from "@/services/activities/activity.interface";

interface CalendarComponentProps {
    styles?: string;
    currentDate: Date;
    setCurrentDate: (date: Date) => void;
    activities?: any;
    cSelectedActivity?: IActivity | null;
    setCSelectedActivity?: (activity: IActivity) => void;
    GoToTodayButton?: boolean;
}

export default function CalendarComponent({ styles, currentDate, setCurrentDate, activities, cSelectedActivity, setCSelectedActivity, GoToTodayButton }: CalendarComponentProps) {

    const nextMonth = () => setCurrentDate(addMonths(currentDate, 1));
    const prevMonth = () => setCurrentDate(subMonths(currentDate, 1));
    const goToToday = () => {
        setCurrentDate(new Date());
        setCSelectedActivity!(null!);
    }
    const getActivitiesForDay = (date: Date) => {
        return activities.filter((activity: { date: { toString: () => string; }; }) =>
            isSameDay(parseISO(activity.date.toString()), date)
        );
    };

    // Generar días del mes para el calendario
    const getDaysInMonth = (date: Date) => {
        const year = date.getFullYear();
        const month = date.getMonth();
        const firstDay = new Date(year, month, 1);
        const lastDay = new Date(year, month + 1, 0);
        const days = [];

        // Days of the past month
        const firstDayOfWeek = (firstDay.getDay() + 6) % 7;
        const lastDayPrevMonth = new Date(year, month, 0).getDate();
        for (let i = firstDayOfWeek - 1; i >= 0; i--) {
            days.push({
                date: new Date(year, month - 1, lastDayPrevMonth - i),
                isCurrentMonth: false,
                activities: []
            });
        }

        // Days of the current month
        for (let day = 1; day <= lastDay.getDate(); day++) {
            const currentDate = new Date(year, month, day);
            days.push({
                date: currentDate,
                isCurrentMonth: true,
                activities: getActivitiesForDay(currentDate)
            });
        }

        // Days of the next month
        const totalCells = 42; // 6 semanas * 7 días
        const remainingCells = totalCells - days.length;
        for (let i = 1; i <= remainingCells; i++) {
            days.push({
                date: new Date(year, month + 1, i),
                isCurrentMonth: false,
                activities: []
            });
        }

        return days;
    };

    const dayNames = ['Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb', 'Dom'];

    return (

        <div className={styles ? styles : 'w-80'}>
            <Card className="border border-gray-300 shadow-sm sticky">
                <CardContent>
                    {/* Header */}
                    <div className="flex justify-between items-center mb-4">

                        <div>
                            <h3 className="text-lg font-bold text-gray-900 capitalize whitespace-nowrap">
                                {format(currentDate, 'MMMM yyyy', { locale: es })}
                            </h3>
                        </div>

                        <div className="flex gap-2">
                            <Button variant="ghost" size="sm" onClick={prevMonth}>
                                <ChevronDown className="h-4 w-4 rotate-90" />
                            </Button>
                            <Button variant="ghost" size="sm" onClick={nextMonth}>
                                <ChevronDown className="h-4 w-4 -rotate-90" />
                            </Button>
                        </div>
                    </div>

                    {/* Go to Today Button */}
                    {GoToTodayButton &&
                        <div className="mb-4">
                            <Button
                                variant="outline"
                                size="sm"
                                onClick={goToToday}
                                className="w-full border-gray-300 text-gray-700 hover:bg-gray-50"
                            >
                                Ir a hoy
                            </Button>
                        </div>
                    }

                    {/* Days of the week */}
                    <div className="grid grid-cols-7 gap-1 mb-2">
                        {dayNames.map((day) => (
                            <div key={day} className="text-center">
                                <span className="text-sm font-medium text-gray-600 uppercase">{day.slice(0, 2)}</span>
                            </div>
                        ))}
                    </div>

                    {/* Days of the month */}
                    <div className="grid grid-cols-7 gap-1">
                        {getDaysInMonth(currentDate).map((day, index) => {
                            const isToday = isSameDay(day.date, new Date());
                            const hasActivities = day.activities.length > 0;
                            const isSelectedActivityDay = cSelectedActivity &&
                                isSameDay(day.date, parseISO(cSelectedActivity.date.toString()));

                            return (
                                <div
                                    key={index}
                                    className={`
                          h-12 p-1 rounded-lg transition-all duration-200 hover:cursor-pointer
                          ${!day.isCurrentMonth ? 'text-gray-400' : 'text-gray-900'}
                          ${isToday ? 'border-amber-500 bg-amber-50' : 'border-gray-200'}
                          ${hasActivities ? 'bg-blue-50 hover:bg-blue-100 cursor-pointer' : 'hover:bg-gray-50'}
                          ${isSelectedActivityDay ? 'ring-2 ring-amber-500 bg-amber-100' : ''}
                          flex flex-col items-center justify-start
                        `}
                                >
                                    <div className="text-sm font-medium">{format(day.date, 'd')}</div>
                                    {hasActivities && (
                                        <div className="flex flex-wrap gap-0.5 mt-1 justify-center">
                                            {day.activities.slice(0, 2).map((act: any, idx: number) => (
                                                <div
                                                    key={idx}
                                                    className={`h-1.5 w-1.5 rounded-full ${act.type === 'examen' ? 'bg-red-500' :
                                                        act.type === 'torneo' ? 'bg-blue-500' :
                                                            act.type === 'seminario' ? 'bg-purple-500' :
                                                                act.type === 'clase_especial' ? 'bg-amber-500' : 'bg-green-500'
                                                        }`}
                                                    title={act.name}
                                                />
                                            ))}
                                            {day.activities.length > 2 && (
                                                <div className="text-xs text-gray-500">+{day.activities.length - 2}</div>
                                            )}
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
