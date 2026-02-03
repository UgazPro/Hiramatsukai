
export interface IDojo {
    id: number;
    dojo: string;
    address: string;
    code: string;
    phone: string;
    description: string;
    latitude: number;
    longitude: number;
    martialArts: number[];
}

export interface IDojoMartialArts {
    id: number;
    martialArt: string;
    icon: string;
}

export interface IDojoRanks {
    id: string;
    code: string;
    rank_name: string;
    belt: string;
    icon: string;
    martialArtId: number;
}
