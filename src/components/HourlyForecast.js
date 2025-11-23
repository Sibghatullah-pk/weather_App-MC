import React from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useWeather } from '../context/WeatherContext';

const HourlyForecast = () => {
    const { hourlyForecast, loading } = useWeather();

    if (loading || !hourlyForecast || hourlyForecast.length === 0) {
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
            <Text style={styles.title}>24-Hour Forecast</Text>
            <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.scrollContent}
            >
                {hourlyForecast.map((hour, index) => (
                    <LinearGradient
                        key={index}
                        colors={['rgba(255,255,255,0.3)', 'rgba(255,255,255,0.15)']}
                        style={styles.hourCard}
                        start={{ x: 0, y: 0 }}
                        end={{ x: 1, y: 1 }}
                    >
                        <Text style={styles.time}>
                            {hour.time}
                        </Text>
                        <Text style={styles.icon}>
                            {getWeatherIcon(hour.condition)}
                        </Text>
                        <Text style={styles.temp}>{hour.temp}°</Text>
                        <Text style={styles.desc}>
                            {hour.condition}
                        </Text>
                    </LinearGradient>
                ))}
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        marginBottom: 25
    },
    title: {
        fontSize: 20,
        fontWeight: '700',
        color: '#fff',
        marginBottom: 15,
        paddingLeft: 5
    },
    scrollContent: {
        paddingRight: 10
    },
    hourCard: {
        width: 90,
        padding: 15,
        borderRadius: 20,
        alignItems: 'center',
        marginRight: 12,
        borderWidth: 1,
        borderColor: 'rgba(255,255,255,0.3)'
    },
    time: {
        fontSize: 12,
        color: '#fff',
        marginBottom: 8,
        fontWeight: '600'
    },
    icon: {
        fontSize: 32,
        marginBottom: 8
    },
    temp: {
        fontSize: 20,
        fontWeight: '700',
        color: '#fff',
        marginBottom: 4
    },
    desc: {
        fontSize: 11,
        color: '#fff',
        opacity: 0.85,
        textAlign: 'center'
    }
});

export default HourlyForecast;
