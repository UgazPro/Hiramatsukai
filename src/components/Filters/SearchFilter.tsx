import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";

interface SearchFilterComponentProps {
    searchTerm: string;
    setSearchTerm: (term: string) => void;
    placeHolder?: string;
    width?: string;
}

export default function SearchFilterComponent({ searchTerm, setSearchTerm, placeHolder, width }: SearchFilterComponentProps) {

    return (
        <div className="relative w-full max-w-2xl min-w-0">
            <Search className="absolute left-4 top-1/2 size-5 -translate-y-1/2 text-muted-foreground" />
            <Input
                placeholder={placeHolder}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className={`h-11 rounded-lg border border-input bg-card pl-11 text-base shadow-sm transition-colors focus-visible:border-ring focus-visible:ring-2 focus-visible:ring-ring/40 md:h-10 md:text-sm ${width || 'w-full'}`}
            />
        </div>
    );
}
