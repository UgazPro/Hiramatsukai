import { Column } from "@/components/table/TableComponent";
import { IStudent, userRolesNames } from "./student.interface";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Edit, User, Phone, Calendar } from "lucide-react";
import { DeleteStudentDialog } from "@/components/deleteStudentDialog";
import { calculateAge, dateFormatter } from "@/helpers/formatter";
import FieldBadge from "@/components/table/RenderTableComponents";

interface Actions {
    startEdit: (student: IStudent) => void;
    deleteStudent: (id: number) => void;
}

function userRolColor(rol : userRolesNames) {

    switch(rol) {

        case 'Administrador': return 'red';
        case 'Líder Instructor': return 'blue';
        case 'Instructor': return 'green';
        case 'Estudiante': return 'yellow';
        case 'Representante': return 'gray';

    }

}

export const getStudentColumns = ({ startEdit, deleteStudent, }: Actions): Column<IStudent>[] => [
        {
            header: "Alumno",
            render: (student) => (
                <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-full bg-linear-to-br from-amber-100 to-red-100 border border-amber-200 flex items-center justify-center">
                        {student.profileImg?.trim() ? (
                            <img
                                src={student.profileImg}
                                className="h-10 w-10 rounded-full object-cover"
                                alt={student.name}
                            />
                        ) : (
                            <User className="h-5 w-5 text-amber-600" />
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
            header: "Identificación",
            render: (s) => (
                <span className="font-mono text-gray-800">{s.identification}</span>
            ),
        },

        {
            header: "Edad",
            render: (s) => `${calculateAge(s.birthday)} años`,
        },

        {
            header: "Rol",
            render: (s) => (
                <FieldBadge 
                    label={s.rol.rol}
                    color={userRolColor(s.rol.rol)}
                />
            ),
        },

        {
            header: "Dojo",
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
                    <span className="text-sm text-gray-700">{s.phone}</span>
                </div>
            ),
        },

        {
            header: "Inscripción",
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

                    <DeleteStudentDialog
                        studentName={`${student.name} ${student.lastName}`}
                        onConfirm={() => deleteStudent(student.id)}
                    />
                </div>
            ),
        },
    ];
