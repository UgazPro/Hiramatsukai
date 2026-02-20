interface InfoItemProps {
    label: string;
    value: React.ReactNode;
    icon?: React.ReactNode;
}

export function InfoItem({ label, value, icon }: InfoItemProps) {
    return (
        <div>
            <p className="text-sm text-gray-500 mb-1">{label}</p>
            <div className="flex items-center gap-2">
                {icon}
                <p className="font-medium text-gray-900">{value}</p>
            </div>
        </div>
    );
}
