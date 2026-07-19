import { useState } from "react";
import { Outlet } from "react-router";
import AdminSidebar from "./AdminSidebar/AdminSidebar";
import Header from "./Header";

export default function AdminLayout() {

    const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);

    return (

        <div className="relative flex h-screen w-full justify-end overflow-hidden bg-gray-200">
            <div className="">
                <AdminSidebar
                    isMobileNavOpen={isMobileNavOpen}
                    onCloseMobileNav={() => setIsMobileNavOpen(false)}
                />
            </div>
            <div className="flex h-full w-full flex-col overflow-hidden md:pl-12">
                <Header onToggleMobileNav={() => setIsMobileNavOpen((prev) => !prev)} />
                <div className="w-full flex-1 overflow-y-auto overflow-x-hidden py-2 lg:pl-4">
                    <Outlet />
                </div>
            </div>
        </div>

    );

}
