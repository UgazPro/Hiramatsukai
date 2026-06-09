import { Button } from "@/components/ui/button";
import { Calendar as CalendarIcon, PlusCircle } from "lucide-react";
import { format, parseISO } from "date-fns";
import { getActivitiesColumns } from "@/services/activities/activities.tables";
import { TableComponent } from "@/components/table/TableComponent";
import { useActivities } from "@/hooks/useActivities";
import { useActivitiesStore } from "@/stores/activities.store";
import CalendarComponent from "@/components/calendar/CalendarComponent";
import { useEffect } from "react";
import SpinnerComponent from "@/components/spinner/SpinnerComponent";
import PageTransitionComponent from "@/components/PageTransitionComponent";
import ActivityDetailView from "./ActivityDetailView/ActivityDetailView";
import ActivityForm from "./ActivityForm/ActivityForm";
import { useDeleteActivity } from "@/queries/useActivityMutations";
import { Badge } from "@/components/ui/badge";
import ActivityFilter from "./ActivityFilters/ActivityFilter";
import SearchFilterComponent from "@/components/Filters/SearchFilter";
import { useFilteredActivities } from "@/hooks/useFilteredActivities";

export default function Activities() {

  const { activitiesData, isLoading } = useActivities();

  const { currentDate, setCurrentDate, selectedActivity, setSelectedActivity, showCalendar, toggleCalendar, cSelectedActivity, setCSelectedActivity, finishForm, startEdit, startCreate, screen, setScreen, filters, resetFilters, searchTerm, setSearchTerm, setFilters } = useActivitiesStore();

  const { mutateAsync: deleteActivity } = useDeleteActivity();

  const columns = getActivitiesColumns({ startEdit, setSelectedActivity, setScreen, deleteActivity });

  const filteredActivities = useFilteredActivities(activitiesData ?? []);

  return (

    <div className="w-full h-full">

      {isLoading && <SpinnerComponent />}

      <PageTransitionComponent

        primaryChildren={

          <>

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

                  {/* Filters Button */}
                  <ActivityFilter />

                  <div className="flex items-center border border-gray-300 rounded-lg overflow-hidden bg-white">
                    <Button
                      variant='secondary'
                      size="sm"
                      onClick={() => startCreate()}
                      className={`rounded-none border-r border-gray-300 bg-amber-500 text-white hover:bg-amber-600`}
                    >
                      <PlusCircle /> Nueva Actividad
                    </Button>
                  </div>

                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => toggleCalendar(showCalendar)}
                    className="border-gray-300 text-gray-700 hover:bg-gray-50"
                  >
                    <CalendarIcon className="h-4 w-4 mr-2" />
                    {showCalendar ? 'Ocultar Calendario' : 'Mostrar Calendario'}
                  </Button>
                </div>
              </div>

              <div className="mb-5 flex justify-between items-center">

                <div className="flex justify-end">
                  {/* Search Filter */}
                  <SearchFilterComponent
                    searchTerm={searchTerm}
                    setSearchTerm={setSearchTerm}
                    placeHolder="Buscar por nombre o lugar de la actividad..."
                    width="w-85"
                  />
                </div>

                {/* Badges de filtros activos */}
                {(filters.type ||
                  filters.place ||
                  filters.includePast ||
                  filters.startDate ||
                  filters.endDate ||
                  searchTerm) && (
                    <div className="flex flex-wrap gap-2 mb-4">
                      {filters.startDate && (
                        <Badge className="bg-amber-100 text-amber-800 border-amber-200">
                          Desde: {format(filters.startDate, "dd/MM/yyyy")}
                        </Badge>
                      )}

                      {filters.endDate && (
                        <Badge className="bg-amber-100 text-amber-800 border-amber-200">
                          Hasta: {format(filters.endDate, "dd/MM/yyyy")}
                        </Badge>
                      )}

                      {filters.type && (
                        <Badge className="bg-amber-100 text-amber-800 border-amber-200">
                          Tipo: {filters.type.charAt(0).toUpperCase() + filters.type.slice(1)}
                        </Badge>
                      )}

                      {searchTerm && (
                        <Badge className="bg-amber-100 text-amber-800 border-amber-200">
                          Búsqueda: {searchTerm}
                        </Badge>
                      )}

                      {filters.includePast && (
                        <Badge className="bg-amber-100 text-amber-800 border-amber-200">
                          Incluir pasadas
                        </Badge>
                      )}

                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={resetFilters}
                        className="text-gray-500 hover:text-gray-700 h-6 text-xs"
                      >
                        Limpiar todos
                      </Button>
                    </div>
                  )}

              </div>

              <div className="flex flex-col lg:flex-row items-start justify-between gap-8">

                <div className={'flex-1'}>
                  <TableComponent
                    data={filteredActivities ?? []}
                    columns={columns}
                    onRowClick={(activity) => {
                      setCSelectedActivity(activity);
                      setCurrentDate(parseISO(activity.date.toString()));
                    }}
                    rowClassName={(activity) =>
                      cSelectedActivity?.id === activity.id ? "bg-amber-50" : ""
                    }
                  />
                </div>

                <CalendarComponent
                  styles={`${showCalendar ? 'w-80' : 'w-0'} overflow-hidden transition-all ease-in-out duration-500 `}
                  currentDate={currentDate}
                  setCurrentDate={setCurrentDate}
                  activities={activitiesData ?? []}
                  cSelectedActivity={cSelectedActivity}
                  setCSelectedActivity={setCSelectedActivity}
                  GoToTodayButton
                  onDayClick={(date) => setFilters({ startDate: date, endDate: date })}
                />

              </div>

            </div>

          </>
        }

        secondaryChildren={
          <div>
            {screen === "detail" && <ActivityDetailView />}
            {screen === "form" && <div className="h-full overflow-y-auto"><ActivityForm /></div>}
          </div>
        }

        toggle={screen === "detail" || screen === "form"}

      />

    </div>

  );
}



