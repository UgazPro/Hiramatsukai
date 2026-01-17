import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
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
    const [isPlaying, setIsPlaying] = useState(autoPlay);
    const [isHovering, setIsHovering] = useState(false);

    // Función para siguiente slide
    const nextSlide = () => {
        setCurrentIndex((prev) => (prev + 1) % images.length);
    };

    // Función para slide anterior
    const prevSlide = () => {
        setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
    };

    // Autoplay
    useState(() => {
        if (!isPlaying) return;

        const intervalId = setInterval(() => {
            if (!isHovering) {
                nextSlide();
            }
        }, interval);

        return () => clearInterval(intervalId);
    });

    return (
        <div
            className="relative w-full overflow-hidden shadow-2xl"
            onMouseEnter={() => setIsHovering(true)}
            onMouseLeave={() => setIsHovering(false)}
        >
            {/* Main Carousel */}
            <div className="relative">

                {/* Current Image */}
                <div className={cn("w-full relative overflow-hidden", height)}>
                    <img
                        src={images[currentIndex].src}
                        alt={images[currentIndex].alt}
                        className="w-full h-full object-cover transition-transform duration-700 ease-out hover:scale-105"
                    />

                    {/* Text Overlay */}
                    <div className="absolute inset-0 bg-linear-to-t from-black/70 via-black/40 to-transparent" />

                    {/* Text */}
                    <div className="absolute bottom-0 left-0 right-0 p-6 md:p-10 text-white">
                        <div className="max-w-3xl mx-auto">
                            <h3 className="text-2xl md:text-4xl font-bold mb-3" style={{ fontFamily: "Kavoon" }}>
                                {images[currentIndex].title}
                            </h3>
                            <p className="text-base md:text-lg text-gray-200 opacity-90">
                                {images[currentIndex].description}
                            </p>
                        </div>
                    </div>

                    {/* Slides Counter */}
                    <div className="absolute top-4 right-4 bg-black/60 text-white px-3 py-1 rounded-full text-sm font-medium">
                        {currentIndex + 1} / {images.length}
                    </div>
                    
                </div>

                {showControls && (
                    <>
                        {/* Prev Button */}
                        <Button
                            onClick={prevSlide}
                            size="icon"
                            className="absolute left-4 top-1/2 -translate-y-1/2 h-10 w-10 md:h-12 md:w-12 rounded-full bg-black/50 hover:bg-black/70 text-white border border-white/20 backdrop-blur-sm transition-all duration-300 hover:scale-110"
                        >
                            <ChevronLeft className="h-5 w-5 md:h-6 md:w-6" />
                        </Button>

                        {/* Next Button */}
                        <Button
                            onClick={nextSlide}
                            size="icon"
                            className="absolute right-4 top-1/2 -translate-y-1/2 h-10 w-10 md:h-12 md:w-12 rounded-full bg-black/50 hover:bg-black/70 text-white border border-white/20 backdrop-blur-sm transition-all duration-300 hover:scale-110"
                        >
                            <ChevronRight className="h-5 w-5 md:h-6 md:w-6" />
                        </Button>
                    </>
                )}

                {/* Controles inferiores */}
                <div className="absolute bottom-4 left-0 right-0">
                    <div className="flex items-center justify-center gap-4">
                        {/* Indicadores de puntos */}
                        {showDots && (
                            <div className="flex gap-2">
                                {images.map((_, index) => (
                                    <button
                                        key={index}
                                        onClick={() => setCurrentIndex(index)}
                                        className={cn(
                                            "h-2 rounded-full transition-all duration-300",
                                            index === currentIndex
                                                ? "w-8 bg-yellow-500"
                                                : "w-2 bg-white/50 hover:bg-white/80"
                                        )}
                                        aria-label={`Ir a slide ${index + 1}`}
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



