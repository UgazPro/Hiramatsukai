import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";
import { Skeleton } from "@/components/ui/skeleton";

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
    loading?: boolean;
    skeletonRows?: number;
}

export function TableComponent<T>({ data, columns, onRowClick, rowClassName, loading, skeletonRows = 5 }: TableComponentProps<T>) {

    return (
        <div className="rounded-lg border border-gray-300 shadow-sm overflow-x-auto bg-white">
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
                    {loading ? (
                        Array.from({ length: skeletonRows }).map((_, rowIndex) => (
                            <TableRow key={`skeleton-${rowIndex}`}>
                                {columns.map((_, colIndex) => (
                                    <TableCell key={colIndex} className="py-4">
                                        <Skeleton className="h-4 w-3/4" />
                                    </TableCell>
                                ))}
                            </TableRow>
                        ))
                    ) : (
                        data.map((row, rowIndex) => (
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
                        ))
                    )}
                </TableBody>
            </Table>
        </div>
    );
}
