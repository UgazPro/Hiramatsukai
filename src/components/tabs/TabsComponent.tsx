import { useState } from "react";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { TabsProperties } from "./tabs.interface";

interface TabsComponentProps {
  tabValue: string;
  tabs: TabsProperties[];
}

export default function TabsComponent({ tabs }: TabsComponentProps) {

  const [ defaultTabLabel ] = useState<string>(tabs[0].label);

  return (

    <>

      <Tabs defaultValue={defaultTabLabel} className="w-full px-8">
        <TabsList className="">
          {tabs && tabs.map((tab: TabsProperties, index: number) => (
            <TabsTrigger 
              value={tab.label} 
              key={index}
            >
              {tab.label}
            </TabsTrigger>
          ))}
        </TabsList>
      </Tabs>

    </>

  );

}
