import { ArrowLeft, ArrowUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";
import { useLocation } from "react-router";

export default function FloatingButtons() {

    const [showBackButton, setShowBackButton] = useState(false);
    const [showScrollTop, setShowScrollTop] = useState(false);

    const location = useLocation();

    // Detectar si el usuario puede volver atrás
    useEffect(() => {
        const handleHistoryChange = () => {
            setShowBackButton(window.history.length > 1);
        };

        handleHistoryChange(); // Verificar estado inicial
        window.addEventListener('popstate', handleHistoryChange);

        return () => window.removeEventListener('popstate', handleHistoryChange);
    }, []);

    // Mostrar botón de scroll al top
    useEffect(() => {
        const handleScroll = () => {
            setShowScrollTop(window.scrollY > 300);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const handleBack = () => {
        if (window.history.length > 1) {
            window.history.back();
        } else {
            // Si no hay historial, redirigir al home
            window.location.href = '/';
        }
    };

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    // Solo mostrar en móvil
    return (
        <div className=" fixed bottom-6 left-6 z-50 flex flex-col gap-3 w-full">

            {/* Botón Volver (solo si hay historial) */}
            {showBackButton && location.pathname !== '/' && (
                <Button
                    onClick={handleBack}
                    size="icon"
                    className="h-14 w-14 rounded-full bg-linear-to-br from-yellow-500 to-yellow-600 shadow-lg hover:shadow-yellow-500/30 hover:scale-105 active:scale-95 transition-all duration-300 group animate-slide-up"
                    style={{ animationDelay: '100ms' }}
                >
                    <ArrowLeft className="h-6 w-6 text-white" />
                    {/* Efecto hover */}
                    <span className="absolute inset-0 bg-white/10 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    {/* Tooltip */}
                    <span className="absolute -top-10 left-1/2 transform -translate-x-1/2 bg-gray-900 text-white text-xs px-3 py-1 rounded-lg whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        Volver atrás
                    </span>
                </Button>
            )}

            {/* Botón Ir Arriba (solo cuando se ha hecho scroll) */}
            {showScrollTop && (
                <Button
                    onClick={scrollToTop}
                    size="icon"
                    className="h-14 w-14 rounded-full bg-linear-to-br from-red-800 to-red-900 shadow-lg hover:shadow-red-500/30 hover:scale-105 active:scale-95 transition-all duration-300 group animate-slide-up absolute bottom-0 right-12 lg:right-18"
                    style={{ animationDelay: '200ms' }}
                >
                    <ArrowUp className="h-6 w-6 text-white" />
                    {/* Efecto hover */}
                    <span className="absolute inset-0 bg-white/10 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    {/* Tooltip */}
                    <span className="absolute -top-10 left-1/2 transform -translate-x-1/2 bg-gray-900 text-white text-xs px-3 py-1 rounded-lg whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        Ir arriba
                    </span>
                </Button>
            )}

            {/* Solo un botón si ambos no están visibles */}
            {!showBackButton && !showScrollTop && (
                <Button
                    onClick={() => window.location.href = '/'}
                    size="icon"
                    className="h-14 w-14 rounded-full bg-linear-to-br from-red-800 to-red-900 shadow-lg hover:shadow-red-500/30 hover:scale-105 active:scale-95 transition-all duration-300 animate-pulse-once"
                >
                    <span className="text-white font-bold text-lg">🏠</span>
                    <span className="absolute -top-10 left-1/2 transform -translate-x-1/2 bg-gray-900 text-white text-xs px-3 py-1 rounded-lg whitespace-nowrap">
                        Ir al inicio
                    </span>
                </Button>
            )}
        </div>
    );
}