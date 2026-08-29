import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";
import { Skeleton } from "@/components/ui/skeleton";
import { ArrowDown, ArrowUp, ArrowUpDown } from "lucide-react";
import { useState } from "react";
import { SortDirection, SortState } from "@/helpers/sort";

export interface Column<T> {
    header: string;
    accessor?: keyof T;
    orderBy?: string;
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
    sort?: SortState;
    onSortChange?: (sort: SortState) => void;
}

function nextSort(orderBy: string, current: SortState): SortState {
    if (current.field !== orderBy) {
        return { field: orderBy, direction: "asc" as SortDirection };
    }

    if (current.direction === "asc") {
        return { field: orderBy, direction: "desc" as SortDirection };
    }

    return { field: null, direction: null };
}

export function TableComponent<T>({ data, columns, onRowClick, rowClassName, loading, skeletonRows = 5, sort, onSortChange }: TableComponentProps<T>) {

    const [internalSort, setInternalSort] = useState<SortState>({ field: null, direction: null });

    const activeSort = sort ?? internalSort;

    const handleSort = (orderBy: string) => {
        const next = nextSort(orderBy, activeSort);

        if (sort && onSortChange) {
            onSortChange(next);
        } else {
            setInternalSort(next);
        }
    };

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
                                {col.orderBy ?
                                    <button
                                        type="button"
                                        onClick={() => handleSort(col.orderBy!)}
                                        className={`flex items-center gap-1.5 cursor-pointer select-none transition-colors hover:text-yellow-700 ${activeSort.field === col.orderBy ? "text-yellow-700" : ""}`}
                                    >
                                        {col.header}
                                        {activeSort.field === col.orderBy && activeSort.direction === "asc" ? (
                                            <ArrowUp className="h-3.5 w-3.5" />
                                        ) : activeSort.field === col.orderBy && activeSort.direction === "desc" ? (
                                            <ArrowDown className="h-3.5 w-3.5" />
                                        ) : (
                                            <ArrowUpDown className="h-3.5 w-3.5 text-gray-400" />
                                        )}
                                    </button>
                                    :
                                    col.header
                                }
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