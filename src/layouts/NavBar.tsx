import { useEffect, useState } from "react";
import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";

import { motion, AnimatePresence } from "framer-motion";

export default function NavBar() {
    const [open, setOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setOpen(false);
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const handleScroll = (id: string) => {
        const section = document.getElementById(id);
        if (section) {
            section.scrollIntoView({ behavior: 'smooth' });
        }
        setOpen(false);
    };

    const menuItems = [
        { id: "home", label: "Inicio" },
        { id: "karate", label: "Karatedo" },
        { id: "kobudo", label: "Kobudo" },
        { id: "kendoIaido", label: "Kendo Iaido" },
        { id: "dojos", label: "Dojos" },
    ];

    return (

        <div className={`text-white lg:text-black lg:bg-(--yellowColor) transition-all duration-300 py-2`}>

            {/* DESKTOP MENU */}
            <nav className="hidden md:flex justify-around">
                {menuItems.map((item) => (
                    <button
                        key={item.id}
                        onClick={() => handleScroll(item.id)}
                        style={{ fontFamily: "Kavoon" }}
                        className="text-xl cursor-pointer font-medium transition-colors hover:text-primary bg-transparent"
                    >
                        {item.label}
                    </button>
                ))}
            </nav>

            {/* MOBILE MENU */}
            <Button
                variant="ghost"
                size="lg"
                onClick={() => setOpen(!open)}
                className="lg:hidden transition-all duration-300 z-50"
            >
                <Menu className="h-6 w-6 size-4 text-white" />
            </Button>

            <AnimatePresence>
                {open && !location.pathname.includes("/admin") && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                        className="overflow-hidden bg-black md:hidden text-black z-50"
                    >
                        <div className="absolute top-full left-0 right-0 bg-(--yellowColor) shadow-lg z-40">
                            <div className="flex flex-col items-center space-y-4 py-4">
                                {menuItems.map((item) => (
                                    <button
                                        key={item.id}
                                        onClick={() => handleScroll(item.id)}
                                        style={{ fontFamily: "Kavoon" }}
                                        className="text-xl cursor-pointer font-medium transition-colors hover:text-primary bg-transparent p-2 w-full text-center"
                                    >
                                        {item.label}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}