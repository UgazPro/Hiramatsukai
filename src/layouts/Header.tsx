import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router";
import NavBar from "./NavBar";
import { getLoggedInUserBasicData } from "@/helpers/getTokens";

export default function Header() {

    const location = useLocation();

    const [prevScrollPos, setPrevScrollPos] = useState(0);
    const [visible, setVisible] = useState(true);

    const { userRole, userName, userLastName } = getLoggedInUserBasicData();

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

        <header
            className={location.pathname.includes("/admin") ? `z-50 w-full bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/60 transition-all` : `sticky ${visible ? 'top-0' : '-top-60'} z-50 w-full bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/60 transition-all`}
        >

            <div className="flex h-16 items-center justify-between bg-black py-12 px-7 space-x-5 md:space-x-0">

                <Link
                    to={location.pathname.includes("/admin") ? "/admin" : "/"}
                    style={{ fontFamily: "Kaushan Script" }}
                    className={location.pathname.includes("/admin") || location.pathname.includes("/login") ? "flex items-center space-x-2 text-gray-300 hover:text-white shadow-2xl" : "text-gray-300 flex items-center space-x-2 md:text-black hover:text-gray-700 shadow-white md:bg-white rounded-xl pr-9 py-1"}
                >
                    {!location.pathname.includes("/admin") && !location.pathname.includes("/login") &&
                        <img
                            src="/artesmarciales.jpg" alt="Todas las Artes Marciales"
                            className="hidden md:block md:h-15 md:w-50 rounded-full mr-3 shadow-2xl h-8 w-30"
                        />
                    }
                    <span className="text-2xl md:text-3xl lg:text-5xl font-bold">Hiramatsukai</span>
                </Link>


                {location.pathname === "/" &&
                    <Link
                        to={"/login"}
                        style={{ fontFamily: "JetBrains Mono" }}
                        className="text-white lg:pr-10 cursor-pointer text-xs md:text-base"
                    >
                        Iniciar Sesión
                    </Link>
                }

                {location.pathname.includes("/admin") && (

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
