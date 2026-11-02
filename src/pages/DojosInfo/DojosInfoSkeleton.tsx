import { Skeleton } from "@/components/ui/skeleton";

export default function DojosInfoSkeleton() {
  return (
    <div
      className="min-h-dvh"
      role="status"
      aria-live="polite"
      aria-busy="true"
    >
      <span className="sr-only">Cargando información del Dojo…</span>

      <div aria-hidden="true">
        {/* Hero */}
        <div className="relative overflow-hidden bg-brand-blue-deep">
          <div className="absolute inset-0 bg-wood-dark opacity-30" />
          <div className="container relative mx-auto px-4 py-16 md:py-24">
            <div className="mx-auto flex max-w-4xl flex-col items-center gap-4 text-center">
              <Skeleton className="h-7 w-56 rounded-full bg-brand-washi/15" />
              <Skeleton className="h-10 w-72 rounded-lg bg-brand-washi/15 md:h-14 md:w-96" />
              <Skeleton className="h-5 w-48 bg-brand-washi/10" />
              <Skeleton className="h-5 w-full max-w-xl bg-brand-washi/10" />
              <Skeleton className="mt-2 h-px w-40 bg-brand-washi/20" />
            </div>
          </div>
        </div>

        {/* Navegación principal */}
        <div className="border-b border-brand-ink/10 bg-brand-washi/85 backdrop-blur-xl">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-2 items-center justify-center gap-2 py-2 lg:flex lg:gap-3">
              {Array.from({ length: 3 }).map((_, index) => (
                <Skeleton
                  key={index}
                  className="h-11 w-full rounded-2xl lg:w-1/4"
                />
              ))}
            </div>
          </div>
        </div>

        {/* Contenido principal */}
        <main className="mx-auto px-4 py-8">
          <div className="mt-4 space-y-6">
            <div className="flex flex-col items-center gap-3 text-center">
              <Skeleton className="h-4 w-32" />
              <Skeleton className="h-8 w-64 max-w-full sm:w-80" />
              <Skeleton className="mt-2 h-4 w-full max-w-3xl" />
              <Skeleton className="h-4 w-full max-w-2xl" />
            </div>

            <Skeleton className="h-px w-full" />

            <div className="space-y-6">
              <Skeleton className="mx-auto h-8 w-72 max-w-full" />

              <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-4">
                {Array.from({ length: 4 }).map((_, index) => (
                  <div key={index} className="glass rounded-3xl p-6">
                    <Skeleton className="mb-4 h-12 w-12 rounded-2xl" />
                    <Skeleton className="h-5 w-32 max-w-full" />
                    <div className="mt-3 space-y-2">
                      <Skeleton className="h-3.5 w-full" />
                      <Skeleton className="h-3.5 w-5/6" />
                      <Skeleton className="h-3.5 w-2/3" />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
