import { useEffect, useState, useMemo, useCallback } from "react";
import { Link, useLocation } from "react-router";
import NavBar from "./NavBar";
import { useAuthStore } from "@/stores/auth.store";
import { jwtDecode } from "jwt-decode";
import { DecodedToken } from "@/services/auth/auth.interface";

export default function Header() {
    const location = useLocation();

    const [prevScrollPos, setPrevScrollPos] = useState(0);
    const [visible, setVisible] = useState(true);

    const token = useAuthStore((s) => s.token);
    const isAuthenticated = useAuthStore((s) => s.isAuthenticated);

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
                    <span className="text-2xl md:text-3xl lg:text-5xl font-bold">Hiramatsukai</span>
                </Link>

                {location.pathname === "/" && (
                    <Link
                        to={"/login"}
                        style={{ fontFamily: "JetBrains Mono" }}
                        className="text-white lg:pr-10 cursor-pointer text-xs md:text-base"
                    >
                        Iniciar Sesión
                    </Link>
                )}

                {location.pathname.includes("/admin") && isAuthenticated && (
                    <div className="flex flex-col items-end">
                        <p className="text-white text-2xl">
                            {userName} {userLastName}
                        </p>
                        <p className="text-white">{userRole}</p>
                    </div>
                )}
            </div>

            {location.pathname === "/" && <NavBar />}
        </header>
    );
}
