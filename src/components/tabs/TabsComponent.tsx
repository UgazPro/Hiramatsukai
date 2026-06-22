import { Button } from "@/components/ui/button";
import { ReactNode } from "react";

export interface TabItem<T extends string> {
  value: T;
  label: string;
  icon?: ReactNode;
}

interface TabsComponentProps<T extends string> {
  tabs: TabItem<T>[];
  activeTab: T;
  onChange: (tab: T) => void;
  className?: string;
}

export default function TabsComponent<T extends string>({
  tabs,
  activeTab,
  onChange,
  className = "",
}: TabsComponentProps<T>) {
  return (
    <div
      className={`flex flex-wrap gap-2 p-1 bg-gray-100 rounded-xl border border-gray-300 ${className}`}
    >
      {tabs.map((tab) => {
        const isActive = activeTab === tab.value;

        return (
          <Button
            key={tab.value}
            variant={isActive ? "secondary" : "ghost"}
            onClick={() => onChange(tab.value)}
            className={`flex-1 rounded-lg transition-all duration-300 ${isActive
                ? "bg-linear-to-r from-yellow-600 to-red-600 text-white shadow-md"
                : "text-gray-700 hover:bg-gray-200"
              }`}
          >
            {tab.icon && <span className="mr-2">{tab.icon}</span>}
            {tab.label}
          </Button>
        );
      })}
    </div>
  );
}