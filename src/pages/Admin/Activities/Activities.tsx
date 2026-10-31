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
import { useUserData } from "@/helpers/token";
import { useMediaQuery } from "@/hooks/useMediaQuery";

export default function Activities() {

  const { activitiesData, isLoading } = useActivities();

  const { currentDate, setCurrentDate, setSelectedActivity, showCalendar, toggleCalendar, cSelectedActivity, setCSelectedActivity, startEdit, startCreate, screen, setScreen, filters, resetFilters, searchTerm, setSearchTerm, setFilters, viewMode, setViewMode, currentPage, setCurrentPage, itemsPerPage, setItemsPerPage } = useActivitiesStore();

  const { mutateAsync: deleteActivity } = useDeleteActivity();

  const userData = useUserData();
  const canModify = userData?.roles.some(({ rol }) => rol === "Administrador" || rol === "Líder Instructor" || rol === "Instructor");

  const columns = getActivitiesColumns({ startEdit, setSelectedActivity, setScreen, deleteActivity, canModify });

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

  const isMobile = useMediaQuery("(max-width: 639px)");

  useEffect(() => {
    if (isMobile) setViewMode("cards");
  }, [isMobile, setViewMode]);

  const views = [
    { key: "table", icon: List },
    { key: "cards", icon: LayoutGrid },
  ];

  return (

    <div className="w-full h-full">

      <PageTransitionComponent

        primaryChildren={

            <div className="mx-auto w-full max-w-7xl p-3 sm:p-4 md:p-6">

              {/* Header */}
              <div className="flex flex-col justify-between gap-4 lg:flex-row lg:items-center">
                <div className="min-w-0">
                  <h1 className="text-2xl font-bold text-foreground sm:text-3xl">Actividades</h1>
                  <p className="mt-2 text-muted-foreground">
                    Calendario de actividades del dojo y la organización
                  </p>
                </div>

                <div className="flex w-full flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center lg:w-auto">

                  {/* Filters Button */}
                  <div className="w-full sm:w-64 lg:w-72">
                    <SearchFilterComponent
                      searchTerm={searchTerm}
                      setSearchTerm={setSearchTerm}
                      placeHolder="Buscar por nombre o lugar de la actividad..."
                      width="w-full"
                    />
                  </div>

                  <ActivityFilter />

                  {canModify && (
                    <Button
                      variant="gold"
                      onClick={() => startCreate()}
                      className="h-11 w-full sm:h-10 sm:w-auto"
                    >
                      <PlusCircle data-icon="inline-start" /> Nueva Actividad
                    </Button>
                  )}

                  <div className="hidden items-center overflow-hidden rounded-lg border border-border bg-card sm:flex">
                    {views.map(({ key, icon: Icon }) => (
                      <Button
                        key={key}
                        variant="ghost"
                        size="sm"
                        onClick={() => setViewMode(key as ActivityViewMode)}
                        aria-label={key === "table" ? "Vista de tabla" : "Vista de tarjetas"}
                        aria-pressed={viewMode === key}
                        className={`h-11 rounded-none border-r border-border px-3 last:border-r-0 sm:h-10 ${viewMode === key ? "bg-brand-gold text-brand-sumi hover:bg-brand-gold-deep hover:text-white" : "text-foreground hover:bg-muted"}`}
                      >
                        <Icon className="h-4 w-4" />
                      </Button>
                    ))}
                  </div>

                  <Button
                    variant="outline"
                    onClick={() => toggleCalendar(showCalendar)}
                    className="h-11 w-full border-border text-foreground hover:bg-muted sm:h-10 sm:w-auto"
                  >
                    <CalendarIcon data-icon="inline-start" />
                    {showCalendar ? 'Ocultar Calendario' : 'Mostrar Calendario'}
                  </Button>
                </div>
              </div>

              <div className="mb-5 flex flex-wrap items-center gap-3">

                {/* Badges de filtros activos */}
                {(filters.type ||
                  filters.place ||
                  filters.includePast ||
                  filters.startDate ||
                  filters.endDate ||
                  searchTerm) && (
                    <div className="flex flex-wrap gap-2">
                      {filters.startDate && (
                        <Badge className="border-brand-gold/30 bg-brand-gold/15 text-brand-gold-deep">
                          Desde: {format(filters.startDate, "dd/MM/yyyy")}
                        </Badge>
                      )}

                      {filters.endDate && (
                        <Badge className="border-brand-gold/30 bg-brand-gold/15 text-brand-gold-deep">
                          Hasta: {format(filters.endDate, "dd/MM/yyyy")}
                        </Badge>
                      )}

                      {filters.type && (
                        <Badge className="border-brand-gold/30 bg-brand-gold/15 text-brand-gold-deep">
                          Tipo: {filters.type.charAt(0).toUpperCase() + filters.type.slice(1)}
                        </Badge>
                      )}

                      {searchTerm && (
                        <Badge className="border-brand-gold/30 bg-brand-gold/15 text-brand-gold-deep">
                          Búsqueda: {searchTerm}
                        </Badge>
                      )}

                      {filters.includePast && (
                        <Badge className="border-brand-gold/30 bg-brand-gold/15 text-brand-gold-deep">
                          Incluir pasadas
                        </Badge>
                      )}

                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={resetFilters}
                        className="h-8 text-xs text-muted-foreground hover:text-foreground"
                      >
                        Limpiar todos
                      </Button>
                    </div>
                  )}

              </div>

              {isLoading ? (
                <ActivitiesSkeleton />
              ) : (
                <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4 lg:gap-8">

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
                          cSelectedActivity?.id === activity.id ? "bg-brand-gold/10" : ""
                        }
                      />
                    )}
                    {viewMode === "cards" && (
                      <ActivityCardView filteredActivities={paginatedActivities} />
                    )}

                    {filteredActivities.length > 0 && (
                      <div>
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

                  {/* Mobile */}
                  <div className={`overflow-hidden transition-all duration-500 ease-in-out lg:hidden ${showCalendar ? 'max-h-[70dvh] opacity-100' : 'max-h-0 opacity-0'}`}>
                    <div className="pb-2">
                      <CalendarComponent
                        styles="w-full"
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

                  {/* Desktop: toggle w-80/w-0 */}
                  <div className={`hidden lg:block order-2 transition-all duration-500 ease-in-out ${showCalendar ? 'w-80' : 'w-0 overflow-hidden'}`}>
                    <CalendarComponent
                      styles="w-80"
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
