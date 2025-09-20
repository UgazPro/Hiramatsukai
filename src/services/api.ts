import axios from 'axios';

export const api = axios.create({
    baseURL: `${import.meta.env.VITE_API_URL}/api`
});

export const getDataApi = async (url: string) => {
    try {
        
        return await api.get(url).then(res => {
            return res.data;
        });

    } catch (error) {
        console.log(error);
    }
}







