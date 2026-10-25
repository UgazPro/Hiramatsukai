
export interface CardComponentProps {
    title: string;
    description: string;
    icon: string;
    bgIcon: string;
    bg: string;
    border: string;
}

interface CardComponentSimple {
    card: CardComponentProps;
}

export const CardComponent = ({ card }: CardComponentSimple) => {
    const { title, description, icon, bgIcon, bg, border } = card;
    const isLongIcon = icon.length > 2;

    return (
        <div className={`group relative overflow-hidden rounded-2xl border ${border} bg-white/55 p-4 shadow-soft backdrop-blur-md transition-all duration-300 hover:-translate-y-0.5 hover:bg-white/80 hover:shadow-lift`}>

            <div aria-hidden="true" className={`absolute inset-0 opacity-40 transition-opacity duration-300 group-hover:opacity-60 ${bg}`} />

            <div className="relative flex items-start gap-3">
                <div className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl ${bgIcon} text-white shadow-soft ring-1 ring-white/30`}>
                    <span
                        aria-hidden="true"
                        className={isLongIcon ? "w-8 break-words text-center text-[9px] font-semibold leading-[1.15]" : "font-serif text-lg"}
                    >
                        {icon}
                    </span>
                </div>

                <div className="space-y-1">
                    <h4 className="text-sm font-semibold leading-snug text-brand-ink">{title}</h4>
                    <p className="text-xs leading-relaxed text-brand-muted">{description}</p>
                </div>
            </div>

        </div>
    )
}
