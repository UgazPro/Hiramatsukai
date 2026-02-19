import { Button } from "@/components/ui/button";
import { Calendar as CalendarIcon, PlusCircle } from "lucide-react";
import { parseISO } from "date-fns";
import { getActivitiesColumns } from "@/services/activities/activities.tables";
import { TableComponent } from "@/components/table/TableComponent";
import { useActivities } from "@/hooks/useActivities";
import { useActivitiesStore } from "@/stores/activities.store";
import CalendarComponent from "@/components/calendar/CalendarComponent";
import { useEffect } from "react";
import SpinnerComponent from "@/components/spinner/SpinnerComponent";
import PageTransitionComponent from "@/components/PageTransitionComponent";
import ActivityDetailView from "./ActivityDetailView/ActivityDetailView";
import DialogComponent from "@/components/dialog/DialogComponent";
import ActivityForm from "./ActivityForm/ActivityForm";

export default function Activities() {

  const { data: activities = [], isLoading } = useActivities();

  const { currentDate, setCurrentDate, selectedActivity, setSelectedActivity, showCalendar, toggleCalendar, cSelectedActivity, setCSelectedActivity, finishForm, usingForm, openForm, startEdit, screen, setScreen } = useActivitiesStore();

  const columns = getActivitiesColumns({ startEdit, setSelectedActivity, setScreen });

  useEffect( () => {
  
    console.log(selectedActivity);
  
  }, [selectedActivity]);

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

                  <div className="flex items-center border border-gray-300 rounded-lg overflow-hidden bg-white">
                    <Button
                      variant='secondary'
                      size="sm"
                      onClick={() => openForm()}
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

              <DialogComponent
                dialogTitle="Nueva Actividad"
                onClose={finishForm}
                openDialog={usingForm}
                className="max-w-4xl"
                children={<ActivityForm />}
                dialogDescription="Complete los campos para agregar una nueva actividad"
              />

              <div className="flex items-start justify-between gap-8">

                <div className={'flex-1'}>
                  <TableComponent
                    data={activities}
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
                  activities={activities}
                  cSelectedActivity={cSelectedActivity}
                  setCSelectedActivity={setCSelectedActivity}
                  GoToTodayButton
                />

              </div>

            </div>

          </>
        }

        secondaryChildren={

          <ActivityDetailView />

        }

        toggle={ screen === "detail" ? true : false }

      />

    </div>

  );
}



