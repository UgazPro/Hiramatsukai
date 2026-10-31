import { useEffect, useState, useCallback } from "react";
import { Link, useLocation, useNavigate } from "react-router";
import { NavBar, NavBarMobile } from "./NavBar";
import { useAuthStore } from "@/stores/auth.store";
import { useUserData } from "@/helpers/token";
import { clearSession } from "@/utils/clearSession";
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

    const [prevScrollPos, setPrevScrollPos] = useState(0);
    const [visible, setVisible] = useState(true);

    const isAuthenticated = useAuthStore((s) => s.isAuthenticated);

    const user = useUserData();

    const handleLogout = () => {
        clearSession();
        navigate("/");
    };

    const userName = user?.name || "";
    const userLastName = user?.lastName || "";
    const userRole = user?.roles?.[0]?.rol || "";

    const handleScroll = useCallback(() => {
        const currentScrollPos = window.scrollY;
        setVisible(currentScrollPos <= prevScrollPos);
        setPrevScrollPos(currentScrollPos);
    }, [prevScrollPos]);

    useEffect(() => {
        window.addEventListener("scroll", handleScroll, { passive: true });
        return () => window.removeEventListener("scroll", handleScroll);
    }, [handleScroll]);

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

    return (
        <header
            className={
                isAdmin || isLogin
                    ? "z-50 w-full transition-all duration-300"
                    : `sticky ${visible ? "top-0" : "-top-60"} z-50 w-full transition-all duration-300`
            }
        >
            <div className="border-b border-brand-wood/20 bg-brand-linen/95 backdrop-blur-xl supports-[backdrop-filter]:bg-brand-linen/92">
                <div className="flex h-18 w-full items-center justify-between gap-4 px-2 lg:px-8 lg:h-20">
                    <div className="flex items-center gap-2">
                        <div className="block lg:hidden">
                            {!isAdmin && !isLogin && <NavBarMobile goToScroll={goToScroll} />}
                        </div>
                        <button
                            type="button"
                            onClick={onToggleMobileNav}
                            aria-label="Abrir menú de administración"
                            className={`${isAdmin ? "flex" : "hidden"} h-11 w-11 cursor-pointer items-center justify-center rounded-full border border-brand-blue/30 bg-brand-blue/5 text-brand-blue-deep transition-colors hover:bg-brand-blue/10 focus-visible:border-brand-blue md:hidden`}
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
                                        className="h-10 w-10 rounded-full object-contain sm:h-12 sm:w-12"
                                    />
                                </span>
                            )}
                            <span className="flex flex-col items-start leading-none">
                                <span className="font-script text-xl text-brand-blue-deep transition-colors duration-300 group-hover:text-brand-blue sm:text-3xl lg:text-4xl">
                                    Hiramatsukai
                                </span>
                                <span className="mt-1.5 mx-auto text-[9px] font-semibold uppercase tracking-[0.32em] text-brand-copper-deep sm:text-[10px] lg:text-[11px]">
                                    Internacional
                                </span>
                            </span>
                        </Link>
                    </div>

                    <div className="hidden lg:block">
                        {!isAdmin && !isLogin && <NavBar />}
                    </div>

                    <div className="flex items-center gap-3">
                        {isAuthenticated ? (
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild className="cursor-pointer">
                                    <button
                                        type="button"
                                        aria-label="Abrir menú de usuario"
                                        className="flex items-center justify-center gap-4 rounded-full focus-visible:outline-offset-4"
                                    >
                                        <span className="hidden flex-col items-end text-right lg:flex">
                                            <span className="text-sm font-medium text-brand-blue-deep">
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
                                <DropdownMenuContent align="end" className="w-48">
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
                                    className="inline-flex min-h-11 items-center justify-center rounded-full border border-brand-blue/40 bg-brand-blue/5 px-4 text-xs font-medium tracking-wide text-brand-blue transition-all duration-300 hover:border-brand-blue hover:bg-brand-blue hover:text-white md:px-5 md:text-sm lg:min-h-9"
                                >
                                    Ingresar
                                </Link>
                            )
                        )}
                    </div>
                </div>
            </div>
        </header>
    );
}
