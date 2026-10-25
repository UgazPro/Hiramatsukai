import { useState, useMemo } from "react";
import { Link, useLocation } from "react-router";
import { sidebarData } from "./AdminSidebar.data";
import { LogOut } from "lucide-react";
import SpinnerComponent from "@/components/spinner/SpinnerComponent";
import { useUserData } from "@/helpers/token";
import { clearSession } from "@/utils/clearSession";
import { Sheet, SheetContent, SheetTitle, SheetDescription } from "@/components/ui/sheet";

interface AdminSidebarProps {
    isMobileNavOpen: boolean;
    onCloseMobileNav: () => void;
}

const restrictedNames = ["Alumnos", "Pagos", "Configuración", "Inicio"];

export default function AdminSidebar({ isMobileNavOpen, onCloseMobileNav }: AdminSidebarProps) {
  const [showSpinner, setShowSpinner] = useState(false);
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const location = useLocation();
  const user = useUserData();

  const isRestricted = user?.roles.some(({ rol }) => rol === "Estudiante" || rol === "Representante");

  const filteredSidebarGroups = useMemo(() => {
    let groups = sidebarData;

    if (isRestricted) {
      groups = groups
        .map((group) => ({
          ...group,
          items: group.items.filter((item) => !restrictedNames.includes(item.name)),
        }))
        .filter((group) => group.items.length > 0);
    }

    const hiramatsukaiAllowed = user?.roles.some(
        ({ rol }) => rol === "Administrador" || rol === "Líder Maestro"
    );

    if (!hiramatsukaiAllowed) {
      groups = groups.filter((group) => group.header !== "Hiramatsukai");
    }

    const dojosAllowed = user?.roles.some(
        ({ rol }) => rol === "Administrador"
    );

    if (!dojosAllowed) {
      groups = groups.map((group) => ({
        ...group,
        items: group.items.filter((item) => item.name !== "Dojos"),
      })).filter((group) => group.items.length > 0);
    }

    return groups;
  }, [isRestricted, user?.roles]);

  const handleLogout = () => {
    setIsLoggingOut(true);
    setShowSpinner(true);
    clearSession();
  };

  if (isLoggingOut) {
    return (
      <div className="fixed inset-0 z-[100] flex items-center justify-center bg-brand-sumi/80 backdrop-blur-sm">
        <SpinnerComponent />
      </div>
    );
  }

  return (
    <>
      {/* Spinner */}
      {showSpinner && (
        <div className="fixed inset-0 z-40 flex items-center justify-center bg-brand-sumi/50 backdrop-blur-sm">
          <SpinnerComponent />
        </div>
      )}

      <aside className="group absolute inset-y-0 left-0 z-[60] hidden w-16 flex-col justify-between overflow-hidden border-r border-white/10 bg-brand-sumi p-4 pl-3 text-brand-washi transition-[width] duration-300 ease-in-out hover:w-72 md:flex">
        <div className="w-full">
          {/* Logo/Header */}
          <div className="mt-2 flex items-center gap-3 rounded-xl p-1 transition-colors duration-300 group-hover:bg-white/5">
            <span className="flex size-10 shrink-0 items-center justify-center rounded-full bg-white p-0.5 ring-1 ring-brand-gold/60">
              <img src="/oki2.png" className="size-full rounded-full object-contain" alt="Logo del dojo" />
            </span>
            <div className="ml-2 overflow-hidden whitespace-nowrap opacity-0 transition-all duration-300 -translate-x-2 group-hover:translate-x-0 group-hover:opacity-100">
              <span className="font-serif text-lg font-semibold text-brand-washi">
                {user?.dojo?.dojo || "Dojo"}
              </span>
            </div>
          </div>

          {/* Navigation Items */}
          <nav className="mt-8 flex flex-col gap-4">
            {filteredSidebarGroups.map((group, groupIndex) => (
              <div key={groupIndex} className="flex flex-col gap-1">
                {group.header && (
                  <div className="mb-1 overflow-hidden whitespace-nowrap pl-3 opacity-0 transition-all duration-300 group-hover:opacity-100">
                    <span className="text-[10px] font-semibold uppercase tracking-[0.18em] text-brand-gold/70">
                      {group.header}
                    </span>
                  </div>
                )}
                <div className="flex flex-col gap-1">
                  {group.items.map((item, itemIndex) => {
                    const isActive = item.redirectTo === location.pathname;

                    return (
                      <Link
                        key={itemIndex}
                        to={item.redirectTo}
                        title={item.name}
                        aria-current={isActive ? "page" : undefined}
                        className={`group/item relative flex items-center gap-3 rounded-xl px-2 py-2 transition-colors duration-300 focus-visible:ring-2 focus-visible:ring-brand-gold/60 focus-visible:outline-none ${
                          isActive
                            ? 'bg-white/10 text-brand-washi'
                            : 'text-brand-washi/70 hover:bg-white/5 hover:text-brand-washi'
                        }`}
                      >
                        {isActive && (
                          <span
                            aria-hidden="true"
                            className="absolute left-0 top-1/2 h-6 w-0.5 -translate-y-1/2 rounded-full bg-brand-gold"
                          />
                        )}
                        <span
                          className={`flex size-9 shrink-0 items-center justify-center rounded-lg transition-colors duration-300 ${
                            isActive ? 'bg-brand-gold/15 text-brand-gold' : 'text-brand-washi/70 group-hover/item:text-brand-washi'
                          }`}
                        >
                          <item.icon className="size-5" />
                        </span>
                        <span className="ml-1 overflow-hidden whitespace-nowrap text-sm font-medium opacity-0 transition-all duration-300 -translate-x-2 group-hover:translate-x-0 group-hover:opacity-100">
                          {item.name}
                        </span>
                      </Link>
                    );
                  })}
                </div>
              </div>
            ))}
          </nav>
        </div>

        {/* Logout Button */}
        <div className="w-full">
          <button
            type="button"
            className="flex w-full items-center gap-3 rounded-xl px-2 py-2 text-brand-washi/70 transition-colors duration-300 hover:bg-white/5 hover:text-brand-washi focus-visible:ring-2 focus-visible:ring-brand-gold/60 focus-visible:outline-none"
            onClick={handleLogout}
            disabled={isLoggingOut}
          >
            <span className="flex size-9 shrink-0 items-center justify-center rounded-lg">
              <LogOut className="size-5" />
            </span>
            <span className="ml-1 overflow-hidden whitespace-nowrap text-sm font-medium opacity-0 transition-all duration-300 -translate-x-2 group-hover:translate-x-0 group-hover:opacity-100">
              Cerrar Sesión
            </span>
          </button>
        </div>
      </aside>

      {/* Mobile Drawer */}
      <Sheet open={isMobileNavOpen} onOpenChange={onCloseMobileNav}>
        <SheetContent side="left" className="w-72 gap-0 border-white/10 bg-brand-sumi p-0 text-brand-washi sm:max-w-72">
          <SheetTitle className="sr-only">Navegación</SheetTitle>
          <SheetDescription className="sr-only">Menú de navegación del dojo</SheetDescription>
          <div className="flex h-full flex-col">
            <div className="border-b border-white/10 p-5 pr-12">
              <div className="flex items-center gap-3">
                <span className="flex size-10 shrink-0 items-center justify-center rounded-full bg-white p-0.5 ring-1 ring-brand-gold/60">
                  <img src="/oki2.png" className="size-full rounded-full object-contain" alt="Logo del dojo" />
                </span>
                <span className="font-serif text-lg font-semibold text-brand-washi">{user?.dojo?.dojo || "Dojo"}</span>
              </div>
            </div>

            <nav className="flex-1 overflow-y-auto p-3">
              {filteredSidebarGroups.map((group, groupIndex) => (
                <div key={groupIndex} className="mb-2 flex flex-col gap-1">
                  {group.header && (
                    <div className="px-3 py-2">
                      <span className="text-[10px] font-semibold uppercase tracking-[0.18em] text-brand-gold/70">
                        {group.header}
                      </span>
                    </div>
                  )}
                  <div className="flex flex-col gap-1">
                    {group.items.map((item, itemIndex) => {
                      const isActive = item.redirectTo === location.pathname;
                      return (
                        <Link
                          key={itemIndex}
                          to={item.redirectTo}
                          onClick={onCloseMobileNav}
                          aria-current={isActive ? "page" : undefined}
                          className={`relative flex items-center gap-3 rounded-xl px-3 py-2.5 transition-colors duration-300 ${
                            isActive
                              ? 'bg-brand-gold/15 text-brand-gold'
                              : 'text-brand-washi/70 hover:bg-white/5 hover:text-brand-washi'
                          }`}
                        >
                          {isActive && (
                            <span
                              aria-hidden="true"
                              className="absolute left-0 top-1/2 h-6 w-0.5 -translate-y-1/2 rounded-full bg-brand-gold"
                            />
                          )}
                          <item.icon className="size-5 shrink-0" />
                          <span className="text-sm font-medium">{item.name}</span>
                        </Link>
                      );
                    })}
                  </div>
                </div>
              ))}
            </nav>

            <div className="flex flex-col gap-3 border-t border-white/10 p-4">
              {user && (
                <div className="flex items-center gap-3">
                  <span className="flex size-9 shrink-0 items-center justify-center rounded-full bg-brand-gold text-brand-sumi">
                    <span className="text-sm font-bold">
                      {user.name?.[0]}{user.lastName?.[0]}
                    </span>
                  </span>
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-medium text-brand-washi">
                      {user.name} {user.lastName}
                    </p>
                    <p className="truncate text-xs text-brand-washi/50">{user.roles?.map(({ rol }) => rol).join(", ")}</p>
                  </div>
                </div>
              )}

              <button
                type="button"
                onClick={handleLogout}
                disabled={isLoggingOut}
                className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-brand-washi/70 transition-colors duration-300 hover:bg-white/5 hover:text-brand-washi"
              >
                <LogOut className="size-5 shrink-0" />
                <span className="text-sm font-medium">Cerrar Sesión</span>
              </button>
            </div>
          </div>
        </SheetContent>
      </Sheet>
    </>
  );
}
