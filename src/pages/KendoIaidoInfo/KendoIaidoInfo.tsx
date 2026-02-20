import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Sword, Target, Users, Award, BookOpen, Shield, Zap, Globe, Sparkles, Brain } from "lucide-react";
import CarouselComponent from "@/components/CarouselComponent";

export default function KendoIaidoInfo() {

  const [activeSection, setActiveSection] = useState("kendo");

  const kendoEquipment = [
    {
      name: "Shinai",
      description: "Espada de bambú para práctica",
      parts: ["Cuatro láminas de bambú", "Tsuka (empuñadura)", "Tsuba (guardamano)"],
      purpose: "Entrenamiento de golpes controlados"
    },
    {
      name: "Bogu",
      description: "Armadura protectora completa",
      parts: ["Men (máscara)", "Do (pechera)", "Kote (guantes)", "Tare (faldón)"],
      purpose: "Protección para combate realista"
    },
    {
      name: "Bokuto",
      description: "Espada de madera para katas",
      parts: ["Madera de roble japonés", "Forma de katana real"],
      purpose: "Práctica de formas y posturas"
    }
  ];

  const iaidoForms = [
    { name: "Mae", description: "Corte frontal desde posición seiza", level: "Shoden" },
    { name: "Ushiro", description: "Corte hacia atrás con giro", level: "Shoden" },
    { name: "Ukenagashi", description: "Desvío y corte simultáneo", level: "Chuden" },
    { name: "Tsuka Ate", description: "Golpe con la empuñadura", level: "Chuden" },
    { name: "Kesagiri", description: "Corte diagonal en ambos sentidos", level: "Okuden" },
    { name: "Morotezuki", description: "Estocada a dos manos", level: "Okuden" }
  ];

  const principles = [
    {
      title: "Ki-Ken-Tai Ichi",
      description: "Unidad de espíritu, espada y cuerpo",
      meaning: "Cada movimiento debe integrar completamente estos tres elementos"
    },
    {
      title: "Zanshin",
      description: "Conciencia alerta permanente",
      meaning: "Estado de atención completa antes, durante y después de la técnica"
    },
    {
      title: "Metsuke",
      description: "Mirada penetrante",
      meaning: "Visión periférica que observa al oponente como un todo"
    },
    {
      title: "Seme",
      description: "Presión ofensiva",
      meaning: "Dominar el centro y romper la guardia del oponente"
    }
  ];

  return (
    <div className="min-h-screen bg-linear-to-b from-white to-gray-50">
      {/* Hero con Carousel */}
      <section className="relative">
        <div className="h-[600px] md:h-[700px]">
          <CarouselComponent />
        </div>
      </section>

      {/* Introducción */}
      <section className="py-10 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <div className="inline-block px-4 py-2 bg-gray-800 text-white rounded-full text-sm font-bold mb-6">
                  La Vía del Samurái
                </div>
                <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6" style={{ fontFamily: "Kavoon" }}>
                  Kendo & <span className="text-gray-800">Iaido</span>
                </h1>
                <p className="text-lg text-gray-700 mb-6 leading-relaxed">
                  Dos disciplinas complementarias que forman el camino completo de la espada japonesa.
                  El <strong>Kendo</strong> (camino de la espada) se enfoca en el combate con oponente,
                  mientras que el <strong>Iaido</strong> (camino de la presencia mental) desarrolla
                  la perfección técnica a través de formas individuales.
                </p>
                <p className="text-lg text-gray-700 mb-8">
                  En Hiramatsukai, enseñamos ambas disciplinas como un sistema integral,
                  preservando las técnicas tradicionales y la filosofía samurái.
                </p>
                <div className="flex flex-wrap gap-4">
                  <Button size="lg" className="bg-gray-800 hover:bg-gray-900 text-white px-8">
                    Comenzar Entrenamiento
                  </Button>
                  <Button size="lg" variant="outline" className="border-2 border-gray-300 text-gray-700 hover:bg-gray-50">
                    Ver Demostración
                  </Button>
                </div>
              </div>
              <div className="relative">
                <div className="bg-linear-to-br from-gray-800 to-gray-900 rounded-3xl p-1">
                  <div className="bg-white rounded-2xl p-8">
                    <div className="aspect-square rounded-xl overflow-hidden bg-linear-to-br from-gray-100 to-white flex items-center justify-center">
                      <div className="text-center">
                        <Sword className="h-24 w-24 text-gray-800 mx-auto mb-4" />
                        <h3 className="text-2xl font-bold text-gray-900" style={{ fontFamily: "Kavoon" }}>
                          Dos Disciplinas
                        </h3>
                        <div className="flex gap-4 justify-center mt-4">
                          <span className="px-3 py-1 bg-red-100 text-red-800 rounded-full">Kendo</span>
                          <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full">Iaido</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Navegación Kendo vs Iaido */}
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="flex flex-wrap gap-4 justify-center">
              <button
                onClick={() => setActiveSection("kendo")}
                className={`flex items-center gap-3 px-8 py-4 rounded-xl font-medium transition-all duration-300 ${activeSection === "kendo"
                    ? 'bg-linear-to-r from-red-500 to-red-600 text-white shadow-lg'
                    : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-200'
                  }`}
              >
                <Sword className="h-5 w-5" />
                Kendo (剣道)
              </button>
              <button
                onClick={() => setActiveSection("iaido")}
                className={`flex items-center gap-3 px-8 py-4 rounded-xl font-medium transition-all duration-300 ${activeSection === "iaido"
                    ? 'bg-linear-to-r from-blue-500 to-blue-600 text-white shadow-lg'
                    : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-200'
                  }`}
              >
                <Zap className="h-5 w-5" />
                Iaido (居合道)
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Sección Kendo */}
      {activeSection === "kendo" && (
        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-16">
                <div className="inline-block p-3 bg-red-100 rounded-full mb-4">
                  <Sword className="h-8 w-8 text-red-600" />
                </div>
                <h2 className="text-4xl font-bold text-gray-900 mb-4" style={{ fontFamily: "Kavoon" }}>
                  Kendo <span className="text-red-600">剣道</span>
                </h2>
                <p className="text-xl text-gray-700">
                  "El camino de la espada" - Arte marcial moderno derivado de las técnicas samurái
                </p>
              </div>

              <div className="grid md:grid-cols-3 gap-8 mb-16">
                {kendoEquipment.map((item, index) => (
                  <div key={index} className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
                    <h3 className="text-xl font-bold text-gray-900 mb-3">{item.name}</h3>
                    <p className="text-gray-600 mb-4">{item.description}</p>
                    <div className="mb-4">
                      <h4 className="font-semibold text-gray-900 mb-2">Componentes:</h4>
                      <ul className="space-y-1">
                        {item.parts.map((part, idx) => (
                          <li key={idx} className="text-sm text-gray-600 flex items-center">
                            <div className="h-1.5 w-1.5 bg-red-500 rounded-full mr-2"></div>
                            {part}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div className="text-sm text-gray-700 bg-red-50 p-3 rounded-lg">
                      <strong>Propósito:</strong> {item.purpose}
                    </div>
                  </div>
                ))}
              </div>

              {/* Áreas de golpe */}
              <div className="bg-white rounded-3xl p-8 shadow-xl border border-gray-100 mb-16">
                <h3 className="text-3xl font-bold text-gray-900 mb-8 text-center" style={{ fontFamily: "Kavoon" }}>
                  Áreas de <span className="text-red-600">Golpe</span> (Datotsu-bui)
                </h3>
                <div className="grid md:grid-cols-4 gap-6">
                  {[
                    { area: "Men", location: "Cabeza", point: "Centro de la frente" },
                    { area: "Kote", location: "Muñeca", point: "Muñeca derecha o izquierda" },
                    { area: "Do", location: "Torso", point: "Costados del torso" },
                    { area: "Tsuki", location: "Garganta", point: "Protegida por el men" }
                  ].map((item, index) => (
                    <div key={index} className="text-center p-6">
                      <div className="h-16 w-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        <span className="text-2xl font-bold text-red-600">{item.area.charAt(0)}</span>
                      </div>
                      <h4 className="font-bold text-gray-900 text-lg mb-1">{item.area}</h4>
                      <p className="text-gray-600 mb-2">{item.location}</p>
                      <p className="text-sm text-gray-500">{item.point}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Principios del Kendo */}
              <div>
                <h3 className="text-2xl font-bold text-gray-900 mb-8 text-center" style={{ fontFamily: "Kavoon" }}>
                  Principios <span className="text-red-600">Fundamentales</span>
                </h3>
                <div className="grid md:grid-cols-2 gap-6">
                  {principles.slice(0, 2).map((principle, index) => (
                    <div key={index} className="bg-linear-to-br from-gray-50 to-white rounded-2xl p-6 border border-gray-200">
                      <h4 className="text-xl font-bold text-gray-900 mb-3">{principle.title}</h4>
                      <p className="text-gray-700 mb-3">{principle.description}</p>
                      <p className="text-gray-600 italic">{principle.meaning}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Sección Iaido */}
      {activeSection === "iaido" && (
        <section className="py-20 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-16">
                <div className="inline-block p-3 bg-blue-100 rounded-full mb-4">
                  <Zap className="h-8 w-8 text-blue-600" />
                </div>
                <h2 className="text-4xl font-bold text-gray-900 mb-4" style={{ fontFamily: "Kavoon" }}>
                  Iaido <span className="text-blue-600">居合道</span>
                </h2>
                <p className="text-xl text-gray-700">
                  "El camino de la presencia mental" - Arte del desenvaine rápido y preciso
                </p>
              </div>

              {/* Formas de Iaido */}
              <div className="mb-16">
                <h3 className="text-3xl font-bold text-gray-900 mb-8 text-center" style={{ fontFamily: "Kavoon" }}>
                  Formas <span className="text-blue-600">Tradicionales</span> (Kata)
                </h3>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {iaidoForms.map((form, index) => (
                    <div key={index} className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
                      <div className="flex items-start justify-between mb-4">
                        <div>
                          <h4 className="text-xl font-bold text-gray-900">{form.name}</h4>
                          <div className="flex items-center gap-2 mt-1">
                            <span className={`px-3 py-1 rounded-full text-sm font-bold ${form.level === 'Shoden' ? 'bg-green-100 text-green-800' :
                                form.level === 'Chuden' ? 'bg-yellow-100 text-yellow-800' :
                                  'bg-red-100 text-red-800'
                              }`}>
                              {form.level}
                            </span>
                          </div>
                        </div>
                        <Target className="h-8 w-8 text-blue-500" />
                      </div>
                      <p className="text-gray-700">{form.description}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Proceso del Iaido */}
              <div className="bg-white rounded-3xl p-8 shadow-xl border border-gray-100 mb-16">
                <h3 className="text-3xl font-bold text-gray-900 mb-8 text-center" style={{ fontFamily: "Kavoon" }}>
                  Secuencia de <span className="text-blue-600">Iaido</span>
                </h3>
                <div className="grid md:grid-cols-4 gap-6">
                  {[
                    { step: "Nukitsuke", description: "Desenvaine y corte simultáneo" },
                    { step: "Kirioroshi", description: "Corte principal descendente" },
                    { step: "Chiburi", description: "Sacudida de la sangre" },
                    { step: "Noto", description: "Envaine de la espada" }
                  ].map((item, index) => (
                    <div key={index} className="text-center">
                      <div className="relative">
                        <div className="h-16 w-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                          <span className="text-2xl font-bold text-blue-600">{index + 1}</span>
                        </div>
                        {index < 3 && (
                          <div className="hidden md:block absolute top-8 left-full w-full h-0.5 bg-blue-200"></div>
                        )}
                      </div>
                      <h4 className="font-bold text-gray-900 mb-2">{item.step}</h4>
                      <p className="text-sm text-gray-600">{item.description}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Equipo de Iaido */}
              <div>
                <h3 className="text-2xl font-bold text-gray-900 mb-8 text-center" style={{ fontFamily: "Kavoon" }}>
                  Equipo <span className="text-blue-600">Esencial</span>
                </h3>
                <div className="grid md:grid-cols-3 gap-8">
                  {[
                    {
                      name: "Iaito",
                      description: "Espada sin filo para práctica",
                      features: ["Peso balanceado", "Sin filo", "Material: aleación de zinc/aluminio"]
                    },
                    {
                      name: "Shinken",
                      description: "Katana auténtica afilada",
                      features: ["Acero forjado tradicionalmente", "Filo real", "Para practicantes avanzados"]
                    },
                    {
                      name: "Obi y Hakama",
                      description: "Vestimenta tradicional",
                      features: ["Obi (cinturón ancho)", "Hakama (pantalón plisado)", "Keikogi (chaqueta)"]
                    }
                  ].map((item, index) => (
                    <div key={index} className="bg-linear-to-b from-blue-50 to-white rounded-2xl p-6 border border-blue-100">
                      <h4 className="text-xl font-bold text-gray-900 mb-3">{item.name}</h4>
                      <p className="text-gray-700 mb-4">{item.description}</p>
                      <ul className="space-y-2">
                        {item.features.map((feature, idx) => (
                          <li key={idx} className="text-sm text-gray-600 flex items-center">
                            <div className="h-1.5 w-1.5 bg-blue-500 rounded-full mr-2"></div>
                            {feature}
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Beneficios Comunes */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-gray-900 mb-4" style={{ fontFamily: "Kavoon" }}>
                Beneficios de la <span className="text-gray-800">Práctica</span>
              </h2>
              <p className="text-xl text-gray-700">
                Desarrollo integral a través de la disciplina de la espada
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  icon: Brain,
                  title: "Concentración",
                  description: "Desarrollo de atención plena y enfoque mental",
                  color: "purple"
                },
                {
                  icon: Shield,
                  title: "Autodisciplina",
                  description: "Cultivo de la perseverancia y control personal",
                  color: "blue"
                },
                {
                  icon: Sparkles,
                  title: "Presencia",
                  description: "Desarrollo de carisma y autoridad natural",
                  color: "yellow"
                }
              ].map((benefit, index) => {
                const Icon = benefit.icon;
                return (
                  <div key={index} className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100 text-center">
                    <div className={`inline-block p-4 ${benefit.color === 'purple' ? 'bg-purple-100' : benefit.color === 'blue' ? 'bg-blue-100' : 'bg-yellow-100'} rounded-2xl mb-4`}>
                      <Icon className={`h-8 w-8 ${benefit.color === 'purple' ? 'text-purple-600' : benefit.color === 'blue' ? 'text-blue-600' : 'text-yellow-600'}`} />
                    </div>
                    <h3 className="font-bold text-gray-900 text-xl mb-3">{benefit.title}</h3>
                    <p className="text-gray-600">{benefit.description}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Final */}
      <section className="py-20 bg-linear-to-r from-gray-900 to-gray-800">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center text-white">
            <Sword className="h-16 w-16 mx-auto mb-6" />
            <h2 className="text-4xl font-bold mb-6" style={{ fontFamily: "Kavoon" }}>
              Descubre el Camino del <span className="text-yellow-400">Samurái</span>
            </h2>
            <p className="text-xl mb-8 opacity-90">
              Tradición milenaria, disciplina mental, excelencia técnica
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Button size="lg" className="bg-yellow-500 hover:bg-yellow-600 text-white px-8">
                Probar Clase de Kendo
              </Button>
              <Button size="lg" variant="outline" className="border-2 border-white text-white hover:bg-white/10">
                Seminario de Iaido
              </Button>
            </div>
            <p className="mt-8 text-gray-400">
              Equipo profesional disponible • Instructores certificados por la AJKF • Clases tradicionales y modernas
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}