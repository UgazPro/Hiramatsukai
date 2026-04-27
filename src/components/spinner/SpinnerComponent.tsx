

export default function SpinnerComponent() {

    return (

        <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black/50 bg-opacity-50 z-50">
            <div className="animate-spin rounded-full border-6 border-t-6 border-t-red-500 border-gray-200 h-16 w-16"></div>
        </div>

    );

}
