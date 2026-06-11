import { Loader } from "lucide-react";

export default function SpinnerComponent() {
    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black/30 backdrop-blur-sm z-50">
            <Loader />
        </div>
    );
}
