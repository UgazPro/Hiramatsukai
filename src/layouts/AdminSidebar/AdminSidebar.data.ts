import { BsPeopleFill } from "react-icons/bs";
import { MdSchedule } from "react-icons/md";
import { IoCalendar } from "react-icons/io5";
import { FaUserCheck } from "react-icons/fa";
import { FaMoneyBillWave } from "react-icons/fa";
import { IoSettingsSharp } from "react-icons/io5";
import { FaRegUserCircle } from "react-icons/fa";
import { RiAncientGateFill } from "react-icons/ri";

interface SidebarContent {
  name: string;
  icon: React.ComponentType<{className?: string}>;
  redirectTo: string;
  active: boolean;
}

export const sidebarData: SidebarContent[] = [
  {
    name: "Mi Dojo",
    icon: RiAncientGateFill,
    redirectTo: "",
    active: true,
  },
  {
    name: "Alumnos",
    icon: BsPeopleFill,
    redirectTo: "",
    active: false,
  },
  {
    name: "Horario",
    icon: MdSchedule,
    redirectTo: "",
    active: false,
  },
  {
    name: "Actividades",
    icon: IoCalendar,
    redirectTo: "",
    active: false,
  },
  {
    name: "Postulaciones",
    icon: FaUserCheck,
    redirectTo: "",
    active: false,
  },
  {
    name: "Pagos",
    icon: FaMoneyBillWave,
    redirectTo: "",
    active: false,
  },
  {
    name: "Configuración",
    icon: IoSettingsSharp,
    redirectTo: "",
    active: false,
  },
  {
    name: "Mi perfil",
    icon: FaRegUserCircle,
    redirectTo: "",
    active: false,
  },
];
