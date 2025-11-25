import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useWeather } from '../context/WeatherContext';

const FiveDayForecast = () => {
    const { data } = useWeather();
    const forecastData = data?.forecast?.daily || [];

    const getConditionIcon = (condition) => {
        switch (condition) {
            case 'rainy': return '🌧️';
            case 'sunny': return '☀️';
            case 'cloudy': return '☁️';
            default: return '☁️';
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>5 Days Forecast:</Text>
            {forecastData.map((day, index) => (
                <View key={index} style={styles.dayRow}>
                    <Text style={styles.dayIcon}>{getConditionIcon(day.condition)}</Text>
                    <Text style={styles.dayName}>{day.day}</Text>
                    <Text style={styles.dayTemp}>{day.temp}°C</Text>
                </View>
            ))}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'rgba(255,255,255,0.95)',
        borderRadius: 16,
        padding: 20,
        marginBottom: 16
    },
    title: {
        fontSize: 18,
        fontWeight: '600',
        color: '#222',
        marginBottom: 16
    },
    dayRow: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 12,
        borderBottomWidth: 1,
        borderBottomColor: '#f0f0f0'
    },
    dayIcon: {
        fontSize: 28,
        marginRight: 16,
        width: 40
    },
    dayName: {
        flex: 1,
        fontSize: 15,
        color: '#444',
        fontWeight: '500'
    },
    dayTemp: {
        fontSize: 18,
        fontWeight: '700',
        color: '#222'
    }
});

export default FiveDayForecast;
