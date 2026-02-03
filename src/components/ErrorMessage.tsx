

export default function ErrorMessage({children} : {children: React.ReactNode}) {

    return (

        <div className="bg-transparent text-red-600 text-sm absolute -bottom-6 left-1">
            {children}
        </div>

    );

}


