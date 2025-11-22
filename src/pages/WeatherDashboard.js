import React from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity, Dimensions, StatusBar } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useWeather } from '../context/WeatherContext';
import Header from '../components/Header';
import MainWeatherDisplay from '../components/MainWeatherDisplay';
import HourlyForecast from '../components/HourlyForecast';
import FiveDayForecast from '../components/FiveDayForecast';
import SplashScreen from '../components/SplashScreen';

const { width } = Dimensions.get('window');

const WeatherDashboard = () => {
    const { themeConfig, theme, showSplash, error, refresh } = useWeather();

    if (showSplash) return <SplashScreen />;

    const getGradientColors = (theme) => {
        switch (theme) {
            case 'rainy':
                return ['#4A90E2', '#5BA3E8', '#7FB8ED'];
            case 'night':
                return ['#0F2027', '#203A43', '#2C5364'];
            case 'sunny':
                return ['#56CCF2', '#87CEEB', '#B0E2FF'];
            case 'cloudy':
            default:
                return ['#667eea', '#764ba2', '#8E54E9'];
        }
    };

    return (
        <LinearGradient
            colors={getGradientColors(theme)}
            style={styles.container}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
        >
            <StatusBar barStyle="light-content" />

            {/* Decorative Weather Icons */}
            <View style={styles.decorativeIcons}>
                {theme === 'sunny' && (
                    <Text style={[styles.decorIcon, styles.sunIcon]}>☀️</Text>
                )}
                {theme === 'rainy' && (
                    <Text style={[styles.decorIcon, styles.rainIcon]}>🌧️</Text>
                )}
                {theme === 'night' && (
                    <Text style={[styles.decorIcon, styles.moonIcon]}>🌙</Text>
                )}
                {theme === 'cloudy' && (
                    <Text style={[styles.decorIcon, styles.cloudIcon]}>☁️</Text>
                )}
            </View>

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
                <HourlyForecast />
                <FiveDayForecast />

                {/* WiFi QR Code Area */}
                <View style={styles.qrSection}>
                    <Text style={styles.qrTitle}>Scan For Free WiFi</Text>
                    <View style={styles.qrPlaceholder}>
                        <Text style={styles.qrIcon}>📱</Text>
                        <Text style={styles.qrText}>QR Code</Text>
                    </View>
                </View>

                <TouchableOpacity style={styles.refreshButton} onPress={refresh}>
                    <Text style={styles.refreshText}>🔄 Refresh Weather</Text>
                </TouchableOpacity>
            </ScrollView>
        </LinearGradient>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    decorativeIcons: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: 0
    },
    decorIcon: {
        position: 'absolute',
        fontSize: 120,
        opacity: 0.15
    },
    sunIcon: {
        top: 40,
        right: 30
    },
    rainIcon: {
        top: 80,
        left: 40
    },
    moonIcon: {
        bottom: 100,
        left: 50
    },
    cloudIcon: {
        top: 60,
        right: 40
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
        flex: 1,
        zIndex: 1
    },
    contentContainer: {
        padding: 20,
        paddingTop: 60
    },
    qrSection: {
        backgroundColor: 'rgba(255,255,255,0.2)',
        borderRadius: 20,
        padding: 20,
        marginTop: 20,
        alignItems: 'center',
        borderWidth: 1,
        borderColor: 'rgba(255,255,255,0.3)'
    },
    qrTitle: {
        color: '#fff',
        fontSize: 16,
        fontWeight: '600',
        marginBottom: 15
    },
    qrPlaceholder: {
        width: 120,
        height: 120,
        backgroundColor: 'rgba(255,255,255,0.9)',
        borderRadius: 15,
        justifyContent: 'center',
        alignItems: 'center'
    },
    qrIcon: {
        fontSize: 48,
        marginBottom: 8
    },
    qrText: {
        fontSize: 12,
        color: '#666'
    },
    refreshButton: {
        backgroundColor: 'rgba(255,255,255,0.3)',
        padding: 16,
        borderRadius: 25,
        alignItems: 'center',
        marginTop: 20,
        marginBottom: 40,
        borderWidth: 1,
        borderColor: 'rgba(255,255,255,0.4)'
    },
    refreshText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: '700'
    }
});

export default WeatherDashboard;
