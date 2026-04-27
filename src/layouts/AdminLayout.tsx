import { Outlet } from "react-router";
import AdminSidebar from "./AdminSidebar/AdminSidebar";
import Header from "./Header";

export default function AdminLayout() {

    return (

        <div className="relative flex h-screen w-full justify-end overflow-hidden bg-gray-200">
            <div className="">
                <AdminSidebar />
            </div>
            <div className="flex h-full w-full flex-col overflow-hidden pb-16 md:pb-0 md:pl-12">
                <Header />
                <div className="w-full flex-1 overflow-y-auto overflow-x-hidden py-2 lg:pl-4">
                    <Outlet />
                </div>
            </div>
        </div>
        
    );

}