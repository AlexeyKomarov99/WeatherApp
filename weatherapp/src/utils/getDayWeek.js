const daysWeek = ['воскресенье', 'понедельник', 'вторник', 'среда', 'четверг', 'пятница', 'суббота'];

export function DayWeek(day) {
    const dayIndex = new Date(day * 1000).getDay();
    const dayWeek = daysWeek[dayIndex];
    return dayWeek;
};