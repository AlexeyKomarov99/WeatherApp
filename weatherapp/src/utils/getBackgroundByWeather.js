export function getBackgroundByWeather(weatherDescr, isDay = true, currentTemp = null) {
    const description = weatherDescr.toLowerCase();
    
    // Определяем температурные категории
    const isExtremeCold = currentTemp !== null && currentTemp <= -15;
    const isCold = currentTemp !== null && currentTemp <= 5;
    const isWarm = currentTemp !== null && currentTemp > 5 && currentTemp <= 20;
    const isHot = currentTemp !== null && currentTemp > 20 && currentTemp <= 30;
    const isExtremeHeat = currentTemp !== null && currentTemp > 30;

    // Ясно/Солнечно
    if (description.includes('clear') || description.includes('sunny')) {
        if (isExtremeHeat) {
            return 'var(--background-extreme-heat)';
        }
        if (isHot) {
            return isDay ? 'var(--background-sunny-hot-day)' : 'var(--background-sunny-hot-night)';
        }
        if (isExtremeCold) {
            return isDay ? 'var(--background-sunny-extreme-cold-day)' : 'var(--background-sunny-extreme-cold-night)';
        }
        if (isCold) {
            return isDay ? 'var(--background-sunny-cold-day)' : 'var(--background-sunny-cold-night)';
        }
        if (isDay) {
            return Math.random() > 0.5 ? 'var(--background-sunny-day)' : 'var(--background-sunny-day-alt)';
        } else {
            return Math.random() > 0.5 ? 'var(--background-sunny-night)' : 'var(--background-sunny-night-alt)';
        }
    }
    
    // Переменная облачность
    if (description.includes('partly cloudy')) {
        if (isExtremeCold) {
            return isDay ? 'var(--background-partly-cloudy-extreme-cold-day)' : 'var(--background-partly-cloudy-extreme-cold-night)';
        }
        if (isCold) {
            return isDay ? 'var(--background-partly-cloudy-cold-day)' : 'var(--background-partly-cloudy-cold-night)';
        }
        return isDay ? 'var(--background-partly-cloudy-day)' : 'var(--background-partly-cloudy-night)';
    }
    
    // Облачно/Пасмурно
    if (description.includes('cloudy') || description.includes('overcast')) {
        if (isExtremeCold) {
            return isDay ? 'var(--background-cloudy-extreme-cold-day)' : 'var(--background-cloudy-extreme-cold-night)';
        }
        if (isCold) {
            return isDay ? 'var(--background-cloudy-cold-day)' : 'var(--background-cloudy-cold-night)';
        }
        return isDay ? 'var(--background-cloudy-day)' : 'var(--background-cloudy-night)';
    }
    
    // Дождь
    if (description.includes('rain') || description.includes('drizzle')) {
        if (isExtremeCold) {
            return 'var(--background-freezing-rain)';
        }
        if (description.includes('light') || description.includes('drizzle')) {
            return isDay ? 'var(--background-light-rain)' : 'var(--background-rain-night)';
        }
        if (description.includes('heavy') || description.includes('torrential')) {
            return 'var(--background-heavy-rain)';
        }
        return isDay ? 'var(--background-moderate-rain)' : 'var(--background-rain-night)';
    }
    
    // Снег
    if (description.includes('snow')) {
        if (description.includes('light')) {
            return isDay ? 'var(--background-light-snow)' : 'var(--background-snow-night)';
        }
        if (description.includes('heavy') || description.includes('blizzard')) {
            return 'var(--background-blizzard)';
        }
        return isDay ? 'var(--background-moderate-snow)' : 'var(--background-snow-night)';
    }
    
    // Гроза
    if (description.includes('thunder') || description.includes('thundery')) {
        if (isHot || isExtremeHeat) {
            return 'var(--background-thunderstorm-hot)';
        }
        return isDay ? 'var(--background-thunderstorm-day)' : 'var(--background-thunderstorm)';
    }
    
    // Туман/Дымка
    if (description.includes('fog') || description.includes('mist') || description.includes('haze')) {
        if (description.includes('freezing')) {
            return 'var(--background-freezing-fog)';
        }
        if (isCold || isExtremeCold) {
            return 'var(--background-cold-fog)';
        }
        return 'var(--background-fog)';
    }
    
    // Мокрый снег
    if (description.includes('sleet')) {
        return 'var(--background-sleet)';
    }
    
    // Ледяной дождь
    if (description.includes('freezing rain')) {
        return 'var(--background-freezing-rain)';
    }
    
    // Град
    if (description.includes('hail') || description.includes('ice pellets')) {
        return 'var(--background-hail)';
    }
    
    // Экстремальная жара (уже обработано в sunny)
    if (description.includes('extreme heat') || description.includes('scorching')) {
        return 'var(--background-extreme-heat)';
    }
    
    // Экстремальный холод (уже обработано в других условиях)
    if (description.includes('extreme cold') || description.includes('freezing temperatures')) {
        return 'var(--background-extreme-cold)';
    }
    
    // По умолчанию (день/ночь) с учётом температуры
    if (isExtremeCold) {
        return isDay ? 'var(--background-default-extreme-cold-day)' : 'var(--background-default-extreme-cold-night)';
    }
    if (isCold) {
        return isDay ? 'var(--background-default-cold-day)' : 'var(--background-default-cold-night)';
    }
    if (isHot || isExtremeHeat) {
        return isDay ? 'var(--background-default-hot-day)' : 'var(--background-default-hot-night)';
    }
    
    return isDay ? 'var(--background-partly-cloudy-day)' : 'var(--background-partly-cloudy-night)';
}