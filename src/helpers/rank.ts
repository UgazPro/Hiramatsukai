export const getRankOrder = (code: string): number => {
    if (!code) return 0;
    const prefix = code.charAt(0).toUpperCase();
    const num = parseInt(code.slice(1), 10);
    if (isNaN(num)) return 0;
    if (prefix === "K") return 10 - num;
    if (prefix === "D") return 10 + num;
    return 0;
};
