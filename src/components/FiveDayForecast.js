import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useWeather } from '../context/WeatherContext';

const FiveDayForecast = () => {
    const { dailyForecast, loading } = useWeather();

    if (loading || !dailyForecast || dailyForecast.length === 0) {
        return null;
    }

    const getWeatherIcon = (condition) => {
        const lowerCondition = condition?.toLowerCase() || '';
        if (lowerCondition.includes('rain')) return '🌧️';
        if (lowerCondition.includes('cloud')) return '☁️';
        if (lowerCondition.includes('sunny') || lowerCondition.includes('clear')) return '☀️';
        if (lowerCondition.includes('snow')) return '❄️';
        return '🌤️';
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>5-Day Forecast</Text>
            {dailyForecast.map((day, index) => (
                <LinearGradient
                    key={index}
                    colors={['rgba(255,255,255,0.3)', 'rgba(255,255,255,0.15)']}
                    style={styles.dayCard}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 1 }}
                >
                    <View style={styles.dayContent}>
                        <Text style={styles.day}>
                            {day.day}
                        </Text>
                        <View style={styles.iconTemp}>
                            <Text style={styles.icon}>
                                {getWeatherIcon(day.condition)}
                            </Text>
                            <Text style={styles.description}>
                                {day.condition}
                            </Text>
                        </View>
                        <View style={styles.tempContainer}>
                            <Text style={styles.tempHigh}>
                                {day.temp}°
                            </Text>
                        </View>
                    </View>
                </LinearGradient>
            ))}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        marginBottom: 20
    },
    title: {
        fontSize: 20,
        fontWeight: '700',
        color: '#fff',
        marginBottom: 15,
        paddingLeft: 5
    },
    dayCard: {
        borderRadius: 20,
        marginBottom: 12,
        overflow: 'hidden',
        borderWidth: 1,
        borderColor: 'rgba(255,255,255,0.3)'
    },
    dayContent: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 18
    },
    day: {
        fontSize: 16,
        fontWeight: '700',
        color: '#fff',
        width: 60
    },
    iconTemp: {
        flexDirection: 'row',
        alignItems: 'center',
        flex: 1,
        paddingLeft: 10
    },
    icon: {
        fontSize: 28,
        marginRight: 10
    },
    description: {
        fontSize: 14,
        color: '#fff',
        opacity: 0.9
    },
    tempContainer: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    tempHigh: {
        fontSize: 20,
        fontWeight: '700',
        color: '#fff'
    },
    tempSeparator: {
        fontSize: 16,
        color: '#fff',
        opacity: 0.6,
        marginHorizontal: 4
    },
    tempLow: {
        fontSize: 20,
        fontWeight: '400',
        color: '#fff',
        opacity: 0.7
    }
});

export default FiveDayForecast;
