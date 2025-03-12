import { Outlet } from "react-router";
import Header from "./Header";
import Footer from "./Footer";

export default function AppLayout() {

    return (
        <>
            <Header />

            <div className="flex min-h-screen flex-col w-full">
                <Outlet />
            </div>

            <Footer />
        </>
    );
}
