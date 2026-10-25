import { ArrowLeft, ArrowUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";
import { useLocation } from "react-router";

export default function FloatingButtons() {

    const [showBackButton, setShowBackButton] = useState(false);
    const [showScrollTop, setShowScrollTop] = useState(false);

    const location = useLocation();

    useEffect(() => {
        const handleHistoryChange = () => {
            setShowBackButton(window.history.length > 1);
        };

        handleHistoryChange();
        window.addEventListener('popstate', handleHistoryChange);

        return () => window.removeEventListener('popstate', handleHistoryChange);
    }, []);

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
            window.location.href = '/';
        }
    };

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    return (

        <div className="fixed bottom-5 left-4 z-50 flex flex-col gap-2.5 sm:bottom-6 sm:left-6 sm:gap-3">

            {showBackButton && location.pathname !== '/' && (
                <Button
                    type="button"
                    onClick={handleBack}
                    size="icon"
                    aria-label="Volver atrás"
                    className="group h-11 w-11 rounded-full sm:h-12 sm:w-12 border border-brand-gold/50 bg-brand-washi/80 text-brand-ink shadow-soft backdrop-blur-lg transition-all duration-300 hover:-translate-y-0.5 hover:border-brand-gold hover:bg-brand-gold hover:text-brand-sumi hover:shadow-gold active:translate-y-0"
                >
                    <ArrowLeft className="h-5 w-5" aria-hidden="true" />
                </Button>
            )}

            {showScrollTop && (
                <Button
                    type="button"
                    onClick={scrollToTop}
                    size="icon"
                    aria-label="Ir arriba"
                    className="group h-11 w-11 rounded-full sm:h-12 sm:w-12 border border-white/10 bg-brand-vermilion text-white shadow-soft transition-all duration-300 hover:-translate-y-0.5 hover:bg-brand-vermilion-dark active:translate-y-0"
                >
                    <ArrowUp className="h-5 w-5" aria-hidden="true" />
                </Button>
            )}

        </div>
    );
}
