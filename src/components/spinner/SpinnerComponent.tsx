export default function SpinnerComponent() {
    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black/30 backdrop-blur-sm z-50">
            <div className="flex flex-col items-center gap-3">
                <div className="h-10 w-10 animate-spin rounded-full border-[3px] border-gray-200 border-t-(--redColor)" />
                <p className="text-sm text-gray-400 animate-pulse">Cargando...</p>
            </div>
        </div>
    );
}
