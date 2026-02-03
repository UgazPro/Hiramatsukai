import { IDojo } from "../dojos/dojo.interface";

export type ViewMode = "list" | "grid" | "cards" | "longCards";
export type FilterStatus = "all" | "active" | "inactive";

export interface IStudent {
    id:             number;
    identification: string;
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
}

export interface IStudentsGroup {
    allStudents: IStudent[];
    students:    IStudent[];
}

export interface IRol {
    id:  number;
    rol: string;
}





