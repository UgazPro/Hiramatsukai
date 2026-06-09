import { Check } from "lucide-react";

export function StepDot({ number, active, completed, label }: { number: number; active: boolean; completed: boolean; label: string }) {
    return (
        <div className="flex items-center gap-1.5">
            <div
                className={`h-8 w-8 rounded-full flex items-center justify-center text-sm font-bold transition-all duration-300 ${completed
                    ? "bg-linear-to-br from-amber-500 to-red-500 text-white"
                    : active
                        ? "bg-linear-to-br from-amber-500 to-red-500 text-white shadow-md"
                        : "bg-gray-200 text-gray-500"
                    }`}
            >
                {completed ? <Check className="h-4 w-4" /> : number}
            </div>
            <span
                className={`text-xs font-medium whitespace-nowrap ${active ? "text-amber-700" : completed ? "text-amber-600" : "text-gray-400"
                    }`}
            >
                {label}
            </span>
        </div>
    );
}