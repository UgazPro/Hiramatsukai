import axios from 'axios';

export const api = axios.create({
    baseURL: `${import.meta.env.VITE_API_URL}/api`
});

export const getDataApi = async (url: string) => {
    try {
        const token = localStorage.getItem('token');
        const header = {
            'Authorization': `Bearer ${token}`
        }
        return await api.get(url, { headers: header }).then(res => {
            return res.data;
        });

    } catch (error) {
        console.log(error);
    }
}

export const postDataApi = async (url: string, data: any) => {
    try {
        return await api.post(url, data).then(res => {
            return res.data;
        });
    } catch (error) {
        console.log(error);
    }
}







