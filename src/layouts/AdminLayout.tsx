import { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router"
import AdminSidebar from "./AdminSidebar/AdminSidebar"
import Footer from "./Footer"
import Header from "./Header"
import SpinnerComponent from "@/components/SpinnerComponent";

export default function AdminLayout() {
    const [showSpinner, setShowSpinner] = useState(true); // Inicia en true
    const [isAuthorized, setIsAuthorized] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('token');
        
        if (!token) {
            setTimeout(() => {
                navigate('/', { replace: true });
            }, 1000);
        } else {
            setTimeout(() => {
                setShowSpinner(false);
                setIsAuthorized(true);
            }, 500);
        }
    }, [navigate]);

    if (showSpinner) {
        return (
            <div className="flex items-center justify-center min-h-screen bg-gray-100">
                <SpinnerComponent />
            </div>
        );
    }

    if (!isAuthorized) {
        return null;
    }

    return (

        <div className="flex relative h-full min-h-screen w-full bg-gray-200 justify-end">
            <div className="hidden md:block">
                <AdminSidebar />
            </div>
            <div className="h-full w-full md:pl-12">
                <Header />
                <Outlet />
                <Footer />
            </div>
        </div>
        
    );

}