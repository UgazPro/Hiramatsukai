import TabsComponent from "@/components/tabs/TabsComponent";
import TableComponent from "@/components/table/TableComponent";
import { students, studentsColumns } from "./students.data";
import DialogComponent from "@/components/dialog/DialogComponent";
import { useState } from 'react';
import { Button } from "@/components/ui/button";
import StudentsForm from "./StudentsForm/StudentsForm";

export default function Students() {

  const [openDialog, setOpenDialog] = useState<boolean>(false);

  return (

    <div className="bg-gray-200">

      <div className="flex justify-between items-center p-7">

        <h2 className="font-black text-3xl">Alumnos</h2>

        <Button
          variant={'clickRed'}
          onClick={() => setOpenDialog(true)}
        >
          + Nuevo Alumno
        </Button>
        
      </div>

      <TabsComponent
        tabValue={'Todos los Alumnos'}
        tabs={[
          { label: 'Todos los Alumnos' },
          { label: 'Alumnos Activos' },
          { label: 'Alumnos Inactivos' },
        ]}
      />

      <div className="border-2 border-gray-300 rounded-lg p-6 m-8 bg-white">

        <h3 className="text-xl mb-5 font-bold">Todos los Alumnos</h3>

        <TableComponent
          tableColumns={studentsColumns}
          tableData={students}
        />

      </div>

      <DialogComponent
        openDialog={openDialog}
        setOpenDialog={setOpenDialog}
        dialogTitle="Nuevo Alumno"
        children={<StudentsForm />}
        className="bg-gray-200 w-[70rem]"
        dialogTitleStyle="text-3xl font-black -mb-2"
      />

    </div>

  );

}
