import { BsPeopleFill } from "react-icons/bs";
import { IoCalendar } from "react-icons/io5";
import { FaUserCheck } from "react-icons/fa";
import { FaMoneyBillWave } from "react-icons/fa";
import { IoSettingsSharp } from "react-icons/io5";
import { FaRegUserCircle } from "react-icons/fa";
import { RiAncientGateFill } from "react-icons/ri";
import { FaUser } from "react-icons/fa";

export interface SidebarContent {
  name: string;
  icon: React.ComponentType<{ className?: string }>;
  redirectTo: string;
  active: boolean;
}

export interface SidebarGroup {
  header?: string;
  items: SidebarContent[];
}

export const sidebarData: SidebarGroup[] = [
  {
    header: "General",
    items: [
      {
        name: "Inicio",
        icon: RiAncientGateFill,
        redirectTo: "/admin",
        active: false,
      },
    ],
  },
  {
    header: "Gestión",
    items: [
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
    ],
  },
  {
    header: "Sistema",
    items: [
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
    ],
  },
    {
    header: "Mi Información",
    items: [
      {
        name: "Mis Datos",
        icon: FaUser,
        redirectTo: "/admin/yo",
        active: false,
      },
      {
        name: "Perfil",
        icon: FaRegUserCircle,
        redirectTo: "/admin/perfil",
        active: false,
      },
    ],
  },
];
