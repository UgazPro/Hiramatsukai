import { FC } from "react";

export interface LoaderProps {
    message?: string;
}

export const Loader: FC<LoaderProps> = ({ message }: LoaderProps) => {
    return (
        <div className="flex flex-col items-center gap-3">
            <div className="h-10 w-10 animate-spin rounded-full border-[3px] border-gray-200 border-t-(--redColor)" />
            <p className="text-sm text-gray-400 animate-pulse">{message || "Cargando..."}</p>
        </div>
    )
}
