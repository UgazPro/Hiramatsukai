import { useEffect, useState, useMemo, useCallback } from "react";
import { Link, useLocation, useNavigate } from "react-router";
import NavBar from "./NavBar";
import { useAuthStore } from "@/stores/auth.store";
import { jwtDecode } from "jwt-decode";
import { DecodedToken } from "@/services/auth/auth.interface";
import { useUserData } from "@/helpers/token";
import { House, ChevronDown, LogOut, LayoutDashboard, Building2, Menu } from "lucide-react";
import {
    DropdownMenu,
    DropdownMenuTrigger,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";

interface HeaderProps {
    onToggleMobileNav?: () => void;
}

export default function Header({ onToggleMobileNav }: HeaderProps) {
    const navigate = useNavigate();
    const location = useLocation();

    const [prevScrollPos, setPrevScrollPos] = useState(0);
    const [visible, setVisible] = useState(true);

    const token = useAuthStore((s) => s.token);
    const isAuthenticated = useAuthStore((s) => s.isAuthenticated);
    const logout = useAuthStore((s) => s.logout);

    const user = useUserData();

    const handleLogout = () => {
        logout();
        navigate("/");
    };

    const { userName, userLastName, userRole } = useMemo(() => {
        if (!token) return { userName: "", userLastName: "", userRole: "" };
        try {
            const decoded = jwtDecode<DecodedToken>(token);
            return {
                userName: decoded.name || "",
                userLastName: decoded.lastName || "",
                userRole: decoded.rol?.rol || "",
            };
        } catch {
            return { userName: "", userLastName: "", userRole: "" };
        }
    }, [token]);

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

    return (
        <header
            className={
                location.pathname.includes("/admin") || location.pathname.includes("/login")
                    ? `z-50 w-full bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/60 transition-all`
                    : `sticky ${visible ? "top-0" : "-top-60"} z-50 w-full bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/60 transition-all`
            }
        >
            <div className="flex h-16 items-center justify-between bg-black py-12 px-7 space-x-5 md:space-x-0">
                <div className="flex items-center gap-2">
                    <button
                        onClick={onToggleMobileNav}
                        className={`${location.pathname.includes('/admin') ? 'block' : 'hidden'} md:hidden text-white p-2 hover:bg-gray-800 rounded-lg transition-colors`}
                    >
                        <Menu className="h-6 w-6" />
                    </button>
                    <Link
                        to={location.pathname.includes("/admin") ? "/admin" : "/"}
                        style={{ fontFamily: "Kaushan Script" }}
                        className={
                            location.pathname.includes("/admin") || location.pathname.includes("/login")
                                ? "flex items-center space-x-2 text-gray-300 hover:text-white shadow-2xl"
                                : "text-gray-300 flex items-center space-x-2 md:text-black hover:text-gray-700 shadow-white md:bg-white rounded-xl pr-9 py-1"
                        }
                    >
                        {!location.pathname.includes("/admin") && !location.pathname.includes("/login") && (
                            <img
                                src="/artesmarciales.jpg"
                                alt="Todas las Artes Marciales"
                                className="hidden md:block md:h-15 md:w-50 rounded-full mr-3 shadow-2xl h-8 w-30"
                            />
                        )}
                        <span className={`${location.pathname.includes('/admin') ? 'hidden' : 'block'} text-2xl md:block md:text-3xl lg:text-5xl font-bold`}>Hiramatsukai Internacional</span>
                    </Link>
                </div>

                <div className="flex items-center gap-3">
                    {/* Auth section */}
                    {isAuthenticated ? (
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <button className="flex flex-col items-end text-white cursor-pointer hover:text-yellow-400 transition-colors">
                                    <p className="lg:text-2xl text-sm">
                                        {userName} {userLastName}
                                    </p>
                                    <p className="flex items-center gap-1 lg:text-normal text-sm">
                                        {userRole}
                                        <ChevronDown className="h-3 w-3" />
                                    </p>
                                </button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end" className="w-56">
                                {location.pathname !== "/" && (
                                    <DropdownMenuItem onClick={() => navigate("/")}>
                                        <House className="h-4 w-4 mr-2" />
                                        Home
                                    </DropdownMenuItem>
                                )}

                                {!location.pathname.startsWith("/admin") && (user?.rol?.rol === "Administrador" || user?.rol?.rol === "Líder Instructor" || user?.rol?.rol === "Instructor" ) && (
                                    <DropdownMenuItem onClick={() => navigate("/admin")}>
                                        <LayoutDashboard className="h-4 w-4 mr-2" />
                                        Panel Administrativo
                                    </DropdownMenuItem>
                                )}

                                {!location.pathname.startsWith("/admin") && (user?.rol?.rol !== "Administrador" && user?.rol?.rol !== "Líder Instructor" && user?.rol?.rol !== "Instructor" ) && (
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
                        !location.pathname.includes("/admin") && !location.pathname.includes("/login") && (
                            <Link
                                to="/login"
                                style={{ fontFamily: "JetBrains Mono" }}
                                className="text-white cursor-pointer text-xs md:text-base border text-center rounded-full px-4 py-2 hover:bg-white hover:text-black transition-colors"
                            >
                                Iniciar Sesión
                            </Link>
                        )
                    )}
                </div>
            </div>

            {location.pathname === "/" && <NavBar />}
        </header>
    );
}
