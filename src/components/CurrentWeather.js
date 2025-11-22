import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useWeather } from '../context/WeatherContext';

const CurrentWeather = () => {
    const { data } = useWeather();
    const { current = {} } = data;

    return (
        <View style={styles.card}>
            <Text style={styles.location}>📍 {data.location}</Text>
            <Text style={styles.temp}>{current.temperature}°C</Text>

            <View style={styles.infoRow}>
                <View style={styles.infoItem}>
                    <Text style={styles.infoIcon}>💨</Text>
                    <Text style={styles.infoLabel}>Wind</Text>
                    <Text style={styles.infoValue}>{current.windSpeed} km/h</Text>
                </View>

                <View style={styles.infoItem}>
                    <Text style={styles.infoIcon}>💧</Text>
                    <Text style={styles.infoLabel}>Humidity</Text>
                    <Text style={styles.infoValue}>{current.humidity}%</Text>
                </View>

                <View style={styles.infoItem}>
                    <Text style={styles.infoIcon}>🌡️</Text>
                    <Text style={styles.infoLabel}>Air Quality</Text>
                    <Text style={styles.infoValue}>{current.airQuality}</Text>
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    card: {
        backgroundColor: 'rgba(255,255,255,0.95)',
        borderRadius: 16,
        padding: 20,
        marginBottom: 16
    },
    location: {
        fontSize: 16,
        color: '#666',
        marginBottom: 8
    },
    temp: {
        fontSize: 72,
        fontWeight: '700',
        color: '#222',
        marginBottom: 20
    },
    infoRow: {
        flexDirection: 'row',
        justifyContent: 'space-around'
    },
    infoItem: {
        alignItems: 'center'
    },
    infoIcon: {
        fontSize: 32,
        marginBottom: 8
    },
    infoLabel: {
        fontSize: 12,
        color: '#888',
        marginBottom: 4
    },
    infoValue: {
        fontSize: 16,
        fontWeight: '600',
        color: '#222'
    }
});

export default CurrentWeather;
