

export interface IMartialRanks {
    id: string;
    rank: string;
    martial_art: string;
}

export interface IStudentForm {
    picture: string;
    name: string;
    last_name: string;
    identification: string;
    sex: string;
    birthdate: string;
    email: string;
    phone: string;
    dojo: string;
    address: string;
    martialRanks: IMartialRanks[];
}






