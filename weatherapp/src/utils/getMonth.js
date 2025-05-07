const months = [
    'января', 'февраля', 'марта', 'апреля', 'мая', 'июня',
    'июля', 'августа', 'сентября', 'октября', 'ноября', 'декабря'
];

export function Month(index) {
    if (index < 0 || index >= months.length) {
        return '';
    }
    return months[index];
}