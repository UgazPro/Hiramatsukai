import { Outlet } from "react-router";
import { motion, useReducedMotion, useScroll, useSpring } from "motion/react";
import Header from "./Header";
import Footer from "./Footer";
import FloatingButtons from "@/components/FloatingButtons";

function ScrollProgress() {
    const shouldReduceMotion = useReducedMotion();
    const { scrollYProgress } = useScroll();
    const scaleX = useSpring(scrollYProgress, {
        stiffness: 120,
        damping: 30,
        restDelta: 0.001,
    });

    return (
        <motion.div
            aria-hidden="true"
            style={{ scaleX: shouldReduceMotion ? scrollYProgress : scaleX }}
            className="fixed inset-x-0 top-0 z-[60] h-0.5 origin-left bg-linear-to-r from-brand-gold via-brand-vermilion to-brand-gold"
        />
    );
}

export default function AppLayout() {

    return (
        <div className="relative flex min-h-dvh w-full flex-col overflow-x-clip">

            <div aria-hidden="true" className="pointer-events-none fixed inset-0 -z-10 bg-background">
                <div className="absolute inset-0 bg-wood opacity-50" />
                <div className="absolute -left-48 -top-48 h-[36rem] w-[36rem] rounded-full bg-brand-gold/10 blur-[120px]" />
                <div className="absolute -right-48 top-1/3 h-[34rem] w-[34rem] rounded-full bg-brand-vermilion/10 blur-[120px]" />
                <div className="absolute bottom-0 left-1/3 h-[28rem] w-[28rem] rounded-full bg-brand-indigo/5 blur-[120px]" />
            </div>

            <ScrollProgress />

            <a
                href="#contenido"
                className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[100] focus:rounded-full focus:bg-brand-sumi focus:px-5 focus:py-3 focus:text-sm focus:font-medium focus:text-brand-washi"
            >
                Saltar al contenido
            </a>

            <Header />

            <div id="contenido" tabIndex={-1} className="flex w-full flex-1 flex-col outline-none">
                <Outlet />
            </div>

            <FloatingButtons />

            <Footer />
        </div>
    );
}
