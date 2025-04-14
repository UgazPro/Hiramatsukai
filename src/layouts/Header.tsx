import { Link, useLocation } from "react-router";
import NavBar from "./NavBar";
import { useEffect, useState } from "react";

export default function Header() {

    const location = useLocation();

    const [prevScrollPos, setPrevScrollPos] = useState(0);
    const [visible, setVisible] = useState(true);

    const handleScroll = () => {
        const currentScrollPos = window.scrollY;

        setVisible(!(currentScrollPos > prevScrollPos));

        setPrevScrollPos(currentScrollPos);
    }

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);

        return () => window.removeEventListener('scroll', handleScroll);
    })

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [location.pathname]);

    return (
        <header className={`sticky ${visible ? 'top-0' : '-top-60'} z-50 w-full bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 transition-all`}>
            <div className="flex h-16 items-center justify-between bg-black py-12 px-7">
                <Link 
                    to="/" 
                    style={{ fontFamily: "Kaushan Script" }} 
                    className="flex items-center space-x-2 text-gray-300 hover:text-white shadow-2xl shadow-white"
                >
                    <span className="text-2xl lg:text-5xl font-bold">Hiramatsukai</span>
                </Link>

                {location.pathname === "/" && 
                    <Link 
                        to={"/login"} 
                        style={{ fontFamily: "JetBrains Mono" }} 
                        className="text-white lg:pr-10 cursor-pointer"
                    >
                        Iniciar Sesión
                    </Link>
                }
            </div>

            {location.pathname === "/" && <NavBar />}

        </header>
    );
}
