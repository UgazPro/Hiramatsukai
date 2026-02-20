import { Badge } from "../ui/badge";

interface FieldBagdeProps{
    label: string;
    color: colors;
}

type colors = 'blue' | 'green' | 'red' | 'gray' | 'yellow' | 'transparent';

export default function FieldBadge({ label, color } : FieldBagdeProps) {

    function styleClass(variant : colors) {

        switch(variant) {

            case 'blue': return 'bg-blue-100 text-blue-800 border-blue-200'
            case 'green': return 'bg-green-100 text-green-800 border-green-200'
            case 'red': return 'bg-red-100 text-red-800 border-red-200'
            case 'gray': return 'bg-gray-100 text-gray-800 border-gray-200'
            case 'yellow': return 'bg-yellow-100 text-yellow-800 border-yellow-200'
            case 'transparent': return 'border-gray-300 text-gray-700 bg-white'

        }

    }

    return (

        <>
            <Badge className={styleClass(color)}>
                {label}
            </Badge>
        </>

    );

}










