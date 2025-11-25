import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

const ErrorScreen = ({ error, onRetry }) => {
    const getErrorIcon = (errorMsg) => {
        if (errorMsg?.toLowerCase().includes('city not found') || errorMsg?.toLowerCase().includes('spelling')) {
            return '🏙️';
        }
        if (errorMsg?.toLowerCase().includes('internet') || errorMsg?.toLowerCase().includes('network')) {
            return '📡';
        }
        if (errorMsg?.toLowerCase().includes('api key')) {
            return '🔑';
        }
        return '⚠️';
    };

    const getErrorTitle = (errorMsg) => {
        if (errorMsg?.toLowerCase().includes('city not found') || errorMsg?.toLowerCase().includes('spelling')) {
            return 'City Not Found';
        }
        if (errorMsg?.toLowerCase().includes('internet') || errorMsg?.toLowerCase().includes('network')) {
            return 'No Internet Connection';
        }
        if (errorMsg?.toLowerCase().includes('api key')) {
            return 'API Key Missing';
        }
        return 'Error Occurred';
    };

    return (
        <LinearGradient
            colors={['#667eea', '#764ba2', '#8E54E9']}
            style={styles.container}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
        >
            <View style={styles.content}>
                <Text style={styles.icon}>{getErrorIcon(error)}</Text>
                <Text style={styles.title}>{getErrorTitle(error)}</Text>
                <Text style={styles.message}>{error}</Text>

                <View style={styles.suggestionsContainer}>
                    <Text style={styles.suggestionsTitle}>Suggestions:</Text>
                    {error?.toLowerCase().includes('city') && (
                        <>
                            <Text style={styles.suggestion}>• Check city name spelling</Text>
                            <Text style={styles.suggestion}>• Try searching with country (e.g., "London, UK")</Text>
                            <Text style={styles.suggestion}>• Use English city names</Text>
                        </>
                    )}
                    {error?.toLowerCase().includes('internet') && (
                        <>
                            <Text style={styles.suggestion}>• Check your internet connection</Text>
                            <Text style={styles.suggestion}>• Try switching between WiFi and mobile data</Text>
                            <Text style={styles.suggestion}>• Disable VPN if active</Text>
                        </>
                    )}
                    {error?.toLowerCase().includes('api key') && (
                        <>
                            <Text style={styles.suggestion}>• Add API key to .env file</Text>
                            <Text style={styles.suggestion}>• Get free key from openweathermap.org</Text>
                            <Text style={styles.suggestion}>• Restart the app after adding key</Text>
                        </>
                    )}
                    {!error?.toLowerCase().includes('city') &&
                        !error?.toLowerCase().includes('internet') &&
                        !error?.toLowerCase().includes('api key') && (
                            <Text style={styles.suggestion}>• Try again in a moment</Text>
                        )}
                </View>

                {onRetry && (
                    <TouchableOpacity style={styles.retryButton} onPress={onRetry}>
                        <Text style={styles.retryText}>🔄 Try Again</Text>
                    </TouchableOpacity>
                )}
            </View>
        </LinearGradient>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20
    },
    content: {
        backgroundColor: 'rgba(255,255,255,0.15)',
        borderRadius: 30,
        padding: 40,
        alignItems: 'center',
        borderWidth: 1,
        borderColor: 'rgba(255,255,255,0.3)',
        width: '100%',
        maxWidth: 400
    },
    icon: {
        fontSize: 80,
        marginBottom: 20
    },
    title: {
        fontSize: 28,
        fontWeight: '700',
        color: '#fff',
        marginBottom: 15,
        textAlign: 'center'
    },
    message: {
        fontSize: 16,
        color: '#fff',
        opacity: 0.9,
        textAlign: 'center',
        marginBottom: 30,
        lineHeight: 24
    },
    suggestionsContainer: {
        backgroundColor: 'rgba(0,0,0,0.2)',
        borderRadius: 20,
        padding: 20,
        width: '100%',
        marginBottom: 25
    },
    suggestionsTitle: {
        fontSize: 16,
        fontWeight: '700',
        color: '#fff',
        marginBottom: 10
    },
    suggestion: {
        fontSize: 14,
        color: '#fff',
        opacity: 0.9,
        marginBottom: 8,
        lineHeight: 20
    },
    retryButton: {
        backgroundColor: 'rgba(255,255,255,0.3)',
        paddingVertical: 15,
        paddingHorizontal: 40,
        borderRadius: 25,
        borderWidth: 1,
        borderColor: 'rgba(255,255,255,0.4)',
        minWidth: 200,
        alignItems: 'center'
    },
    retryText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: '700'
    }
});

export default ErrorScreen;
