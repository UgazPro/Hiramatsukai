import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";

export interface Column<T> {
    header: string;
    accessor?: keyof T;
    render?: (row: T) => React.ReactNode;
    className?: string;
    headerClassName?: string;
}

interface TableComponentProps<T> {
    data: T[];
    columns: Column<T>[];
    onRowClick?: (row: T) => void;
    rowClassName?: (row: T) => string;
}

export function TableComponent<T>({ data, columns, onRowClick, rowClassName }: TableComponentProps<T>) {

    return (
        <div className="rounded-lg border border-gray-300 shadow-sm overflow-hidden bg-white">
            <Table>
                <TableHeader className="bg-gray-50">
                    <TableRow>
                        {columns.map((col, i) => (
                            <TableHead
                                key={i}
                                className={`text-gray-900 font-semibold py-4 ${col.headerClassName ?? ""}`}
                            >
                                {col.header}
                            </TableHead>
                        ))}
                    </TableRow>
                </TableHeader>

                <TableBody>
                    {data.map((row, rowIndex) => (
                        <TableRow
                            key={rowIndex}
                            onClick={() => onRowClick?.(row)}
                            className={`border-b border-gray-200 hover:bg-gray-50/80 ${onRowClick ? "cursor-pointer" : ""} ${rowClassName ? rowClassName(row) : ""}`}
                        >
                            {columns.map((col, colIndex) => (
                                <TableCell key={colIndex} className={`py-4 ${col.className ?? ""}`}>

                                    {col.render
                                        ? col.render(row)
                                        : col.accessor
                                            ? String(row[col.accessor] ?? "")
                                            : null}

                                </TableCell>
                            ))}
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    );
}
