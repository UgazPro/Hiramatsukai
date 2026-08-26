export interface MasterData {
    slug: string;
    name: string;
    art: string;
    initials: string;
    image?: string;
    birthYear?: number;
    deathYear?: number;
    birthPlace?: string;
    color: string;
    subtitle: string;
    intro: string;
    sections: {
        title: string;
        content: string[];
    }[];
    legacy: string;
}

export const mastersData: MasterData[] = [
    {
        slug: "hiramatsu",
        name: "Yoshihito Hiramatsu Kobayashi",
        art: "Karate-dō / Okinawa Kobudō",
        initials: "平",
        image: "/gijinhiramatsu.jpg",
        birthYear: 1937,
        deathYear: 1997,
        birthPlace: "Nagano, Japón",
        color: "red",
        subtitle: "Hanshi Gijin Hiramatsu - Maestro de Karate-dō y Kobudō",
        intro: "Yoshihito Hiramatsu Kobayashi (1937–1997), conocido posteriormente como Hanshi Gijin Hiramatsu, fue un maestro japonés de Karate-dō y Okinawa Kobudō que desarrolló gran parte de su trayectoria en Venezuela, particularmente en Maracaibo, estado Zulia.",
        sections: [
            {
                title: "Orígenes Marciales",
                content: [
                    "El origen de Hiramatsu está profundamente relacionado con el budō japonés y posteriormente con el Karate-dō y Kobudō de Okinawa.",
                    "De acuerdo con la documentación de la Hiramatsu Kai, sus primeros acercamientos a las artes marciales se produjeron dentro de su propia familia. Posteriormente, siendo todavía niño, comenzó su formación formal en el dōjō Shūdōkan de Kanken Toyama.",
                    "Este punto es particularmente importante porque establece la línea: Ankō Itosu → Kanken Toyama → Yoshihito Hiramatsu. Toyama había estudiado principalmente Shuri-te con Ankō Itosu, además de estudiar Naha-te, Tomari-te y artes marciales chinas. Por ello, Hiramatsu recibió una tradición que no estaba limitada a una sola interpretación del karate."
                ]
            },
            {
                title: "Formación",
                content: [
                    "Su formación fue extraordinariamente prolongada. Comenzó su práctica marcial desde niño e ingresó aproximadamente a los 8 años al Shūdōkan de Kanken Toyama.",
                    "Obtuvo su primer Dan alrededor de los 11 años. A los 16 años alcanzó el segundo Dan y el título de Shihandai. Tras la muerte de Toyama en 1966, ya poseía el título de Shihan.",
                    "Además de su formación con Toyama, tuvo contacto con numerosos maestros de Okinawa y diferentes líneas de Karate-dō y Kobudō. Entre los nombres asociados a su trayectoria aparecen Chōjun Miyagi, Chōtoku Kyan, Kenwa Mabuni, Chōshin Chibana, Shōshin Nagamine, Seikō Higa, Gōgen Yamaguchi, Mas Oyama y Katsuyoshi Kanei, entre otros.",
                    "En 1977 se estableció en Venezuela, donde desarrolló una importante labor de enseñanza y difusión de las artes marciales tradicionales."
                ]
            },
            {
                title: "Filosofía y Principios",
                content: [
                    "Uno de los elementos más característicos de Hiramatsu fue su rechazo a reducir el Karate-dō a un simple deporte. Su enseñanza estaba orientada hacia la disciplina, el fortalecimiento espiritual, la superación personal y el respeto al maestro y a la tradición.",
                    "La tradición de Hiramatsu Kai conserva cinco principios fundamentales: lealtad al maestro, a la escuela y a los principios del arte; trabajar por el bien; crear armonía; no utilizar la violencia; y respetar la vida y la naturaleza.",
                    "Su concepción del Karate-dō era mucho más cercana al budō tradicional que al karate competitivo moderno."
                ]
            },
            {
                title: "Legado",
                content: [
                    "En 1980 1983, presentó su propio sistema, Okigikukendō.",
                    "Su legado puede resumirse en tres grandes aportes: la difusión del Karate-dō tradicional en Venezuela, el desarrollo y difusión del Okinawa Kobudō, y la creación del Okigikukendō como expresión personal de todo lo aprendido durante décadas.",
                    "Murió en Maracaibo el 21 de octubre de 1997, dejando un legado que trasciende las técnicas marciales."
                ]
            }
        ],
        legacy: "Hiramatsu dejó un legado que trasciende las técnicas marciales: formó una generación de maestros que llevaron el karate y kobudo tradicional de Okinawa, preservando su autenticidad y espíritu."
    },
    {
        slug: "toyama",
        name: "Kanken Toyama",
        art: "Karate-dō Shūdōkan",
        initials: "外",
        image: "/kankentoyama.jpg",
        birthYear: 1888,
        deathYear: 1966,
        birthPlace: "Shuri, Okinawa, Japón",
        color: "yellow",
        subtitle: "Fundador del Shūdōkan - Puente entre Itosu y Hiramatsu",
        intro: "Kanken Toyama (1888–1966) fue uno de los personajes fundamentales en la transmisión del Karate-dō de Okinawa hacia Japón continental. Su principal maestro fue Ankō Itosu, uno de los personajes fundamentales en la historia del karate moderno.",
        sections: [
            {
                title: "Orígenes Marciales",
                content: [
                    "Su raíz principal se encuentra en el Shuri-te de Ankō Itosu. Sin embargo, Toyama buscó ampliar sus conocimientos estudiando con diferentes maestros y sistemas.",
                    "Entre sus influencias estuvieron: Ankō Itosu (Shuri-te), Kanryō Higaonna (Naha-te), Ankichi Aragaki (Tomari-te), diferentes maestros de Kobudō, y maestros chinos durante su estancia en Taiwán.",
                    "Toyama representa una figura muy interesante porque tuvo contacto con los tres grandes núcleos tradicionales del karate de Okinawa: Shuri, Naha y Tomari."
                ]
            },
            {
                title: "Formación",
                content: [
                    "Toyama comenzó su formación marcial aproximadamente a los 9 años, en 1897. Posteriormente se convirtió en discípulo de Ankō Itosu, permaneciendo con él hasta la muerte de Itosu en 1915.",
                    "Fue reconocido por Itosu como uno de sus discípulos especialmente cercanos, junto con Gichin Funakoshi.",
                    "En 1924 Toyama se trasladó a Taiwán, donde estudió diferentes formas de Ch'uan Fa, incluyendo sistemas chinos relacionados con el He-quan/Hakutsuru-ken (boxeo de la Grulla Blanca). Esta etapa reforzó su idea de que el Karate-dō no debía encerrarse dentro de una única tradición."
                ]
            },
            {
                title: "Filosofía y Principios",
                content: [
                    "La idea más importante asociada a Toyama es que el Karate no debía dividirse artificialmente en estilos. Una tradición atribuida a Toyama resume esta posición en: \"No hay estilos en karate.\"",
                    "El Shūdōkan no debe entenderse exactamente como un estilo en el mismo sentido en que hoy hablamos de Gōjū-ryū, Shōtōkan o Shitō-ryū. Toyama buscaba estudiar el Karate-dō como un arte integral.",
                    "Su enfoque también estaba relacionado con la idea de utilizar el Karate como formación humana, no simplemente como sistema de combate."
                ]
            },
            {
                title: "Legado",
                content: [
                    "En 1930, en Tokio, fundó el Shūdōkan, cuyo significado se relaciona con un lugar para estudiar el camino del karate. Toyama consideraba el Shūdōkan más como un centro de estudio e investigación del Karate-dō que como un nuevo ryūha.",
                    "Toyama fue fundamental en la transición del Karate de Okinawa al Japón continental. Algunas fuentes señalan que durante su trayectoria llegó a formar a cerca de un centenar de alumnos hasta el nivel de Shihan.",
                    "Toyama es el puente directo entre la tradición de Itosu y Hiramatsu, estableciendo la línea: Ankō Itosu → Kanken Toyama → Yoshihito Hiramatsu."
                ]
            }
        ],
        legacy: "Kanken Toyama dejó un legado de integridad y apertura en el karate. Su concepción de que \"no hay estilos en karate\" permitió que su tradición se mantuviera viva a través de maestros como Hiramatsu, quienes honraron su visión de un arte marcial integral."
    },
    {
        slug: "miyagi",
        name: "Chōjun Miyagi",
        art: "Goju-Ryu Karate-Do",
        initials: "宮",
        image: "/chojunmiyagi.jpg",
        birthYear: 1888,
        deathYear: 1953,
        birthPlace: "Naha, Okinawa, Japón",
        color: "blue",
        subtitle: "Creador del Goju-Ryu Karate-Do",
        intro: "Chōjun Miyagi (1888–1953) fue uno de los grandes maestros de la historia del Karate-dō y es reconocido como el fundador del Gōjū-ryū. El nombre significa \"el camino de lo duro y lo suave\".",
        sections: [
            {
                title: "Orígenes Marciales",
                content: [
                    "La raíz de Miyagi se encuentra principalmente en el Naha-te. Su maestro fue Kanryō Higaonna, quien había viajado a China y estudiado artes marciales en Fuzhou, Fujian.",
                    "Higaonna desarrolló una forma de Naha-te fuertemente influenciada por las artes marciales chinas. Miyagi heredó esta tradición y posteriormente viajó a China para investigar directamente las raíces marciales de su maestro.",
                    "Esto explica por qué el Gōjū-ryū posee una combinación característica de: movimientos circulares, técnicas de respiración, trabajo de tensión muscular, movimientos suaves, golpes explosivos, combate a corta distancia y trabajo interno y externo."
                ]
            },
            {
                title: "Formación",
                content: [
                    "Miyagi comenzó su formación marcial siendo joven. Fue introducido a Kanryō Higaonna alrededor de los 14 años, en 1902. Su entrenamiento con Higaonna fue extremadamente exigente.",
                    "Después de la muerte de Higaonna, Miyagi realizó viajes a Fuzhou, China, para continuar investigando las artes marciales que habían influido en su maestro.",
                    "Uno de los resultados más importantes de sus investigaciones fue el desarrollo de Tenshō, mientras que también profundizó y reorganizó el trabajo de Sanchin. La relación entre ambos kata expresa perfectamente su concepto: Sanchin (dureza, tensión, estructura) y Tenshō (suavidad, circularidad, fluidez)."
                ]
            },
            {
                title: "Filosofía y Principios",
                content: [
                    "La filosofía de Miyagi puede resumirse en la integración de Go y Ju. No se trata simplemente de \"ser fuerte y ser suave\", sino de saber cuándo utilizar la fuerza y cuándo ceder, absorber, redirigir o circular.",
                    "El Gōjū-ryū combina: dureza (fuerza, estabilidad, tensión, resistencia, potencia, estructura) con suavidad (relajación, circularidad, movilidad, respiración, adaptación, control).",
                    "Miyagi también entendía el Karate como un medio de formación integral del ser humano, por eso desarrolló ejercicios complementarios, métodos de acondicionamiento y una estructura pedagógica que permitiera transmitir el Karate a un número mucho mayor de personas."
                ]
            },
            {
                title: "Legado",
                content: [
                    "No solamente creó el nombre Gōjū-ryū, sino que ayudó a transformar el Karate de Okinawa en un sistema organizado y transmisible.",
                    "Entre sus principales aportes están: sistematización del Gōjū-ryū, desarrollo de Tenshō, sistematización del trabajo de Sanchin, creación de ejercicios de preparación como Junbi Undō, difusión del Karate en Japón, e introducción del Karate en instituciones educativas.",
                    "Además, formó a numerosos alumnos que posteriormente desarrollarían diferentes ramas del Gōjū-ryū, asegurando la continuidad de su visión."
                ]
            }
        ],
        legacy: "Chōjun Miyagi dejó un legado imperecedero al crear el Goju-Ryu, un estilo que combina lo mejor de las tradiciones marciales de Okinawa y China. Su visión y dedicación aseguraron que el karate tradicional sobreviviera y prosperara a nivel mundial."
    }
];

export function getMasterBySlug(slug: string): MasterData | undefined {
    return mastersData.find(master => master.slug === slug);
}
