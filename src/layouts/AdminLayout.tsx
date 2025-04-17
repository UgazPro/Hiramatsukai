import { Outlet } from "react-router"
import AdminSidebar from "./AdminSidebar/AdminSidebar"
import Footer from "./Footer"

export default function AdminLayout() {
    return (
        <>
            <div className="flex min-h-screen justify-between w-full">
                <AdminSidebar />
                <div className="bg-gray-200 h-full w-full">
                    <Outlet />
                </div>
            </div>
            <Footer />
        </>
    )
}
