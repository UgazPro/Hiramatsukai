
interface InformationSchemaProps {
    img: string;
    dojo: string;
    address: string;
}

export default function InformationSchema({img, dojo, address} : InformationSchemaProps) {

    return (

        <div className="flex-col p-4 gap-3 flex items-center justify-start">
            
            <div className="w-60 h-60 cursor-pointer rounded-full  overflow-hidden ">
                <img src={img} alt="Imagen Líder Maestro" className="w-full h-full object-cover transition duration-300 ease-in-out lg:hover:-translate-y-3.5 lg:hover:scale-117 " />
            </div>

            <p className="font-bold text-xl">Dojo {dojo}</p>
            <p className="text-xs">{address}</p>

        </div>

    );

}
