import Karatedo from "./Karatedo/Karatedo";
import Kobudo from "./Kobudo/Kobudo";
import KendoIaido from "./KendoIaido/KendoIaido";
import Dojos from "./Dojos/Dojos";
import AboutUs from "./AboutUs/AboutUs";

export default function Home() {

    return (
        <main id="main-content" className="flex-1 w-full" aria-label="Pagina principal de Hiramatsukai">
            
            <AboutUs />

            <Karatedo />

            <Kobudo />

            <KendoIaido />

            <Dojos />

        </main>
    );
}

