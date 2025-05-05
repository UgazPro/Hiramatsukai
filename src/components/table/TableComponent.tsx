import { Table, TableBody, TableCell, TableFooter, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { IColumns } from "./table.interface";

interface TableComponentProps {
  tableColumns: IColumns[];
  tableData: any[];
}

export default function TableComponent({ tableColumns, tableData } : TableComponentProps) {

  return (

    <>

      <Table>
        <TableHeader>
          <TableRow>
            {
              tableColumns && tableColumns.map((column, index) => (
                <TableHead key={index} className="text-center">{column.label}</TableHead>
              ))
            }
          </TableRow>
        </TableHeader>
        <TableBody>
          {tableData && tableData.map((item, index) => (
            <TableRow key={index} className="text-center">
              {tableColumns && tableColumns.map((column, index) => (
                <TableCell key={index}>
                  <span>{column.element(item)}</span>
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
        <TableFooter></TableFooter>
      </Table>

    </>

  );

}
