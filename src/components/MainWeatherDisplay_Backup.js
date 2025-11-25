import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useWeather } from '../context/WeatherContext';

const MainWeatherDisplay = () => {
    const { data, themeConfig } = useWeather();
    const { current = {}, astronomy = {} } = data;

    return (
        <View style={styles.card}>
            <Text style={styles.temp}>{current.temperature}°C</Text>
            <Text style={styles.feelsLike}>Feels like: {current.feelsLike}°C</Text>
            <Text style={styles.condition}>{themeConfig.name}</Text>

            <View style={styles.sunTimes}>
                <View style={styles.sunTime}>
                    <Text style={styles.sunIcon}>🌅</Text>
                    <Text style={styles.sunLabel}>Sunrise</Text>
                    <Text style={styles.sunValue}>{astronomy.sunrise || '--'}</Text>
                </View>
                <View style={styles.sunTime}>
                    <Text style={styles.sunIcon}>🌇</Text>
                    <Text style={styles.sunLabel}>Sunset</Text>
                    <Text style={styles.sunValue}>{astronomy.sunset || '--'}</Text>
                </View>
            </View>

            <View style={styles.details}>
                <View style={styles.detailItem}>
                    <Text style={styles.detailIcon}>💧</Text>
                    <Text style={styles.detailValue}>{current.humidity}%</Text>
                    <Text style={styles.detailLabel}>Humidity</Text>
                </View>
                <View style={styles.detailItem}>
                    <Text style={styles.detailIcon}>💨</Text>
                    <Text style={styles.detailValue}>{Math.round(current.windSpeed)} km/h</Text>
                    <Text style={styles.detailLabel}>Wind</Text>
                </View>
                <View style={styles.detailItem}>
                    <Text style={styles.detailIcon}>🌡️</Text>
                    <Text style={styles.detailValue}>{current.pressure} hPa</Text>
                    <Text style={styles.detailLabel}>Pressure</Text>
                </View>
                <View style={styles.detailItem}>
                    <Text style={styles.detailIcon}>☀️</Text>
                    <Text style={styles.detailValue}>{current.uv}</Text>
                    <Text style={styles.detailLabel}>UV</Text>
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    card: {
        backgroundColor: 'rgba(255,255,255,0.95)',
        borderRadius: 16,
        padding: 24,
        marginBottom: 16,
        alignItems: 'center'
    },
    temp: {
        fontSize: 80,
        fontWeight: '700',
        color: '#222',
        marginBottom: 8
    },
    feelsLike: {
        fontSize: 16,
        color: '#666',
        marginBottom: 16
    },
    condition: {
        fontSize: 24,
        fontWeight: '600',
        color: '#444',
        marginBottom: 24
    },
    sunTimes: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        width: '100%',
        marginBottom: 24,
        paddingVertical: 16,
        borderTopWidth: 1,
        borderBottomWidth: 1,
        borderColor: '#e0e0e0'
    },
    sunTime: {
        alignItems: 'center'
    },
    sunIcon: {
        fontSize: 32,
        marginBottom: 8
    },
    sunLabel: {
        fontSize: 12,
        color: '#888',
        marginBottom: 4
    },
    sunValue: {
        fontSize: 16,
        fontWeight: '600',
        color: '#222'
    },
    details: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        width: '100%'
    },
    detailItem: {
        alignItems: 'center'
    },
    detailIcon: {
        fontSize: 24,
        marginBottom: 8
    },
    detailValue: {
        fontSize: 18,
        fontWeight: '600',
        color: '#222',
        marginBottom: 4
    },
    detailLabel: {
        fontSize: 11,
        color: '#888'
    }
});

export default MainWeatherDisplay;
