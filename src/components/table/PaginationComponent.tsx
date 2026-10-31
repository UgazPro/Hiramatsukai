import { ChevronLeft, ChevronRight } from "lucide-react";

interface PaginationComponentProps {
    currentPage: number;
    totalPages: number;
    totalItems: number;
    itemsPerPage: number;
    onPageChange: (page: number) => void;
    onItemsPerPageChange: (itemsPerPage: number) => void;
}

const ITEMS_PER_PAGE_OPTIONS = [5, 6, 12, 24, 48];

function getPageNumbers(current: number, total: number): (number | string)[] {
    if (total <= 5) return Array.from({ length: total }, (_, i) => i + 1);

    if (current <= 3) return [1, 2, 3, 4, "ellipsis-end", total];
    if (current >= total - 2) return [1, "ellipsis-start", total - 3, total - 2, total - 1, total];
    return [1, "ellipsis-start", current - 1, current, current + 1, "ellipsis-end", total];
}

export function PaginationComponent({
    currentPage, totalPages, totalItems,
    itemsPerPage, onPageChange, onItemsPerPageChange,
}: PaginationComponentProps) {
    if (totalPages <= 1) return null;

    const start = (currentPage - 1) * itemsPerPage + 1;
    const end = Math.min(currentPage * itemsPerPage, totalItems);
    const pages = getPageNumbers(currentPage, totalPages);

    return (
        <div className="flex flex-col gap-3 border-t border-border px-4 pt-4 pb-1 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex flex-wrap items-center gap-3">
                <p className="text-sm text-muted-foreground">
                    Mostrando {start} - {end} de {totalItems}
                </p>
                <select
                    value={itemsPerPage}
                    onChange={(e) => onItemsPerPageChange(Number(e.target.value))}
                    className="cursor-pointer rounded-lg border border-input bg-card px-2 py-1.5 text-sm text-foreground focus:border-ring focus:outline-none"
                >
                    {ITEMS_PER_PAGE_OPTIONS.map((n) => (
                        <option key={n} value={n}>{n} por página</option>
                    ))}
                </select>
            </div>

            <div className="flex items-center justify-between gap-1 sm:justify-end">
                <button
                    onClick={() => onPageChange(Math.max(1, currentPage - 1))}
                    disabled={currentPage === 1}
                    aria-label="Página anterior"
                    className="flex size-11 items-center justify-center rounded-lg border border-border transition hover:bg-muted disabled:cursor-not-allowed disabled:opacity-50 sm:size-9"
                >
                    <ChevronLeft size={18} />
                </button>

                <span className="px-2 text-sm font-medium text-foreground sm:hidden">
                    {currentPage} / {totalPages}
                </span>

                <div className="hidden items-center gap-1 sm:flex">
                    {pages.map((page, i) =>
                        typeof page === "string" ? (
                            <span key={page} className="px-2 text-muted-foreground select-none">...</span>
                        ) : (
                            <button
                                key={i}
                                onClick={() => onPageChange(page)}
                                aria-current={page === currentPage ? "page" : undefined}
                                className={`min-w-9 cursor-pointer rounded-lg px-3 py-2 text-sm font-medium transition ${page === currentPage
                                        ? "bg-brand-blue text-white shadow-sm"
                                        : "border border-border text-foreground hover:bg-muted"
                                    }`}
                            >
                                {page}
                            </button>
                        )
                    )}
                </div>

                <button
                    onClick={() => onPageChange(Math.min(totalPages, currentPage + 1))}
                    disabled={currentPage === totalPages}
                    aria-label="Página siguiente"
                    className="flex size-11 items-center justify-center rounded-lg border border-border transition hover:bg-muted disabled:cursor-not-allowed disabled:opacity-50 sm:size-9"
                >
                    <ChevronRight size={18} />
                </button>
            </div>
        </div>
    );
}
