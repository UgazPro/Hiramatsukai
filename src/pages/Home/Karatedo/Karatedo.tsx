import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router";

export default function Karatedo() {

  const navigate = useNavigate();

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

                <div className="flex items-start space-x-3 bg-red-100 rounded-xl p-4">

                  <div className="h-8 w-8 rounded-full bg-red-100 flex items-center justify-center shrink-0">
                    <span className="text-red-600 font-bold">力</span>
                  </div>

                  <div>
                    <h4 className="font-semibold text-gray-900">Fuerza (Go)</h4>
                    <p className="text-gray-600 text-sm">Técnicas lineales y poderosas</p>
                  </div>

                </div>

                <div className="flex items-start space-x-3 bg-blue-100 rounded-xl p-4">

                  <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center shrink-0">
                    <span className="text-blue-600 font-bold">柔</span>
                  </div>

                  <div>
                    <h4 className="font-semibold text-gray-900">Suavidad (Ju)</h4>
                    <p className="text-gray-600 text-sm">Movimientos circulares y flexibles</p>
                  </div>

                </div>

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
