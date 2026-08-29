import { Column } from "@/components/table/TableComponent";
import { IStudent, userRolesNames } from "./student.interface";
import { Button } from "@/components/ui/button";
import { Edit, User, Phone, Calendar } from "lucide-react";
import { DeleteDialog } from "@/components/deleteDialog";
import { calculateAge, dateFormatter, formatIdentification, formatPhoneWithCode } from "@/helpers/formatter";
import FieldBadge from "@/components/table/RenderTableComponents";

interface Actions {
    startEdit: (student: IStudent) => void;
    deleteStudent: (id: number) => void;
}

export const studentSortFields = [
    { value: "name", label: "Alumno" },
    { value: "identification", label: "Cédula" },
    { value: "roles[0].rol", label: "Rol" },
    { value: "dojo.dojo", label: "Dojo" },
    { value: "enrollmentDate", label: "Fecha de inscripción" },
];

function userRolColor(rol: userRolesNames) {

    switch (rol) {

        case 'Administrador': return 'red';
        case 'Líder Maestro': return 'red';
        case 'Comisión de Grado': return 'orange';
        case 'Líder Instructor': return 'blue';
        case 'Instructor': return 'green';
        case 'Estudiante': return 'yellow';
        case 'Representante': return 'gray';

    }

}

export const getStudentColumns = ({ startEdit, deleteStudent, }: Actions): Column<IStudent>[] => [
    {
        header: "Alumno",
        orderBy: "name",
        render: (student) => (
            <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-full bg-linear-to-br from-yellow-100 to-red-100 border border-yellow-200 flex items-center justify-center">
                    {student.profileImg?.trim() ? (
                        <img
                            src={student.profileImg}
                            className="h-10 w-10 rounded-full object-cover"
                            alt={student.name}
                        />
                    ) : (
                        <User className="h-5 w-5 text-yellow-600" />
                    )}
                </div>
                <div>
                    <div className="font-semibold text-gray-900">
                        {student.name} {student.lastName}
                    </div>
                    <div className="text-sm text-gray-600">@{student.username}</div>
                </div>
            </div>
        ),
    },

    {
        header: "Cédula",
        orderBy: "identification",
        render: (s) => (
            <span className="font-mono text-gray-800">{formatIdentification(s.identification)}</span>
        ),
    },

    {
        header: "Edad",
        render: (s) => `${calculateAge(s.birthday)} años`,
    },

    {
        header: "Cinturón",
        render: (s) => (
            <div className="text-xs space-y-1 max-w-68 w-68">
                {s.userRanks?.map((r, i) => (
                    <div key={i} className="flex items-center justify-start gap-2">
                        <img src={r.martialArt.icon} className="h-5 w-5 shrink-0 rounded object-contain" alt={r.martialArt.martialArt} />
                        <p className=" whitespace-break-spaces">{r.rank.rank_name} {r.rank.code}, Cinturón {r.rank.belt}</p>
                    </div>
                )) || <p>—</p>}
            </div>
        ),
    },
    {
        header: "Rol",
        orderBy: "roles[0].rol",
        render: (s) => (
            <FieldBadge
                label={s.roles?.map((r) => r.rol).join(", ") || "—"}
                color={userRolColor(s.roles[0]?.rol ?? "Estudiante")}
            />
        ),
    },

    {
        header: "Dojo",
        orderBy: "dojo.dojo",
        render: (s) => (
            <FieldBadge
                label={s.dojo.dojo}
                color="transparent"
            />
        ),
    },

    {
        header: "Contacto",
        render: (s) => (
            <div className="flex items-center gap-2">
                <Phone className="h-3 w-3 text-gray-500" />
                <span className="text-sm text-gray-700">{formatPhoneWithCode(s.phone)}</span>
            </div>
        ),
    },

    {
        header: "Inscripción",
        orderBy: "enrollmentDate",
        render: (s) => (
            <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4 text-gray-500" />
                <span className="text-sm text-gray-700">
                    {dateFormatter(s.enrollmentDate)}
                </span>
            </div>
        ),
    },

    {
        header: "Estado",
        render: (s) =>
            <FieldBadge
                label={s.active ? 'Activo' : 'Inactivo'}
                color={s.active ? 'green' : 'red'}
            />
    },

    {
        header: "Acciones",
        headerClassName: "text-right",
        className: "text-right",
        render: (student) => (
            <div className="flex justify-end">
                <Button
                    variant="ghost"
                    size="sm"
                    onClick={(e) => {
                        e.stopPropagation();
                        startEdit(student);
                    }}
                >
                    <Edit className="h-4 w-4" />
                </Button>

                <DeleteDialog
                    preposition="a"
                    whatsDeleting={`${student.name} ${student.lastName}`}
                    onConfirm={() => deleteStudent(student.id)}
                />
            </div>
        ),
    },
];
