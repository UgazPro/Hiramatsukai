import { FC } from "react";
import { Loader2 } from "lucide-react";

export interface LoaderProps {
    message?: string;
    size?: "sm" | "md" | "lg";
    color?: string;
}

const sizeClasses: Record<string, string> = {
    sm: "h-5 w-5",
    md: "h-8 w-8",
    lg: "h-10 w-10",
};

export const Loader: FC<LoaderProps> = ({
    message = "Cargando...",
    size = "md",
    color = "text-amber-600",
}) => {
    return (
        <>
            <Loader2 className={`${sizeClasses[size]} animate-spin ${color}`} />
            {message && <span className="ml-3 text-gray-600">{message}</span>}
        </>
    );
};
