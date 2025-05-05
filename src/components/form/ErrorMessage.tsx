

export default function ErrorMessage({children} : {children: React.ReactNode}) {

    return (

        <div className="text-center py-2 bg-white text-red-600 font-bold p-3 text-sm rounded-lg mt-2">
            {children}
        </div>

    );

}


