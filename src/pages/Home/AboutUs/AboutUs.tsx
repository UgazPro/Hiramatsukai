import type { PointerEvent } from "react";
import { Button } from "@/components/ui/button";
import Reveal from "@/components/animation/Reveal";
import {
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
} from "motion/react";
import { Sparkles } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { useDojos } from "@/hooks/useDojos";
const floatingTags = [
  { label: "Karatedo · Goju-Ryu", position: "-left-2 top-20", delay: 0 },
  { label: "Kobudo · Matayoshi", position: "-right-3 top-1/3", delay: 1.4 },
  { label: "Kendo · Iaido", position: "bottom-16 left-6", delay: 0.7 },
];
export default function AboutUs() {
  const shouldReduceMotion = useReducedMotion();
  const {
    data: dojos = [],
    isLoading: isLoadingDojos,
    isError: isErrorDojos,
  } = useDojos();

  const stats: { value: string; label: string; loading?: boolean }[] = [
    { value: "1997", label: "Fundación en Okinawa" },
    { value: "3", label: "Disciplinas tradicionales" },
    {
      value: isLoadingDojos ? "" : isErrorDojos ? "—" : String(dojos.length),
      label: "Dojos afiliados",
      loading: isLoadingDojos,
    },
  ];

  const pointerX = useMotionValue(0);
  const pointerY = useMotionValue(0);
  const parallaxX = useSpring(pointerX, { stiffness: 60, damping: 16 });
  const parallaxY = useSpring(pointerY, { stiffness: 60, damping: 16 });
  const handlePointerMove = (event: PointerEvent<HTMLDivElement>) => {
    if (shouldReduceMotion) return;
    const rect = event.currentTarget.getBoundingClientRect();
    pointerX.set(((event.clientX - rect.left) / rect.width - 0.5) * 22);
    pointerY.set(((event.clientY - rect.top) / rect.height - 0.5) * 22);
  };
  const resetPointer = () => {
    pointerX.set(0);
    pointerY.set(0);
  };
  return (
    <section
      id="home"
      aria-labelledby="home-title"
      className="relative flex min-h-[92dvh] w-full scroll-mt-32 items-center overflow-hidden"
    >
      {" "}
      <div className="absolute inset-0">
        {" "}
        <motion.img
          src="/Hiramatsukai.jpg"
          alt="Entrenamiento de artes marciales en Hiramatsukai"
          className="h-full w-full object-cover object-[62%_35%]"
          initial={shouldReduceMotion ? false : { scale: 1.08 }}
          whileInView={shouldReduceMotion ? undefined : { scale: 1 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 1.4, ease: "easeOut" }}
        />{" "}
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-linear-to-r from-brand-sumi via-brand-sumi/80 to-brand-sumi/30"
        />{" "}
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-linear-to-t from-brand-sumi via-transparent to-brand-sumi/40"
        />{" "}
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-wood-dark opacity-20 mix-blend-overlay"
        />{" "}
      </div>{" "}
      <div className="relative mx-auto grid w-full max-w-[1400px] items-center gap-14 px-5 py-24 sm:px-8 lg:grid-cols-[1.08fr_0.92fr] lg:px-12 lg:py-28">
        {" "}
        <div className="text-center lg:text-left">
          {" "}
          <Reveal y={14} duration={0.5}>
            {" "}
            <span className="section-eyebrow rounded-full border border-brand-copper-light/40 bg-brand-sumi/60 px-4 py-2 text-brand-copper-light backdrop-blur-md">
              {" "}
              <Sparkles className="h-3.5 w-3.5" aria-hidden="true" /> Okinawa ·
              Desde 1997{" "}
            </span>{" "}
          </Reveal>{" "}
          <Reveal y={18} duration={0.6} delay={0.08}>
            {" "}
            <h1
              id="home-title"
              className="mt-7 text-balance text-4xl font-semibold leading-[1.05] tracking-tight text-white drop-shadow-[0_2px_18px_rgba(0,0,0,0.55)] sm:text-5xl lg:text-7xl"
            >
              {" "}
              Hiramatsukai{" "}
              <span className="mt-2 block text-brand-copper-light">
                Internacional
              </span>{" "}
            </h1>{" "}
          </Reveal>{" "}
          <Reveal y={16} delay={0.16} duration={0.55}>
            {" "}
            <div
              aria-hidden="true"
              className="gold-rule mx-auto mt-7 h-px w-40 lg:mx-0"
            />{" "}
            <p className="mx-auto mt-6 max-w-xl text-lg leading-relaxed text-brand-washi drop-shadow-[0_1px_10px_rgba(0,0,0,0.6)] md:text-xl lg:mx-0">
              {" "}
              Tradición, disciplina y excelencia en las artes marciales. Un
              linaje vivo que se practica con el cuerpo y se transmite con el
              ejemplo.{" "}
            </p>{" "}
          </Reveal>{" "}
          <Reveal y={16} delay={0.24} duration={0.55}>
            {" "}
            <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row lg:justify-start">
              {" "}
              <Button
                asChild
                size="lg"
                variant="brand"
                className="group w-full rounded-full px-8 py-6 text-base shadow-gold sm:w-auto"
              >
                <a href="#hiramatsukai">Conoce la organización</a>
              </Button>{" "}
            </div>{" "}
          </Reveal>{" "}
          <Reveal y={16} delay={0.32} duration={0.55}>
            {" "}
            <div className="mx-auto mt-10 grid max-w-xl grid-cols-3 gap-2.5 sm:gap-3 lg:mx-0">
              {" "}
              {stats.map((stat) => (
                <div
                  key={stat.label}
                  className="glass-dark rounded-2xl px-3 py-4 text-center transition-all duration-300 hover:-translate-y-1 hover:border-brand-gold/40 lg:text-left"
                >
                  {" "}
                  {stat.loading ? (
                    <Skeleton className="mx-auto h-8 w-10 rounded-md bg-brand-washi/20 lg:mx-0" />
                  ) : (
                    <p className="font-serif text-2xl font-semibold text-brand-copper-light sm:text-3xl">
                      {stat.value}
                    </p>
                  )}{" "}
                  <p className="mt-1 text-[10px] leading-tight tracking-wide text-brand-washi/65 sm:text-[11px]">
                    {" "}
                    {stat.label}{" "}
                  </p>{" "}
                </div>
              ))}{" "}
            </div>{" "}
          </Reveal>{" "}
        </div>{" "}
        <Reveal
          className="relative hidden items-center justify-center lg:flex"
          y={24}
          delay={0.2}
          duration={0.7}
        >
          {" "}
          <div
            className="relative flex h-[30rem] w-[30rem] items-center justify-center"
            onPointerMove={handlePointerMove}
            onPointerLeave={resetPointer}
          >
            {" "}
            <motion.div
              style={{ x: parallaxX, y: parallaxY }}
              className="relative flex h-full w-full items-center justify-center"
            >
              {" "}
              <motion.span
                aria-hidden="true"
                className="absolute inset-0 rounded-full border border-dashed border-brand-gold/30"
                animate={shouldReduceMotion ? undefined : { rotate: 360 }}
                transition={{ duration: 70, repeat: Infinity, ease: "linear" }}
              />{" "}
              <span
                aria-hidden="true"
                className="absolute inset-10 rounded-full border border-white/10 bg-white/5 backdrop-blur-xl shadow-[0_30px_90px_-30px_rgba(0,0,0,0.8)]"
              />{" "}
              <span
                aria-hidden="true"
                className="absolute inset-16 rounded-full bg-brand-sumi/40"
              />{" "}
              <motion.img
                src="/oki2.png"
                alt="Emblema de Hiramatsukai Karatedo"
                className="relative h-64 w-64 object-contain drop-shadow-[0_25px_60px_rgba(0,0,0,0.65)]"
                animate={shouldReduceMotion ? undefined : { y: [0, -10, 0] }}
                transition={{
                  duration: 6,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />{" "}
              {floatingTags.map((tag) => (
                <motion.span
                  key={tag.label}
                  className={`glass-dark absolute ${tag.position} rounded-full px-4 py-2 text-xs font-medium tracking-wide text-brand-washi shadow-lift`}
                  animate={shouldReduceMotion ? undefined : { y: [0, -8, 0] }}
                  transition={{
                    duration: 5.5,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: tag.delay,
                  }}
                >
                  {" "}
                  <span
                    className="mr-2 inline-block h-1.5 w-1.5 rounded-full bg-brand-gold align-middle"
                    aria-hidden="true"
                  />{" "}
                  {tag.label}{" "}
                </motion.span>
              ))}{" "}
              <span
                aria-hidden="true"
                className="absolute -bottom-2 text-[10px] font-semibold uppercase tracking-[0.4em] text-brand-washi/35"
              >
                {" "}
                平松会{" "}
              </span>{" "}
            </motion.div>{" "}
          </div>{" "}
        </Reveal>{" "}
      </div>{" "}
    </section>
  );
}
