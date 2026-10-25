import AboutUs from "./AboutUs/AboutUs";
import HiramatsukaiInfo from "./HiramatsukaiInfo/HiramatsukaiInfo";
import GreatMasters from "./GreatMasters/GreatMasters";
import Karatedo from "./Karatedo/Karatedo";
import Kobudo from "./Kobudo/Kobudo";
import Kendo from "./Kendo/Kendo";
import Iaido from "./Iaido/Iaido";
import Dojos from "./Dojos/Dojos";

const marqueeItems = ["空手道", "古武道", "剣道", "居合道", "武道", "平松会", "沖縄"];

function KanjiMarquee() {
    const items = [...marqueeItems, ...marqueeItems];

    return (
        <div aria-hidden="true" className="relative overflow-hidden border-y border-brand-ink/10 bg-brand-sumi py-4">
            <div className="animate-marquee flex w-max items-center gap-8 pr-8">
                {items.map((item, index) => (
                    <span
                        key={`${item}-${index}`}
                        className="flex items-center gap-8 font-serif text-xl tracking-[0.3em] text-brand-washi/30 sm:text-2xl"
                    >
                        {item}
                        <span className="h-1 w-1 rounded-full bg-brand-gold/60" />
                    </span>
                ))}
            </div>
            <div className="pointer-events-none absolute inset-y-0 left-0 w-20 bg-linear-to-r from-brand-sumi to-transparent sm:w-32" />
            <div className="pointer-events-none absolute inset-y-0 right-0 w-20 bg-linear-to-l from-brand-sumi to-transparent sm:w-32" />
        </div>
    );
}

export default function Home() {

    return (
        <main id="main-content" className="flex-1 w-full" aria-label="Pagina principal de Hiramatsukai">

            <AboutUs />

            <KanjiMarquee />

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
