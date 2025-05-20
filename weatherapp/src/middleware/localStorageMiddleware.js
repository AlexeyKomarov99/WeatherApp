const localStorageMiddleware = (store) => (next) => (action) => {
    const result = next(action);

    // Сохраняем только нужную часть состояния
    if (action.type.startsWith('weather/')) {
        const favoriteCities = store.getState().weather.favoriteCities;
        localStorage.setItem('featured-cities-list', JSON.stringify(favoriteCities));
    }
    
    return result;
};

export default localStorageMiddleware;