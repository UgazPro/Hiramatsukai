import { GraduationCap, MapPin, Menu } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { Link } from "react-router"

export default function Home() {

    const handleScroll = (id: string) => {
        const section = document.getElementById(id);
        if (section) {
            section.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <div className="flex min-h-screen flex-col w-full">
            <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
                <div className="container flex h-16 items-center justify-between">
                    <Link to="/" className="flex items-center space-x-2">
                        <span className="text-xl font-bold">Hiramatsukai</span>
                    </Link>

                    <nav className="hidden gap-6 md:flex">
                        <p onClick={() => handleScroll("home")} className="text-lg cursor-pointer font-medium transition-colors hover:text-primary">
                            Inicio
                        </p >
                        <p onClick={() => handleScroll("karate")} className="text-lg cursor-pointer font-medium transition-colors hover:text-primary">
                            Karate
                        </p >
                        <p onClick={() => handleScroll("kobudo")} className="text-lg cursor-pointer font-medium transition-colors hover:text-primary">
                            Kobudo
                        </p >
                        <p onClick={() => handleScroll("contacto")} className="text-lg cursor-pointer font-medium transition-colors hover:text-primary">
                            Contacto
                        </p >
                    </nav>
                    <Sheet>
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
                                <Link to="#contacto" className="text-lg font-medium transition-colors hover:text-primary">
                                    Contacto
                                </Link>
                            </div>
                        </SheetContent>
                    </Sheet>
                </div>
            </header>

            <main className="flex-1 w-full">
                <section id="home" className="relative w-full">
                    <div className="absolute inset-0">
                        <img
                            src="/placeholder.svg?height=600&width=1200"
                            alt="Karate training"
                            className="object-cover"
                        />
                        <div className="absolute inset-0 bg-black/60" />
                    </div>
                    <div className="container relative py-24 sm:py-32 w-full">
                        <div className="mx-auto max-w-3xl text-center text-white">
                            <h1 className="text-4xl font-bold tracking-tight sm:text-6xl">Hiramatsukai</h1>
                            <p className="mt-6 text-lg leading-8">Tradición, disciplina y excelencia en las artes marciales</p>
                            <div className="mt-10 flex items-center justify-center gap-x-6">
                                <Button size="lg" variant="default">
                                    Comienza tu viaje
                                </Button>
                                <Button size="lg" variant="outline" className="text-white">
                                    Conócenos
                                </Button>
                            </div>
                        </div>
                    </div>
                </section>

                <section id="karate" className="bg-muted py-16 px-16 sm:py-24 w-full">
                    <div className="w-full">
                        <div className="mx-auto max-w-2xl lg:mx-0">
                            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Goju-ryu Karate</h2>
                            <p className="mt-6 text-lg leading-8 text-muted-foreground">
                                El Goju-ryu es un estilo tradicional de karate que combina técnicas duras (go) y suaves (ju).
                                Desarrollado en Okinawa, este estilo enfatiza tanto la fuerza como la fluidez en sus movimientos.
                            </p>
                        </div>
                        <div className="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-8 lg:mx-0 lg:max-w-none lg:grid-cols-3">
                            <div className="flex flex-col items-start">
                                <div className="rounded-md bg-primary p-2 text-primary-foreground">
                                    <GraduationCap className="h-6 w-6" />
                                </div>
                                <h3 className="mt-4 text-lg font-semibold">Instrucción Experta</h3>
                                <p className="mt-2 text-muted-foreground">
                                    Instructores altamente calificados con años de experiencia en Goju-ryu.
                                </p>
                            </div>
                            <div className="flex flex-col items-start">
                                <div className="rounded-md bg-primary p-2 text-primary-foreground">
                                    <MapPin className="h-6 w-6" />
                                </div>
                                <h3 className="mt-4 text-lg font-semibold">Instalaciones</h3>
                                <p className="mt-2 text-muted-foreground">
                                    Dojo tradicional completamente equipado para tu entrenamiento.
                                </p>
                            </div>
                            <div className="flex flex-col items-start">
                                <div className="rounded-md bg-primary p-2 text-primary-foreground">
                                    <GraduationCap className="h-6 w-6" />
                                </div>
                                <h3 className="mt-4 text-lg font-semibold">Desarrollo Personal</h3>
                                <p className="mt-2 text-muted-foreground">
                                    Enfoque en el crecimiento físico y espiritual a través del karate.
                                </p>
                            </div>
                        </div>
                    </div>
                </section>

                <section id="kobudo" className="py-16 px-16 sm:py-24">
                    <div className="container">
                        <div className="mx-auto max-w-2xl lg:mx-0 lg:max-w-3xl">
                            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Kobudo</h2>
                            <p className="mt-6 text-lg leading-8 text-muted-foreground">
                                El Kobudo es el arte marcial tradicional de las armas de Okinawa. En nuestra escuela, enseñamos el
                                manejo de diversas armas tradicionales como el bo, sai, tonfa y nunchaku.
                            </p>
                            <div className="mt-10">
                                <Button size="lg">Descubre el Kobudo</Button>
                            </div>
                        </div>
                    </div>
                </section>

                <section id="contacto" className="bg-muted px-16 py-16 sm:py-24">
                    <div className="container">
                        <div className="mx-auto max-w-2xl text-center">
                            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Contacto</h2>
                            <p className="mt-6 text-lg leading-8 text-muted-foreground">
                                ¿Interesado en unirte a nuestra escuela? Contáctanos para más información sobre clases y horarios.
                            </p>
                            <div className="mt-10">
                                <Button size="lg">Contáctanos</Button>
                            </div>
                        </div>
                    </div>
                </section>
            </main>

            <footer className="border-t py-6">
                <div className="flex items-center justify-center">
                    <p className="text-center text-sm leading-loose">
                        © 2025 Hiramatsukai. Todos los derechos reservados.
                    </p>
                </div>
            </footer>
        </div>
    )
}

