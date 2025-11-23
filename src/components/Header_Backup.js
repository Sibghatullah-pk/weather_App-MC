import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useWeather } from '../context/WeatherContext';

const Header = () => {
    const { data, formatTime, formatDate } = useWeather();
    return (
        <View style={styles.container}>
            <Text style={styles.location}>📍 {data.location}</Text>
            <Text style={styles.time}>{formatTime()}</Text>
            <Text style={styles.date}>{formatDate()}</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 20,
        backgroundColor: 'rgba(255,255,255,0.9)',
        borderRadius: 12,
        marginBottom: 16
    },
    location: {
        fontSize: 18,
        fontWeight: '600',
        color: '#222',
        marginBottom: 8
    },
    time: {
        fontSize: 48,
        fontWeight: '700',
        color: '#222',
        marginBottom: 4
    },
    date: {
        fontSize: 16,
        color: '#666'
    }
});

export default Header;
