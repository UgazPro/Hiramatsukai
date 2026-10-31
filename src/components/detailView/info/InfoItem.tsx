
interface InfoItemProps {
    label: string;
    value: React.ReactNode;
    icon?: React.ReactNode;
}

export function InfoItem({ label, value, icon }: InfoItemProps) {
    return (
        <div className="min-w-0">
            <p className="mb-1 text-sm text-muted-foreground">{label}</p>
            <div className="flex min-w-0 items-center gap-2">
                {icon}
                <p className="min-w-0 font-medium break-words text-foreground">{value}</p>
            </div>
        </div>
    );
}
