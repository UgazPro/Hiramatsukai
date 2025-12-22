import { useEffect, useState } from "react";
import TabsComponent from "@/components/tabs/TabsComponent";
import { IStudentsGroup } from "@/services/users/user.interface";
import { getUsers } from "@/services/users/userService";
import StudentCard from "../Students/StudentCard/StudentCard";


export default function Applications() {

  const [students, setStudents] = useState<IStudentsGroup>({ allStudents: [], students: [] });

  useEffect(() => {
    getStudents();
  }, []);

  const getStudents = async () => {

    const response = await getUsers();

    setStudents({
      allStudents: response,
      students: response
    });

  }

  return (

    <div className="">

      <div className="bg-white px-5 py-7 ">

        <h2 className="font-black text-xl">Postulaciones a Exámen</h2>

      </div>

      <div className="mt-3">
        <TabsComponent
          tabValue={'Todos los Alumnos'}
          tabs={[
            { label: 'Todos los Alumnos' },
            { label: 'Alumnos Activos' },
            { label: 'Alumnos Inactivos' },
          ]}
        />
      </div>

      <div className="m-8">Search Student</div>

      <div>

        {students.students.map((student) => (
          <StudentCard
            key={student.id}
            student={student}
          />
        ))}

      </div>


    </div>

  );

}
