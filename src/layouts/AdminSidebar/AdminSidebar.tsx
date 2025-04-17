import { Link } from "react-router";
import { sidebarData } from "./AdminSidebar.data";
import { BarChart3, Users, Calendar, Dumbbell, Award, LogOut } from "lucide-react";


export default function AdminSidebar() {

  return (

    <>
      <div className="hidden w-64 bg-black text-white p-6 flex-col justify-between md:flex">
        <div>
          <div className="flex items-center mb-8">
            <span className="text-2xl font-bold">Dojo Kenzendo</span>
          </div>
          <nav className="space-y-2">

            {sidebarData && sidebarData.map((item, index) => (

              <Link 
                key={index} 
                to={item.redirectTo} 
                className={`flex items-center space-x-2 p-2 rounded-lg hover:bg-gray-800 ${item.active ? 'bg-gray-800' : ''}`}
              >
                <item.icon className="h-5 w-5" />
                <span>{item.name}</span>
              </Link>

            ))}

          </nav>
        </div>
        <div>
          <Link to="#" className="flex items-center space-x-2 p-2 rounded-lg hover:bg-gray-800">
            <LogOut className="h-5 w-5" />
            <span>Cerrar Sesión</span>
          </Link>
        </div>
      </div>

      {/* Mobile Sidebar */}
      <div className="md:hidden fixed bottom-0 left-0 z-50 w-full h-16 bg-black text-white">
        <div className="grid h-full grid-cols-5 mx-auto">
          <Link to="/" className="flex flex-col items-center justify-center">
            <BarChart3 className="h-5 w-5" />
            <span className="text-xs">Dashboard</span>
          </Link>
          <Link to="/estudiantes" className="flex flex-col items-center justify-center">
            <Users className="h-5 w-5" />
            <span className="text-xs">Estudiantes</span>
          </Link>
          <Link to="/clases" className="flex flex-col items-center justify-center">
            <Calendar className="h-5 w-5" />
            <span className="text-xs">Clases</span>
          </Link>
          <Link to="/entrenamientos" className="flex flex-col items-center justify-center">
            <Dumbbell className="h-5 w-5" />
            <span className="text-xs">Entrenamientos</span>
          </Link>
          <Link to="/cinturones" className="flex flex-col items-center justify-center">
            <Award className="h-5 w-5" />
            <span className="text-xs">Cinturones</span>
          </Link>
        </div>
      </div>
    </>

  );

}
