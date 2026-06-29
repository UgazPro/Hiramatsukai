import { Button } from "@/components/ui/button";
import { Calendar as CalendarIcon, LayoutGrid, List, PlusCircle } from "lucide-react";
import { format, parseISO } from "date-fns";
import { getActivitiesColumns } from "@/services/activities/activities.tables";
import { TableComponent } from "@/components/table/TableComponent";
import { PaginationComponent } from "@/components/table/PaginationComponent";
import { useActivities } from "@/hooks/useActivities";
import { useActivitiesStore, ActivityViewMode } from "@/stores/activities.store";
import CalendarComponent from "@/components/calendar/CalendarComponent";
import { useEffect } from "react";
import PageTransitionComponent from "@/components/PageTransitionComponent";
import ActivityDetailView from "./ActivityDetailView/ActivityDetailView";
import ActivityForm from "./ActivityForm/ActivityForm";
import { useDeleteActivity } from "@/queries/useActivityMutations";
import { Badge } from "@/components/ui/badge";
import ActivityFilter from "./ActivityFilters/ActivityFilter";
import SearchFilterComponent from "@/components/Filters/SearchFilter";
import { useFilteredActivities } from "@/hooks/useFilteredActivities";
import ActivityCardView from "./ActivityCardView";
import ActivitiesSkeleton from "./ActivitiesSkeleton";

export default function Activities() {

  const { activitiesData, isLoading } = useActivities();

  const { currentDate, setCurrentDate, setSelectedActivity, showCalendar, toggleCalendar, cSelectedActivity, setCSelectedActivity, startEdit, startCreate, screen, setScreen, filters, resetFilters, searchTerm, setSearchTerm, setFilters, viewMode, setViewMode, currentPage, setCurrentPage, itemsPerPage, setItemsPerPage } = useActivitiesStore();

  const { mutateAsync: deleteActivity } = useDeleteActivity();

  const columns = getActivitiesColumns({ startEdit, setSelectedActivity, setScreen, deleteActivity });

  const filteredActivities = useFilteredActivities(activitiesData ?? []);

  const totalPages = Math.ceil(filteredActivities.length / itemsPerPage);
  const paginatedActivities = filteredActivities.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage,
  );

  useEffect(() => {
    setCurrentPage(1);
  }, [filteredActivities.length]);

  useEffect(() => {
    setScreen("main");
  }, []);

  useEffect(() => {
    const isMobile = window.innerWidth < 1024;
    setViewMode(isMobile ? "cards" : "table");
  }, []);

  const views = [
    { key: "table", icon: List },
    { key: "cards", icon: LayoutGrid },
  ];

  return (

    <div className="w-full h-full">

      <PageTransitionComponent

        primaryChildren={

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
                      className={`rounded-none border-r border-gray-300 bg-yellow-500 text-white hover:bg-yellow-600`}
                    >
                      <PlusCircle /> Nueva Actividad
                    </Button>
                  </div>

                  <div className="flex items-center border border-gray-300 rounded-lg overflow-hidden bg-white">
                    {views.map(({ key, icon: Icon }) => (
                      <Button
                        key={key}
                        variant={viewMode === key ? "secondary" : "ghost"}
                        size="sm"
                        onClick={() => setViewMode(key as ActivityViewMode)}
                        className={`rounded-none border-r border-gray-300 ${viewMode === key ? "bg-yellow-500 text-white hover:bg-yellow-600" : "text-gray-700 hover:bg-gray-100"}`}
                      >
                        <Icon className="h-4 w-4" />
                      </Button>
                    ))}
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

              <div className="mb-5 flex flex-col md:flex-row justify-between items-start md:items-center gap-3">

                <div className="flex justify-end w-auto">
                  <SearchFilterComponent
                    searchTerm={searchTerm}
                    setSearchTerm={setSearchTerm}
                    placeHolder="Buscar por nombre o lugar de la actividad..."
                    width="w-full md:w-85"
                  />
                </div>

                {/* Badges de filtros activos */}
                {(filters.type ||
                  filters.place ||
                  filters.includePast ||
                  filters.startDate ||
                  filters.endDate ||
                  searchTerm) && (
                    <div className="flex flex-wrap gap-2">
                      {filters.startDate && (
                        <Badge className="bg-yellow-100 text-yellow-800 border-yellow-200">
                          Desde: {format(filters.startDate, "dd/MM/yyyy")}
                        </Badge>
                      )}

                      {filters.endDate && (
                        <Badge className="bg-yellow-100 text-yellow-800 border-yellow-200">
                          Hasta: {format(filters.endDate, "dd/MM/yyyy")}
                        </Badge>
                      )}

                      {filters.type && (
                        <Badge className="bg-yellow-100 text-yellow-800 border-yellow-200">
                          Tipo: {filters.type.charAt(0).toUpperCase() + filters.type.slice(1)}
                        </Badge>
                      )}

                      {searchTerm && (
                        <Badge className="bg-yellow-100 text-yellow-800 border-yellow-200">
                          Búsqueda: {searchTerm}
                        </Badge>
                      )}

                      {filters.includePast && (
                        <Badge className="bg-yellow-100 text-yellow-800 border-yellow-200">
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

              {isLoading ? (
                <ActivitiesSkeleton />
              ) : (
                <div className="flex flex-col lg:flex-row items-start justify-between gap-8">

                  <div className="flex-1 overflow-x-auto order-2 lg:order-1">
                    {viewMode === "table" && (
                      <TableComponent
                        data={paginatedActivities}
                        columns={columns}
                        onRowClick={(activity) => {
                          setCSelectedActivity(activity);
                          setCurrentDate(parseISO(activity.date.toString()));
                        }}
                        rowClassName={(activity) =>
                          cSelectedActivity?.id === activity.id ? "bg-yellow-50" : ""
                        }
                      />
                    )}
                    {viewMode === "cards" && (
                      <ActivityCardView filteredActivities={paginatedActivities} />
                    )}

                    {filteredActivities.length > 0 && (
                      <div className="hidden lg:block">
                        <PaginationComponent
                          currentPage={currentPage}
                          totalPages={totalPages}
                          totalItems={filteredActivities.length}
                          itemsPerPage={itemsPerPage}
                          onPageChange={setCurrentPage}
                          onItemsPerPageChange={(n) => {
                            setItemsPerPage(n);
                            setCurrentPage(1);
                          }}
                        />
                      </div>
                    )}
                  </div>

                  <div className="order-1 lg:order-2">
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
              )}

            </div>

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
