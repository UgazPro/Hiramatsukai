
import { Button } from "@/components/ui/button";

interface DetailFooterProps {
    primaryLabel?: string;
    secondaryLabel?: string;
    onPrimary?: () => void;
    onSecondary?: () => void;
    primaryDisabled?: boolean;
    loading?: boolean;
    children?: React.ReactNode;
}

export function DetailFooter({ primaryLabel = "Guardar", secondaryLabel = "Cancelar", onPrimary, onSecondary, primaryDisabled, loading, children, }: DetailFooterProps) {

    return (
        <div className="sticky bottom-0 z-20 border-t border-border bg-card p-3 md:p-4">
            <div className="flex flex-col-reverse items-stretch justify-between gap-3 sm:flex-row sm:items-center">

                {/* Left Side */}
                <div className="text-center sm:text-left">{children}</div>

                {/* Buttons */}
                <div className="flex flex-col gap-2 sm:flex-row">
                    {secondaryLabel && (
                        <Button variant="outline" onClick={onSecondary} className="h-11 w-full sm:h-9 sm:w-auto">
                            {secondaryLabel}
                        </Button>
                    )}

                    {primaryLabel && (
                        <Button
                            onClick={onPrimary}
                            disabled={primaryDisabled || loading}
                            className="h-11 w-full sm:h-9 sm:w-auto"
                        >
                            {loading ? "Guardando..." : primaryLabel}
                        </Button>
                    )}
                </div>
            </div>
        </div>

    );

}
