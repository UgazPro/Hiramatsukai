import { useState } from "react";
import { Outlet } from "react-router";
import AdminSidebar from "./AdminSidebar/AdminSidebar";
import Header from "./Header";

export default function AdminLayout() {

    const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);

    return (
        <div className="relative flex h-dvh w-full overflow-hidden text-foreground">

            <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
                <div className="absolute inset-0 bg-wood opacity-40" />
                <div className="absolute -left-48 -top-48 size-[32rem] rounded-full bg-brand-gold/10 blur-[120px]" />
                <div className="absolute -right-48 top-1/3 size-[30rem] rounded-full bg-brand-vermilion/10 blur-[120px]" />
                <div className="absolute bottom-0 left-1/3 size-[26rem] rounded-full bg-brand-indigo/5 blur-[120px]" />
            </div>

            <a
                href="#contenido-admin"
                className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[100] focus:rounded-full focus:bg-brand-sumi focus:px-5 focus:py-3 focus:text-sm focus:font-medium focus:text-brand-washi"
            >
                Saltar al contenido
            </a>

            <AdminSidebar
                isMobileNavOpen={isMobileNavOpen}
                onCloseMobileNav={() => setIsMobileNavOpen(false)}
            />

            <div className="flex h-full min-w-0 flex-1 flex-col overflow-hidden md:pl-16">
                <Header onToggleMobileNav={() => setIsMobileNavOpen((prev) => !prev)} />
                <main
                    id="contenido-admin"
                    tabIndex={-1}
                    className="w-full flex-1 overflow-y-auto overflow-x-hidden outline-none"
                >
                    <Outlet />
                </main>
            </div>
        </div>
    );

}
