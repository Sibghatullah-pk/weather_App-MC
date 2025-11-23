import React from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import { useWeather } from '../context/WeatherContext';

const HourlyForecast = () => {
    const { data } = useWeather();
    const hourlyData = data?.forecast?.hourly || [];

    const getConditionIcon = (condition) => {
        switch (condition) {
            case 'rainy': return '🌧️';
            case 'sunny': return '☀️';
            case 'cloudy': return '☁️';
            case 'night': return '🌙';
            default: return '☁️';
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>12-Hour Forecast</Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.scroll}>
                {hourlyData.map((hour, index) => (
                    <View key={index} style={styles.hourItem}>
                        <Text style={styles.hourTemp}>{hour.temp}°</Text>
                        <Text style={styles.hourIcon}>{getConditionIcon(hour.condition)}</Text>
                        <Text style={styles.hourTime}>{hour.time}</Text>
                    </View>
                ))}
            </ScrollView>
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
    scroll: {
        flexDirection: 'row'
    },
    hourItem: {
        alignItems: 'center',
        marginRight: 20,
        padding: 12,
        backgroundColor: '#f5f5f5',
        borderRadius: 12,
        minWidth: 80
    },
    hourTemp: {
        fontSize: 20,
        fontWeight: '700',
        color: '#222',
        marginBottom: 8
    },
    hourIcon: {
        fontSize: 32,
        marginBottom: 8
    },
    hourTime: {
        fontSize: 12,
        color: '#666'
    }
});

export default HourlyForecast;
