import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Link } from "react-router";
import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function NavBar() {

    const handleScroll = (id: string) => {
        const section = document.getElementById(id);
        if (section) {
            section.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <div className="bg-(--yellowColor) py-5">
            <nav className="hidden md:flex justify-around">
                <p onClick={() => handleScroll("home")} style={{ fontFamily: "Kavoon" }} className="text-xl cursor-pointer font-medium transition-colors hover:text-primary">
                    Inicio
                </p >
                <p onClick={() => handleScroll("karate")} style={{ fontFamily: "Kavoon" }} className="text-xl cursor-pointer font-medium transition-colors hover:text-primary">
                    Karate
                </p >
                <p onClick={() => handleScroll("kobudo")} style={{ fontFamily: "Kavoon" }} className="text-xl cursor-pointer font-medium transition-colors hover:text-primary">
                    Kobudo
                </p >
                <p onClick={() => handleScroll("kendoIaido")} style={{ fontFamily: "Kavoon" }} className="text-xl cursor-pointer font-medium transition-colors hover:text-primary">
                    Kendo Iaido
                </p >
                <p onClick={() => handleScroll("dojos")} style={{ fontFamily: "Kavoon" }} className="text-xl cursor-pointer font-medium transition-colors hover:text-primary">
                    Dojos
                </p >
            </nav>
            {/* <Sheet>
                <SheetTrigger asChild>
                    <Button variant="ghost" className="px-2 md:hidden">
                        <Menu className="h-6 w-6" />
                    </Button>
                </SheetTrigger>
                <SheetContent side="right">
                    <SheetHeader>
                        <SheetTitle>Hiramatsukai</SheetTitle>
                    </SheetHeader>
                    <div className="flex flex-col space-y-4 pt-4">
                        <Link to="#" className="text-lg font-medium transition-colors hover:text-primary">
                            Inicio
                        </Link>
                        <Link to="#karate" className="text-lg font-medium transition-colors hover:text-primary">
                            Karate
                        </Link>
                        <Link to="#kobudo" className="text-lg font-medium transition-colors hover:text-primary">
                            Kobudo
                        </Link>
                        <Link to="#kendoIaido" className="text-lg font-medium transition-colors hover:text-primary">
                            Kendo Iaido
                        </Link>
                        <Link to="#contacto" className="text-lg font-medium transition-colors hover:text-primary">
                            Contacto
                        </Link>
                    </div>
                </SheetContent>
            </Sheet> */}
        </div>
    );
}
