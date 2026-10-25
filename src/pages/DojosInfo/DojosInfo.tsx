import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { MdWhatsapp } from "react-icons/md";
import { Loader } from "@/components/spinner/Loader";
import {
  MapPin, Mail, Globe, Clock,
  Sword, Target, Zap, Instagram, Facebook, Youtube, Twitter, ChevronRight,
  ShieldCheck, Play, Medal, Flag, UserCheck,
  Shield, Users as UsersLucide, Heart
} from "lucide-react";
import { FaRegUserCircle } from "react-icons/fa";
import CarouselComponent from "@/components/CarouselComponent";
import { useDojosInfo } from "@/hooks/useDojos";
import { useParams } from "react-router";
import { DojoMaster, DojoSchedule, IDojoInfo } from "@/services/dojos/dojo.interface";
import { formatPhoneNumber } from "@/helpers/formatter";
import { useForm } from "react-hook-form";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { AnimatePresence, motion } from "motion/react";

type MainTabId = "about" | "masters" | "gallery" | "contact";

const MAIN_TAB_SECTIONS: { id: MainTabId; label: string; icon: typeof Globe }[] = [
  { id: "about", label: "Dojo", icon: ShieldCheck },
  { id: "masters", label: "Maestros", icon: UsersLucide },
  // { id: "gallery", label: "Galeria", icon: Play },
  { id: "contact", label: "Contacto", icon: Mail },
];

const dojoData = {
  japaneseName: "龍の道",
  translation: "El Camino del Dragón",
  founded: 1990,
  slogan: "Donde cada paso fortalece el carácter",

  about: {
    description: "Dojo Perteneciente a la Organización Hiramatsukai.",
    philosophy: "Creemos que las artes marciales son un vehículo para el desarrollo humano integral. Cada técnica, cada kata, cada combate es una lección sobre perseverancia, respeto y superación personal.",
    affiliation: ""
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
    { title: "Amor", description: "El amor por las artes marciales y por nuestros compañeros nos impulsa a crecer y superarnos cada día.", icon: Heart },
    { title: "Honestidad", description: "La honestidad es la base de la confianza. Ser sinceros con nosotros mismos y con los demás nos fortalece como individuos.", icon: ShieldCheck },
    { title: "Respeto", description: "Hacia el sensei, los sempai, los kohai y el dojo. El respeto es la base de las relaciones marciales.", icon: UserCheck },
    { title: "Disciplina", description: "La constancia en la práctica forja el carácter. Sin disciplina no hay progreso verdadero.", icon: Target },
    { title: "Motivación", description: "Cada entrenamiento es una oportunidad para superar nuestros límites y alcanzar nuevas metas.", icon: Zap },
    { title: "Lealtad", description: "Lealtad al dojo, a nuestros maestros y a nuestros principios. El compromiso nos define.", icon: Flag },
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

const disciplineTones: Record<string, {
  border: string;
  bg: string;
  iconBg: string;
  iconText: string;
  title: string;
  badge: string;
  button: string;
}> = {
  red: {
    border: "border-brand-vermilion/40",
    bg: "bg-brand-vermilion/5",
    iconBg: "bg-brand-vermilion/10",
    iconText: "text-brand-vermilion",
    title: "text-brand-vermilion",
    badge: "bg-brand-vermilion/10 text-brand-vermilion",
    button: "bg-brand-vermilion hover:bg-brand-vermilion-dark text-white",
  },
  yellow: {
    border: "border-brand-gold/50",
    bg: "bg-brand-gold/10",
    iconBg: "bg-brand-gold/15",
    iconText: "text-brand-gold-deep",
    title: "text-brand-gold-deep",
    badge: "bg-brand-gold/15 text-brand-gold-deep",
    button: "bg-brand-gold-deep hover:bg-brand-gold text-white",
  },
  blue: {
    border: "border-brand-indigo/35",
    bg: "bg-brand-indigo/5",
    iconBg: "bg-brand-indigo/10",
    iconText: "text-brand-indigo",
    title: "text-brand-indigo",
    badge: "bg-brand-indigo/10 text-brand-indigo",
    button: "bg-brand-indigo hover:bg-brand-sumi text-white",
  },
};


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
  const [activeTab, setActiveTab] = useState<MainTabId>("about");

  const { id } = useParams();

  const { data: dojo, isLoading } = useDojosInfo(id || "");

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
                <p className="font-medium text-brand-ink">{day}</p>
                <div className="pl-2">
                  {daySchedules.map((item, index) => (
                    <div key={`${day}-${item.name}-${item.startTime}-${index}`} className="flex items-center gap-2 text-xs text-brand-muted">
                      <p>{item.name}: {item.startTime} - {item.endTime}</p>
                      <p>|</p>
                      <img src={`/${item.martialArts.icon}`} alt="" className={`${item.martialArts.martialArt === 'Kobudo' ? 'w-9 h-7' : 'w-9 h-9'}`} />
                      <p>{item.martialArts.martialArt}</p>
                    </div>
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

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader size="lg" message="Cargando información del Dojo..." />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-brand-washi">

      {dojo && (
        <>
          {/* Hero Section */}
          <div className="relative overflow-hidden bg-brand-sumi text-white">
            <div className="absolute inset-0 opacity-30 bg-cover bg-center">
              <img src={getBannerDojo(dojo)} alt="Banner del Dojo" className="h-full w-full object-cover" />
            </div>
            <div aria-hidden="true" className="absolute inset-0 bg-linear-to-b from-brand-sumi/80 via-brand-sumi/70 to-brand-sumi" />
            <div aria-hidden="true" className="absolute inset-0 bg-wood-dark opacity-30" />

            <div className="container relative mx-auto px-4 py-16 md:py-24">
              <div className="mx-auto max-w-4xl text-center">
                <span className="mb-6 inline-flex rounded-full border border-white/20 bg-white/10 px-4 py-1.5 text-xs font-medium text-brand-washi backdrop-blur-md">
                  {setFoundedText(dojo.founded)} · Afiliado Hiramatsukai
                </span>

                <h1 className="font-serif text-4xl font-semibold leading-tight md:text-6xl">
                  {dojo?.dojo}
                </h1>

                <div className="mt-4">
                  <p className="text-lg text-brand-washi/60">{dojo.translate}</p>
                </div>

                <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-brand-washi/85 md:text-xl">
                  {dojo.slogan}
                </p>

                <div aria-hidden="true" className="gold-rule mx-auto mt-8 h-px w-40" />
              </div>
            </div>
          </div>

          {/* Navegación Principal */}
          <div className="border-b border-brand-ink/10 bg-brand-washi/85 backdrop-blur-xl">
            <div className="container mx-auto px-4">
              <div className="grid grid-cols-2 items-center justify-center gap-2 py-2 lg:flex lg:gap-3">
                {MAIN_TAB_SECTIONS.map((section) => {
                  const Icon = section.icon;
                  const isActive = activeTab === section.id;

                  return (
                    <motion.button
                      key={section.id}
                      type="button"
                      initial={false}
                      onClick={() => setActiveTab(section.id)}
                      aria-pressed={isActive}
                      className={`flex cursor-pointer items-center justify-center gap-2 rounded-2xl px-4 py-3 text-sm font-medium transition-all duration-300 lg:w-1/4 lg:text-base ${isActive
                        ? "bg-brand-vermilion text-white shadow-soft"
                        : "text-brand-muted hover:bg-white/60 hover:text-brand-ink"
                        }`}
                    >
                      <Icon className="h-4 w-4" aria-hidden="true" />
                      {section.label}
                    </motion.button>
                  );
                })}
              </div>
            </div>
          </div>

          <main className="mx-auto max-w-7xl px-4 py-10">
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -14 }}
                transition={{ duration: 0.3, ease: "easeOut" }}
              >
                {/* Contenido Principal dentro de Tabs */}
                <Tabs value={activeTab} onValueChange={(value) => setActiveTab(value as MainTabId)} className="w-full">

                  {/* Pestaña: El Dojo */}
                  <TabsContent value="about" className="space-y-12 mt-8">
                    {/* Sección Acerca del Dojo */}
                    <section>
                      <div className="text-center">
                        <div>
                          <span className="section-eyebrow text-brand-gold-deep">Nuestra esencia</span>
                          <h2 className="mt-4 font-serif text-2xl font-semibold text-brand-ink sm:text-3xl">
                            Nuestra Historia y Filosofía
                          </h2>
                          <p className="text-measure mx-auto mt-5 leading-relaxed text-brand-muted">
                            {dojoData.about.description}
                          </p>
                          <p className="text-measure mx-auto mt-4 leading-relaxed text-brand-muted">
                            {dojoData.about.philosophy}
                          </p>
                        </div>
                      </div>
                    </section>

                    <Separator className="bg-brand-ink/10" />

                    {/* Valores del Dojo */}
                    <section>
                      <h2 className="text-center font-serif text-2xl font-semibold text-brand-ink sm:text-3xl">
                        Nuestros Valores Fundamentales
                      </h2>

                      <div className="mt-8 grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-4">
                        {dojoData.values.map((value) => {
                          const Icon = value.icon;
                          return (
                            <div key={value.title} className="glass group rounded-3xl p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-lift">
                              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-brand-sumi text-brand-gold transition-colors duration-300 group-hover:bg-brand-vermilion group-hover:text-white">
                                <Icon className="h-6 w-6" aria-hidden="true" />
                              </div>
                              <h3 className="font-serif font-semibold text-brand-ink">{value.title}</h3>
                              <p className="mt-2 text-sm leading-relaxed text-brand-muted">{value.description}</p>
                            </div>
                          );
                        })}
                      </div>
                    </section>

                    <Separator />

                    {/* Principios */}
                    {/* <section>
                      <h2 className="text-2xl font-bold text-center text-gray-900 mb-8">
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
                    </section> */}
                  </TabsContent>

                  {/* Pestaña: Artes Marciales */}
                  <TabsContent value="disciplines" className="space-y-12 mt-8">
                    {/* Selector de Disciplinas */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      {dojoData.disciplines.map((discipline) => {
                        const Icon = discipline.icon;
                        const isActive = activeDiscipline === discipline.id;
                        const tone = disciplineTones[discipline.color] ?? disciplineTones.red;
                        return (
                          <button
                            key={discipline.id}
                            type="button"
                            onClick={() => setActiveDiscipline(discipline.id)}
                            className={`cursor-pointer rounded-2xl border-2 p-4 transition-all duration-300 ${isActive
                              ? `${tone.border} ${tone.bg}`
                              : "border-brand-ink/10 hover:border-brand-ink/20"
                              }`}
                          >
                            <div className="flex flex-col items-center gap-3">
                              <div className={`flex h-12 w-12 items-center justify-center rounded-full ${isActive ? tone.iconBg : "bg-brand-washi-deep"}`}>
                                <Icon className={`h-6 w-6 ${isActive ? tone.iconText : "text-brand-muted"}`} aria-hidden="true" />
                              </div>
                              <div className="text-center">
                                <h3 className={`font-serif font-semibold ${isActive ? tone.title : "text-brand-ink"}`}>
                                  {discipline.name}
                                </h3>
                                <p className="text-xs text-brand-muted">{discipline.style}</p>
                              </div>
                            </div>
                          </button>
                        );
                      })}
                    </div>

                    {/* Detalle de Disciplina */}
                    {currentDiscipline && (
                      <div className={`glass rounded-3xl border-2 ${(disciplineTones[currentDiscipline.color] ?? disciplineTones.red).border}`}>
                        <div className="p-6 sm:p-8">
                          <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
                            <div className="lg:col-span-2">
                              <div className="mb-6 flex items-center gap-4">
                                <div className={`flex h-16 w-16 items-center justify-center rounded-2xl ${(disciplineTones[currentDiscipline.color] ?? disciplineTones.red).iconBg}`}>
                                  <currentDiscipline.icon className={`h-8 w-8 ${(disciplineTones[currentDiscipline.color] ?? disciplineTones.red).iconText}`} aria-hidden="true" />
                                </div>
                                <div>
                                  <h2 className="font-serif text-2xl font-semibold text-brand-ink">
                                    {currentDiscipline.name}
                                  </h2>
                                  <p className="text-brand-muted">{currentDiscipline.style}</p>
                                </div>
                              </div>

                              <p className="mb-6 leading-relaxed text-brand-muted">
                                {currentDiscipline.description}
                              </p>

                              <div className="mb-6">
                                <h3 className="mb-3 font-serif font-semibold text-brand-ink">Características Principales</h3>
                                <div className="flex flex-wrap gap-2">
                                  {currentDiscipline.features.map((feature) => (
                                    <Badge
                                      key={feature}
                                      variant="secondary"
                                      className={`border-none ${(disciplineTones[currentDiscipline.color] ?? disciplineTones.red).badge}`}
                                    >
                                      {feature}
                                    </Badge>
                                  ))}
                                </div>
                              </div>
                            </div>

                            <div>
                              <div className="rounded-2xl border border-brand-ink/8 bg-brand-washi-deep/70 p-6">
                                <h3 className="mb-4 font-serif font-semibold text-brand-ink">Niveles y Horarios</h3>

                                <div className="mb-6">
                                  <h4 className="mb-2 text-sm font-medium text-brand-ink">Niveles Disponibles:</h4>
                                  <ul className="space-y-2">
                                    {currentDiscipline.levels.map((level) => (
                                      <li key={level} className="flex items-center gap-2 text-sm text-brand-muted">
                                        <ChevronRight className="h-4 w-4 text-brand-muted/60" aria-hidden="true" />
                                        {level}
                                      </li>
                                    ))}
                                  </ul>
                                </div>

                                <div>
                                  <h4 className="mb-2 text-sm font-medium text-brand-ink">Horarios de Clase:</h4>
                                  <ul className="space-y-3">
                                    {currentDiscipline.schedule.map((item) => (
                                      <li key={`${item.day}-${item.time}`} className="rounded-xl border border-brand-ink/8 bg-white/70 p-3">
                                        <div className="mb-1 flex items-center justify-between gap-2">
                                          <span className="font-medium text-brand-ink">{item.day}</span>
                                          <span className="font-semibold text-brand-ink">{item.time}</span>
                                        </div>
                                        <p className="text-sm text-brand-muted">{item.level}</p>
                                      </li>
                                    ))}
                                  </ul>
                                </div>

                                <Button className={`mt-6 w-full rounded-full ${(disciplineTones[currentDiscipline.color] ?? disciplineTones.red).button}`}>
                                  Inscribirse en {currentDiscipline.name}
                                </Button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Alumnos Avanzados */}
                    <section>
                      <h2 className="text-center font-serif text-2xl font-semibold text-brand-ink sm:text-3xl">
                        Alumnos Destacados
                      </h2>

                      <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-3">
                        {dojoData.advancedStudents.map((student) => (
                          <div key={student.id} className="glass rounded-3xl transition-all duration-300 hover:-translate-y-1 hover:shadow-lift">
                            <div className="p-6">
                              <div className="text-center">
                                <div className="mx-auto mb-4 h-24 w-24 overflow-hidden rounded-full border-2 border-brand-gold/40 p-1">
                                  <img
                                    src={student.image}
                                    alt={student.name}
                                    className="h-full w-full rounded-full object-cover"
                                  />
                                </div>
                                <h3 className="font-serif text-lg font-semibold text-brand-ink">{student.name}</h3>
                                <Badge className="mt-2 border-none bg-brand-vermilion/10 text-brand-vermilion">{student.rank}</Badge>
                                <p className="mt-2 text-sm text-brand-muted">{student.years} años en el dojo</p>

                                <div className="mt-4">
                                  <h4 className="mb-2 font-medium text-brand-ink">Logros:</h4>
                                  <ul className="space-y-1">
                                    {student.achievements.map((achievement) => (
                                      <li key={achievement} className="flex items-center justify-center gap-1.5 text-sm text-brand-muted">
                                        <Medal className="h-3.5 w-3.5 text-brand-gold" aria-hidden="true" />
                                        {achievement}
                                      </li>
                                    ))}
                                  </ul>
                                </div>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </section>
                  </TabsContent>

                  {/* Pestaña: Maestros */}
                  <TabsContent value="masters" className="space-y-12 mt-8">
                    <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
                      {dojo.masters.map((master) => (
                        <div key={master.id} className="glass rounded-3xl transition-all duration-300 hover:-translate-y-1 hover:shadow-lift">
                          <div className="p-6">
                            <div className="mb-6 text-center">
                              <div className="mx-auto mb-4 h-32 w-32 overflow-hidden rounded-full border-2 border-brand-gold/40 p-1">
                                {master.profileImg.trim() != '' ? (
                                  <img
                                    src={getProfileImg(master)}
                                    alt={master.name}
                                    className="h-full w-full rounded-full object-cover"
                                  />
                                ) : (
                                  <div className="flex h-full w-full items-center justify-center rounded-full bg-brand-washi-deep">
                                    <FaRegUserCircle className="text-5xl text-brand-muted/60" aria-hidden="true" />
                                  </div>
                                )}
                              </div>
                              <h3 className="font-serif text-xl font-semibold text-brand-ink">{master.userRanks[0].rank.rank_name} {master.name}</h3>
                              <p className="mt-1 font-medium text-brand-vermilion">{master.roles?.map((r) => r.rol).join(", ")}</p>
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
                          </div>
                        </div>
                      ))}
                    </div>
                  </TabsContent>

                  {/* Pestaña: Galería */}
                  <TabsContent value="gallery" className="space-y-12 mt-8">
                    {/* Carousel Principal */}
                    <section>
                      <h2 className="text-2xl font-bold text-gray-900 mb-6">
                        Galería de Entrenamiento
                      </h2>
                      <CarouselComponent />
                    </section>

                    {/* Videos */}
                    <section>
                      <h2 className="mb-6 font-serif text-2xl font-semibold text-brand-ink">
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
                      <h2 className="text-2xl font-bold text-gray-900 mb-6">
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
                    <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
                      {/* Información de Contacto */}
                      <div>
                        <span className="section-eyebrow text-brand-gold-deep">Estamos cerca</span>
                        <h2 className="mt-3 font-serif text-2xl font-semibold text-brand-ink sm:text-3xl">
                          Contacta con Nosotros
                        </h2>

                        <div className="mt-6 space-y-4">
                          <div className="flex items-start gap-4 rounded-2xl border border-brand-ink/8 bg-white/55 p-4 backdrop-blur-md">
                            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-brand-vermilion/10">
                              <MapPin className="h-6 w-6 text-brand-vermilion" aria-hidden="true" />
                            </div>
                            <div>
                              <h3 className="font-serif font-semibold text-brand-ink">Dirección</h3>
                              <p className="mt-1 text-sm text-brand-muted lg:text-base">{dojo.address}</p>
                            </div>
                          </div>

                          <a
                            href={getWhatsAppLink(dojo.phone, dojo.dojo)}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="block rounded-2xl focus-visible:outline-offset-4"
                          >
                            <span className="mb-2 inline-block text-sm font-semibold text-green-700">Haz click aquí para ir al chat de WhatsApp</span>
                            <div className="flex items-start gap-4 rounded-2xl border border-brand-ink/8 bg-white/55 p-4 backdrop-blur-md transition-colors duration-300 hover:border-green-600/30 hover:bg-green-50/70">
                              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-green-600/10">
                                <MdWhatsapp className="h-6 w-6 text-green-700" aria-hidden="true" />
                              </div>
                              <div>
                                <h3 className="font-serif font-semibold text-brand-ink">Teléfonos</h3>
                                <p className="mt-1 text-sm text-brand-muted lg:text-base">{formatPhoneNumber(dojo.phone)}</p>
                              </div>
                            </div>
                          </a>

                          <div className="flex items-start gap-4 rounded-2xl border border-brand-ink/8 bg-white/55 p-4 backdrop-blur-md">
                            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-brand-indigo/10">
                              <Mail className="h-6 w-6 text-brand-indigo" aria-hidden="true" />
                            </div>
                            <div>
                              <h3 className="font-serif font-semibold text-brand-ink">Email</h3>
                              <p className="mt-1 text-sm text-brand-muted lg:text-base">{dojo.email}</p>
                            </div>
                          </div>

                          <div className="flex flex-col items-start gap-4 rounded-2xl border border-brand-ink/8 bg-white/55 p-4 backdrop-blur-md lg:flex-row">
                            <div className="flex items-center gap-2">
                              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-brand-gold/15">
                                <Clock className="h-6 w-6 text-brand-gold-deep" aria-hidden="true" />
                              </div>
                              <h3 className="font-serif font-semibold text-brand-ink lg:hidden">Horarios</h3>
                            </div>
                            <div>
                              <h3 className="hidden font-serif font-semibold text-brand-ink lg:block">Horarios</h3>
                              {setDojoSchedule(dojo.Schedules)}
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Formulario de Contacto */}
                      <div>
                        <div className="glass rounded-3xl">
                          <div className="px-4 py-6 sm:px-6">
                            <h3 className="mb-4 text-center font-serif text-xl font-semibold text-brand-ink lg:text-left">
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

                                <Button type="submit" variant="brand" className="w-full rounded-full">
                                  Enviar Solicitud
                                </Button>
                              </form>
                            </Form>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Redes Sociales */}
                    <section className="relative overflow-hidden rounded-3xl border border-white/10 bg-brand-sumi p-6 text-brand-washi lg:p-8">
                      <div aria-hidden="true" className="pointer-events-none absolute inset-0 bg-wood-dark opacity-30" />
                      <h2 className="relative text-center font-serif text-2xl font-semibold text-white">
                        Síguenos en Redes Sociales
                      </h2>

                      <div className="relative mt-8 grid grid-cols-1 gap-3 md:grid-cols-2 lg:grid-cols-4 lg:gap-5">
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
                    <Card className="hidden">
                      <CardContent className="p-8">
                        <h3 className="text-xl font-bold text-gray-900 mb-6">
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
              </motion.div>
            </AnimatePresence>
          </main>
        </>
      )}
    </div>
  );
}
