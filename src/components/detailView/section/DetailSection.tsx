import { Card, CardContent } from "@/components/ui/card";

interface DetailSectionProps {
    icon: React.ReactNode;
    title: string;
    children: React.ReactNode;
    right?: React.ReactNode;
}

export function DetailSection({ icon, title, children, right }: DetailSectionProps) {
    return (
        <Card className="border border-gray-300 shadow-sm">
            <CardContent className="p-4 md:p-6">
                <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2">
                        {icon}
                        <h3 className="text-base md:text-lg font-semibold text-gray-900">{title}</h3>
                    </div>
                    {right}
                </div>

                {children}
            </CardContent>
        </Card>
    );
}
