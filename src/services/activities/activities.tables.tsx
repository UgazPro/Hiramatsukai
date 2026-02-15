import { Column } from "@/components/table/TableComponent";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { format, parseISO } from "date-fns";
import { Edit, Eye, Trash } from "lucide-react";

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

interface Actions {
  onSelect: (actividad: Actividad) => void;
}

export const getActivitiesColumns = ({ onSelect }: Actions): Column<Actividad>[] => [
  {
    header: "Actividad",
    render: (a) => <div className="font-medium">{a.title}</div>,
  },

  {
    header: "Tipo",
    render: (a) => (
      <Badge
        className={
          a.type === "dojo"
            ? "bg-amber-100 text-amber-800 border-amber-200"
            : "bg-blue-100 text-blue-800 border-blue-200"
        }
      >
        {a.type}
      </Badge>
    ),
  },

  {
    header: "Instructor",
    render: (a) => a.organization,
  },

  {
    header: "Dojo",
    render: (a) => a.dojo,
  },

  {
    header: "Fecha/Hora",
    render: (a) => (
      <div className="text-sm">
        {format(parseISO(a.date), "dd/MM/yyyy")} {a.time}
      </div>
    ),
  },

  {
    header: "Acciones",
    headerClassName: "text-right",
    className: "text-right",
    render: (a) => (
      <>
        <Button
          size="sm"
          variant="ghost"
          className="border-gray-300 text-gray-700 hover:bg-gray-100"
          onClick={(e) => {
            e.stopPropagation();
            onSelect(a);
          }}
        >
          <Eye />
        </Button>
        <Button
          size="sm"
          variant="ghost"
          className="border-gray-300 text-gray-700 hover:bg-gray-100"
        >
          <Edit />
        </Button>
        <Button
          size="sm"
          variant="ghost"
          className="border-gray-300 text-gray-700 hover:bg-gray-100"
        >
          <Trash />
        </Button>
      </>
    ),
  },
];
