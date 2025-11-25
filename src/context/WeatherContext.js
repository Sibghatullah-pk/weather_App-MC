import React, { createContext, useContext, useMemo, useState, useEffect, useCallback } from 'react';
import * as Location from 'expo-location';
import Constants from 'expo-constants';
import { formatTime, formatDate } from '../helpers/weatherHelpers';

const WeatherContext = createContext();

const THEME_CONFIG = {
    rainy: {
        accent: '#35B6FF',
        name: 'Rainy'
    },
    night: {
        accent: '#4FC3F7',
        name: 'Night'
    },
    cloudy: {
        accent: '#6EC6FF',
        name: 'Cloudy'
    },
    sunny: {
        accent: '#FDB813',
        name: 'Sunny'
    }
};

export const WeatherProvider = ({ children }) => {
    const [theme, setTheme] = useState('cloudy');
    const [data, setData] = useState({ current: {}, forecast: { hourly: [], daily: [] }, location: { city: '', country: '', full: '' } });
    const [now, setNow] = useState(new Date());
    const [showSplash, setShowSplash] = useState(true);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [coords, setCoords] = useState(null);

    useEffect(() => {
        const t = setInterval(() => setNow(new Date()), 60000);
        return () => clearInterval(t);
    }, []);

    // Request location permission with Expo Location
    useEffect(() => {
        (async () => {
            try {
                const { status } = await Location.requestForegroundPermissionsAsync();
                if (status !== 'granted') {
                    setError('Location permission denied – using fallback');
                    setCoords({ lat: 51.5072, lon: -0.1276 });
                    return;
                }
                const location = await Location.getCurrentPositionAsync({ accuracy: Location.Accuracy.High });
                setCoords({ lat: location.coords.latitude, lon: location.coords.longitude });
            } catch (err) {
                setError('Location error – using fallback');
                setCoords({ lat: 51.5072, lon: -0.1276 });
            }
        })();
    }, []);

    const deriveTheme = useCallback((weatherMain, dt, sunrise, sunset) => {
        const isNight = dt < sunrise || dt > sunset;
        if (isNight) return 'night';
        if (/thunderstorm|rain|drizzle/i.test(weatherMain)) return 'rainy';
        if (/clear/i.test(weatherMain)) return 'sunny';
        return 'cloudy';
    }, []);

    const buildHourly = (forecastList) => {
        return forecastList.slice(0, 8).map(item => ({
            time: new Date(item.dt * 1000).toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' }),
            temp: Math.round(item.main.temp),
            condition: (/rain/i.test(item.weather[0].main) ? 'rainy' : (/clear/i.test(item.weather[0].main) ? 'sunny' : 'cloudy'))
        }));
    };

    const buildDaily = (forecastList) => {
        const byDate = {};
        forecastList.forEach(item => {
            const dateKey = new Date(item.dt * 1000).toISOString().split('T')[0];
            if (!byDate[dateKey]) byDate[dateKey] = [];
            byDate[dateKey].push(item);
        });
        return Object.entries(byDate).slice(0, 5).map(([dateKey, arr]) => {
            const avgTemp = arr.reduce((s, x) => s + x.main.temp, 0) / arr.length;
            const conditionCounts = arr.reduce((acc, x) => {
                const k = x.weather[0].main;
                acc[k] = (acc[k] || 0) + 1;
                return acc;
            }, {});
            const dominant = Object.entries(conditionCounts).sort((a, b) => b[1] - a[1])[0][0];
            const cond = /rain/i.test(dominant) ? 'rainy' : (/clear/i.test(dominant) ? 'sunny' : 'cloudy');
            const dayLabel = new Date(dateKey).toLocaleDateString('en-US', { weekday: 'long', day: 'numeric', month: 'short' });
            return { day: dayLabel, temp: Math.round(avgTemp), condition: cond };
        });
    };

    const fetchWeather = useCallback(async (lat, lon) => {
        try {
            setLoading(true);
            setError(null);
            const apiKey = Constants?.expoConfig?.extra?.VITE_OPENWEATHER_API_KEY || '';
            if (!apiKey) throw new Error('Missing OpenWeather API key');
            const params = `lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;
            const [currentRes, forecastRes, airRes] = await Promise.all([
                fetch(`https://api.openweathermap.org/data/2.5/weather?${params}`),
                fetch(`https://api.openweathermap.org/data/2.5/forecast?${params}`),
                fetch(`https://api.openweathermap.org/data/2.5/air_pollution?lat=${lat}&lon=${lon}&appid=${apiKey}`)
            ]);
            if (!currentRes.ok) throw new Error('Current weather fetch failed');
            if (!forecastRes.ok) throw new Error('Forecast fetch failed');
            let airJson = null;
            try { airJson = airRes.ok ? await airRes.json() : null; } catch { }
            const current = await currentRes.json();
            const forecast = await forecastRes.json();

            const sunrise = current.sys?.sunrise * 1000;
            const sunset = current.sys?.sunset * 1000;
            const dt = current.dt * 1000;
            const derivedTheme = deriveTheme(current.weather[0].main, dt, sunrise, sunset);
            setTheme(derivedTheme);

            const aqiMap = { 1: 'Good', 2: 'Fair', 3: 'Moderate', 4: 'Poor', 5: 'Very Poor' };
            const aqi = airJson?.list?.[0]?.main?.aqi;

            const shaped = {
                current: {
                    temperature: Math.round(current.main.temp),
                    feelsLike: Math.round(current.main.feels_like),
                    humidity: current.main.humidity,
                    windSpeed: Math.round(current.wind.speed * 3.6),
                    condition: derivedTheme,
                    pressure: current.main.pressure,
                    uv: '--',
                    airQuality: aqi ? aqiMap[aqi] : 'Unknown'
                },
                forecast: {
                    hourly: buildHourly(forecast.list),
                    daily: buildDaily(forecast.list)
                },
                location: {
                    city: current.name || 'Unknown',
                    country: current.sys?.country || '',
                    full: `${current.name}, ${current.sys?.country || ''}`.trim()
                },
                astronomy: {
                    sunrise: new Date(sunrise).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }),
                    sunset: new Date(sunset).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })
                }
            };
            setData(shaped);
        } catch (err) {
            setError(err.message || 'Weather fetch error');
        } finally {
            setLoading(false);
            setShowSplash(false);
        }
    }, [deriveTheme]);

    useEffect(() => {
        if (coords) {
            fetchWeather(coords.lat, coords.lon);
        }
    }, [coords, fetchWeather]);

    const value = useMemo(() => ({
        data,
        theme,
        setTheme,
        themeConfig: THEME_CONFIG[theme],
        formatTime: () => formatTime(now),
        formatDate: () => formatDate(now),
        showSplash: showSplash || loading,
        setShowSplash,
        loading,
        error,
        refresh: () => coords && fetchWeather(coords.lat, coords.lon),
        location: data.location,
        weather: data.current,
        hourlyForecast: data.forecast?.hourly || [],
        dailyForecast: data.forecast?.daily || []
    }), [data, theme, now, showSplash, loading, error, coords, fetchWeather]);

    return <WeatherContext.Provider value={value}>{children}</WeatherContext.Provider>;
};

export const useWeather = () => useContext(WeatherContext);
