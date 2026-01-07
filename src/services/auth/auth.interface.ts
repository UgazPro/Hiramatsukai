
export interface AuthLoginData {
    username: string;
    password: string;
}

export interface AuthGoogleData {
    token: string;
}

export interface AuthCompleteProfileData {
    identification: string;
    address: string;
    phone: string;
    birthday: Date;
    rolId: number;
    dojoId: number;
    enrollmentDate: Date;
}






