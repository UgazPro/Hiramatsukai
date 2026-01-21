import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router";
import { SidebarContent, sidebarData } from "./AdminSidebar.data";
import { LogOut } from "lucide-react";
import SpinnerComponent from "@/components/SpinnerComponent";

export default function AdminSidebar() {
  const [sidebar, setSidebar] = useState<SidebarContent[]>(sidebarData);
  const [showSpinner, setShowSpinner] = useState(false);
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const updatedSidebar = sidebar.map(item => ({
      ...item,
      active: item.redirectTo === location.pathname
    }));
    setSidebar(updatedSidebar);
  }, [location.pathname]);

  const handleLogout = () => {
    setIsLoggingOut(true);
    setShowSpinner(true);

    localStorage.removeItem('token');

    setTimeout(() => {
      navigate('/');
    }, 800);
  }

  if (isLoggingOut) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-black/80 z-100">
        <SpinnerComponent />
      </div>
    );
  }

  return (
    <>
      {/* Spinner */}
      {showSpinner && (
        <div className="fixed inset-0 bg-black/50 z-40 flex items-center justify-center">
          <SpinnerComponent />
        </div>
      )}

      <div
        className="hidden group w-16 hover:w-70 transition-all duration-300 ease-in-out bg-black text-white pl-3 p-4 flex-col justify-between md:flex fixed top-0 left-0 h-full z-50"
      >
        <div className="w-full">
          {/* Logo/Header */}
          <div
            className="flex items-center mb-8 rounded-lg group-hover:bg-gray-800/50 mt-3 transition-colors duration-300"
          >
            <div className="h-10 w-10 flex items-center justify-center shrink-0">
              <img src="/oki2.png" className="text-white" alt="Logo" />
            </div>
            <div
              className="ml-3 overflow-hidden whitespace-nowrap opacity-0 group-hover:opacity-100 transition-all duration-300 transform -translate-x-2 group-hover:translate-x-0"
            >
              <span className="text-xl font-bold">Dojo Kenzendo</span>
            </div>
          </div>

          {/* Navigation Items */}
          <nav className="space-y-3">
            {sidebar.map((item, index) => (
              <Link
                key={index}
                to={item.redirectTo}
                className={`flex items-center rounded-lg transition-all duration-300 hover:bg-gray-800 relative group/item ${item.active ? 'group-hover:bg-gray-800' : ''}`}
              >
                <div className={`p-2 ${item.active ? 'bg-gray-800 rounded-xl' : ''}`}>
                  <item.icon className="h-5 w-5 shrink-0" />
                </div>
                <span className="ml-3 overflow-hidden whitespace-nowrap opacity-0 group-hover:opacity-100 transition-all duration-300 transform -translate-x-2 group-hover:translate-x-0">
                  {item.name}
                </span>
                <div
                  className="absolute left-full ml-4 px-3 py-2 bg-gray-900 text-white text-sm rounded-lg opacity-0 group-hover/item:opacity-0 group-hover:opacity-0 pointer-events-none transition-opacity duration-300 z-50 whitespace-nowrap shadow-xl border border-gray-700"
                >
                  {item.name}
                  <div className="absolute top-1/2 -left-1 transform -translate-y-1/2 border-4 border-transparent border-r-gray-900"></div>
                </div>
                {item.active && (
                  <div className="absolute right-2 top-1/2 transform -translate-y-1/2 h-2 w-2 bg-yellow-500 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                )}
              </Link>
            ))}
          </nav>
        </div>

        {/* Logout Button */}
        <div className="w-full">
          <button
            className="flex items-center p-3 rounded-lg hover:bg-gray-800 transition-all duration-300 group/item w-full"
            onClick={handleLogout}
            disabled={isLoggingOut}
          >
            <LogOut className="h-5 w-5 shrink-0" />
            <span
              className="ml-3 overflow-hidden whitespace-nowrap opacity-0 group-hover:opacity-100 transition-all duration-300 transform -translate-x-2 group-hover:translate-x-0 hover:cursor-pointer"
            >
              {isLoggingOut ? "Saliendo..." : "Cerrar Sesión"}
            </span>
          </button>
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