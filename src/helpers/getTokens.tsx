import { jwtDecode } from "jwt-decode";

interface DecodedToken {
    name: string;
    lastName: string;
    rol: {
        rol: string;
    };
}

export const getLoggedInUserBasicData = () => {

    const token = localStorage.getItem('token');
    const decoded = token ? jwtDecode<DecodedToken>(token) : null;
    const userRole = decoded?.rol?.rol;
    const userName = decoded?.name;
    const userLastName = decoded?.lastName;

    return {
        userRole,
        userName,
        userLastName
    }

}

export const getLoggedInUserToken = () => {
    const token = localStorage.getItem('token');
    return jwtDecode(token as string);
}









