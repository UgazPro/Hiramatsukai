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
      className={`flex gap-2 overflow-x-auto rounded-xl border border-border bg-muted p-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden ${className}`}
    >
      {tabs.map((tab) => {
        const isActive = activeTab === tab.value;

        return (
          <Button
            key={tab.value}
            variant={isActive ? "secondary" : "ghost"}
            onClick={() => onChange(tab.value)}
            aria-pressed={isActive}
            className={`min-h-11 shrink-0 rounded-lg px-3 text-xs transition-all duration-300 sm:flex-1 sm:px-4 sm:text-sm ${
              isActive
                ? "bg-brand-gold text-brand-sumi shadow-md hover:bg-brand-gold-deep hover:text-white"
                : "text-foreground hover:bg-accent"
            }`}
          >
            {tab.icon && <span className="mr-2 shrink-0">{tab.icon}</span>}
            {tab.label}
          </Button>
        );
      })}
    </div>
  );
}
