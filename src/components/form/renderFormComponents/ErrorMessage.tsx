
import { UseFormReturn } from "react-hook-form";

export default function ErrorMessage({children, form} : {children: React.ReactNode, form?: UseFormReturn}) {

    return (

        <div className={`bg-transparent text-red-600 text-sm ${form && "absolute -bottom-6 left-1"}`}>
            {children}
        </div>

    );

}


