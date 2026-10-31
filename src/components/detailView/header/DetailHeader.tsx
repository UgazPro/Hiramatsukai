
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";

interface DetailHeaderProps {
    title: string;
    subtitle?: React.ReactNode;
    avatar?: React.ReactNode;
    onClose: () => void;
}

export function DetailHeader({
    title,
    subtitle,
    avatar,
    onClose,
}: DetailHeaderProps) {
    return (
        <div className="rounded-lg border-b border-border bg-linear-to-r from-brand-gold/10 to-brand-vermilion/10 p-4 md:p-6">
            <div className="flex items-start justify-between gap-3">
                <div className="flex min-w-0 items-center gap-3 md:gap-4">
                    {avatar}

                    <div className="min-w-0">
                        <h2 className="text-lg font-bold break-words text-foreground sm:text-2xl md:text-3xl">{title}</h2>
                        {subtitle && <div className="mt-2">{subtitle}</div>}
                    </div>
                </div>

                <Button
                    variant="ghost"
                    size="icon"
                    onClick={onClose}
                    aria-label="Cerrar"
                    className="size-11 shrink-0 sm:size-9"
                >
                    <X className="h-4 w-4" />
                </Button>
            </div>
        </div>
    );
}
