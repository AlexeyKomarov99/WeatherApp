export function getWeatherDescription(description) {
    return description === 'Partly Cloudy' || 'Partly cloudy' ? 'Переменная облачность' : 
        description === 'Sunny' ? 'Солнечно' :
        description === 'Clear' ? 'Ясно' :
        description === 'Cloudy' ? 'Облачно' :
        description === 'Overcast' ? 'Пасмурно' :
        description === 'Mist' ? 'Дымка' :
        description === 'Fog' ? 'Туман' :
        description === 'Patchy rain possible' ? 'Возможен дождь' :
        description === 'Patchy snow possible' ? 'Возможен снег' :
        description === 'Patchy sleet possible' ? 'Возможен мокрый снег' :
        description === 'Patchy freezing drizzle possible' ? 'Возможна ледяная морось' :
        description === 'Thundery outbreaks possible' ? 'Возможны грозы' :
        description === 'Blowing snow' ? 'Метель' :
        description === 'Blizzard' ? 'Снежная буря' :
        description === 'Freezing fog' ? 'Ледяной туман' :
        description === 'Light rain' ? 'Небольшой дождь' :
        description === 'Moderate rain' ? 'Умеренный дождь' :
        description === 'Heavy rain' ? 'Сильный дождь' :
        description === 'Light freezing rain' ? 'Лёгкий ледяной дождь' :
        description === 'Moderate or heavy freezing rain' ? 'Сильный ледяной дождь' :
        description === 'Light sleet' ? 'Небольшой мокрый снег' :
        description === 'Moderate or heavy sleet' ? 'Сильный мокрый снег' :
        description === 'Light snow' ? 'Небольшой снег' :
        description === 'Moderate snow' ? 'Умеренный снегопад' :
        description === 'Heavy snow' ? 'Сильный снегопад' :
        description === 'Patchy rain nearby' ? 'Местами дождь' :
        description === 'Light rain shower' ? 'Небольшой ливень' :
        description === 'Moderate or heavy rain shower' ? 'Сильный ливень' :
        description === 'Torrential rain shower' ? 'Проливной ливень' :
        description === 'Light sleet showers' ? 'Небольшой мокрый снег' :
        description === 'Moderate or heavy sleet showers' ? 'Сильный мокрый снег' :
        description === 'Light snow showers' ? 'Небольшой снегопад' :
        description === 'Moderate or heavy snow showers' ? 'Сильный снегопад' :
        description === 'Light showers of ice pellets' ? 'Небольшой град' :
        description === 'Moderate or heavy showers of ice pellets' ? 'Сильный град' :
        description === 'Patchy light rain with thunder' ? 'Дождь с грозой' :
        description === 'Moderate or heavy rain with thunder' ? 'Сильный дождь с грозой' :
        description === 'Patchy light snow with thunder' ? 'Снег с грозой' :
        description === 'Moderate or heavy snow with thunder' ? 'Сильный снег с грозой' :
        description === 'Light drizzle' ? 'Мелкий моросящий дождь' :
        description === '' ? 'Нет данных' :
        description;
};