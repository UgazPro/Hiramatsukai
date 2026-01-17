import { useEffect, useState } from "react";
import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function NavBar() {

    const [open, setOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);

    // Este efecto solo maneja el estado de scroll, NO cierra el menú
    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);
            setOpen(false);
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, []); // Sin dependencias, se ejecuta solo una vez

    const handleScroll = (id: string) => {
        const section = document.getElementById(id);
        if (section) {
            section.scrollIntoView({ behavior: 'smooth' });
        }
        setOpen(false);
    };

    const menuItems = [
        { id: "home", label: "Inicio" },
        { id: "karate", label: "Karate" },
        { id: "kobudo", label: "Kobudo" },
        { id: "kendoIaido", label: "Kendo Iaido" },
        { id: "dojos", label: "Dojos" },
    ];

    return (

        <div className={`bg-(--yellowColor) transition-all duration-300 ${isScrolled ? 'py-2' : 'md:py-5 py-2'}`}>

            {/* DESKTOP MENU */}
            <nav className="hidden md:flex justify-around">
                {menuItems.map((item) => (
                    <button
                        key={item.id}
                        onClick={() => handleScroll(item.id)}
                        style={{ fontFamily: "Kavoon" }}
                        className="text-xl cursor-pointer font-medium transition-colors hover:text-primary bg-transparent border-none p-2"
                    >
                        {item.label}
                    </button>
                ))}
            </nav>

            {/* MOBILE MENU */}
            <nav className="flex flex-col items-center w-full md:hidden">
                <Button
                    variant="ghost"
                    size="lg"
                    onClick={() => setOpen(!open)}
                    className="hover:bg-(--yellowColor) transition-all duration-300 z-50"
                >
                    <Menu className="h-6 w-6 size-4 text-black" />
                </Button>

                {open && (
                    <div className="absolute top-full left-0 right-0 bg-(--yellowColor) shadow-lg z-40">
                        <div className="flex flex-col items-center space-y-4 py-4">
                            {menuItems.map((item) => (
                                <button
                                    key={item.id}
                                    onClick={() => handleScroll(item.id)}
                                    style={{ fontFamily: "Kavoon" }}
                                    className="text-xl cursor-pointer font-medium transition-colors hover:text-primary bg-transparent border-none p-2 w-full text-center"
                                >
                                    {item.label}
                                </button>
                            ))}
                        </div>
                    </div>
                )}
            </nav>
        </div>
    );
}