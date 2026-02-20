import { IDojo, IDojoMartialArts, IDojoRanks } from "../dojos/dojo.interface";

export type ViewMode = "list" | "grid" | "cards" | "longCards";
export type userRolesNames = "Administrador" | "Líder Instructor" | "Instructor" |"Estudiante" | "Representante";

export interface IStudent {
    id:             number;
    identification: string;
    sex: string;
    name:           string;
    lastName:       string;
    password:       string;
    email:          string;
    username:       string;
    address:        string;
    phone:          string;
    dojoId:         number;
    rolId:          number;
    birthday:       Date;
    profileImg:     string;
    active:         boolean;
    deleted:        boolean;
    createdAt:      Date;
    enrollmentDate: Date;
    rol:            IRol;
    dojo:           IDojo;
    userRanks: [{
        martialArt: IDojoMartialArts;
        rank: IStudentRanks;
    }]
}

export interface IStudentsGroup {
    allStudents: IStudent[];
    students:    IStudent[];
}

export interface IRol {
    id:  number;
    rol: userRolesNames;
}

export interface IStudentRanks {
    id:        number;
    userId:    number;
    rankId:    number;
    martialArt: IDojoMartialArts;
    rank:      IDojoRanks;
}







