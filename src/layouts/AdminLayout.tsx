import { Outlet } from "react-router"
import AdminSidebar from "./AdminSidebar/AdminSidebar"
import Footer from "./Footer"

export default function AdminLayout() {
    return (
        <>
            <div className="flex h-full min-h-screen justify-between w-full bg-gray-200">
                <AdminSidebar />
                <div className="h-full w-full">
                    <Outlet />
                </div>
            </div>
            <Footer />
        </>
    )
}
