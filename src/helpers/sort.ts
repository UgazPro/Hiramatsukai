export type SortDirection = "asc" | "desc";

export interface SortState {
    field: string | null;
    direction: SortDirection | null;
}

export function getPathValue(obj: unknown, path: string): unknown {
    if (obj == null || !path) return undefined;

    const normalized = path.replace(/\[(\w+)\]/g, ".$1");

    return normalized.split(".").reduce<unknown>((acc, part) => {
        if (acc == null || typeof acc !== "object") return undefined;
        return (acc as Record<string, unknown>)[part];
    }, obj);
}

export function compareValues(a: unknown, b: unknown): number {
    if (a == null && b == null) return 0;
    if (a == null) return 1;
    if (b == null) return -1;

    if (a instanceof Date && b instanceof Date) {
        return a.getTime() - b.getTime();
    }

    if (a instanceof Date || b instanceof Date) {
        const timeA = a instanceof Date ? a.getTime() : new Date(a as string | number).getTime();
        const timeB = b instanceof Date ? b.getTime() : new Date(b as string | number).getTime();
        return timeA - timeB;
    }

    if (typeof a === "number" && typeof b === "number") {
        return a - b;
    }

    return String(a).localeCompare(String(b), undefined, { sensitivity: "base" });
}

export function getSorted<T>(rows: T[], sort: SortState): T[] {
    if (!sort?.field || !sort?.direction || !rows.length) return [...rows];

    const { field, direction } = sort;
    const factor = direction === "asc" ? 1 : -1;

    return [...rows].sort((a, b) => {
        const valueA = getPathValue(a, field);
        const valueB = getPathValue(b, field);
        return compareValues(valueA, valueB) * factor;
    });
}