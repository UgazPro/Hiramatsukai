import { CardComponent, CardComponentProps } from "@/components/card/CardComponent";
import Reveal from "@/components/animation/Reveal";
import { Button } from "@/components/ui/button";
import { Link } from "react-router";
import { ArrowRight } from "lucide-react";

export default function Karatedo() {

  const cardsKarate: CardComponentProps[] = [
    {
      title: "Fuerza (Go)",
      description: 'Técnicas lineales y poderosas',
      icon: "力",
      bgIcon: "bg-linear-to-br from-brand-vermilion to-brand-vermilion-dark",
      bg: "bg-linear-to-br from-red-50 to-red-100",
      border: "border-brand-vermilion/25",
    },
    {
      title: "Suavidad (Ju)",
      description: 'Movimientos circulares y flexibles',
      icon: "柔",
      bgIcon: "bg-linear-to-br from-brand-indigo to-brand-sumi",
      bg: "bg-linear-to-br from-blue-50 to-blue-100",
      border: "border-brand-indigo/25",
    }
  ];

  return (

    <section id="karate" aria-labelledby="karatedo-title" className="relative scroll-mt-32 overflow-hidden bg-brand-washi-deep py-20 sm:py-24">

      <div aria-hidden="true" className="pointer-events-none absolute inset-0 bg-wood opacity-40" />


      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-10">

        <div className="flex flex-col items-start gap-10 lg:flex-row lg:gap-14">

          <div className="order-1 w-full lg:order-2 lg:w-1/2">

            <Reveal className="space-y-6" y={24}>

              <div className="flex items-center gap-3">
                <div className="h-12 w-12 lg:hidden">
                  <img src="/oki2.png" alt="Emblema de Goju-Ryu Karate-Do" />
                </div>

                <span className="section-eyebrow text-brand-gold-deep">Arte marcial</span>
              </div>

              <h2 id="karatedo-title" className="text-3xl font-semibold leading-tight text-brand-ink sm:text-4xl lg:text-5xl">
                Goju-Ryu <span className="text-brand-vermilion">Karate-Do</span>
              </h2>

              <p className="text-measure text-base leading-relaxed text-brand-muted sm:text-lg">
                Estilo tradicional de karatedo fundado por el maestro
                <span className="font-semibold text-brand-gold-deep"> Chōjun Miyagi</span>.
                Su nombre significa "estilo duro-suave", combinando técnicas poderosas
                con movimientos circulares y fluidos.
              </p>

              <div className="grid grid-cols-1 gap-4 pt-2 sm:grid-cols-2">
                {cardsKarate.map((card, index) => (
                  <Reveal key={card.title} delay={index * 0.08} y={16}>
                    <CardComponent card={card} />
                  </Reveal>
                ))}
              </div>

              <div className="mx-auto hidden h-44 w-44 lg:block">
                <img src="/oki2.png" alt="Emblema tradicional de Okinawa" className="opacity-80" />
              </div>

            </Reveal>
          </div>

          <div className="order-2 w-full space-y-6 lg:order-1 lg:w-1/2">

            <Reveal className="glass group rounded-3xl p-2" y={20}>
              <div className="relative overflow-hidden rounded-2xl">
                <img
                  src="/Hiramatsukai.jpg"
                  alt="Practicantes de Goju-Ryu"
                  loading="lazy"
                  className="h-80 w-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105 lg:h-72"
                />
                <div aria-hidden="true" className="absolute inset-0 bg-linear-to-t from-brand-sumi/70 via-transparent to-transparent" />
                <div className="absolute left-4 top-4 rounded-full bg-brand-gold px-3 py-1 text-xs font-semibold text-brand-sumi shadow-soft">
                  Goju-Ryu
                </div>
              </div>
            </Reveal>

            <Reveal className="glass group rounded-3xl p-2" y={20} delay={0.12}>
              <div className="relative overflow-hidden rounded-2xl">
                <img
                  src="/Hiramatsukai.jpg"
                  alt="Practicantes de Goju-Ryu"
                  loading="lazy"
                  className="h-80 w-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105 lg:h-72"
                />
                <div aria-hidden="true" className="absolute inset-0 bg-linear-to-t from-brand-sumi/70 via-transparent to-transparent" />
                <div className="absolute left-4 top-4 rounded-full bg-brand-gold px-3 py-1 text-xs font-semibold text-brand-sumi shadow-soft">
                  Goju-Ryu
                </div>
              </div>
            </Reveal>

          </div>

        </div>

      </div>

      <Reveal className="relative mt-10 text-center" y={14}>
        <Button asChild variant="link">
          <Link to="/karatedo">
            Descubre más sobre el Karatedo
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
        </Button>
      </Reveal>

    </section>
  );
}
