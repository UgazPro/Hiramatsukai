
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
    rol:            Rol;
    dojo:           Dojo;
}

export interface IStudentsGroup {
    allStudents: IStudent[];
    students:    IStudent[];
}

export interface Dojo {
    id:          number;
    dojo:        string;
    address:     string;
    location:    string;
    code:        string;
    martialArts: any[];
}

export interface Rol {
    id:  number;
    rol: string;
}







