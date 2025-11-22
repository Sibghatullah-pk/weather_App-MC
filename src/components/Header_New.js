import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useWeather } from '../context/WeatherContext';

const Header = () => {
    const { location } = useWeather();

    const currentDate = new Date().toLocaleDateString('en-US', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });

    const currentTime = new Date().toLocaleTimeString('en-US', {
        hour: 'numeric',
        minute: 'numeric',
        hour12: true
    });

    return (
        <View style={styles.container}>
            {/* Location */}
            <View style={styles.locationContainer}>
                <Text style={styles.locationIcon}>📍</Text>
                <Text style={styles.location}>
                    {location.city || 'Loading...'}, {location.country || ''}
                </Text>
            </View>

            {/* Date and Time */}
            <Text style={styles.date}>{currentDate}</Text>
            <Text style={styles.time}>{currentTime}</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        marginBottom: 30
    },
    locationContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'rgba(255,255,255,0.25)',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 25,
        marginBottom: 15,
        borderWidth: 1,
        borderColor: 'rgba(255,255,255,0.3)'
    },
    locationIcon: {
        fontSize: 20,
        marginRight: 8
    },
    location: {
        fontSize: 20,
        fontWeight: '700',
        color: '#fff'
    },
    date: {
        fontSize: 16,
        color: '#fff',
        marginBottom: 5,
        opacity: 0.95,
        fontWeight: '500'
    },
    time: {
        fontSize: 14,
        color: '#fff',
        opacity: 0.85
    }
});

export default Header;
