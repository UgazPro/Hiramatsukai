import { Link, useLocation } from "react-router";
import NavBar from "./NavBar";

export default function Header() {

    const location = useLocation();

    return (
        <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <div className="flex h-16 items-center justify-between bg-black py-12 px-7">
                <Link to="/" style={{ fontFamily: "Kaushan Script" }} className="flex items-center space-x-2 text-white">
                    <span className="text-2xl lg:text-5xl font-bold">Hiramatsukai</span>
                </Link>

                {location.pathname === "/" && <Link to={"/login"} style={{ fontFamily: "JetBrains Mono" }} className="text-white lg:pr-10 cursor-pointer">Iniciar Sesión</Link>}
            </div>

            {location.pathname === "/" && <NavBar />}

            {location.pathname === "/login" && <div className="bg-(--redColor) py-2"></div>}
            
        </header>
    );
}
