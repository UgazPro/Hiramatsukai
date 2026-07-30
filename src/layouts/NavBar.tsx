import { useEffect, useState } from "react";
import { useLocation } from "react-router";
import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";

export function NavBar() {
    useEffect(() => {
        const handleScroll = () => {
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const handleScroll = (id: string) => {
        const section = document.getElementById(id);
        if (section) {
            section.scrollIntoView({ behavior: 'smooth' });
        }
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
            <nav className="flex justify-around">
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
        </div>
    );
}

interface NavBarMobileProps {
    goToScroll: (section: string) => void
}

export function NavBarMobile({ goToScroll }: NavBarMobileProps) {
    const location = useLocation();
    const [open, setOpen] = useState(false);
    const [headerHeight, setHeaderHeight] = useState(0);

    useEffect(() => {
        const measure = () => {
            const header = document.querySelector('header');
            if (header) {
                setHeaderHeight(header.offsetHeight);
            }
        };
        measure();
        window.addEventListener('resize', measure);
        return () => window.removeEventListener('resize', measure);
    }, []);

    useEffect(() => {
        const handleScroll = () => {
            setOpen(false);
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const handleScroll = (id: string) => {
        goToScroll(id);
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

            {/* MOBILE BUTTON */}
            <Button
                variant="ghost"
                size="lg"
                onClick={() => setOpen(!open)}
                className="lg:hidden transition-all duration-300 z-50"
            >
                <Menu className="h-6 w-6 size-4 text-white" />
            </Button>

            {/* MOBILE MENU PANEL */}
            <AnimatePresence>
                {open && !location.pathname.includes("/admin") && (
                    <motion.div
                        key="mobile-menu"
                        initial={{ opacity: 0, y: -8 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -8 }}
                        transition={{ duration: 0.2, ease: "easeInOut" }}
                        className="fixed left-0 right-0 z-50"
                        style={{ top: headerHeight }}
                    >
                        <div className="bg-(--yellowColor) shadow-lg">
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
