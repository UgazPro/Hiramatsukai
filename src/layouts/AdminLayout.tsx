import { Outlet } from "react-router"
import AdminSidebar from "./AdminSidebar/AdminSidebar"
import Footer from "./Footer"
import Header from "./Header"

export default function AdminLayout() {
    return (
        <>
            <div className="flex relative h-full min-h-screen w-full bg-gray-200 justify-end">
                <AdminSidebar />
                <div className="h-full w-full pl-12">
                    <Header />
                    <Outlet />
                    <Footer />
                </div>
            </div>
        </>
    )
}
