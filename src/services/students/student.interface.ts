import { IDojo, IDojoMartialArts, IDojoRanks } from "../dojos/dojo.interface";

export type ViewMode = "list" | "grid" | "cards" | "longCards";
export type userRolesNames = "Administrador" | "Líder Instructor" | "Instructor" | "Estudiante" | "Representante";

export interface IStudent {
    id: number;
    identification: string;
    sex: string;
    name: string;
    lastName: string;
    password: string;
    email: string;
    username: string;
    address: string;
    phone: string;
    dojoId: number;
    rolId: number;
    birthday: Date;
    profileImg: string;
    active: boolean;
    deleted: boolean;
    createdAt: Date;
    enrollmentDate: Date;
    rol: IRol;
    dojo: IDojo;
    userRanks: StudentRanks[];
}

export interface StudentRanks {
    martialArt: IDojoMartialArts;
    rank: IStudentRanks;
}

export interface IStudentsGroup {
    allStudents: IStudent[];
    students: IStudent[];
}

export interface IRol {
    id: number;
    rol: userRolesNames;
}

export interface IStudentRanks {
    id: number;
    userId: number;
    rankId: number;
    martialArt: IDojoMartialArts;
    rank: IDojoRanks;
    belt?: string;
    code?: string;
}

export interface IExamHistoryItem {
    activity: {
        id: number;
        name: string;
        date: Date;
    };
    martialArt: IDojoMartialArts;
    rank: IDojoRanks;
    approved: boolean;
}

export interface IActivityAttendanceItem {
    id: number;
    userId: number;
    activityId: number;
    activity: {
        id: number;
        name: string;
        date: Date;
        place: string;
    };
}

export interface IStudentAllInfo {
    attendancePercentage: number;
    paymentStatus: 'AL_DIA' | 'DEUDA';
    examsHistory: IExamHistoryItem[];
    upcomingExam: {
        id: number;
        name: string;
        date: Date;
        place: string;
    } | null;
    activityAttendanceHistory: IActivityAttendanceItem[];
}

//Postulaciones

export interface ISuggestionStudentApplied {
    id:                    number;
    name:                  string;
    lastName:              string;
    enrollmentDate:        Date;
    identification:        string;
    birthday:              Date;
    suggestedByMartialArt: SuggestedByMartialArt[];
    suggested:             boolean;
}

export interface SuggestedByMartialArt {
    martialArtId:    number;
    martialArt:      string;
    lastExamDate:    null;
    postulationRank: PostulationRank;
    suggested:       boolean;
}

export interface PostulationRank {
    id:           number;
    martialArtId: number;
    code:         string;
    rank_name:    string;
    belt:         string;
    icon:         string;
}
