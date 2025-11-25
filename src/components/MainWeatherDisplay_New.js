import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useWeather } from '../context/WeatherContext';

const MainWeatherDisplay = () => {
    const { weather, loading } = useWeather();

    if (loading) {
        return (
            <View style={styles.container}>
                <LinearGradient
                    colors={['rgba(255,255,255,0.3)', 'rgba(255,255,255,0.1)']}
                    style={styles.card}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 1 }}
                >
                    <Text style={styles.loadingText}>Loading weather...</Text>
                </LinearGradient>
            </View>
        );
    }

    if (!weather) return null;

    const getWeatherIcon = (condition) => {
        const lowerCondition = condition?.toLowerCase() || '';
        if (lowerCondition.includes('rain')) return '🌧️';
        if (lowerCondition.includes('cloud')) return '☁️';
        if (lowerCondition.includes('clear')) return '☀️';
        if (lowerCondition.includes('snow')) return '❄️';
        if (lowerCondition.includes('thunder')) return '⛈️';
        if (lowerCondition.includes('fog') || lowerCondition.includes('mist')) return '🌫️';
        return '🌤️';
    };

    return (
        <View style={styles.container}>
            <LinearGradient
                colors={['rgba(255,255,255,0.3)', 'rgba(255,255,255,0.15)']}
                style={styles.card}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
            >
                {/* Weather Icon */}
                <Text style={styles.mainIcon}>
                    {getWeatherIcon(weather.weather?.[0]?.description)}
                </Text>

                {/* Temperature */}
                <View style={styles.tempContainer}>
                    <Text style={styles.temperature}>
                        {Math.round(weather.main?.temp)}°
                    </Text>
                    <Text style={styles.unit}>C</Text>
                </View>

                {/* Description */}
                <Text style={styles.description}>
                    {weather.weather?.[0]?.description}
                </Text>

                {/* Feels Like & Details */}
                <View style={styles.detailsContainer}>
                    <Text style={styles.feelsLike}>
                        Feels like {Math.round(weather.main?.feels_like)}°C
                    </Text>
                    <View style={styles.divider} />
                    <View style={styles.extraDetails}>
                        <View style={styles.detailItem}>
                            <Text style={styles.detailLabel}>💨 Wind</Text>
                            <Text style={styles.detailValue}>
                                {weather.wind?.speed} m/s
                            </Text>
                        </View>
                        <View style={styles.detailItem}>
                            <Text style={styles.detailLabel}>💧 Humidity</Text>
                            <Text style={styles.detailValue}>
                                {weather.main?.humidity}%
                            </Text>
                        </View>
                        <View style={styles.detailItem}>
                            <Text style={styles.detailLabel}>👁️ Visibility</Text>
                            <Text style={styles.detailValue}>
                                {(weather.visibility / 1000).toFixed(1)} km
                            </Text>
                        </View>
                    </View>
                </View>

                {/* Min/Max Temperature */}
                <View style={styles.minMaxContainer}>
                    <View style={styles.minMaxItem}>
                        <Text style={styles.minMaxLabel}>↑ High</Text>
                        <Text style={styles.minMaxValue}>
                            {Math.round(weather.main?.temp_max)}°
                        </Text>
                    </View>
                    <View style={styles.minMaxDivider} />
                    <View style={styles.minMaxItem}>
                        <Text style={styles.minMaxLabel}>↓ Low</Text>
                        <Text style={styles.minMaxValue}>
                            {Math.round(weather.main?.temp_min)}°
                        </Text>
                    </View>
                </View>
            </LinearGradient>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        marginBottom: 25
    },
    card: {
        borderRadius: 30,
        padding: 30,
        alignItems: 'center',
        borderWidth: 1,
        borderColor: 'rgba(255,255,255,0.4)',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 10 },
        shadowOpacity: 0.3,
        shadowRadius: 20
    },
    loadingText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: '600'
    },
    mainIcon: {
        fontSize: 100,
        marginBottom: 15
    },
    tempContainer: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        marginBottom: 8
    },
    temperature: {
        fontSize: 96,
        fontWeight: '300',
        color: '#fff',
        lineHeight: 96,
        letterSpacing: -3
    },
    unit: {
        fontSize: 36,
        fontWeight: '300',
        color: '#fff',
        marginTop: 10,
        marginLeft: 4
    },
    description: {
        fontSize: 20,
        color: '#fff',
        textTransform: 'capitalize',
        marginBottom: 20,
        fontWeight: '500'
    },
    detailsContainer: {
        width: '100%',
        backgroundColor: 'rgba(255,255,255,0.2)',
        borderRadius: 20,
        padding: 20,
        marginTop: 10
    },
    feelsLike: {
        fontSize: 16,
        color: '#fff',
        textAlign: 'center',
        marginBottom: 15,
        fontWeight: '600'
    },
    divider: {
        height: 1,
        backgroundColor: 'rgba(255,255,255,0.3)',
        marginBottom: 15
    },
    extraDetails: {
        flexDirection: 'row',
        justifyContent: 'space-around'
    },
    detailItem: {
        alignItems: 'center'
    },
    detailLabel: {
        fontSize: 14,
        color: '#fff',
        marginBottom: 5,
        opacity: 0.9
    },
    detailValue: {
        fontSize: 16,
        color: '#fff',
        fontWeight: '700'
    },
    minMaxContainer: {
        flexDirection: 'row',
        marginTop: 20,
        backgroundColor: 'rgba(255,255,255,0.2)',
        borderRadius: 20,
        padding: 15,
        width: '100%',
        justifyContent: 'space-around'
    },
    minMaxItem: {
        alignItems: 'center',
        flex: 1
    },
    minMaxDivider: {
        width: 1,
        backgroundColor: 'rgba(255,255,255,0.3)'
    },
    minMaxLabel: {
        fontSize: 14,
        color: '#fff',
        marginBottom: 5,
        opacity: 0.9
    },
    minMaxValue: {
        fontSize: 28,
        color: '#fff',
        fontWeight: '700'
    }
});

export default MainWeatherDisplay;
