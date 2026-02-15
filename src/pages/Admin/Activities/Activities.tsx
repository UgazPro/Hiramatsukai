import { useState, useEffect, JSX } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow, } from "@/components/ui/table";
import { Calendar as CalendarIcon, Clock, MapPin, Users, Award, Trophy, Target, BookOpen, Shield, Filter, ChevronDown, School, Globe, Star, CheckCircle, XCircle, PlusCircle } from "lucide-react";
import { format, addMonths, subMonths, isSameMonth, isSameDay, parseISO } from "date-fns";
import { es } from "date-fns/locale";
import { getActivitiesColumns } from "@/services/activities/activities.tables";
import { TableComponent } from "@/components/table/TableComponent";

export interface Actividad {
  id: number;
  title: string;
  type: "dojo" | "organizacion";
  date: string;
  time: string;
  place: string;
  description: string;
  category: string;
  expectedStudents: number;
  requiredLevel: string;
  cost?: number;
  openInscription: boolean;
  dojo: string;
  organization: string;
}

export default function Activities() {

  const [actividades, setActividades] = useState<Actividad[]>([
    {
      id: 1,
      title: "Examen de Grado - Cinturón Amarillo",
      type: 'dojo',
      date: "2024-11-15",
      time: "14:00",
      place: "Dojo Central - Sala Principal",
      description: "Examen oficial para ascenso a cinturón amarillo",
      category: 'examen',
      expectedStudents: 25,
      requiredLevel: "Blanco - 3 meses mínimo",
      cost: 15000,
      openInscription: true,
      dojo: "Dojo Central",
      organization: "Karate Kenzen Ryu"
    },
    {
      id: 2,
      title: "Torneo Inter-Dojos Regional",
      type: 'organizacion',
      date: "2024-11-22",
      time: "09:00",
      place: "Coliseo Municipal",
      description: "Torneo regional con participación de todos los dojos afiliados",
      category: 'torneo',
      expectedStudents: 120,
      requiredLevel: "Amarillo en adelante",
      cost: 25000,
      openInscription: true,
      dojo: "Todos",
      organization: "Karate Kenzen Ryu"
    },
    {
      id: 3,
      title: "Seminario de Katas Avanzadas",
      type: 'organizacion',
      date: "2024-12-05",
      time: "10:00",
      place: "Dojo Norte",
      description: "Taller intensivo de katas para niveles avanzados",
      category: 'seminario',
      expectedStudents: 40,
      requiredLevel: "Verde en adelante",
      cost: 30000,
      openInscription: true,
      dojo: "Dojo Norte",
      organization: "Karate Kenzen Ryu"
    },
    {
      id: 4,
      title: "Clase Especial de Defensa Personal",
      type: 'dojo',
      date: "2024-11-18",
      time: "18:30",
      place: "Dojo Central - Sala 2",
      description: "Clase especial abierta a todos los niveles",
      category: 'clase_especial',
      expectedStudents: 30,
      requiredLevel: "Todos los niveles",
      cost: 5000,
      openInscription: true,
      dojo: "Dojo Central",
      organization: "Karate Kenzen Ryu"
    },
    {
      id: 5,
      title: "Cena de Fin de Año",
      type: 'organizacion',
      date: "2024-12-20",
      time: "20:00",
      place: "Restaurante Sakura",
      description: "Evento social de fin de año para toda la comunidad",
      category: 'evento_social',
      expectedStudents: 80,
      requiredLevel: "Todos",
      cost: 35000,
      openInscription: true,
      dojo: "Todos los dojos",
      organization: "Karate Kenzen Ryu"
    },
    {
      id: 6,
      title: "Examen de Cinturón Negro",
      type: 'organizacion',
      date: "2024-12-10",
      time: "08:00",
      place: "Dojo Central",
      description: "Examen oficial para cinturón negro - Nivel Shodan",
      category: 'examen',
      expectedStudents: 15,
      requiredLevel: "Marrón - 1 año mínimo",
      cost: 80000,
      openInscription: false,
      dojo: "Dojo Central",
      organization: "Karate Kenzen Ryu"
    },
  ]);

  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedActivity, setSelectedActivity] = useState<Actividad | null>(actividades[0]);
  const [filterType, setFilterType] = useState<'todos' | 'dojo' | 'organizacion'>('todos');
  const [showCalendar, setShowCalendar] = useState(true);

  const columns = getActivitiesColumns({
    onSelect: (activity) => {
      setSelectedActivity(activity);
      setCurrentDate(parseISO(activity.date));
    },
  });


  // Filtrar actividades
  const filteredActivities = actividades.filter(actividad => {
    if (filterType === 'todos') return true;
    return actividad.type === filterType;
  });

  // Navegación del calendario
  const nextMonth = () => setCurrentDate(addMonths(currentDate, 1));
  const prevMonth = () => setCurrentDate(subMonths(currentDate, 1));
  const goToToday = () => setCurrentDate(new Date());

  // Obtener actividades del mes actual
  const getActivitiesForMonth = (date: Date) => {
    return actividades.filter(actividad =>
      isSameMonth(parseISO(actividad.date), date)
    );
  };

  // Obtener actividades del día seleccionado
  const getActivitiesForDay = (date: Date) => {
    return actividades.filter(actividad =>
      isSameDay(parseISO(actividad.date), date)
    );
  };

  // Formatear fecha
  const formatFecha = (fecha: string) => {
    return format(parseISO(fecha), "dd 'de' MMMM 'de' yyyy", { locale: es });
  };

  // Obtener color según categoría
  const getCategoryColor = (categoria: string) => {
    const colors: Record<string, string> = {
      'examen': 'bg-red-100 text-red-800 border-red-200',
      'torneo': 'bg-blue-100 text-blue-800 border-blue-200',
      'seminario': 'bg-purple-100 text-purple-800 border-purple-200',
      'clase_especial': 'bg-amber-100 text-amber-800 border-amber-200',
      'evento_social': 'bg-green-100 text-green-800 border-green-200',
    };
    return colors[categoria] || 'bg-gray-100 text-gray-800 border-gray-200';
  };

  // Obtener icono según categoría
  const getCategoryIcon = (categoria: string) => {
    const icons: Record<string, JSX.Element> = {
      'examen': <Award className="h-4 w-4" />,
      'torneo': <Trophy className="h-4 w-4" />,
      'seminario': <BookOpen className="h-4 w-4" />,
      'clase_especial': <Target className="h-4 w-4" />,
      'evento_social': <Users className="h-4 w-4" />,
    };
    return icons[categoria] || <Star className="h-4 w-4" />;
  };

  // Generar días del mes para el calendario
  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const days = [];

    // Días del mes anterior
    const firstDayOfWeek = (firstDay.getDay() + 6) % 7;
    const lastDayPrevMonth = new Date(year, month, 0).getDate();
    for (let i = firstDayOfWeek - 1; i >= 0; i--) {
      days.push({
        date: new Date(year, month - 1, lastDayPrevMonth - i),
        isCurrentMonth: false,
        activities: []
      });
    }

    // Días del mes actual
    for (let day = 1; day <= lastDay.getDate(); day++) {
      const currentDate = new Date(year, month, day);
      days.push({
        date: currentDate,
        isCurrentMonth: true,
        activities: getActivitiesForDay(currentDate)
      });
    }

    // Días del próximo mes
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

  // Nombres de los días
  const dayNames = ['Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb', 'Dom'];

  return (
    <div className="mx-auto p-4 md:p-6">
      {/* Header */}
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6 mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Actividades</h1>
          <p className="text-gray-600 mt-2">
            Calendario de actividades del dojo y la organización
          </p>
        </div>

        <div className="flex flex-wrap gap-3">
          {/* Filtros */}
          <div className="flex items-center border border-gray-300 rounded-lg overflow-hidden bg-white">
            <Button
              variant={filterType === 'todos' ? 'secondary' : 'ghost'}
              size="sm"
              onClick={() => setFilterType('todos')}
              className={`rounded-none border-r border-gray-300 ${filterType === 'todos'
                ? 'bg-amber-500 text-white hover:bg-amber-600'
                : 'text-gray-700 hover:bg-gray-100'
                }`}
            >
              <PlusCircle /> Nueva Actividad
            </Button>
          </div>

          {/* Toggle calendario */}
          <Button
            variant="outline"
            size="sm"
            onClick={() => setShowCalendar(!showCalendar)}
            className="border-gray-300 text-gray-700 hover:bg-gray-50"
          >
            <CalendarIcon className="h-4 w-4 mr-2" />
            {showCalendar ? 'Ocultar Calendario' : 'Mostrar Calendario'}
          </Button>
        </div>
      </div>

      {/* Contenido principal */}
      <div className="flex items-start justify-between gap-8">
        {/* Tabla de actividades - 2/3 del ancho */}
        <div className={'flex-1'}>
          <Card className="border border-gray-300 shadow-sm">
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Actividad</TableHead>
                      <TableHead>Tipo</TableHead>
                      <TableHead>Instructor</TableHead>
                      <TableHead>Dojo</TableHead>
                      <TableHead>Fecha/Hora</TableHead>
                      <TableHead className="text-right">Acciones</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredActivities.map((actividad) => (
                      <TableRow
                        key={actividad.id}
                        className={`border-b border-gray-200 hover:bg-gray-50/80 cursor-pointer transition-colors ${selectedActivity?.id === actividad.id ? 'bg-amber-50' : ''
                          }`}
                        onClick={() => {
                          setSelectedActivity(actividad);
                          // Ir al mes de la actividad
                          setCurrentDate(parseISO(actividad.date));
                        }}
                      >
                        <TableCell>{actividad.title}</TableCell>

                        <TableCell>
                          <Badge>{actividad.type}</Badge>
                        </TableCell>

                        <TableCell>{actividad.organization}</TableCell>

                        <TableCell>{actividad.dojo}</TableCell>

                        <TableCell>
                          {format(parseISO(actividad.date), 'dd/MM/yyyy')} {actividad.time}
                        </TableCell>

                        <TableCell className="text-right">
                          <Button
                            size="sm"
                            variant="outline"
                            className="border-gray-300 text-gray-700 hover:bg-gray-100"
                            onClick={(e) => {
                              e.stopPropagation();
                              setSelectedActivity(actividad);
                              setCurrentDate(parseISO(actividad.date));
                            }}
                          >
                            Ver
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>

                {/* <TableComponent
                  data={filteredActivities}
                  columns={columns}
                  onRowClick={(activity) => {
                    setSelectedActivity(activity);
                    setCurrentDate(parseISO(activity.date));
                  }}
                  rowClassName={(activity) =>
                    selectedActivity?.id === activity.id ? "bg-amber-50" : ""
                  }
                /> */}
              </div>
            </CardContent>
          </Card>

          {/* Estadísticas */}
          <div className="mt-6 grid grid-cols-1 sm:grid-cols-4 gap-4">
            <Card className="border border-gray-300 shadow-sm">
              <CardContent className="p-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-gray-900">{actividades.length}</div>
                  <div className="text-sm text-gray-600">Total actividades</div>
                </div>
              </CardContent>
            </Card>
            <Card className="border border-gray-300 shadow-sm">
              <CardContent className="p-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-600">
                    {actividades.filter(a => a.type === 'dojo').length}
                  </div>
                  <div className="text-sm text-gray-600">Actividades del dojo</div>
                </div>
              </CardContent>
            </Card>
            <Card className="border border-gray-300 shadow-sm">
              <CardContent className="p-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-purple-600">
                    {actividades.filter(a => a.type === 'organizacion').length}
                  </div>
                  <div className="text-sm text-gray-600">Actividades organización</div>
                </div>
              </CardContent>
            </Card>
            <Card className="border border-gray-300 shadow-sm">
              <CardContent className="p-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-600">
                    {actividades.filter(a => a.openInscription).length}
                  </div>
                  <div className="text-sm text-gray-600">Inscripciones abiertas</div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Calendario - 1/3 del ancho */}
        <div className={`${showCalendar ? 'w-80' : 'w-0'} overflow-hidden transition-all ease-in-out duration-500 `}>
          <Card className="border border-gray-300 shadow-sm sticky">
            <CardContent>
              {/* Header calendario */}
              <div className="flex justify-between items-center mb-4">
                {/* izquierda */}
                <div>
                  <h3 className="text-lg font-bold text-gray-900 capitalize whitespace-nowrap">
                    {format(currentDate, 'MMMM yyyy', { locale: es })}
                  </h3>
                </div>

                {/* derecha */}
                <div className="flex gap-2">
                  <Button variant="ghost" size="sm" onClick={prevMonth}>
                    <ChevronDown className="h-4 w-4 rotate-90" />
                  </Button>
                  <Button variant="ghost" size="sm" onClick={nextMonth}>
                    <ChevronDown className="h-4 w-4 -rotate-90" />
                  </Button>
                </div>
              </div>

              {/* Botón hoy */}
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

              {/* Días de la semana */}
              <div className="grid grid-cols-7 gap-1 mb-2">
                {dayNames.map((day) => (
                  <div key={day} className="text-center">
                    <span className="text-sm font-medium text-gray-600 uppercase">{day.slice(0, 2)}</span>
                  </div>
                ))}
              </div>

              {/* Días del mes */}
              <div className="grid grid-cols-7 gap-1">
                {getDaysInMonth(currentDate).map((day, index) => {
                  const isToday = isSameDay(day.date, new Date());
                  const hasActivities = day.activities.length > 0;
                  const isSelectedActivityDay = selectedActivity &&
                    isSameDay(day.date, parseISO(selectedActivity.date));

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
                      onClick={() => {
                        if (hasActivities) {
                          // Si hay actividades en este día, seleccionar la primera
                          setSelectedActivity(day.activities[0]);
                        }
                      }}
                    >
                      <div className="text-sm font-medium">{format(day.date, 'd')}</div>
                      {hasActivities && (
                        <div className="flex flex-wrap gap-0.5 mt-1 justify-center">
                          {day.activities.slice(0, 2).map((act, idx) => (
                            <div
                              key={idx}
                              className={`h-1.5 w-1.5 rounded-full ${act.category === 'examen' ? 'bg-red-500' :
                                act.category === 'torneo' ? 'bg-blue-500' :
                                  act.category === 'seminario' ? 'bg-purple-500' :
                                    act.category === 'clase_especial' ? 'bg-amber-500' : 'bg-green-500'
                                }`}
                              title={act.title}
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

      </div>
    </div>
  );
}



