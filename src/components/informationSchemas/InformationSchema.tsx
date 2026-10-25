import { FaLocationDot } from "react-icons/fa6";
import { RiAncientGateFill } from "react-icons/ri";

interface InformationSchemaProps {
    img: string;
    dojo: string;
    address: string;
}

export default function InformationSchema({ img, dojo, address }: InformationSchemaProps) {

    const setImageDojo = (logo: string): string => {
        if (logo && logo.trim() !== "") {
            return `${import.meta.env.VITE_API_URL}/api${logo}`
        }
        return '';
    }

    return (

        <article className="group flex h-full flex-col items-center gap-4 rounded-3xl border border-brand-ink/8 bg-white/55 p-5 text-center shadow-soft backdrop-blur-md transition-all duration-300 hover:-translate-y-1 hover:bg-white/85 hover:shadow-lift">

            <div className="h-40 w-40 shrink-0 rounded-full bg-white/70 p-1.5 ring-1 ring-brand-gold/45 transition-all duration-300 group-hover:ring-brand-gold">
                <div className="h-full w-full overflow-hidden rounded-full">
                    {img !== '' ? (
                        <img
                            src={setImageDojo(img)}
                            alt={`Dojo ${dojo} de Hiramatsukai`}
                            loading="lazy"
                            className="h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
                        />
                    ) : (
                        <div className="flex h-full w-full items-center justify-center bg-brand-washi-deep">
                            <RiAncientGateFill className="text-5xl text-brand-muted/60" aria-hidden="true" />
                        </div>
                    )}
                </div>
            </div>

            <div className="space-y-2">
                <h3 className="font-serif text-lg font-semibold text-brand-ink">{dojo}</h3>
                <address className="flex items-start justify-center gap-1.5 text-xs not-italic leading-relaxed text-brand-muted">
                    <FaLocationDot className="mt-0.5 shrink-0 text-brand-vermilion" aria-hidden="true" />
                    <span>{address}</span>
                </address>
            </div>

        </article>

    );

}
