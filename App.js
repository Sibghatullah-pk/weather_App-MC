import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaView, StyleSheet } from 'react-native';
import { WeatherProvider } from './src/context/WeatherContext';
import WeatherDashboard from './src/pages/WeatherDashboard';

export default function App() {
    return (
        <WeatherProvider>
            <SafeAreaView style={styles.container}>
                <WeatherDashboard />
                <StatusBar style="auto" />
            </SafeAreaView>
        </WeatherProvider>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    }
});
