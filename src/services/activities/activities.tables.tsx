import { Column } from "@/components/table/TableComponent";
import { Button } from "@/components/ui/button";
import { format, parseISO } from "date-fns";
import { CalendarDays, Clock, Edit, Eye, Trash } from "lucide-react";
import { IActivity } from "./activity.interface";
import FieldBadge from "@/components/table/RenderTableComponents";
import { activityScreen } from "@/stores/activities.store";
import { DeleteDialog } from "@/components/deleteDialog";

interface Actions {
  startEdit: (activity: IActivity) => void;
  setSelectedActivity: (activity: IActivity) => void;
  setScreen: (screen: activityScreen) => void;
  deleteActivity: (id: number) => void;
}

export const getActivitiesColumns = ({ startEdit, setSelectedActivity, setScreen, deleteActivity }: Actions): Column<IActivity>[] => [
  {
    header: "Actividad",
    render: (a) => <p className="font-medium">{a.name}</p>,
  },

  {
    header: "Tipo",
    render: (a) => (
      <div>
        <FieldBadge
          label={a.type}
          color="blue"
        />
      </div>
    ),
  },

  {
    header: "Lugar",
    render: (a) => (
      <>{a.place}</>
    ),
  },

  {
    header: "Fecha/Hora",
    render: (a) => (
      <div className="space-y-2">
        <p className="text-xs flex gap-1"><CalendarDays size={'16px'} />{format(parseISO(a.date.toString()), "dd/MM/yyyy")}</p>
        <p className="text-xs flex gap-1"><Clock size={'16px'} />{format(parseISO(a.date.toString()), "hh:mm aaa")}</p>
      </div>
    ),
  },

  {
    header: "Acciones",
    headerClassName: "",
    className: "",
    render: (activity) => (
      <>
        <Button
          size="sm"
          variant="ghost"
          className="border-gray-300 text-gray-700 hover:bg-gray-100"
          onClick={(e) => {
            e.stopPropagation();
            setSelectedActivity(activity);
            setScreen("detail");
          }}
        >
          <Eye />
        </Button>
        <Button
          size="sm"
          variant="ghost"
          className="border-gray-300 text-gray-700 hover:bg-gray-100"
          onClick={(e) => {
            e.stopPropagation();
            startEdit(activity);
          }}
        >
          <Edit />
        </Button>
        <DeleteDialog
          preposition="la actividad"
          whatsDeleting={`${activity.name}`}
          onConfirm={() => deleteActivity(activity.id)}
        />
      </>
    ),
  },
];
