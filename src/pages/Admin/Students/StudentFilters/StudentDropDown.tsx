import { ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";

interface DropDownComponentProps {
  label: string;
  icon: React.ReactNode;
  value: string;
  options: string[];
  onChange: (v: any) => void;
  renderLabel?: (v: string) => string;
}

export default function StudentDropDown({ label, icon, value, options, onChange, renderLabel }: DropDownComponentProps) {

  return (
    
    <div className="space-y-3">

      <label className="text-sm font-medium text-gray-900 flex items-center gap-2">
        {icon}
        {label}
      </label>

      <DropdownMenu>

        <DropdownMenuTrigger asChild>
          <Button
            variant="outline"
            size="sm"
            className="w-full justify-between border-gray-300 text-gray-700 bg-white hover:bg-gray-50"
          >
            {renderLabel ? renderLabel(value) : value === "all" ? "Todos" : value}
            <ChevronDown className="h-4 w-4 text-gray-500" />
          </Button>
        </DropdownMenuTrigger>

        <DropdownMenuContent className="bg-white border-gray-300 shadow-lg min-w-50">
          {options.map((opt) => (
            <DropdownMenuItem
              key={opt}
              onClick={() => onChange(opt)}
              className="text-gray-700 hover:bg-gray-100 cursor-pointer"
            >
              {renderLabel ? renderLabel(opt) : opt}
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>

    </div>
    
  );

}
