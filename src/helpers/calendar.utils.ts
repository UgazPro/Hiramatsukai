import { isSameDay } from "date-fns";

export const buildMonthGrid = <T>(
  date: Date,
  events: { date: Date; items: T[] }[]
) => {
  const year = date.getFullYear();
  const month = date.getMonth();

  const firstDay = new Date(year, month, 1);
  const lastDay = new Date(year, month + 1, 0);

  const days:any[] = [];

  for (let d = 1; d <= lastDay.getDate(); d++) {
    const current = new Date(year, month, d);

    const ev = events.find(e => isSameDay(e.date, current));

    days.push({
      date: current,
      items: ev?.items ?? []
    });
  }

  return days;
};
