import React from 'react';
import { View, Text, ScrollView, StyleSheet, ImageBackground, TouchableOpacity } from 'react-native';
import { useWeather } from '../context/WeatherContext';
import Header from '../components/Header';
import CurrentWeather from '../components/CurrentWeather';
import MainWeatherDisplay from '../components/MainWeatherDisplay';
import HourlyForecast from '../components/HourlyForecast';
import FiveDayForecast from '../components/FiveDayForecast';
import SplashScreen from '../components/SplashScreen';

const WeatherDashboard = () => {
    const { themeConfig, theme, showSplash, error, refresh } = useWeather();

    if (showSplash) return <SplashScreen />;

    const getBackgroundColor = (theme) => {
        switch (theme) {
            case 'rainy': return '#b3d9ff';
            case 'night': return '#4a5568';
            case 'sunny': return '#ffe066';
            case 'cloudy':
            default: return '#eef6ff';
        }
    };

    return (
        <View style={[styles.container, { backgroundColor: getBackgroundColor(theme) }]}>
            {error && (
                <View style={styles.errorBanner}>
                    <Text style={styles.errorText}>{error}</Text>
                </View>
            )}

            <ScrollView
                style={styles.scrollView}
                contentContainerStyle={styles.contentContainer}
                showsVerticalScrollIndicator={false}
            >
                <Header />
                <MainWeatherDisplay />
                <CurrentWeather />
                <HourlyForecast />
                <FiveDayForecast />

                <TouchableOpacity style={styles.refreshButton} onPress={refresh}>
                    <Text style={styles.refreshText}>🔄 Refresh Weather</Text>
                </TouchableOpacity>
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    errorBanner: {
        position: 'absolute',
        top: 40,
        left: 20,
        right: 20,
        backgroundColor: 'rgba(0,0,0,0.7)',
        padding: 12,
        borderRadius: 20,
        zIndex: 1000,
        alignItems: 'center'
    },
    errorText: {
        color: '#fff',
        fontSize: 12
    },
    scrollView: {
        flex: 1
    },
    contentContainer: {
        padding: 20,
        paddingTop: 60
    },
    refreshButton: {
        backgroundColor: '#2196F3',
        padding: 16,
        borderRadius: 12,
        alignItems: 'center',
        marginTop: 20,
        marginBottom: 40
    },
    refreshText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: '600'
    }
});

export default WeatherDashboard;
