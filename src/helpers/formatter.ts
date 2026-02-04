import { differenceInYears, format } from "date-fns";
import { es } from "date-fns/locale";

export function calculateAge(birthday: Date): number {
    const today = new Date();
    const birthDate = new Date(birthday);
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();

    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
        age--;
    }

    return age;
}

export const howLongHasSomeonePracticeInMonths = (enrollmentDate: Date) => {
    const today = new Date();
    const enrollment = new Date(enrollmentDate);
    const months = differenceInYears(today, enrollment) * 12 +
        (today.getMonth() - enrollment.getMonth());
    return months;
};

export function dateFormatter(date: Date) {
    try {
        return format(new Date(date), "dd/MM/yyyy", { locale: es });
    } catch {
        return "Fecha inválida";
    }
};







