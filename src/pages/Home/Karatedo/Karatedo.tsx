import { CardComponent, CardComponentProps } from "@/components/card/CardComponent";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router";

export default function Karatedo() {

  const navigate = useNavigate();

  const cardsKarate: CardComponentProps[] = [
    {
      title: "Fuerza (Go)",
      description: '"Técnicas lineales y poderosas',
      icon: "力",
      bgIcon: "bg-linear-to-br from-red-500 to-red-800",
      bg: "bg-linear-to-br from-red-200 to-red-300",
      border: "border-red-400",
    },
    {
      title: "Suavidad (Ju)",
      description: 'Movimientos circulares y flexibles',
      icon: "柔",
      bgIcon: "bg-linear-to-br from-blue-700 to-blue-900",
      bg: "bg-linear-to-br from-blue-200 to-blue-300",
      border: "border-blue-400",
    }
  ];

  return (

    <section id="karate" className="py-16 sm:py-10 bg-muted">

      <div className="container mx-auto px-4">

        <div className="flex flex-col lg:flex-row items-start gap-8 lg:gap-12">

          <div className="lg:w-1/2 w-full order-1 lg:order-2">

            <div className="space-y-6">

              <div className="flex items-center gap-2">

                <div className="h-15 w-15 lg:hidden">
                  <img src="oki2.png" alt="" />
                </div>

                <h2 className="text-2xl lg:text-4xl font-bold text-gray-900">
                  Goju-Ryu Karate-Do
                </h2>

              </div>

              <p className="text-lg text-gray-700 leading-relaxed">
                Estilo tradicional de karate fundado por el maestro
                <span className="font-semibold text-yellow-600"> Chojun Miyagi</span>.
                Su nombre significa "estilo duro-suave", combinando técnicas poderosas
                con movimientos circulares y fluidos.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
                {cardsKarate.map((card, index) => (
                  <CardComponent card={card} key={index} />
                ))}
              </div>

              <div className="h-50 w-50 mx-auto hidden lg:block">
                <img src="oki2.png" alt="" />
              </div>

            </div>
          </div>

          <div className="lg:w-1/2 w-full space-y-9 order-2 lg:order-1">

            {/* First Image */}
            <div className="relative rounded-2xl overflow-hidden shadow-2xl">
              <img
                src="/Hiramatsukai.jpg"
                alt="Practicantes de Goju-Ryu"
                className="w-full h-100 lg:h-62.5 object-cover object-center"
              />

              <div className="absolute inset-0 bg-linear-to-t from-black/20 to-transparent pointer-events-none" />

              <div className="absolute top-4 left-4 bg-yellow-500 text-white px-3 py-1 rounded-full text-sm font-bold shadow-lg">
                Goju-Ryu
              </div>
            </div>

            {/* Second Image */}
            <div className="relative rounded-2xl overflow-hidden shadow-2xl">
              <img
                src="/Hiramatsukai.jpg"
                alt="Practicantes de Goju-Ryu"
                className="w-full h-[400px] lg:h-[250px] object-cover object-center"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent pointer-events-none" />

              <div className="absolute top-4 left-4 bg-yellow-500 text-white px-3 py-1 rounded-full text-sm font-bold shadow-lg">
                Goju-Ryu
              </div>
            </div>

          </div>

        </div>

      </div>

      <div className="mt-10 text-center">
        <Button
          variant={`link`}
          style={{ fontFamily: 'JetBrains Mono' }}
          onClick={() => navigate('/karatedo')}
        >
          Descubre más sobre el KARATEDO
        </Button>
      </div>

    </section>
  );
}
