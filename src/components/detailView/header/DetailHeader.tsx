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
        <div className="bg-linear-to-r from-amber-50 to-red-50 border-b border-gray-300 rounded-lg p-6">
            <div className="flex justify-between items-start">
                <div className="flex items-center gap-4">
                    {avatar}

                    <div>
                        <h2 className="text-3xl font-bold text-gray-900">{title}</h2>
                        {subtitle && <div className="mt-2">{subtitle}</div>}
                    </div>
                </div>

                <Button variant="ghost" size="sm" onClick={onClose}>
                    <X className="h-4 w-4" />
                </Button>
            </div>
        </div>
    );
}

