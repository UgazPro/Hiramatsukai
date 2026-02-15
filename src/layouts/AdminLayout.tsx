import { Outlet } from "react-router";
import AdminSidebar from "./AdminSidebar/AdminSidebar";
import Header from "./Header";

export default function AdminLayout() {

    return (

        <div className="flex relative h-full min-h-screen w-full bg-gray-200 justify-end">
            <div className="hidden md:block">
                <AdminSidebar />
            </div>
            <div className="h-full w-full md:pl-12">
                <Header />
                <div className="pl-4 py-2 w-full overflow-x-hidden">
                    <Outlet />
                </div>
            </div>
        </div>
        
    );

}