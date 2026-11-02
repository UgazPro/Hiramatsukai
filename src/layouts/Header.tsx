import { useEffect, useRef, useState, type FocusEvent } from "react";
import { Link, useLocation, useNavigate } from "react-router";
import { NavBar, NavBarMobile } from "./NavBar";
import { useAuthStore } from "@/stores/auth.store";
import { useUserData } from "@/helpers/token";
import { clearSession } from "@/utils/clearSession";
import { cn } from "@/lib/utils";
import { House, LogOut, LayoutDashboard, Building2, Menu } from "lucide-react";

import {
    DropdownMenu,
    DropdownMenuTrigger,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
interface HeaderProps {
    onToggleMobileNav?: () => void;
}

export default function Header({ onToggleMobileNav }: HeaderProps) {
    const navigate = useNavigate();
    const location = useLocation();

    const [scrolled, setScrolled] = useState(false);
    const [compact, setCompact] = useState(false);
    const [hovered, setHovered] = useState(false);
    const [focused, setFocused] = useState(false);

    const lastScrollY = useRef(0);
    const ticking = useRef(false);

    const isAuthenticated = useAuthStore((s) => s.isAuthenticated);

    const user = useUserData();

    const handleLogout = () => {
        clearSession();
        navigate("/");
    };

    const userName = user?.name || "";
    const userLastName = user?.lastName || "";
    const userRole = user?.roles?.[0]?.rol || "";

    useEffect(() => {
        const onScroll = () => {
            if (ticking.current) return;
            ticking.current = true;

            window.requestAnimationFrame(() => {
                const currentScrollY = window.scrollY;
                const delta = currentScrollY - lastScrollY.current;

                setScrolled(currentScrollY > 12);

                if (currentScrollY <= 12) {
                    setCompact(false);
                } else if (Math.abs(delta) > 6) {
                    setCompact(delta > 0);
                }

                lastScrollY.current = currentScrollY;
                ticking.current = false;
            });
        };

        onScroll();
        window.addEventListener("scroll", onScroll, { passive: true });
        return () => window.removeEventListener("scroll", onScroll);
    }, []);

    useEffect(() => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    }, [location.pathname]);

    const goHead = () => {
        if (location.pathname !== "/") return;
        const section = document.getElementById("home");
        if (section) {
            section.scrollIntoView({ behavior: "smooth" });
        }
    };

    const goToScroll = (id: string) => {
        const section = document.getElementById(id);
        if (section) {
            section.scrollIntoView({ behavior: "smooth" });
        }
    };

    const isAdmin = location.pathname.includes("/admin");
    const isLogin = location.pathname.includes("/login");
    const isStatic = isAdmin || isLogin;

    const interacting = hovered || focused;
    const compacted = compact && !interacting && !isStatic;
    const glass = !isStatic && scrolled;

    const handleFocus = () => setFocused(true);
    const handleBlur = (event: FocusEvent<HTMLElement>) => {
        if (!event.currentTarget.contains(event.relatedTarget as Node | null)) {
            setFocused(false);
        }
    };

    return (
        <header
            onPointerEnter={(event) => {
                if (event.pointerType === "mouse") setHovered(true);
            }}
            onPointerLeave={(event) => {
                if (event.pointerType === "mouse") setHovered(false);
            }}
            onFocus={handleFocus}
            onBlur={handleBlur}
            className={cn(
                "w-full transition-[background-color,border-color,box-shadow] duration-300",
                isStatic
                    ? "z-50 border-b border-brand-wood/20 bg-transparent backdrop-blur-xl"
                    : cn(
                        "sticky top-0 z-50",
                        glass
                            ? "border-b border-brand-wood/30 bg-background/80 shadow-soft backdrop-blur-xl"
                            : "border-b border-transparent bg-transparent backdrop-blur-xl",
                    ),
            )}
        >
            <div
                className={cn(
                    "flex w-full items-center justify-between gap-4 px-2 transition-[height] duration-300 ease-out lg:px-8",
                    compacted ? "h-14 lg:h-16" : "h-18 lg:h-20",
                )}
            >
                <div className="flex items-center gap-2 lg:w-1/4">
                    <div className="block lg:hidden">
                        {!isAdmin && !isLogin && <NavBarMobile goToScroll={goToScroll} />}
                    </div>
                    <button
                        type="button"
                        onClick={onToggleMobileNav}
                        aria-label="Abrir menú de administración"
                        className={`${isAdmin ? "flex" : "hidden"} h-11 w-11 cursor-pointer items-center justify-center rounded-full border border-brand-blue/30 bg-brand-blue/5 text-brand-blue-deep transition-colors focus-visible:border-brand-blue md:hidden`}
                    >
                        <Menu className="h-5 w-5" />
                    </button>
                    <Link
                        to={isAdmin ? "/admin" : "/"}
                        onClick={goHead}
                        aria-label="Hiramatsukai Internacional - Inicio"
                        className="group flex items-center gap-3 rounded-full focus-visible:outline-offset-4"
                    >
                        {!isAdmin && (
                            <span className="rounded-full bg-white p-0.5 shadow-soft ring-1 ring-brand-copper/50 transition-all duration-300 group-hover:scale-105 group-hover:ring-brand-copper">
                                <img
                                    src="/oki2.png"
                                    alt="Emblema Hiramatsukai Internacional"
                                    className={cn(
                                        "rounded-full object-contain transition-all duration-300",
                                        compacted ? "h-9 w-9" : "h-10 w-10 sm:h-12 sm:w-12",
                                    )}
                                />
                            </span>
                        )}
                        <span className="flex flex-col items-start leading-none">
                            <span
                                className={cn(
                                    "font-script text-gray-900 transition-all duration-300",
                                    compacted
                                        ? "text-lg sm:text-2xl lg:text-3xl"
                                        : "text-xl sm:text-3xl lg:text-4xl",
                                )}
                            >
                                Hiramatsukai
                            </span>
                            <span
                                className={cn(
                                    "mt-1.5 mx-auto font-semibold uppercase tracking-[0.32em] text-brand-copper-deep transition-all duration-300",
                                    compacted
                                        ? "text-[8px] lg:text-[9px]"
                                        : "text-[9px] sm:text-[10px] lg:text-[11px]",
                                )}
                            >
                                Internacional
                            </span>
                        </span>
                    </Link>
                </div>

                <div className="hidden lg:block">
                    {!isAdmin && !isLogin && <NavBar />}
                </div>

                <div className="flex items-center justify-end gap-2 lg:w-1/4">
                    {isAuthenticated ? (
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild className="cursor-pointer">
                                <button
                                    type="button"
                                    aria-label="Abrir menú de usuario"
                                    className="flex items-center justify-center gap-4 rounded-full focus-visible:outline-offset-4"
                                >
                                    <span className="hidden flex-col items-end text-right lg:flex">
                                        <span className="text-sm font-medium text-gray-900">
                                            {userName} {userLastName}
                                        </span>
                                        <span className="text-xs text-brand-muted">{userRole}</span>
                                    </span>
                                    <Avatar size="lg" className="bg-brand-blue/10 text-brand-blue-deep ring-1 ring-brand-blue/20">
                                        <AvatarFallback className="font-bold text-sm text-brand-blue-deep">
                                            {userName?.[0]}{userLastName?.[0]}
                                        </AvatarFallback>
                                    </Avatar>
                                </button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent
                                align="end"
                                className={cn("w-48", !isAdmin && "site-theme")}
                            >
                                <div className="p-1">
                                    <p className="font-medium">{userName} {userLastName}</p>
                                    <p className="text-xs text-muted-foreground">{userRole}</p>
                                </div>
                                <DropdownMenuSeparator />
                                {location.pathname !== "/" && (
                                    <DropdownMenuItem onClick={() => navigate("/")}>
                                        <House className="h-4 w-4 mr-2" />
                                        Home
                                    </DropdownMenuItem>
                                )}

                                {!location.pathname.startsWith("/admin") && (user?.roles?.some(({ rol }) => rol === "Administrador" || rol === "Líder Instructor" || rol === "Instructor")) && (
                                    <DropdownMenuItem onClick={() => navigate("/admin")}>
                                        <LayoutDashboard className="h-4 w-4 mr-2" />
                                        Panel Administrativo
                                    </DropdownMenuItem>
                                )}

                                {!location.pathname.startsWith("/admin") && (!user?.roles?.some(({ rol }) => rol === "Administrador" || rol === "Líder Instructor" || rol === "Instructor")) && (
                                    <DropdownMenuItem onClick={() => navigate("/admin/yo")}>
                                        <LayoutDashboard className="h-4 w-4 mr-2" />
                                        Mi perfil
                                    </DropdownMenuItem>
                                )}

                                {!location.pathname.startsWith("/dojos/dojo/") && (
                                    <DropdownMenuItem onClick={() => navigate(`/dojos/dojo/${user?.dojo.code}`)}>
                                        <Building2 className="h-4 w-4 mr-2" />
                                        Ir a mi Dojo
                                    </DropdownMenuItem>
                                )}

                                <DropdownMenuSeparator />
                                <DropdownMenuItem onClick={handleLogout}>
                                    <LogOut className="h-4 w-4 mr-2" />
                                    Cerrar Sesión
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    ) : (
                        !isAdmin && !isLogin && (
                            <Link
                                to="/login"
                                className={cn(
                                    "inline-flex min-h-11 items-center justify-center rounded-full border border-brand-blue/40 bg-brand-blue/5 px-4 text-xs font-medium tracking-wide text-brand-blue transition-all duration-300 hover:border-brand-blue hover:bg-brand-blue hover:text-white md:px-5 md:text-sm",
                                    compacted ? "lg:min-h-8" : "lg:min-h-9",
                                )}
                            >
                                Ingresar
                            </Link>
                        )
                    )}
                </div>
            </div>
        </header>
    );
}
