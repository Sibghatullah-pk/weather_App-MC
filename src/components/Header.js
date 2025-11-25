import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Keyboard } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useWeather } from '../context/WeatherContext';

const Header = () => {
    const { location, searchCity, loading } = useWeather();
    const [searchText, setSearchText] = useState('');
    const [showSearch, setShowSearch] = useState(false);

    const handleSearch = async () => {
        if (searchText.trim()) {
            Keyboard.dismiss();
            await searchCity(searchText.trim());
            setSearchText('');
            setShowSearch(false);
        }
    };

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
                <TouchableOpacity
                    style={styles.searchButton}
                    onPress={() => setShowSearch(!showSearch)}
                >
                    <Text style={styles.searchIcon}>{showSearch ? '✕' : '🔍'}</Text>
                </TouchableOpacity>
            </View>

            {/* Search Input */}
            {showSearch && (
                <View style={styles.searchContainer}>
                    <TextInput
                        style={styles.searchInput}
                        placeholder="Search city name..."
                        placeholderTextColor="rgba(255,255,255,0.6)"
                        value={searchText}
                        onChangeText={setSearchText}
                        onSubmitEditing={handleSearch}
                        returnKeyType="search"
                        autoCapitalize="words"
                        autoCorrect={false}
                    />
                    <TouchableOpacity
                        style={styles.searchSubmitButton}
                        onPress={handleSearch}
                        disabled={loading || !searchText.trim()}
                    >
                        <Text style={styles.searchSubmitText}>Search</Text>
                    </TouchableOpacity>
                </View>
            )}

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
        color: '#fff',
        flex: 1
    },
    searchButton: {
        marginLeft: 10,
        padding: 5
    },
    searchIcon: {
        fontSize: 20
    },
    searchContainer: {
        flexDirection: 'row',
        width: '100%',
        marginBottom: 15,
        backgroundColor: 'rgba(255,255,255,0.25)',
        borderRadius: 25,
        paddingHorizontal: 15,
        paddingVertical: 5,
        borderWidth: 1,
        borderColor: 'rgba(255,255,255,0.3)',
        alignItems: 'center'
    },
    searchInput: {
        flex: 1,
        color: '#fff',
        fontSize: 16,
        paddingVertical: 10,
        paddingHorizontal: 10
    },
    searchSubmitButton: {
        backgroundColor: 'rgba(255,255,255,0.3)',
        paddingHorizontal: 20,
        paddingVertical: 10,
        borderRadius: 20
    },
    searchSubmitText: {
        color: '#fff',
        fontWeight: '700',
        fontSize: 14
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
