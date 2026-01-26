
export interface LoginForm {
    username: string;
    password: string;
}

export interface googleLogInData {
    clientId?: string;
    credential?: string;
}

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

export interface DecodedToken {
    name: string;
    lastName: string;
    rol: {
        rol: string;
    };
}






