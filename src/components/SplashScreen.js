import React from 'react';
import { View, Text, ActivityIndicator, StyleSheet } from 'react-native';
import { useWeather } from '../context/WeatherContext';

const SplashScreen = () => {
    const { themeConfig } = useWeather();

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Weather Kiosk</Text>
            <ActivityIndicator size="large" color="#4FC3F7" style={styles.loader} />
            <Text style={styles.subtitle}>Loading {themeConfig.name} Weather...</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#eef6ff',
        justifyContent: 'center',
        alignItems: 'center'
    },
    title: {
        fontSize: 48,
        fontWeight: '700',
        color: '#222',
        marginBottom: 24
    },
    loader: {
        marginVertical: 20
    },
    subtitle: {
        fontSize: 16,
        color: '#666',
        marginTop: 16
    }
});

export default SplashScreen;
