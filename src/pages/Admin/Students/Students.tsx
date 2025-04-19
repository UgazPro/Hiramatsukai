import { Button } from "@/components/ui/button";
import TabsComponent from "@/components/tabs/TabsComponent";
import TableComponent from "@/components/table/TableComponent";

export default function Students() {

  return (

    <div className="bg-gray-200">

      <div className="flex justify-between items-center p-7">

        <h2 className="font-black text-3xl">Alumnos</h2>

        <Button
          variant={'clickRed'}
          size={'default'}
        >
          + Nuevo Alumno
        </Button>

      </div>

      <TabsComponent />

      <div className="border-2 border-gray-300 rounded-lg p-6 m-8 bg-white">

        <h3 className="text-xl mb-5 font-bold">Todos los Alumnos</h3>

        <div>

          <TableComponent />
          
        </div>

      </div>

    </div>

  );

}
