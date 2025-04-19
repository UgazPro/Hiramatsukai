import { Link, useLocation } from "react-router";
import { SidebarContent, sidebarData } from "./AdminSidebar.data";
import { LogOut } from "lucide-react";
import { useEffect, useState } from "react";


export default function AdminSidebar() {

  const [ sidebar, setSidebar ] = useState<SidebarContent[]>(sidebarData);

  const location = useLocation();

  useEffect( () => {
  
    const updatedSidebar = sidebar.map(item => {
      return {
        ...item,
        active: item.redirectTo === location.pathname
      };
    });

    setSidebar(updatedSidebar);
  
  }, [location.pathname]);

  return (

    <>
      <div className="hidden w-64 bg-black text-white p-6 flex-col justify-between md:flex">
        <div>
          <div className="flex items-center mb-8">
            <span className="text-2xl font-bold">Dojo Kenzendo</span>
          </div>
          <nav className="space-y-2">

            {sidebar && sidebar.map((item, index) => (

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
      <div className="md:hidden fixed top-0 left-0 z-50 w-full h-16 bg-black text-white">
        <div className="grid h-full grid-cols-5 mx-auto">
          {sidebarData.slice(0, 5).map((item, index) => (
            <Link 
              key={index} 
              to={item.redirectTo} 
              className="flex flex-col items-center justify-center"
            >
              <item.icon className="h-5 w-5" />
              <span className="text-xs">{item.name}</span>
            </Link>
          ))}
        </div>
      </div>
    </>

  );

}
