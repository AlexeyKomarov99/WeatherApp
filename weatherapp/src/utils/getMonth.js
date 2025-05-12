const months = [
    'января', 'февраля', 'марта', 'апреля', 'мая', 'июня',
    'июля', 'августа', 'сентября', 'октября', 'ноября', 'декабря'
];

export function Month(day) {
    const monthIndex = new Date(day * 1000).getMonth();
    return months[monthIndex];
}