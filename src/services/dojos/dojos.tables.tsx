import { Column } from "@/components/table/TableComponent";
import { Button } from "@/components/ui/button";
import { Building2, Edit, Eye } from "lucide-react";
import { IDojo } from "./dojo.interface";
import FieldBadge from "@/components/table/RenderTableComponents";
import { DojoScreen } from "@/stores/dojos.store";
import { DeleteDialog } from "@/components/deleteDialog";

interface Actions {
  startEdit: (dojo: IDojo) => void;
  setSelectedDojo: (dojo: IDojo) => void;
  setScreen: (screen: DojoScreen) => void;
  deleteDojo: (id: number) => void;
  getParentName?: (dojo: IDojo) => string;
  canModify?: boolean;
}

const getDojoLogo = (logo: string) => `${import.meta.env.VITE_API_URL}/api${logo}`;

export const getDojosColumns = ({ startEdit, setSelectedDojo, setScreen, deleteDojo, getParentName, canModify = true }: Actions): Column<IDojo>[] => [
  {
    header: "Dojo",
    render: (d) => (
      <div className="flex items-center gap-3">
        <div className="h-10 w-10 rounded-full overflow-hidden bg-gray-100 flex items-center justify-center shrink-0 border border-gray-200">
          {d.logo ? (
            <img src={getDojoLogo(d.logo)} alt={d.dojo} className="w-full h-full object-cover" />
          ) : (
            <Building2 className="h-5 w-5 text-gray-400" />
          )}
        </div>
        <div>
          <p className="font-medium">{d.dojo}</p>
          <p className="text-xs text-gray-500">{d.code}</p>
        </div>
      </div>
    ),
  },

  {
    header: "Dirección",
    render: (d) => <p className="text-sm">{d.addressShort || d.address}</p>,
  },

  {
    header: "Artes Marciales",
    render: (d) => (
      <div className="flex flex-wrap gap-1">
        {d.dojoMartialArts.map((ma) => (
          <FieldBadge key={ma.id} label={ma.martialArt} color="yellow" />
        ))}
      </div>
    ),
  },

  {
    header: "Estudiantes",
    render: (d) => <p className="text-center font-medium">{d.students}</p>,
  },

  {
    header: "Dojo Padre",
    render: (d) => {
      const parentName = getParentName?.(d);
      return (
        <p className={`text-sm ${parentName ? "text-gray-700" : "text-gray-400 italic"}`}>
          {parentName || "Sin padre"}
        </p>
      );
    },
  },

  {
    header: "Hijos",
    render: (d) => <p className="text-center">{d.childDojos.length}</p>,
  },

  {
    header: "Acciones",
    headerClassName: "",
    className: "",
    render: (dojo) => (
      <>
        <Button
          size="sm"
          variant="ghost"
          className="border-gray-300 text-gray-700 hover:bg-gray-100"
          onClick={(e) => {
            e.stopPropagation();
            setSelectedDojo(dojo);
            setScreen("detail");
          }}
        >
          <Eye />
        </Button>
        {canModify && (
          <>
            <Button
              size="sm"
              variant="ghost"
              className="border-gray-300 text-gray-700 hover:bg-gray-100"
              onClick={(e) => {
                e.stopPropagation();
                startEdit(dojo);
              }}
            >
              <Edit />
            </Button>
            <DeleteDialog
              preposition="el dojo"
              whatsDeleting={dojo.dojo}
              onConfirm={() => deleteDojo(dojo.id)}
            />
          </>
        )}
      </>
    ),
  },
];
