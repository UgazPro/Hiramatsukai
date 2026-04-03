import { FaLocationDot } from "react-icons/fa6";

interface InformationSchemaProps {
    img: string;
    dojo: string;
    address: string;
}

export default function InformationSchema({img, dojo, address} : InformationSchemaProps) {

    return (

        <article className="flex-col p-4 gap-3 flex items-center justify-start">
            
            <div className="w-60 h-60 rounded-full overflow-hidden">
                <img
                    src={img}
                    alt={`Dojo ${dojo} de Hiramatsukai`}
                    loading="lazy"
                    className="w-full h-full object-cover transition duration-300 ease-in-out lg:hover:-translate-y-3.5 lg:hover:scale-117 "
                />
            </div>

            <h3 className="font-bold text-xl">{dojo}</h3>
            <address className="text-xs flex items-center gap-2 not-italic">
                <FaLocationDot className="text-red-700" aria-hidden="true" />
                {address}
            </address>

        </article>

    );

}
