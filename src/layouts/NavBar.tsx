import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const menuItems = [
    { id: "home", label: "Inicio" },
    { id: "karate", label: "Karatedo" },
    { id: "kobudo", label: "Kobudo" },
    { id: "kendoIaido", label: "Kendo Iaido" },
    { id: "dojos", label: "Dojos" },
];

export function NavBar() {
    const navigate = useNavigate();

    const handleScroll = (id: string) => {
        const section = document.getElementById(id);
        if (section) {
            section.scrollIntoView({ behavior: "smooth" });
            return;
        }

        navigate("/");
        window.setTimeout(() => {
            document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
        }, 220);
    };

    return (
        <div className="border-b border-brand-ink/10 bg-brand-washi/80 backdrop-blur-xl transition-all duration-300">
            <nav aria-label="Secciones principales" className="mx-auto flex max-w-7xl items-center justify-center gap-1 px-4 py-1.5">
                {menuItems.map((item) => (
                    <button
                        key={item.id}
                        type="button"
                        onClick={() => handleScroll(item.id)}
                        className="group relative cursor-pointer rounded-full px-4 py-2 text-sm font-medium tracking-wide text-brand-ink/75 transition-colors duration-200 hover:bg-brand-ink/5 hover:text-brand-ink focus-visible:bg-brand-ink/5 focus-visible:text-brand-ink"
                    >
                        {item.label}
                        <span
                            aria-hidden="true"
                            className="absolute inset-x-3 -bottom-0.5 h-0.5 origin-center scale-x-0 rounded-full bg-brand-gold transition-transform duration-300 group-hover:scale-x-100"
                        />
                    </button>
                ))}
            </nav>
        </div>
    );
}

interface NavBarMobileProps {
    goToScroll: (section: string) => void;
}

export function NavBarMobile({ goToScroll }: NavBarMobileProps) {
    const location = useLocation();
    const [open, setOpen] = useState(false);
    const [headerHeight, setHeaderHeight] = useState(0);

    useEffect(() => {
        const measure = () => {
            const header = document.querySelector("header");
            if (header) {
                setHeaderHeight(header.offsetHeight);
            }
        };
        measure();
        window.addEventListener("resize", measure);
        return () => window.removeEventListener("resize", measure);
    }, []);

    useEffect(() => {
        const handleScroll = () => {
            setOpen(false);
        };

        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.key === "Escape") setOpen(false);
        };

        window.addEventListener("scroll", handleScroll, { passive: true });
        window.addEventListener("keydown", handleKeyDown);
        return () => {
            window.removeEventListener("scroll", handleScroll);
            window.removeEventListener("keydown", handleKeyDown);
        };
    }, []);

    const handleSelect = (id: string) => {
        goToScroll(id);
        setOpen(false);
    };

    return (
        <div>
            <button
                type="button"
                onClick={() => setOpen((prev) => !prev)}
                aria-expanded={open}
                aria-controls="mobile-section-nav"
                aria-label={open ? "Cerrar menú de secciones" : "Abrir menú de secciones"}
                className="flex h-11 w-11 cursor-pointer items-center justify-center rounded-full border border-white/15 bg-white/5 text-brand-washi transition-colors duration-200 hover:bg-white/10 focus-visible:border-brand-gold"
            >
                {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>

            <AnimatePresence>
                {open && !location.pathname.includes("/admin") && (
                    <motion.div
                        key="mobile-menu"
                        id="mobile-section-nav"
                        initial={{ opacity: 0, y: -8 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -8 }}
                        transition={{ duration: 0.2, ease: "easeInOut" }}
                        className="fixed left-0 right-0 z-50"
                        style={{ top: headerHeight }}
                    >
                        <div className="rounded-b-3xl border-b border-white/10 bg-brand-sumi shadow-lift">
                            <div className="mx-auto flex max-w-md flex-col gap-1 px-4 py-4">
                                {menuItems.map((item) => (
                                    <button
                                        key={item.id}
                                        type="button"
                                        onClick={() => handleSelect(item.id)}
                                        className="cursor-pointer rounded-xl px-4 py-3 text-left text-base font-medium tracking-wide text-brand-washi/85 transition-colors duration-200 hover:bg-white/10 hover:text-white focus-visible:bg-white/10"
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
