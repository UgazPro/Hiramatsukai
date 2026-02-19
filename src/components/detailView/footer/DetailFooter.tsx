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
        <div className="sticky bottom-0 bg-white border-t border-gray-300 p-4 z-20">
            <div className="flex justify-between items-center">

                {/* Left Side */}
                <div>{children}</div>

                {/* Buttons */}
                <div className="flex gap-2">
                    {secondaryLabel && (
                        <Button variant="outline" onClick={onSecondary}>
                            {secondaryLabel}
                        </Button>
                    )}

                    {primaryLabel && (
                        <Button
                            onClick={onPrimary}
                            disabled={primaryDisabled || loading}
                        >
                            {loading ? "Guardando..." : primaryLabel}
                        </Button>
                    )}
                </div>
            </div>
        </div>

    );

}


