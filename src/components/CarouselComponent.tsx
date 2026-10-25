import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useReducedMotion } from "motion/react";
import { cn } from "@/lib/utils";

interface ImageSlide {
    id: number;
    src: string;
    alt: string;
    title?: string;
    description?: string;
}

interface ImageCarouselProps {
    images?: ImageSlide[];
    autoPlay?: boolean;
    interval?: number;
    showControls?: boolean;
    showDots?: boolean;
    height?: string;
}

const defaultImages: ImageSlide[] = [
    {
        id: 1,
        src: "/Hiramatsukai.jpg",
        alt: "Karate training session",
        title: "Entrenamiento Tradicional",
        description: "Clases guiadas por maestros certificados con más de 30 años de experiencia"
    },
    {
        id: 2,
        src: "/Hiramatsukai.jpg",
        alt: "Martial arts weapons",
        title: "Kobudo Okinawense",
        description: "Armas tradicionales y técnicas ancestrales preservadas"
    },
    {
        id: 3,
        src: "/Hiramatsukai.jpg",
        alt: "Kendo practice",
        title: "Kendo & Iaido",
        description: "El camino de la espada japonesa y su filosofía"
    },
    {
        id: 4,
        src: "/Hiramatsukai.jpg",
        alt: "Dojo training",
        title: "Nuestros Dojos",
        description: "Espacios dedicados al desarrollo físico, mental y espiritual"
    },
    {
        id: 5,
        src: "/Hiramatsukai.jpg",
        alt: "Martial arts discipline",
        title: "Disciplina y Valores",
        description: "Formación integral en valores marciales"
    }
];

export default function CarouselComponent({
    images = defaultImages,
    autoPlay = true,
    interval = 5000,
    showControls = true,
    showDots = true,
    height = "h-[500px] md:h-[600px]"
}: ImageCarouselProps) {

    const [currentIndex, setCurrentIndex] = useState(0);
    const [isPaused, setIsPaused] = useState(false);
    const shouldReduceMotion = useReducedMotion();

    const nextSlide = () => {
        setCurrentIndex((prev) => (prev + 1) % images.length);
    };

    const prevSlide = () => {
        setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
    };

    useEffect(() => {
        if (!autoPlay || shouldReduceMotion || isPaused) return;

        const intervalId = setInterval(() => {
            setCurrentIndex((prev) => (prev + 1) % images.length);
        }, interval);

        return () => clearInterval(intervalId);
    }, [autoPlay, shouldReduceMotion, isPaused, interval, images.length]);

    return (
        <div
            className="relative w-full overflow-hidden"
            role="region"
            aria-roledescription="carrusel"
            aria-label="Galería de Hiramatsukai"
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
            onFocusCapture={() => setIsPaused(true)}
            onBlurCapture={() => setIsPaused(false)}
        >
            <div className="relative">

                <div className={cn("relative w-full overflow-hidden", height)}>
                    <img
                        key={images[currentIndex].id}
                        src={images[currentIndex].src}
                        alt={images[currentIndex].alt}
                        className="h-full w-full object-cover"
                    />

                    <div aria-hidden="true" className="absolute inset-0 bg-linear-to-t from-brand-sumi/90 via-brand-sumi/45 to-brand-sumi/15" />

                    <div className="absolute bottom-0 left-0 right-0 p-6 md:p-10 text-white">
                        <div className="mx-auto flex max-w-3xl flex-col items-center text-center">
                            <div className="glass-dark flex w-full max-w-2xl flex-col gap-2 rounded-2xl px-5 py-4">
                                <h3 className="font-serif text-xl font-semibold text-white md:text-3xl">
                                    {images[currentIndex].title}
                                </h3>
                                <p className="text-sm leading-relaxed text-brand-washi/85 md:text-base">
                                    {images[currentIndex].description}
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="absolute right-4 top-4 rounded-full border border-white/20 bg-brand-sumi/60 px-3 py-1 text-xs font-medium text-white backdrop-blur-md">
                        {currentIndex + 1} / {images.length}
                    </div>

                </div>

                {showControls && (
                    <>
                        <Button
                            type="button"
                            onClick={prevSlide}
                            size="icon"
                            aria-label="Diapositiva anterior"
                            className="absolute left-4 top-1/2 h-11 w-11 -translate-y-1/2 rounded-full border border-white/25 bg-brand-sumi/50 text-white backdrop-blur-md transition-all duration-300 hover:bg-brand-sumi/80 hover:text-brand-gold md:h-12 md:w-12"
                        >
                            <ChevronLeft className="h-5 w-5 md:h-6 md:w-6" aria-hidden="true" />
                        </Button>

                        <Button
                            type="button"
                            onClick={nextSlide}
                            size="icon"
                            aria-label="Diapositiva siguiente"
                            className="absolute right-4 top-1/2 h-11 w-11 -translate-y-1/2 rounded-full border border-white/25 bg-brand-sumi/50 text-white backdrop-blur-md transition-all duration-300 hover:bg-brand-sumi/80 hover:text-brand-gold md:h-12 md:w-12"
                        >
                            <ChevronRight className="h-5 w-5 md:h-6 md:w-6" aria-hidden="true" />
                        </Button>
                    </>
                )}

                <div className="absolute bottom-5 left-0 right-0">
                    <div className="flex items-center justify-center gap-3">
                        {showDots && (
                            <div className="flex gap-2">
                                {images.map((_, index) => (
                                    <button
                                        key={index}
                                        type="button"
                                        onClick={() => setCurrentIndex(index)}
                                        className={cn(
                                            "h-2.5 cursor-pointer rounded-full transition-all duration-300",
                                            index === currentIndex
                                                ? "w-9 bg-brand-gold"
                                                : "w-2.5 bg-white/45 hover:bg-white/80"
                                        )}
                                        aria-label={`Ir a la diapositiva ${index + 1}`}
                                        aria-current={index === currentIndex}
                                    />
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
