# Weather Kiosk - React Native Expo App 🌤️

**Website se React Native Expo app mein convert kiya gaya hai!**

## ✨ Features

- 📍 Real-time location-based weather data
- 🌡️ Current temperature with feels-like, humidity, wind speed
- 🌅 Sunrise and sunset times
- ⏰ 12-hour forecast
- 📅 5-day weather forecast
- 🎨 Dynamic theme based on weather conditions
- 🔄 Pull to refresh functionality
- 📱 Works on Android, iOS, and Web

## 🚀 Quick Start

### Prerequisites
- Node.js installed
- Expo CLI installed globally: `npm install -g expo-cli`
- Expo Go app on your phone (for testing)

### Step 1: Install Dependencies
```bash
cd "s:\MBLE CMP\weather_Siber - Copy\KoiskWebApp\kiosk_weather_expo"
npm install
```

### Step 2: Add API Key
1. Copy `.env.example` to `.env`
2. Get free API key from: https://openweathermap.org/api
3. Add your key:
```
VITE_OPENWEATHER_API_KEY=your_actual_api_key
```

### Step 3: Start Expo
```bash
npm start
# or
expo start
```

### Step 4: Run on Device/Emulator
- **Android**: Press `a` or scan QR with Expo Go app
- **iOS**: Press `i` or scan QR with Camera app
- **Web**: Press `w`

## 📁 Project Structure

```
kiosk_weather_expo/
├── App.js                      # Main entry point
├── app.config.js               # Expo configuration
├── package.json                # Dependencies
├── .env.example                # Environment variables template
└── src/
    ├── components/
    │   ├── Header.js           # Time, date, location header
    │   ├── CurrentWeather.js   # Current weather card
    │   ├── MainWeatherDisplay.js  # Main temperature display
    │   ├── HourlyForecast.js   # Hourly forecast scroll
    │   ├── FiveDayForecast.js  # 5-day forecast list
    │   └── SplashScreen.js     # Loading screen
    ├── pages/
    │   └── WeatherDashboard.js # Main dashboard page
    ├── context/
    │   └── WeatherContext.js   # Weather data & state management
    └── helpers/
        └── weatherHelpers.js   # Utility functions
```

## 🔄 Conversion Details

### Web → React Native

| Web | React Native |
|-----|--------------|
| `<div>` | `<View>` |
| `<p>`, `<h1>`, `<span>` | `<Text>` |
| CSS files | `StyleSheet.create()` |
| `navigator.geolocation` | `expo-location` |
| `import.meta.env` | `expo-constants` |
| Scrollable div | `<ScrollView>` |
| FontAwesome icons | Emoji icons |

### Key Changes
✅ All HTML elements → React Native components  
✅ CSS → StyleSheet API  
✅ Browser geolocation → Expo Location  
✅ Vite env → Expo Constants  
✅ Responsive web design → Mobile-first design  
✅ Mouse events → Touch events  

## 🛠️ Technology Stack

- **React Native** - Mobile framework
- **Expo** - Development platform
- **expo-location** - Location services
- **expo-constants** - Environment variables
- **OpenWeatherMap API** - Weather data

## 📱 Screenshots

The app will show:
1. **Splash Screen** - Loading animation
2. **Header** - Location, time, date
3. **Main Display** - Large temperature, weather icon, sunrise/sunset
4. **Current Weather** - Wind, humidity, air quality cards
5. **Hourly Forecast** - Next 12 hours (horizontal scroll)
6. **5-Day Forecast** - Week overview

## 🐛 Troubleshooting

| Issue | Solution |
|-------|----------|
| "Missing API key" | Add key to `.env` and restart Expo |
| Location permission denied | Allow location in phone settings |
| Expo Go won't connect | Ensure phone & PC on same WiFi |
| White screen | Check terminal for errors |

## 🎨 Customization

### Change Colors
Edit `WeatherDashboard.js` → `getBackgroundColor()` function

### Add More Weather Details
Edit `MainWeatherDisplay.js` and add more items to the details grid

### Modify Forecast Count
Edit `WeatherContext.js`:
- `buildHourly()` - change `.slice(0, 8)` for more/less hours
- `buildDaily()` - change `.slice(0, 5)` for more/less days

## 📦 Build for Production

### Android APK
```bash
expo build:android
```

### iOS IPA
```bash
expo build:ios
```

### Standalone App
```bash
eas build --platform all
```

## 🔗 Links

- OpenWeather API: https://openweathermap.org/api
- Expo Docs: https://docs.expo.dev
- React Native Docs: https://reactnative.dev

---

**Converted from Web to React Native Expo** • Built with ❤️
