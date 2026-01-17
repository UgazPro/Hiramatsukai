import { Outlet } from "react-router";
import Header from "./Header";
import Footer from "./Footer";
import FloatingButtons from "@/components/FloatingButtons";

export default function AppLayout() {

    return (
        <>
            <Header />

            <div className="flex min-h-screen flex-col w-full">
                <Outlet />
            </div>

            <FloatingButtons />

            <Footer />
        </>
    );
}
