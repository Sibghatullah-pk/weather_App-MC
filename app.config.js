export default {
    name: 'KioskWeatherExpo',
    slug: 'kiosk-weather-expo',
    version: '1.0.0',
    orientation: 'portrait',
    userInterfaceStyle: 'light',
    assetBundlePatterns: [
        '**/*'
    ],
    ios: {
        supportsTablet: true
    },
    android: {
        adaptiveIcon: {
            backgroundColor: '#4FC3F7'
        }
    },
    extra: {
        VITE_OPENWEATHER_API_KEY: process.env.VITE_OPENWEATHER_API_KEY || ''
    }
};
