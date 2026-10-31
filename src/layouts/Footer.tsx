import { Link } from "react-router";
import { FaInstagram, FaFacebook } from "react-icons/fa";

export default function Footer() {

    return (
        <footer className="relative overflow-hidden border-t border-brand-blue/30 bg-linear-to-b from-brand-blue-deep to-brand-blue-deep text-brand-washi">
            <div aria-hidden="true" className="pointer-events-none absolute inset-0 bg-wood-dark opacity-40" />
            <div aria-hidden="true" className="pointer-events-none absolute -top-24 left-1/2 h-48 w-[32rem] -translate-x-1/2 rounded-full bg-brand-copper/12 blur-[90px]" />
            <div aria-hidden="true" className="pointer-events-none absolute bottom-0 right-0 h-40 w-64 rounded-full bg-brand-persimmon/10 blur-[100px]" />

            <div className="relative mx-auto flex   flex-col gap-8 px-5 py-10 sm:px-8 lg:flex-row lg:items-center lg:justify-between lg:px-10">

                <Link to="/" className="group flex items-center gap-3 self-center lg:self-auto">
                    <span className="font-script text-3xl text-brand-washi transition-colors duration-300 group-hover:text-white lg:text-4xl">
                        Hiramatsukai
                    </span>
                    <span className="sr-only">Ir al inicio</span>
                </Link>

                <nav aria-label="Redes sociales" className="flex items-center justify-center gap-3">
                    <a
                        href="https://www.instagram.com/hiramatsukai?igsh=amY5NGdpMTQ5eXVh"
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label="Instagram de Hiramatsukai"
                        className="flex h-11 w-11 items-center justify-center rounded-full border border-white/15 bg-white/5 text-brand-washi/85 transition-all duration-300 hover:-translate-y-0.5 hover:border-brand-copper/60 hover:bg-white/10 hover:text-brand-copper"
                    >
                        <FaInstagram size={20} aria-hidden="true" />
                    </a>
                    <a
                        href="https://www.facebook.com/share/18DmkvAqxX/"
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label="Facebook de Hiramatsukai"
                        className="flex h-11 w-11 items-center justify-center rounded-full border border-white/15 bg-white/5 text-brand-washi/85 transition-all duration-300 hover:-translate-y-0.5 hover:border-brand-copper/60 hover:bg-white/10 hover:text-brand-copper"
                    >
                        <FaFacebook size={20} aria-hidden="true" />
                    </a>
                </nav>
            </div>

            <div className="relative mx-auto   px-5 pb-8 sm:px-8 lg:px-10">
                <div aria-hidden="true" className="gold-rule mb-6 h-px w-full opacity-60" />
                <p className="text-center text-xs leading-relaxed text-brand-washi/60 lg:text-sm">
                    © {new Date().getFullYear()} Hiramatsukai Internacional. Todos los derechos reservados.
                </p>
            </div>
        </footer>
    );
}
