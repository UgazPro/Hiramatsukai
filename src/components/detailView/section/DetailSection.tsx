import { Card, CardContent } from "@/components/ui/card";

interface DetailSectionProps {
    icon: React.ReactNode;
    title: string;
    children: React.ReactNode;
    right?: React.ReactNode;
}

export function DetailSection({ icon, title, children, right }: DetailSectionProps) {
    return (
        <Card className="border border-border shadow-sm">
            <CardContent className="p-4 md:p-6">
                <div className="mb-4 flex flex-wrap items-center justify-between gap-2">
                    <div className="flex min-w-0 items-center gap-2">
                        {icon}
                        <h3 className="min-w-0 text-base font-semibold break-words text-heading md:text-lg">{title}</h3>
                    </div>
                    {right}
                </div>

                {children}
            </CardContent>
        </Card>
    );
}
