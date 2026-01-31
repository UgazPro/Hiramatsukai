
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
    return (
        <div className={`flex items-start space-x-3 ${bg} rounded-xl p-4 border ${border}`}>

            <div className={`h-12 w-12 rounded-full overflow-hidden ${bgIcon} flex items-center justify-center shrink-0`}>
                <span className="text-white font-bold whitespace-nowrap">{icon}</span>
            </div>

            <div>
                <h4 className="font-semibold text-gray-900">{title}</h4>
                <p className="text-gray-600 text-sm">{description}</p>
            </div>

        </div>
    )
}
