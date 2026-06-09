
export interface IDojo {
    id: number;
    dojo: string;
    address: string;
    logo: string;
    code: string;
    dojoMartialArts: IDojoMartialArts[];
    students: number;
    leaderInstructor: LeaderInstructor;
}

export interface LeaderInstructor {
    id:         number;
    name:       string;
    lastName:   string;
    profileImg: string;
    dojoId:     number;
    rol:        Rol;
    userRanks:  UserRank[];
}

export interface Rol {
    rol: string;
}

export interface UserRank {
    rank:       Rank;
    martialArt: MartialArt;
}

export interface MartialArt {
    martialArt: string;
    icon:       string;
}

export interface Rank {
    id:           number;
    code:         string;
    rank_name:    string;
    belt:         string;
    icon:         string;
    martialArtId: number;
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

export interface IDojoInfo extends IDojo {
    latitude: number;
    longitude: number;
    email: string;
    addressShort: string;
    phone: string;
    description: string;
    founded: Date;
    slogan: string;
    translate: string;
    socialMedia: DojoSocialMedia[];
    createdAt: Date;
    Schedules: DojoSchedule[];
    dojoImages: DojoImage[];
    totalStudents: number;
    masters: DojoMaster[];
}

export interface DojoSocialMedia {
    link:        string;
    socialMedia: string;
    directUrl: string;
}


export interface DojoImage {
    id: number;
    dojoId: number;
    type: string;
    url: string;
}

export interface DojoMaster {
    id: number;
    identification: string;
    name: string;
    lastName: string;
    email: string;
    phone: string;
    profileImg: string;
    rol: Rol;
    userRanks: DojoMasterRanks[];
}

export interface Rol {
    rol: string;
}


export interface DojoSchedule {
    id: number;
    name: string;
    day: string;
    startTime: string;
    endTime: string;
    martialArts: MartialArts;
}

export interface MartialArts {
    id: number;
    martialArt: string;
    icon: string;
}

export interface DojoMasterRanks {
    rank: Rank;
    martialArt: MartialArt;
}

export interface MartialArt {
    martialArt: string;
    icon: string;
}

export interface Rank {
    id: number;
    code: string;
    rank_name: string;
    belt: string;
    icon: string;
    martialArtId: number;
}


//Body

export interface DojoBody {
    dojo: string;
    address: string;
    addressShort: string;
    code: string;
    phone: string;
    email: string;
    description: string;
    founded: string | Date;
    slogan: string;
    translate: string;
    latitude: number;
    longitude: number;
    martialArts: number[];
    socialMedia: DojoSocialMedia[];
}

export interface DojoScheduleBody {
    id?: number;
    name: string;
    day: string;
    startTime: string;
    endTime: string;
    martialArtId: number;
}
