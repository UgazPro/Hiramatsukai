import { deleteDataApi, getDataApi, getImagesApi, postDataApi, putDataApi } from "../api";
import { DojoBody, DojoScheduleBody, IDojo, IDojoInfo, IDojoMartialArts, IDojoRanks } from "./dojo.interface";
import { MonthlyPaymentBody, MonthlyPayments, PaymentMethodBody, PaymentMethods } from "./payments.interface";

const dojosUrl = '/dojos';
const paymentsUrl = '/payments';

export const getDojos = async (): Promise<IDojo[]> => {
    return await getDataApi(dojosUrl);
}
export const getDojosInfoApi = async (code: string): Promise<IDojoInfo> => {
    return await getDataApi(`${dojosUrl}/info/${code}`);
}
export const getDojoLogo = async (logo: string) => {
    return await getImagesApi(logo);
}
export const getDojoImages = async (code: string): Promise<IDojo[]> => {
    return await getDataApi(`${dojosUrl}/${code}/images`);
}

export const getDojoMartialArts = async (): Promise<IDojoMartialArts[]> => {
    return await getDataApi(`${dojosUrl}/martial-arts`);
}

export const getDojoRanks = async (): Promise<IDojoRanks[]> => {
    return await getDataApi(`${dojosUrl}/ranks`);
}

export const updateDojoInfo = async (id: number, dojoInfo: DojoBody) => {
    const formData = new FormData();
    formData.append('dojoData', JSON.stringify(dojoInfo));
    return await putDataApi(`${dojosUrl}/${id}`, formData);
}


//Schedules
export const createScheduleDojos = async (dojoId: number, schedule: DojoScheduleBody[]) => {
    const formattedSchedules = {
        schedule: schedule.map(s => ({
            ...s,
            dojoId: dojoId
        }))
    }
    return await postDataApi(`${dojosUrl}/schedules`, formattedSchedules);
}

export const updateSchedulesDojos = async (dojoId: number, schedule: DojoScheduleBody[]) => {
    const formattedSchedules = {
        schedule: schedule.map(s => ({
            ...s,
            dojoId: dojoId
        }))
    }
    return await putDataApi(`${dojosUrl}/schedules`, formattedSchedules);
}

export const deleteScheduleDojos = async (scheduleId: number) => {
    return await deleteDataApi(`${dojosUrl}/schedules/${scheduleId}`);
}

//Payments

export const getPaymentMethods = async () => {
    return await getDataApi(`${paymentsUrl}/methods`) as Promise<PaymentMethods[]>;
}

export const createPaymentMethod = async (paymentMethodData: PaymentMethodBody) => {
    return await postDataApi(`${paymentsUrl}/methods`, paymentMethodData) as Promise<PaymentMethods>;
}

export const updatePaymentMethod = async (id: number, paymentMethodData: PaymentMethodBody) => {
    return await putDataApi(`${paymentsUrl}/methods/${id}`, paymentMethodData) as Promise<PaymentMethods>;
}

export const getMonthlyPayments = async () => {
    return await getDataApi(`${paymentsUrl}/monthly`) as Promise<MonthlyPayments[]>;
}

export const postMonthlyPayments = async (data: MonthlyPaymentBody) => {
    return await postDataApi(`${paymentsUrl}/monthly`, data) as Promise<MonthlyPayments>;
}

export const updateMonthlyPayments = async (id: number, data: MonthlyPaymentBody) => {
    return await putDataApi(`${paymentsUrl}/monthly/${id}`, data) as Promise<MonthlyPayments>;
}