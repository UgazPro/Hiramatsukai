export type ProgressSteps =
    'nahate' |
    'chojun-miyagi' |
    'goju-ryu' |
    'reconocimiento-1933' |
    'kanken-toyama' |
    'posguerra-y-legado' |
    'morio-higaonna' |
    'hiramatsu-venezuela' |
    'hiramatsukai-venezuela' |
    'legado-hiramatsu';

export interface KaratedoInfoData {
    name: ProgressSteps;
    content: string[];
}

export const karatedoInfoData: KaratedoInfoData[] = [
    {
        name: 'nahate', content: [
            'Las raíces del Goju-Ryu se conectan con el Naha-te, un enfoque okinawense de combate a corta distancia que integraba lo “duro” y lo “suave”. Uno de los pilares de esta línea es Kanryō Higaonna (1853–1916), nacido en Naha, Okinawa.',
            'Según la historia más difundida, Higaonna viajó a Fuzhou (Fujian, China) en la década de 1870 para profundizar en artes marciales chinas y regresó a Okinawa a inicios de la década de 1880. De vuelta en Naha enseñó un método que influiría decisivamente en la generación siguiente.'
        ]
    },
    {
        name: 'chojun-miyagi', content: [
            'Chōjun Miyagi (1888–1953) fue el fundador del Goju-Ryu. Comenzó su formación marcial en Naha y, siendo adolescente, entrenó durante años bajo Kanryō Higaonna.',
            'Tras la muerte de su maestro (1916), Miyagi viajó a Fuzhou para investigar escuelas locales y ampliar su conocimiento. A su regreso consolidó un método propio, con fuerte énfasis en la respiración y el acondicionamiento, y desarrolló kata como Tenshō (inspirado en formas chinas).',
            'En 1934 escribió “Karate-dō Gaisetsu” ("Outline of Karate-dō"), uno de los pocos documentos atribuidos directamente a él, donde resume historia, ideas y aplicación del karate-dō.'
        ]
    },
    {
        name: 'goju-ryu', content: [
            'En 1929, durante una demostración en Japón, al estudiante Jin’an Shinzato le preguntaron el nombre del arte que practicaba. Miyagi aún no había bautizado oficialmente su método, y el episodio evidenció la necesidad de un nombre.',
            'Poco después, Miyagi adopta el nombre “Gōjū-ryū” ("duro-suave"), inspirado en una línea del poema Hakku Kenpō que alude al ritmo de inhalar/exhalar como “suave/duro”. El término refleja la mezcla de técnicas lineales contundentes y movimientos circulares de control.'
        ]
    },
    {
        name: 'reconocimiento-1933', content: [
            'En 1933, el Goju-Ryu fue reconocido oficialmente en Japón por la Dai Nippon Butoku Kai (DNBK) como budō (arte marcial moderno dentro del marco japonés). Este hito ayudó a su difusión más allá de Okinawa.',
            'Con el tiempo, el estilo se ramificó en varias organizaciones y líneas de transmisión, manteniendo en común el énfasis en kata, respiración y acondicionamiento. (Décadas después, en 1998, el Nippon Kobudo Kyokai también reconoció al Goju-Ryu como koryū bujutsu.)'
        ]
    },
    {
        name: 'kanken-toyama', content: [
            'Kanken Tōyama (1888–1966) fue una de las figuras que ayudó a impulsar el karate okinawense en el Japón continental durante el siglo XX. Su nombre suele asociarse con la difusión pública del karate, la creación de espacios de enseñanza en Japón y el diálogo entre diferentes escuelas.',
            'En torno a su dōjō Shūdōkan (fundado en Tokio, comúnmente fechado en 1930), se formaron y coincidieron practicantes de distintas líneas. Más que un “estilo único”, el Shūdōkan funcionó como un punto de encuentro donde se reforzaron principios de entrenamiento, disciplina y transmisión.',
            'Para la historia local de Hiramatsukai, este contexto es relevante porque la biografía difundida por Hiramatsu Kai vincula parte de la formación e influencias de Gijin Hiramatsu con el entorno del Shūdōkan y el karate japonés de esa época.'
        ]
    },
    {
        name: 'posguerra-y-legado', content: [
            'La Segunda Guerra Mundial golpeó duramente Okinawa; el hogar de Miyagi fue destruido. En 1951, alumnos y cercanos construyeron para él una nueva casa y dōjō en Naha.',
            'En 1952 surge la idea de formar una organización para promover el crecimiento del Goju-Ryu, creando la “Gōjū-ryū Shinkōkai” (Asociación para Promover el Goju-Ryu).',
            'Miyagi fallece en 1953. A partir de entonces, su legado continúa a través de sus estudiantes y organizaciones, manteniendo viva la práctica tradicional y expandiéndola internacionalmente.'
        ]
    },
    {
        name: 'morio-higaonna', content: [
            'Morio Higaonna (nacido en 1938, Naha) es una figura clave en la difusión moderna del Goju-Ryu. Comenzó a entrenar joven y, a los 16 años, inició su práctica de Goju-Ryu bajo la guía de Miyagi An’ichi (uno de los discípulos cercanos de Chōjun Miyagi).',
            'En 1960 se trasladó a Tokio y enseñó en el dōjō de Yoyogi durante años, atrayendo practicantes de alto nivel. Más adelante funda la IOGKF (International Okinawan Goju-Ryu Karate-do Federation), con presencia internacional.',
            'En 1998, el Nippon Kobudo Kyokai reconoció el Goju-Ryu como koryū bujutsu y la IOGKF (con Higaonna como representante) figura como una de las organizaciones vinculadas a ese reconocimiento.'
        ]
    },
    {
        name: 'hiramatsu-venezuela', content: [
            'La historia de Hiramatsukai en Venezuela está ligada al Hanshi Gijin Hiramatsu (1937–1997), maestro japonés que practicó karate-dō y kobudō desde niño y se formó, entre otras influencias, en el entorno del Shudokan de Kanken Toyama.',
            'Según la biografía difundida por Hiramatsu Kai, Hiramatsu viajó por Europa y luego llegó a América: estuvo en México a inicios de 1976 y ese mismo año realizó una visita a Caracas para exhibiciones y contactos con instructores locales.',
            'Finalmente se estableció en Venezuela el 14 de mayo de 1977, fijando su base en Maracaibo (estado Zulia), desde donde empezó a enseñar y a construir una comunidad marcial estable.'
        ]
    },
    {
        name: 'hiramatsukai-venezuela', content: [
            'En 1980, Hiramatsu funda la Asociación Zuliana de Okinawa Kobudo y organiza el primer campeonato de Kobudo en Venezuela (según el registro histórico presentado por Hiramatsu Kai).',
            'La organización Hiramatsu Kai de Venezuela (平松会) preserva enseñanzas de estilos tradicionales de Okinawa (incluyendo Goju-Ryu y Shorin-Ryu), además del Okigikukendo (estilo atribuido a Hiramatsu) y el Okinawa Kobudo.',
            'Este periodo consolida la identidad local: dōjō, seminarios, visitas y trabajo asociativo que permitieron una continuidad generacional.'
        ]
    },
    {
        name: 'legado-hiramatsu', content: [
            'En 1996 se menciona la creación de la Okinawa Budokai como estructura interna para guiar asociaciones dirigidas por el Hanshi Hiramatsu.',
            'Gijin Hiramatsu falleció el 21 de octubre de 1997 en Maracaibo. Su legado continúa a través de sus estudiantes, la comunidad Hiramatsukai y las organizaciones que mantienen el estudio de karate-dō y kobudō en Venezuela.',
            'Hoy, la línea se sostiene por la práctica constante: kata, kihon, kumite, armas tradicionales y un énfasis en disciplina y valores comunitarios.'
        ]
    }

];

export interface KataInfo {
    name: string;
    description: string;
    purpose: string;
}

export const katas: KataInfo[] = [
    { name: "Sanchin", description: "Kata fundamental de respiración y estructura", purpose: "Desarrollo de la postura y respiración ibuki" },
    { name: "Saifa", description: "Primer kata superior", purpose: "Técnicas de desgarre y control" },
    { name: "Seiyunchin", description: "Kata de agarres y proyecciones", purpose: "Trabajo de distancia corta" },
    { name: "Shisochin", description: "Kata de los cuatro puntos cardinales", purpose: "Defensa en todas direcciones" },
    { name: "Seipai", description: "Kata de los 18 movimientos", purpose: "Técnicas ocultas y aplicaciones" },
    { name: "Kururunfa", description: "Kata fluido como el agua", purpose: "Movimientos circulares y evasiones" },
    { name: "Seisan", description: "Kata de las 13 manos", purpose: "Contraataques rápidos" },
    { name: "Suparinpei", description: "Kata de los 108 movimientos", purpose: "Perfeccionamiento técnico total" }
];
