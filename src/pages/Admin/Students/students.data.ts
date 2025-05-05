import { IColumns } from "@/components/table/table.interface";

export const studentsColumns : IColumns[] = [
    {
        label: 'Foto',
        element: (data) => data.img,
    },
    {
        label: 'Nombre',
        element: (data) => `${data.name} ${data.lastName}`,
    },
    {
        label: 'Rango',
        element: (data) => data.rank,
    },
    {
        label: 'Cinturón',
        element: (data) => data.belt,
    },
    {
        label: 'Edad',
        element: (data) => data.birthday,
    },
]

interface StudentsInfo {
    img: string;
    id: number;
    name: string;
    lastName: string;
    email: string;
    address: string;
    phone: string;
    birthday: string;
    belt: string;
    rank: string;
}

export const students : StudentsInfo[] = [
    {
        img: 'dsfsdfsdf',
        id: 1,
        name: 'Luis Angel',
        lastName: 'Ugaz Mendez',
        email: 'correo@correo.com',
        address: 'Urb. Los Angeles Mz. A Lote 1',
        phone: '45345345',
        birthday: '07/05/2004',
        belt: 'negro',
        rank: '2do dan'
    },
    {
        img: '',
        id: 1,
        name: 'Luis Angel',
        lastName: 'Ugaz Mendez',
        email: 'correo@correo.com',
        address: 'Urb. Los Angeles Mz. A Lote 1',
        phone: '45345345',
        birthday: '07/05/2004',
        belt: 'negro',
        rank: '2do dan'
    },
    {
        img: '',
        id: 1,
        name: 'Luis Angel',
        lastName: 'Ugaz Mendez',
        email: 'correo@correo.com',
        address: 'Urb. Los Angeles Mz. A Lote 1',
        phone: '45345345',
        birthday: '07/05/2004',
        belt: 'negro',
        rank: '2do dan'
    },
    {
        img: '',
        id: 1,
        name: 'Luis Angel',
        lastName: 'Ugaz Mendez',
        email: 'correo@correo.com',
        address: 'Urb. Los Angeles Mz. A Lote 1',
        phone: '45345345',
        birthday: '07/05/2004',
        belt: 'negro',
        rank: '2do dan'
    },
    {
        img: '',
        id: 1,
        name: 'Luis Angel',
        lastName: 'Ugaz Mendez',
        email: 'correo@correo.com',
        address: 'Urb. Los Angeles Mz. A Lote 1',
        phone: '45345345',
        birthday: '07/05/2004',
        belt: 'negro',
        rank: '2do dan'
    },
    {
        img: '',
        id: 1,
        name: 'Luis Angel',
        lastName: 'Ugaz Mendez',
        email: 'correo@correo.com',
        address: 'Urb. Los Angeles Mz. A Lote 1',
        phone: '45345345',
        birthday: '07/05/2004',
        belt: 'negro',
        rank: '2do dan'
    },
]





