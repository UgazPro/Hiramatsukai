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
        <div className="sticky bottom-0 bg-white border-t border-gray-300 p-3 md:p-4 z-20">
            <div className="flex flex-col-reverse sm:flex-row justify-between items-stretch sm:items-center gap-3">

                {/* Left Side */}
                <div className="text-center sm:text-left">{children}</div>

                {/* Buttons */}
                <div className="flex flex-col sm:flex-row gap-2">
                    {secondaryLabel && (
                        <Button variant="outline" onClick={onSecondary} className="w-full sm:w-auto">
                            {secondaryLabel}
                        </Button>
                    )}

                    {primaryLabel && (
                        <Button
                            onClick={onPrimary}
                            disabled={primaryDisabled || loading}
                            className="w-full sm:w-auto"
                        >
                            {loading ? "Guardando..." : primaryLabel}
                        </Button>
                    )}
                </div>
            </div>
        </div>

    );

}
