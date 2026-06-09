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

        <article className="flex-col p-4 gap-3 flex items-center justify-start">

            <div className="w-60 h-60 rounded-full overflow-hidden">
                {img != '' ? (
                    <img
                        src={setImageDojo(img)}
                        alt={`Dojo ${dojo} de Hiramatsukai`}
                        loading="lazy"
                        className="w-full h-full object-cover transition duration-300 ease-in-out lg:hover:-translate-y-3.5 lg:hover:scale-117 "
                    />
                ) : (
                    <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                        <RiAncientGateFill className="text-gray-500 text-6xl" />
                    </div>
                )}
            </div>

            <h3 className="font-bold text-xl">{dojo}</h3>
            <address className="text-xs flex items-center gap-2 not-italic">
                <FaLocationDot className="text-red-700" aria-hidden="true" />
                {address}
            </address>

        </article>

    );

}
