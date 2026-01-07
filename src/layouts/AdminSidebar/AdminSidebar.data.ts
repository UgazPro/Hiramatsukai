import { BsPeopleFill } from "react-icons/bs";
import { IoCalendar } from "react-icons/io5";
import { FaUserCheck } from "react-icons/fa";
import { FaMoneyBillWave } from "react-icons/fa";
import { IoSettingsSharp } from "react-icons/io5";
import { FaRegUserCircle } from "react-icons/fa";
import { RiAncientGateFill } from "react-icons/ri";

export interface SidebarContent {
  name: string;
  icon: React.ComponentType<{className?: string}>;
  redirectTo: string;
  active: boolean;
}

export const sidebarData: SidebarContent[] = [
  {
    name: "Mi Dojo",
    icon: RiAncientGateFill,
    redirectTo: "/admin",
    active: false,
  },
  {
    name: "Alumnos",
    icon: BsPeopleFill,
    redirectTo: "/admin/alumnos",
    active: false,
  },
  {
    name: "Actividades",
    icon: IoCalendar,
    redirectTo: "/admin/actividades",
    active: false,
  },
  {
    name: "Postulaciones",
    icon: FaUserCheck,
    redirectTo: "/admin/postulaciones",
    active: false,
  },
  {
    name: "Pagos",
    icon: FaMoneyBillWave,
    redirectTo: "/admin/pagos",
    active: false,
  },
  {
    name: "Configuración",
    icon: IoSettingsSharp,
    redirectTo: "/admin/configuracion",
    active: false,
  },
  {
    name: "Mi perfil",
    icon: FaRegUserCircle,
    redirectTo: "/admin/perfil",
    active: false,
  },
];
