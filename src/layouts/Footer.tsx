import { Link } from "react-router";
import { FaInstagram } from "react-icons/fa";
import { FaFacebook } from "react-icons/fa";

export default function Footer() {
    
    return (

        <footer className="py-6 bg-black text-white px-7">

            <div className="flex justify-between items-center">

                <Link to="/" style={{ fontFamily: "Kaushan Script" }} className="flex items-center space-x-2 text-white">
                    <span className="text-2xl lg:text-5xl font-bold">Hiramatsukai</span>
                </Link>

                <div className="space-x-5 flex">
                    <a href="https://www.instagram.com/hiramatsukai?igsh=amY5NGdpMTQ5eXVh" target="_blank">
                        <FaInstagram
                            size={'30px'}
                            className="cursor-pointer"
                        />
                    </a>
                    <a href="https://www.facebook.com/share/18DmkvAqxX/" target="_blank">
                        <FaFacebook
                            size={'30px'}
                            className="cursor-pointer"
                        />
                    </a>
                </div>

            </div>

            <div className="flex items-center justify-center my-5 lg:my-0">
                <p className="text-center text-xs lg:text-sm leading-loose">
                    © {new Date().getFullYear()} Hiramatsukai. Todos los derechos reservados.
                </p>
            </div>
        </footer>
    );
}
