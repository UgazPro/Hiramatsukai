import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { MdWhatsapp } from "react-icons/md";
import {
  MapPin, Mail, Globe, Clock,
  Sword, Target, Zap, Instagram, Facebook, Youtube, Twitter, ChevronRight,
  CheckCircle, GraduationCap,
  ShieldCheck, Play, Medal, Flag, Target as TargetLucide, UserCheck, Book,
  Quote, Shield, Users as UsersLucide,
  Award as AwardLucide
} from "lucide-react";
import CarouselComponent from "@/components/CarouselComponent";
import { useDojosInfo } from "@/hooks/useDojos";
import { useParams } from "react-router";
import { DojoMaster, DojoSchedule, IDojoInfo, Rank } from "@/services/dojos/dojo.interface";
import { formatPhoneNumber } from "@/helpers/formatter";
import { useForm } from "react-hook-form";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const dojoData = {
  japaneseName: "龍の道",
  translation: "El Camino del Dragón",
  founded: 1990,
  slogan: "Donde cada paso fortalece el carácter",

  about: {
    description: "Fundado por el Gran Maestro Takashi Sato, nuestro dojo es más que un lugar de entrenamiento: es una escuela de vida. Por más de 30 años, hemos formado no solo excelentes artistas marciales, sino también personas íntegras con valores sólidos.",
    philosophy: "Creemos que las artes marciales son un vehículo para el desarrollo humano integral. Cada técnica, cada kata, cada combate es una lección sobre perseverancia, respeto y superación personal.",
    affiliation: "Afiliado oficial a la Organización Hiramatsukai desde 1995. Mantenemos los estándares más altos de calidad en enseñanza y preservación de las tradiciones marciales."
  },

  disciplines: [
    {
      id: "karatedo",
      name: "Karatedo",
      style: "Shito-Ryu",
      color: "red",
      icon: Sword,
      description: "El camino de la mano vacía. Sistema completo de defensa personal que desarrolla fuerza, velocidad y control.",
      levels: ["Principiantes (10º-8º Kyu)", "Intermedios (7º-4º Kyu)", "Avanzados (3º Kyu - Dan)", "Instructores (2º Dan+)"],
      schedule: [
        { day: "Lunes y Miércoles", time: "18:00 - 19:30", level: "Principiantes/Intermedios" },
        { day: "Martes y Jueves", time: "19:30 - 21:00", level: "Avanzados" },
        { day: "Sábado", time: "10:00 - 12:00", level: "Todos los niveles" }
      ],
      features: ["Katas tradicionales", "Kumite deportivo", "Defensa personal", "Desarrollo de ki", "Competiciones"]
    },
    {
      id: "kobudo",
      name: "Kobudo",
      style: "Okinawa Kobudo",
      color: "yellow",
      icon: Target,
      description: "El arte de las armas tradicionales de Okinawa. Más que técnicas de combate, es historia viva.",
      levels: ["Básico (armas principales)", "Intermedio (armas secundarias)", "Avanzado (armas especiales)", "Maestría (formas completas)"],
      schedule: [
        { day: "Martes", time: "18:00 - 19:30", level: "Principiantes" },
        { day: "Jueves", time: "18:00 - 19:30", level: "Intermedios/Avanzados" },
        { day: "Sábado", time: "12:00 - 13:30", level: "Práctica libre" }
      ],
      features: ["Bo (bastón)", "Sai (tridente)", "Tonfa (porra)", "Nunchaku", "Kama (hoz)"]
    },
    {
      id: "kendo",
      name: "Kendo",
      style: "Zen Nippon Kendo Renmei",
      color: "blue",
      icon: Zap,
      description: "El camino de la espada. Disciplina que forja el espíritu a través del manejo del shinai.",
      levels: ["Mudansha (sin Dan)", "Shodan - Sandan", "Yondan - Rokudan", "Nanadan - Hachidan"],
      schedule: [
        { day: "Lunes y Miércoles", time: "20:00 - 21:30", level: "Todos los niveles" },
        { day: "Viernes", time: "19:00 - 20:30", level: "Avanzados" },
        { day: "Sábado", time: "9:00 - 10:30", level: "Competición" }
      ],
      features: ["Armadura completa (Bogu)", "Shinai y Bokuto", "Kata de Kendo", "Shiai (competición)", "Keiko (entrenamiento)"]
    },
    {
      id: "iaido",
      name: "Iaido",
      style: "Muso Jikiden Eishin Ryu",
      color: "blue",
      icon: Shield,
      description: "El arte del desenvaine rápido. Concentración absoluta y precisión milimétrica.",
      levels: ["Shoden (primer nivel)", "Chuden (nivel medio)", "Okuden (nivel alto)", "Kaiden (transmisión completa)"],
      schedule: [
        { day: "Martes y Jueves", time: "20:00 - 21:30", level: "Todos los niveles" },
        { day: "Domingo", time: "11:00 - 12:30", level: "Práctica avanzada" }
      ],
      features: ["Iaito (espada práctica)", "Shinken (espada real)", "Tameshigiri (corte)", "Meditación", "Ceremonial"]
    }
  ],

  masters: [
    {
      id: 1,
      name: "Sensei Takashi Sato",
      title: "Soke (Fundador)",
      rank: "8º Dan Karatedo, 7º Dan Kobudo",
      experience: "45 años",
      specialty: "Karatedo Shito-Ryu, Kobudo",
      bio: "Discípulo directo del Gran Maestro Kenwa Mabuni. Estudió 15 años en Okinawa. Fundador del dojo y principal transmisor de la tradición.",
      awards: ["Premio Excelencia Marcial 2005", "Maestro del Año 2010", "Legado Cultural 2018"],
      image: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80"
    },
    {
      id: 2,
      name: "Sensei Yuki Tanaka",
      title: "Shihan (Maestro Instructor)",
      rank: "6º Dan Kendo, 5º Dan Iaido",
      experience: "28 años",
      specialty: "Kendo, Iaido",
      bio: "Triple campeona nacional de Kendo. Instructora certificada por la All Japan Kendo Federation. Especialista en pedagogía marcial.",
      awards: ["Campeona Nacional Kendo 2008-2010", "Instructora Certificada AJKF", "Premio a la Enseñanza 2015"],
      image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80"
    },
    {
      id: 3,
      name: "Sensei Kenji Yamamoto",
      title: "Renshi (Instructor Entrenado)",
      rank: "5º Dan Karatedo, 4º Dan Kobudo",
      experience: "20 años",
      specialty: "Karatedo, Defensa Personal",
      bio: "Especialista en defensa personal realista. Ha entrenado fuerzas de seguridad y cuerpos especiales. Enfoque práctico y aplicado.",
      awards: ["Instructor Defensa Personal", "Entrenador Fuerzas Especiales", "Certificado Seguridad VIP"],
      image: "https://images.unsplash.com/photo-1599058917212-d750089bc07e?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80"
    }
  ],

  advancedStudents: [
    {
      id: 1,
      name: "Hiroshi Nakamura",
      rank: "3º Dan Karatedo",
      years: 8,
      achievements: ["Campeón Regional 2022", "Instructor Junior", "Representante en Seminarios"],
      specialty: "Kata",
      image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80"
    },
    {
      id: 2,
      name: "Aiko Suzuki",
      rank: "2º Dan Kendo",
      years: 6,
      achievements: ["Subcampeona Nacional 2023", "Capitana Equipo Competición", "Organizadora Eventos"],
      specialty: "Shiai",
      image: "https://images.unsplash.com/photo-1599058917765-3c6d5e42c6c8?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80"
    },
    {
      id: 3,
      name: "Ryo Tanaka",
      rank: "1º Dan Kobudo",
      years: 5,
      achievements: ["Especialista en Bo-jutsu", "Demostraciones Culturales", "Asistente Instructor"],
      specialty: "Armas Tradicionales",
      image: "https://images.unsplash.com/photo-1549576490-b0b4831ef60a?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80"
    }
  ],

  values: [
    {
      title: "Disciplina (Shitsuke)",
      description: "La constancia en la práctica forja el carácter. Sin disciplina no hay progreso verdadero.",
      icon: TargetLucide
    },
    {
      title: "Respeto (Sonkei)",
      description: "Hacia el sensei, los sempai, los kohai y el dojo. El respeto es la base de las relaciones marciales.",
      icon: UserCheck
    },
    {
      title: "Humildad (Kenkyo)",
      description: "El verdadero conocimiento comienza reconociendo lo que no sabemos. La arrogancia es el peor enemigo.",
      icon: Book
    },
    {
      title: "Perseverancia (Nintai)",
      description: "Caer siete veces, levantarse ocho. El camino marcial se recibe paso a paso, no de un salto.",
      icon: Flag
    }
  ],

  principles: [
    "El dojo es un lugar de estudio y reflexión, no de exhibicionismo",
    "La técnica sin espíritu es vacía; el espíritu sin técnica es peligroso",
    "Cada estudiante progresa a su ritmo, pero todos deben dar su máximo",
    "La cortesía y etiqueta marcial son tan importantes como la técnica",
    "El verdadero oponente está dentro de uno mismo",
    "Las artes marciales son para proteger, no para atacar"
  ],

  gallery: {
    training: [
      "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1594736797933-d039edb8b11a?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1599901860904-17e6ed7083a0?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80"
    ],
    events: [
      "https://images.unsplash.com/photo-1518611012118-696072aa579a?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1599058917212-d750089bc07e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80"
    ],
    ceremonies: [
      "https://images.unsplash.com/photo-1549576490-b0b4831ef60a?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1599058917765-3c6d5e42c6c8?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80"
    ]
  },

  videos: [
    { id: 1, title: "Demostración Kata Superior", duration: "4:32", thumbnail: "https://img.youtube.com/vi/abc123/maxresdefault.jpg" },
    { id: 2, title: "Seminario de Kobudo", duration: "8:15", thumbnail: "https://img.youtube.com/vi/def456/maxresdefault.jpg" },
    { id: 3, title: "Entrenamiento de Kendo", duration: "6:47", thumbnail: "https://img.youtube.com/vi/ghi789/maxresdefault.jpg" },
    { id: 4, title: "Ceremonia de Graduación", duration: "10:22", thumbnail: "https://img.youtube.com/vi/jkl012/maxresdefault.jpg" }
  ],

  socialMedia: {
    instagram: { handle: "@dojoryunomichi", followers: "2.5K" },
    facebook: { handle: "DojoRyuNoMichi", followers: "1.8K" },
    youtube: { handle: "Dojo Ryu no Michi", subscribers: "3.2K" },
    tiktok: { handle: "@dojoryunomichi", followers: "4.1K" }
  },

  contact: {
    address: "Calle del Dojo 123, Barrio Tradicional, 28014 Madrid",
    phone: "+34 91 123 45 67",
    whatsapp: "+34 612 345 678",
    email: "info@dojoryunomichi.com",
    website: "www.dojoryunomichi.com",
    schedule: "Lunes a Viernes: 16:00-22:00 | Sábados: 9:00-14:00",
    emergency: "Disponible 24/7 para alumnos registrados"
  }
};

const FALLBACK_DOJO_IMAGE = "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80";

interface ContactFormValues {
  name: string;
  lastName: string;
  email: string;
  phone: string;
  martialArtInterest: string;
  message: string;
}


export default function DojoPage() {
  const [activeDiscipline, setActiveDiscipline] = useState("karatedo");
  const [activeTab, setActiveTab] = useState("about");

  const { id } = useParams();

  const dojo: IDojoInfo | undefined = useDojosInfo(id || "").data;

  console.log(dojo);

  const getBannerDojo = (dojo: IDojoInfo): string => {
    const findBanner = dojo.dojoImages.find(img => img.type === "banner");
    if (findBanner && findBanner.url && findBanner.url.trim() !== "") {
      return `${import.meta.env.VITE_API_URL}/api${findBanner.url}`
    }
    return FALLBACK_DOJO_IMAGE;
  }

  const getProfileImg = (master: DojoMaster): string => {
    const img = master.profileImg;
    if (img && img.trim() == "") return '';
    return `${import.meta.env.VITE_API_URL}/api${img}`;
  }

  const setFoundedText = (founded: Date): string => {
    const currentYear = new Date().getFullYear();
    const foundedYear = new Date(founded).getFullYear();
    const yearsAgo = currentYear - foundedYear;
    return `Desde ${foundedYear} · ${yearsAgo} años de tradición`;
  }

  const returnTitle = (code: string) => {
    const rename = code.slice(1);
    const grade = code[0]
    return `${rename} ${grade == 'K' ? 'Kyu' : 'Dan'}`
  }

  const setRankText = (rank: Rank): string => {
    return `${rank.rank_name} · ${returnTitle(rank.code)}`;
  }

  const setDojoSchedule = (schedule: DojoSchedule[]) => {
    const groupedSchedule = schedule.reduce<Record<string, DojoSchedule[]>>((acc, item) => {
      const day = item.day || "Sin día";

      if (!acc[day]) {
        acc[day] = [];
      }

      acc[day].push(item);
      return acc;
    }, {});

    return (
      <>
        {schedule.length > 0 ? (

          <>
            {Object.entries(groupedSchedule).map(([day, daySchedules]) => (
              <div key={day} className="mb-3">
                <p className="text-gray-700 font-medium">{day}</p>
                <div className="pl-2">
                  {daySchedules.map((item, index) => (
                    <p key={`${day}-${item.name}-${item.startTime}-${index}`} className="text-gray-700">
                      {item.name}: {item.startTime} - {item.endTime}
                    </p>
                  ))}
                </div>
              </div>
            ))}
          </>
        ) : (
          <p className="text-gray-500 text-sm lg:text-base">No hay horarios disponibles</p>
        )
        }
      </>
    )
  }

  const getSocialMediaStyle = (socialMedia: string) => {
    const social = socialMedia.trim().toLowerCase();

    if (social === "facebook") {
      return {
        cardClass: "bg-blue-600/90 border-blue-300/60 hover:bg-blue-600 text-white",
        Icon: Facebook,
      };
    }

    if (social === "youtube") {
      return {
        cardClass: "bg-red-600/90 border-red-300/60 hover:bg-red-600 text-white",
        Icon: Youtube,
      };
    }

    if (social === "instagram") {
      return {
        cardClass: "bg-linear-to-br from-pink-500 via-fuchsia-500 to-orange-400 border-pink-200/60 hover:opacity-95 text-white",
        Icon: Instagram,
      };
    }

    if (social === "twitter" || social === "x") {
      return {
        cardClass: "bg-sky-500/90 border-sky-300/60 hover:bg-sky-500 text-white",
        Icon: Twitter,
      };
    }

    return {
      cardClass: "bg-gray-700/90 border-gray-300/40 hover:bg-gray-700 text-white",
      Icon: Globe,
    };
  }

  const getSocialMediaLink = (socialMedia: string, link: string, directUrl: string) => {
    const value = link.trim();

    if (!value) return "#";

    if (value.startsWith("http://") || value.startsWith("https://")) {
      return value;
    }

    const social = socialMedia.trim().toLowerCase();

    if (directUrl.trim() !== '') return directUrl;

    if (social === "instagram") {
      const handle = value.replace(/^@/, "");
      return `https://www.instagram.com/${handle}`;
    }

    if (social === "facebook") {
      return `https://www.facebook.com/${value}`;
    }

    if (social === "youtube") {
      return `https://www.youtube.com/${value}`;
    }

    if (social === "twitter" || social === "x") {
      const handle = value.replace(/^@/, "");
      return `https://x.com/${handle}`;
    }

    return `https://${value}`;
  }

  const getWhatsAppLink = (phone: string, dojoName?: string) => {
    const cleanPhone = phone.replace(/\D/g, "");

    if (!cleanPhone) {
      return "#";
    }

    const message = dojoName
      ? `Hola, quiero saber mas informacion. Estoy interesado en las clases de ${dojoName}.`
      : "Hola, quiero saber mas informacion. Estoy interesado en las clases.";

    return `https://wa.me/${cleanPhone}?text=${encodeURIComponent(message)}`;
  }

  const contactForm = useForm<ContactFormValues>({
    defaultValues: {
      name: "",
      lastName: "",
      email: "",
      phone: "",
      martialArtInterest: "",
      message: "",
    },
  });

  const handleContactSubmit = (values: ContactFormValues) => {
    const selectedDiscipline = dojoData.disciplines.find((disc) => disc.id === values.martialArtInterest)?.name;

    const contactMessage = [
      `Hola, soy ${values.name} ${values.lastName}.`,
      "Quiero saber mas informacion sobre las clases.",
      selectedDiscipline ? `Arte de interes: ${selectedDiscipline}.` : "",
      values.email ? `Email: ${values.email}.` : "",
      values.phone ? `Telefono: ${values.phone}.` : "",
      values.message ? `Mensaje: ${values.message}` : "",
    ]
      .filter(Boolean)
      .join("\n");

    const cleanPhone = dojo?.phone.replace(/\D/g, "");

    if (!cleanPhone) {
      return;
    }

    const whatsappUrl = `https://wa.me/${cleanPhone}?text=${encodeURIComponent(contactMessage)}`;
    window.open(whatsappUrl, "_blank", "noopener,noreferrer");
  }

  const currentDiscipline = dojoData.disciplines.find(d => d.id === activeDiscipline);

  return (
    <div className="min-h-screen bg-white">

      {dojo && (
        <>
          {/* Hero Section */}
          <div className="relative bg-linear-to-br from-gray-900 to-black text-white overflow-hidden">
            <div className={`absolute inset-0 opacity-20 bg-cover bg-center`}>
              <img src={getBannerDojo(dojo)} alt="Banner del Dojo" className="w-full h-full object-cover" />
            </div>

            <div className="container relative mx-auto px-4 py-16 md:py-24">
              <div className="max-w-4xl mx-auto text-center">
                <Badge className="mb-6 bg-white/20 text-white backdrop-blur-sm border-none">
                  {setFoundedText(dojo.founded)} · Afiliado Hiramatsukai
                </Badge>

                <h1 className="text-4xl md:text-6xl font-bold mb-4" style={{ fontFamily: "Kavoon" }}>
                  {dojo?.dojo}
                </h1>

                <div className="mb-6">
                  {/* <p className="text-xl text-gray-300">{dojo.japaneseName}</p> */}
                  <p className="text-lg text-gray-400">{dojo.translate}</p>
                </div>

                <p className="text-xl md:text-2xl text-gray-200 mb-8">
                  {dojo.slogan}
                </p>
              </div>
            </div>
          </div>

          {/* Navegación Principal */}
          <div className="sticky top-0 z-50 bg-white border-b border-gray-200 shadow-sm">
            <div className="container mx-auto px-4">
              <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                <TabsList className="w-full text-xs lg:text-base grid grid-cols-4 h-14">
                  <TabsTrigger value="about" className="">Dojo</TabsTrigger>
                  <TabsTrigger value="masters" className="">Maestros</TabsTrigger>
                  <TabsTrigger value="gallery" className="">Galería</TabsTrigger>
                  <TabsTrigger value="contact" className="">Contacto</TabsTrigger>
                </TabsList>
              </Tabs>
            </div>
          </div>

          <main className="container mx-auto px-4 py-8">
            {/* Contenido Principal dentro de Tabs */}
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">

              {/* Pestaña: El Dojo */}
              <TabsContent value="about" className="space-y-12 mt-8">
                {/* Sección Acerca del Dojo */}
                <section>
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    <div>
                      <h2 className="text-2xl font-bold text-gray-900 mb-4" style={{ fontFamily: "Kavoon" }}>
                        Nuestra Historia y Filosofía
                      </h2>
                      <p className="text-gray-700 mb-6 leading-relaxed">
                        {dojoData.about.description}
                      </p>
                      <p className="text-gray-700 mb-6 leading-relaxed">
                        {dojoData.about.philosophy}
                      </p>

                      <div className="bg-yellow-50 border-l-4 border-yellow-500 p-6 rounded-r-lg mb-6">
                        <div className="flex items-start gap-3">
                          <Quote className="h-6 w-6 text-yellow-600 mt-1 shrink-0" />
                          <div>
                            <p className="text-gray-800 font-medium italic">
                              "No buscamos crear luchadores, sino forjar seres humanos íntegros capaces de enfrentar cualquier desafío con honor y determinación."
                            </p>
                            <p className="text-gray-600 text-sm mt-2">— Sensei Takashi Sato, Fundador</p>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div>
                      <h3 className="text-xl font-bold text-gray-900 mb-4">Afiliación y Certificaciones</h3>
                      <Card className="border-2 border-red-200">
                        <CardContent className="p-6">
                          <div className="flex items-center gap-4 mb-4">
                            <div className="h-12 w-12 rounded-full bg-linear-to-br from-red-600 to-red-800 flex items-center justify-center">
                              <ShieldCheck className="h-6 w-6 text-white" />
                            </div>
                            <div>
                              <h4 className="font-bold text-gray-900">Organización Hiramatsukai</h4>
                              <p className="text-sm text-gray-600">Afiliado Oficial desde 1995</p>
                            </div>
                          </div>

                          <p className="text-gray-700 mb-4">
                            {dojoData.about.affiliation}
                          </p>

                          <div className="space-y-3">
                            <div className="flex items-center gap-2">
                              <CheckCircle className="h-5 w-5 text-green-500" />
                              <span className="text-gray-700">Certificación Internacional de Enseñanza</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <CheckCircle className="h-5 w-5 text-green-500" />
                              <span className="text-gray-700">Estándares de Seguridad AAA</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <CheckCircle className="h-5 w-5 text-green-500" />
                              <span className="text-gray-700">Reconocimiento Cultural por la Embajada de Japón</span>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </div>
                  </div>
                </section>

                <Separator />

                {/* Valores del Dojo */}
                <section>
                  <h2 className="text-2xl font-bold text-center text-gray-900 mb-8" style={{ fontFamily: "Kavoon" }}>
                    Nuestros Valores Fundamentales
                  </h2>

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {dojoData.values.map((value, index) => {
                      const Icon = value.icon;
                      return (
                        <Card key={index} className="hover:shadow-lg transition-shadow duration-300 border-gray-200">
                          <CardContent className="p-6">
                            <div className="h-12 w-12 rounded-full bg-linear-to-br from-gray-900 to-black flex items-center justify-center mb-4">
                              <Icon className="h-6 w-6 text-white" />
                            </div>
                            <h3 className="font-bold text-gray-900 mb-2">{value.title}</h3>
                            <p className="text-gray-600 text-sm">{value.description}</p>
                          </CardContent>
                        </Card>
                      );
                    })}
                  </div>
                </section>

                <Separator />

                {/* Principios */}
                <section>
                  <h2 className="text-2xl font-bold text-center text-gray-900 mb-8" style={{ fontFamily: "Kavoon" }}>
                    Principios del Dojo
                  </h2>

                  <div className="max-w-3xl mx-auto">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {dojoData.principles.map((principle, index) => (
                        <div key={index} className="flex items-start gap-3 p-4 bg-gray-50 rounded-lg">
                          <div className="h-6 w-6 rounded-full bg-red-100 flex items-center justify-center shrink-0">
                            <span className="text-red-600 font-bold text-sm">{index + 1}</span>
                          </div>
                          <p className="text-gray-700">{principle}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </section>
              </TabsContent>

              {/* Pestaña: Artes Marciales */}
              <TabsContent value="disciplines" className="space-y-12 mt-8">
                {/* Selector de Disciplinas */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {dojoData.disciplines.map((discipline) => {
                    const Icon = discipline.icon;
                    const isActive = activeDiscipline === discipline.id;
                    return (
                      <button
                        key={discipline.id}
                        onClick={() => setActiveDiscipline(discipline.id)}
                        className={`p-4 rounded-xl border-2 transition-all duration-300 ${isActive
                          ? `border-${discipline.color}-500 bg-${discipline.color}-50`
                          : 'border-gray-200 hover:border-gray-300'
                          }`}
                      >
                        <div className="flex flex-col items-center gap-3">
                          <div className={`h-12 w-12 rounded-full ${isActive ? `bg-${discipline.color}-100` : 'bg-gray-100'} flex items-center justify-center`}>
                            <Icon className={`h-6 w-6 ${isActive ? `text-${discipline.color}-600` : 'text-gray-600'}`} />
                          </div>
                          <div className="text-center">
                            <h3 className={`font-bold ${isActive ? `text-${discipline.color}-700` : 'text-gray-700'}`}>
                              {discipline.name}
                            </h3>
                            <p className="text-xs text-gray-500">{discipline.style}</p>
                          </div>
                        </div>
                      </button>
                    );
                  })}
                </div>

                {/* Detalle de Disciplina */}
                {currentDiscipline && (
                  <Card className={`border-2 border-${currentDiscipline.color}-200`}>
                    <CardContent className="p-8">
                      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        <div className="lg:col-span-2">
                          <div className="flex items-center gap-4 mb-6">
                            <div className={`h-16 w-16 rounded-full bg-${currentDiscipline.color}-100 flex items-center justify-center`}>
                              <currentDiscipline.icon className={`h-8 w-8 text-${currentDiscipline.color}-600`} />
                            </div>
                            <div>
                              <h2 className="text-2xl font-bold text-gray-900" style={{ fontFamily: "Kavoon" }}>
                                {currentDiscipline.name}
                              </h2>
                              <p className="text-gray-600">{currentDiscipline.style}</p>
                            </div>
                          </div>

                          <p className="text-gray-700 mb-6 leading-relaxed">
                            {currentDiscipline.description}
                          </p>

                          <div className="mb-6">
                            <h3 className="font-bold text-gray-900 mb-3">Características Principales</h3>
                            <div className="flex flex-wrap gap-2">
                              {currentDiscipline.features.map((feature, index) => (
                                <Badge
                                  key={index}
                                  className={`bg-${currentDiscipline.color}-100 text-${currentDiscipline.color}-800`}
                                >
                                  {feature}
                                </Badge>
                              ))}
                            </div>
                          </div>
                        </div>

                        <div>
                          <div className="bg-gray-50 rounded-xl p-6">
                            <h3 className="font-bold text-gray-900 mb-4">Niveles y Horarios</h3>

                            <div className="mb-6">
                              <h4 className="text-sm font-medium text-gray-700 mb-2">Niveles Disponibles:</h4>
                              <ul className="space-y-2">
                                {currentDiscipline.levels.map((level, index) => (
                                  <li key={index} className="flex items-center gap-2 text-sm text-gray-600">
                                    <ChevronRight className="h-4 w-4 text-gray-400" />
                                    {level}
                                  </li>
                                ))}
                              </ul>
                            </div>

                            <div>
                              <h4 className="text-sm font-medium text-gray-700 mb-2">Horarios de Clase:</h4>
                              <ul className="space-y-3">
                                {currentDiscipline.schedule.map((item, index) => (
                                  <li key={index} className="p-3 bg-white rounded-lg">
                                    <div className="flex justify-between items-center mb-1">
                                      <span className="font-medium text-gray-900">{item.day}</span>
                                      <span className="font-bold text-gray-900">{item.time}</span>
                                    </div>
                                    <p className="text-sm text-gray-600">{item.level}</p>
                                  </li>
                                ))}
                              </ul>
                            </div>

                            <Button className={`w-full mt-6 bg-${currentDiscipline.color}-600 hover:bg-${currentDiscipline.color}-700 text-white`}>
                              Inscribirse en {currentDiscipline.name}
                            </Button>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                )}

                {/* Alumnos Avanzados */}
                <section>
                  <h2 className="text-2xl font-bold text-center text-gray-900 mb-8" style={{ fontFamily: "Kavoon" }}>
                    Alumnos Destacados
                  </h2>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {dojoData.advancedStudents.map((student) => (
                      <Card key={student.id} className="hover:shadow-xl transition-all duration-300">
                        <CardContent className="p-6">
                          <div className="text-center">
                            <div className="h-24 w-24 mx-auto rounded-full overflow-hidden border-4 border-gray-200 mb-4">
                              <img
                                src={student.image}
                                alt={student.name}
                                className="w-full h-full object-cover"
                              />
                            </div>
                            <h3 className="text-lg font-bold text-gray-900">{student.name}</h3>
                            <Badge className="mt-2 bg-red-100 text-red-800">{student.rank}</Badge>
                            <p className="text-sm text-gray-600 mt-2">{student.years} años en el dojo</p>

                            <div className="mt-4">
                              <h4 className="font-medium text-gray-900 mb-2">Logros:</h4>
                              <ul className="space-y-1">
                                {student.achievements.map((achievement, idx) => (
                                  <li key={idx} className="text-sm text-gray-600 flex items-center gap-1">
                                    <Medal className="h-3 w-3 text-yellow-500" />
                                    {achievement}
                                  </li>
                                ))}
                              </ul>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </section>
              </TabsContent>

              {/* Pestaña: Maestros */}
              <TabsContent value="masters" className="space-y-12 mt-8">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                  {dojo.masters.map((master) => (
                    <Card key={master.id} className="border-2 border-gray-200 hover:border-red-300 transition-colors duration-300">
                      <CardContent className="p-6">
                        <div className="text-center mb-6">
                          <div className="h-32 w-32 mx-auto rounded-full overflow-hidden border-4 border-gray-300 mb-4">
                            <img
                              src={getProfileImg(master)}
                              alt={master.name}
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <h3 className="text-xl font-bold text-gray-900">{master.name}</h3>
                          <p className="text-red-600 font-medium">{master.rol.rol}</p>
                          <Badge className="mt-2 bg-gray-900 text-white">{setRankText(master.userRanks[0].rank)}</Badge>
                        </div>

                        <div className="space-y-4">
                          {/*   <div>
                            <h4 className="font-bold text-gray-900 mb-2">Especialidad</h4>
                            <p className="text-gray-700">{master.specialty}</p>
                          </div>

                          <div>
                            <h4 className="font-bold text-gray-900 mb-2">Experiencia</h4>
                            <p className="text-gray-700">{master.experience}</p>
                          </div>

                          <div>
                            <h4 className="font-bold text-gray-900 mb-2">Biografía</h4>
                            <p className="text-gray-700 text-sm">{master.bio}</p>
                          </div>

                          <div>
                            <h4 className="font-bold text-gray-900 mb-2">Reconocimientos</h4>
                            <ul className="space-y-1">
                              {master.awards.map((award, idx) => (
                                <li key={idx} className="text-sm text-gray-600 flex items-center gap-2">
                                  <Trophy className="h-4 w-4 text-yellow-500" />
                                  {award}
                                </li>
                              ))}
                            </ul>
                          </div> */}
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>

                {/* Línea de Maestros */}
                <section className="bg-gray-50 rounded-2xl p-8">
                  <h3 className="text-2xl font-bold text-center text-gray-900 mb-6" style={{ fontFamily: "Kavoon" }}>
                    Línea de Transmisión
                  </h3>

                  <div className="max-w-4xl mx-auto">
                    <div className="relative">
                      <div className="flex flex-col md:flex-row justify-between items-center">
                        <div className="text-center mb-6 md:mb-0">
                          <div className="h-16 w-16 rounded-full bg-linear-to-br from-gray-900 to-black flex items-center justify-center mx-auto mb-3">
                            <GraduationCap className="h-8 w-8 text-white" />
                          </div>
                          <h4 className="font-bold text-gray-900">Gran Maestro Kenwa Mabuni</h4>
                          <p className="text-sm text-gray-600">Fundador Shito-Ryu</p>
                        </div>

                        <ChevronRight className="h-8 w-8 text-gray-400 hidden md:block" />

                        <div className="text-center mb-6 md:mb-0">
                          <div className="h-16 w-16 rounded-full bg-linear-to-br from-red-600 to-red-800 flex items-center justify-center mx-auto mb-3">
                            <UsersLucide className="h-8 w-8 text-white" />
                          </div>
                          <h4 className="font-bold text-gray-900">Sensei Takashi Sato</h4>
                          <p className="text-sm text-gray-600">Discípulo Directo</p>
                        </div>

                        <ChevronRight className="h-8 w-8 text-gray-400 hidden md:block" />

                        <div className="text-center">
                          <div className="h-16 w-16 rounded-full bg-linear-to-br from-blue-600 to-blue-800 flex items-center justify-center mx-auto mb-3">
                            <AwardLucide className="h-8 w-8 text-white" />
                          </div>
                          <h4 className="font-bold text-gray-900">Nuestros Alumnos</h4>
                          <p className="text-sm text-gray-600">Continúan el Legado</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </section>
              </TabsContent>

              {/* Pestaña: Galería */}
              <TabsContent value="gallery" className="space-y-12 mt-8">
                {/* Carousel Principal */}
                <section>
                  <h2 className="text-2xl font-bold text-gray-900 mb-6" style={{ fontFamily: "Kavoon" }}>
                    Galería de Entrenamiento
                  </h2>
                  <CarouselComponent />
                </section>

                {/* Videos */}
                <section>
                  <h2 className="text-2xl font-bold text-gray-900 mb-6" style={{ fontFamily: "Kavoon" }}>
                    Videos del Dojo
                  </h2>

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {dojoData.videos.map((video) => (
                      <Card key={video.id} className="overflow-hidden hover:shadow-xl transition-shadow duration-300">
                        <div className="relative h-48 bg-linear-to-br from-gray-900 to-black">
                          <div className="absolute inset-0 flex items-center justify-center">
                            <Play className="h-12 w-12 text-white/70" />
                          </div>
                          <div className="absolute bottom-2 right-2 bg-black/70 text-white text-xs px-2 py-1 rounded">
                            {video.duration}
                          </div>
                        </div>
                        <CardContent className="p-4">
                          <h3 className="font-bold text-gray-900 mb-2">{video.title}</h3>
                          <Button variant="ghost" className="w-full text-red-600 hover:text-red-700">
                            <Play className="h-4 w-4 mr-2" />
                            Ver Video
                          </Button>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </section>

                {/* Galería de Fotos */}
                <section>
                  <h2 className="text-2xl font-bold text-gray-900 mb-6" style={{ fontFamily: "Kavoon" }}>
                    Más Fotos
                  </h2>

                  <Tabs defaultValue="training" className="w-full">
                    <TabsList className="grid grid-cols-3 mb-6">
                      <TabsTrigger value="training">Entrenamiento</TabsTrigger>
                      <TabsTrigger value="events">Eventos</TabsTrigger>
                      <TabsTrigger value="ceremonies">Ceremonias</TabsTrigger>
                    </TabsList>

                    <TabsContent value="training" className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      {dojoData.gallery.training.map((img, index) => (
                        <div key={index} className="aspect-square rounded-lg overflow-hidden">
                          <img
                            src={img}
                            alt={`Entrenamiento ${index + 1}`}
                            className="w-full h-full object-cover hover:scale-110 transition-transform duration-300"
                          />
                        </div>
                      ))}
                    </TabsContent>

                    <TabsContent value="events" className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      {dojoData.gallery.events.map((img, index) => (
                        <div key={index} className="aspect-square rounded-lg overflow-hidden">
                          <img
                            src={img}
                            alt={`Evento ${index + 1}`}
                            className="w-full h-full object-cover hover:scale-110 transition-transform duration-300"
                          />
                        </div>
                      ))}
                    </TabsContent>

                    <TabsContent value="ceremonies" className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      {dojoData.gallery.ceremonies.map((img, index) => (
                        <div key={index} className="aspect-square rounded-lg overflow-hidden">
                          <img
                            src={img}
                            alt={`Ceremonia ${index + 1}`}
                            className="w-full h-full object-cover hover:scale-110 transition-transform duration-300"
                          />
                        </div>
                      ))}
                    </TabsContent>
                  </Tabs>
                </section>
              </TabsContent>

              {/* Pestaña: Contacto */}
              <TabsContent value="contact" className="space-y-12">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  {/* Información de Contacto */}
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900 mb-6" style={{ fontFamily: "Kavoon" }}>
                      Contacta con Nosotros
                    </h2>

                    <div className="space-y-6">
                      <div className="flex items-start gap-4 p-4 bg-gray-50 rounded-xl">
                        <div className="h-12 w-12 rounded-full bg-red-100 flex items-center justify-center shrink-0">
                          <MapPin className="h-6 w-6 text-red-600" />
                        </div>
                        <div>
                          <h3 className="font-bold text-gray-900">Dirección</h3>
                          <p className="text-gray-700 text-sm lg:text-base">{dojo.address}</p>
                        </div>
                      </div>

                      <a
                        href={getWhatsAppLink(dojo.phone, dojo.dojo)}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block"
                      >
                        <span className="font-semibold text-green-600">Haz click aqui para ir al chat de WhatsApp</span>
                        <div className="flex items-start gap-4 p-4 bg-gray-50 rounded-xl transition-colors duration-300 hover:bg-green-50">
                          <div className="h-12 w-12 rounded-full bg-green-100 flex items-center justify-center shrink-0">
                            <MdWhatsapp className="h-6 w-6 text-green-600" />
                          </div>
                          <div>
                            <h3 className="font-bold text-gray-900">Teléfonos</h3>
                            <p className="text-gray-700 text-sm lg:text-base">{formatPhoneNumber(dojo.phone)}</p>
                          </div>
                        </div>
                      </a>

                      <div className="flex items-start gap-4 p-4 bg-gray-50 rounded-xl">
                        <div className="h-12 w-12 rounded-full bg-blue-100 flex items-center justify-center shrink-0">
                          <Mail className="h-6 w-6 text-blue-600" />
                        </div>
                        <div>
                          <h3 className="font-bold text-gray-900">Email</h3>
                          <p className="text-gray-700 text-sm lg:text-base">{dojo.email}</p>
                        </div>
                      </div>

                      <div className="flex items-start gap-4 p-4 bg-gray-50 rounded-xl">
                        <div className="h-12 w-12 rounded-full bg-green-100 flex items-center justify-center shrink-0">
                          <Clock className="h-6 w-6 text-green-600" />
                        </div>
                        <div>
                          <h3 className="font-bold text-gray-900">Horarios</h3>
                          {setDojoSchedule(dojo.Schedules)}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Formulario de Contacto */}
                  <div>
                    <Card className="border-2 border-gray-200">
                      <CardContent className="px-4">
                        <h3 className="text-xl font-bold text-gray-900 mb-4 text-center lg:text-left" style={{ fontFamily: "Kavoon" }}>
                          Solicitar Información
                        </h3>

                        <Form {...contactForm}>
                          <form onSubmit={contactForm.handleSubmit(handleContactSubmit)} className="space-y-4">
                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                              <FormField
                                control={contactForm.control}
                                name="name"
                                rules={{ required: "El nombre es obligatorio" }}
                                render={({ field }) => (
                                  <FormItem>
                                    <FormLabel>Nombre *</FormLabel>
                                    <FormControl>
                                      <Input placeholder="Nombre" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                  </FormItem>
                                )}
                              />

                              <FormField
                                control={contactForm.control}
                                name="lastName"
                                rules={{ required: "Los apellidos son obligatorios" }}
                                render={({ field }) => (
                                  <FormItem>
                                    <FormLabel>Apellidos *</FormLabel>
                                    <FormControl>
                                      <Input placeholder="Apellidos" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                  </FormItem>
                                )}
                              />
                            </div>

                            <FormField
                              control={contactForm.control}
                              name="email"
                              rules={{ required: "El email es obligatorio" }}
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>Email *</FormLabel>
                                  <FormControl>
                                    <Input type="email" placeholder="correo@ejemplo.com" {...field} />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />

                            <FormField
                              control={contactForm.control}
                              name="phone"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>Teléfono</FormLabel>
                                  <FormControl>
                                    <Input type="tel" placeholder="0400-0000000" {...field} />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />

                            <FormField
                              control={contactForm.control}
                              name="martialArtInterest"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>Arte Marcial de Interés</FormLabel>
                                  <Select onValueChange={field.onChange} value={field.value}>
                                    <FormControl>
                                      <SelectTrigger className="w-full">
                                        <SelectValue placeholder="Selecciona una opción" />
                                      </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                      {dojoData.disciplines.map((disc) => (
                                        <SelectItem key={disc.id} value={disc.id}>{disc.name}</SelectItem>
                                      ))}
                                    </SelectContent>
                                  </Select>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />

                            <FormField
                              control={contactForm.control}
                              name="message"
                              rules={{ required: "El mensaje es obligatorio" }}
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>Mensaje *</FormLabel>
                                  <FormControl>
                                    <Textarea rows={4} placeholder="Cuéntanos en qué podemos ayudarte" {...field} />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />

                            <Button type="submit" className="w-full bg-red-600 hover:bg-red-700 text-white">
                              Enviar Solicitud
                            </Button>
                          </form>
                        </Form>
                      </CardContent>
                    </Card>
                  </div>
                </div>

                {/* Redes Sociales */}
                <section className="bg-gray-200 text-gray-900 rounded-2xl p-8">
                  <h2 className="text-2xl font-bold text-center mb-8" style={{ fontFamily: "Kavoon" }}>
                    Síguenos en Redes Sociales
                  </h2>

                  <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                    {dojo.socialMedia.map((data) => {
                      const socialConfig = getSocialMediaStyle(data.socialMedia);
                      const socialLink = getSocialMediaLink(data.socialMedia, data.link, data.directUrl);
                      const Icon = socialConfig.Icon;

                      return (
                        <a
                          key={data.socialMedia}
                          href={socialLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="block"
                        >
                          <Card className={`${socialConfig.cardClass} backdrop-blur-sm transition-transform duration-300 hover:scale-[1.02] cursor-pointer`}>
                            <CardContent className="p-6 text-center">
                              <div className="h-16 w-16 rounded-full bg-white/20 flex items-center justify-center mx-auto mb-4">
                                <Icon className="h-8 w-8 text-white" />
                              </div>
                              <h3 className="font-bold text-lg mb-1 capitalize">{data.socialMedia}</h3>
                              <p className="text-white/90 mb-3 truncate">{data.link}</p>
                            </CardContent>
                          </Card>
                        </a>
                      );
                    })}
                  </div>
                </section>

                {/* Mapa */}
                <Card>
                  <CardContent className="p-8">
                    <h3 className="text-xl font-bold text-gray-900 mb-6" style={{ fontFamily: "Kavoon" }}>
                      Ubicación del Dojo
                    </h3>

                    <div className="h-96 bg-linear-to-br from-gray-200 to-gray-300 rounded-xl flex items-center justify-center">
                      <div className="text-center">
                        <MapPin className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                        <p className="text-gray-600">Mapa interactivo de ubicación</p>
                        <Button className="mt-4 bg-red-600 hover:bg-red-700 text-white">
                          <Globe className="h-4 w-4 mr-2" />
                          Abrir en Google Maps
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

            </Tabs>
          </main>
        </>
      )}
    </div>
  );
}