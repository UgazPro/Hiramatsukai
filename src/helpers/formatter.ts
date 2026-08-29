import { differenceInYears, format } from "date-fns";
import { es } from "date-fns/locale";

export function calculateAge(birthday: Date): number {
  const today = new Date();
  const birthDate = new Date(birthday);
  let age = today.getFullYear() - birthDate.getFullYear();
  const monthDiff = today.getMonth() - birthDate.getMonth();

  if (
    monthDiff < 0 ||
    (monthDiff === 0 && today.getDate() < birthDate.getDate())
  ) {
    age--;
  }

  return age;
}

export const howLongHasSomeonePracticeInMonths = (enrollmentDate: Date) => {
  const today = new Date();
  const enrollment = new Date(enrollmentDate);
  const months =
    differenceInYears(today, enrollment) * 12 +
    (today.getMonth() - enrollment.getMonth());
  return months;
};

export function dateFormatter(date: Date) {
  try {
    return format(new Date(date), "dd/MM/yyyy", { locale: es });
  } catch {
    return "Fecha inválida";
  }
}

export const dateFormatterIntoLong = (fecha: Date | string) => {
  try {
    return format(new Date(fecha), "dd 'de' MMMM 'de' yyyy", { locale: es });
  } catch {
    return "Fecha inválida";
  }
};

export function calculateMartialTime(enrollmentDate: string | Date) {
  const start = new Date(enrollmentDate);
  const now = new Date();

  let years = now.getFullYear() - start.getFullYear();
  let months = now.getMonth() - start.getMonth();
  let days = now.getDate() - start.getDate();

  if (days < 0) {
    months--;
    const lastMonth = new Date(now.getFullYear(), now.getMonth(), 0);
    days += lastMonth.getDate();
  }

  if (months < 0) {
    years--;
    months += 12;
  }

  return {
    years,
    months,
    days,
    totalMonths: years * 12 + months,
    totalDays: Math.floor((now.getTime() - start.getTime()) / (1000 * 60 * 60 * 24)),
    text: formatMartialTime(years, months, days)
  };
}

function formatMartialTime(y: number, m: number, d: number) {
  const parts = [];

  if (y > 0) parts.push(`${y} año${y > 1 ? "s" : ""}`);
  if (m > 0) parts.push(`${m} mes${m > 1 ? "es" : ""}`);
  if (d > 0 && y === 0) parts.push(`${d} día${d > 1 ? "s" : ""}`);

  return parts.length ? parts.join(", ") : "Recién inscrito";
}

export const formatPhoneNumber = (phone: string): string => {
    const cleaned = ('' + (phone ?? '')).replace(/\D/g, '');
    const match = cleaned.match(/^(\d{4})(\d{3})(\d{4})$/);
    if (match) {
        return `(${match[1]})${match[2]}-${match[3]}`;
    }
    return phone || '-';
};

export const formatNumberWithDots = (num: number | string): string => {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
};

export const sanitizeDigits = (value: string): string => {
    return value.replace(/\D+/g, "");
};

export const sanitizeLetters = (value: string): string => {
    return value.replace(/[^A-Za-zÁÉÍÓÚÜÑáéíóúüñ ]+/g, "");
};

export const sanitizeAlphanumeric = (value: string): string => {
    return value.replace(/[^A-Za-z0-9]+/g, "");
};

export const isValidEmail = (value: string): boolean => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(value);
};

export const IDENTIFICATION_TYPES = ["V", "E", "NIT", "C.I"] as const;
export type IdentificationType = (typeof IDENTIFICATION_TYPES)[number];

export const COUNTRY_PHONE_CODES: { code: string; label: string; country: string; group: number[] }[] = [
    { code: "+58", label: "+58", country: "Venezuela", group: [3, 3, 4] },
    { code: "+57", label: "+57", country: "Colombia", group: [3, 3, 4] },
    { code: "+56", label: "+56", country: "Chile", group: [1, 4, 4] },
];

export const formatIdentification = (value: string): string => {
    const raw = ('' + (value ?? '')).trim();
    if (!raw) return "-";

    const match = raw.match(/^([A-Za-zÁÉÍÓÚÜÑáéíóúüñ.]+)\s*[-\s]?\s*(\d+)$/);
    if (match) {
        const prefix = match[1].trim();
        return `${prefix}-${formatNumberWithDots(match[2])}`;
    }

    if (/^\d+$/.test(raw)) {
        return formatNumberWithDots(raw);
    }

    return raw;
};

export const splitIdentification = (value: string): { type: IdentificationType; digits: string } => {
    const raw = ('' + (value ?? '')).trim();
    const match = raw.match(/^([A-Za-zÁÉÍÓÚÜÑáéíóúüñ.]+)\s*[-\s]?\s*(\d+)$/);
    if (match) {
        const normalized = match[1].toUpperCase().replace(/\./g, "");
        const type = IDENTIFICATION_TYPES.find((t) => t.toUpperCase().replace(/\./g, "") === normalized) ?? "V";
        return { type, digits: match[2] };
    }
    return { type: "V", digits: sanitizeDigits(raw) };
};

export const formatPhoneByCountry = (countryCode: string, digits: string): string => {
    const clean = sanitizeDigits(digits);
    const country = COUNTRY_PHONE_CODES.find((c) => c.code === countryCode);
    const group = country?.group ?? [3, 3, 4];

    let result = "";
    let index = 0;
    for (let i = 0; i < group.length; i++) {
        const size = group[i];
        if (index >= clean.length) break;
        const chunk = clean.slice(index, index + size);
        index += size;

        if (i > 0) {
            if (i === 2 && (countryCode === "+58" || countryCode === "+57")) {
                result += "-" + chunk;
            } else if (i === 1 && (countryCode === "+58" || countryCode === "+57")) {
                result += ") " + chunk;
            } else {
                result += " " + chunk;
            }
        } else {
            if (countryCode === "+58" || countryCode === "+57") {
                result += "(" + chunk;
            } else {
                result += chunk;
            }
        }
    }

    if (clean.length === 0) return "";
    return result;
};

export const parseStoredPhone = (phone: string): { countryCode: string; digits: string } => {
    const clean = sanitizeDigits(phone);
    const country = COUNTRY_PHONE_CODES.find(
        (c) => clean.startsWith(c.code.replace("+", ""))
    );
    if (country) {
        return {
            countryCode: country.code,
            digits: clean.slice(country.code.replace("+", "").length),
        };
    }
    return { countryCode: "+58", digits: clean };
};

export const formatPhoneWithCode = (phone: string): string => {
    const { countryCode, digits } = parseStoredPhone(phone);
    if (!digits) return phone || "-";
    return `${countryCode} ${formatPhoneByCountry(countryCode, digits)}`;
};

export const timeFormatter = (date: Date | string) => {
    try {
        return format(new Date(date), "HH:mm 'hrs'", { locale: es });
    } catch {
        return "Hora inválida";
    }
};