import { TabItem } from "@/components/tabs/TabsComponent";
import { Calendar, GraduationCap, Users, History } from "lucide-react";

export type TabType = 'examenes' | 'postulaciones' | 'historial' | 'alumnos';

export const applicationsTabs: TabItem<TabType>[] = [
    {
        value: "examenes",
        label: "Próximos Exámenes",
        icon: <Calendar className="h-4 w-4" />,
    },
    {
        value: "postulaciones",
        label: "Postulaciones",
        icon: <Users className="h-4 w-4" />,
    },
    {
        value: "historial",
        label: "Historial",
        icon: <History className="h-4 w-4" />,
    },
    {
        value: "alumnos",
        label: "Alumnos",
        icon: <GraduationCap className="h-4 w-4" />,
    },
];