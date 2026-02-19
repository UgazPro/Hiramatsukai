import { Column } from "@/components/table/TableComponent";
import { Button } from "@/components/ui/button";
import { format, parseISO } from "date-fns";
import { CalendarDays, Clock, Edit, Eye, Trash } from "lucide-react";
import { IActivity } from "./activity.interface";
import FieldBadge from "@/components/table/RenderTableComponents";
import { activityScreen } from "@/stores/activities.store";

interface Actions {
  startEdit: (activity: IActivity) => void;
  setSelectedActivity: (activity: IActivity) => void; 
  setScreen: (screen: activityScreen) => void;
}

export const getActivitiesColumns = ({ startEdit, setSelectedActivity, setScreen } : Actions): Column<IActivity>[] => [
  {
    header: "Actividad",
    render: (a) => <p className="font-medium">{a.name}</p>,
  },

  {
    header: "Tipo",
    render: (a) => (
      <div>
        <FieldBadge
          label={a.ActivityDojos.length > 1 ? 'Organizacional' : 'Interna'}
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
    render: (a) => (
      <>
        <Button
          size="sm"
          variant="ghost"
          className="border-gray-300 text-gray-700 hover:bg-gray-100"
          onClick={(e) => {
            e.stopPropagation();
            setSelectedActivity(a);
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
            startEdit(a);
          }}
        >
          <Edit />
        </Button>
        <Button
          size="sm"
          variant="ghost"
          className="border-gray-300 text-gray-700 hover:bg-gray-100"
          onClick={(e) => {
            e.stopPropagation();
          }}
        >
          <Trash />
        </Button>
      </>
    ),
  },
];
