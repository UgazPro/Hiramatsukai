import AboutUs from "./AboutUs/AboutUs";
import HiramatsukaiInfo from "./HiramatsukaiInfo/HiramatsukaiInfo";
import GreatMasters from "./GreatMasters/GreatMasters";
import Karatedo from "./Karatedo/Karatedo";
import Kobudo from "./Kobudo/Kobudo";
import Kendo from "./Kendo/Kendo";
import Iaido from "./Iaido/Iaido";
import Dojos from "./Dojos/Dojos";

export default function Home() {

    return (
        <main id="main-content" className="flex-1 w-full" aria-label="Pagina principal de Hiramatsukai">
            
            <AboutUs />

            <HiramatsukaiInfo />

            <GreatMasters />

            <Karatedo />

            <Kobudo />

            <Kendo />

            <Iaido />

            <Dojos />

        </main>
    );
}

