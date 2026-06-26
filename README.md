# NearLanka

NearLanka is an Expo React Native mobile app for discovering nearby places in Sri Lanka. The app helps users find hotels, nature spots, and historical places based on their current location, with search, category filtering, map markers, favorites, recently viewed places, and Google Maps directions.

## Features

- Onboarding screens for new users
- Location permission flow using `expo-location`
- Home screen with nearby places and category filters
- Explore screen with search, category filtering, nearest sorting, top-rated filtering, and open-now filtering
- Separate category pages for hotels, nature spots, and historical places
- Place detail pages with images, ratings, descriptions, facilities, and directions
- Favorites saved locally with AsyncStorage
- Recently viewed places saved locally with AsyncStorage
- Map screen with place markers and current-location tracking
- Google Maps directions from the user's current location to the selected place
- Dark and light theme support
- Local Sri Lankan place dataset
- Optional Express and MongoDB backend included

## Tech Stack

- Expo
- React Native
- React
- JavaScript
- `expo-location`
- `react-native-maps`
- `@react-native-async-storage/async-storage`
- `expo-image`
- `expo-font`
- `expo-status-bar`
- Node.js, Express, MongoDB, and Mongoose for the optional backend

## Getting Started

Install dependencies:

```bash
npm install
```

Start the Expo app:

```bash
npm start
```

Run on Android:

```bash
npm run android
```

Run on iOS:

```bash
npm run ios
```

Run on web:

```bash
npm run web
```

Clear the Expo cache and start again:

```bash
npm run start:clear
```

## Running the App

1. Start the Expo development server with `npm start`.
2. Open the app in Expo Go, an Android Emulator, or an iOS Simulator.
3. Allow location access when prompted.
4. Browse nearby hotels, nature places, and historical places.
5. Open the map screen and tap a place to get directions in Google Maps.

If Expo says no apps are connected, open the app first on a phone or simulator before pressing reload.

## Place Data

The app currently loads place data from the local dataset:

```text
backend/data/placesData.js
```

Each place includes information such as:

- Name
- Category
- Description
- Location
- Latitude and longitude
- Image
- Rating
- Opening hours
- Entry fee
- Best time to visit
- Source URL

Supported categories are:

- `hotel`
- `nature`
- `historical`

The UI displays these as friendly labels like Hotels, Nature, and Historical.

## Location and Distance

NearLanka uses the user's current location to calculate straight-line distance to places. Places can then be sorted by nearest distance and filtered by category.

If location permission is not granted, the app still works, but distance-based nearby behavior may be limited.

Category pages show places within 10 km when distance information is available.

## Google Maps Directions

The map screen includes an `Open in Google Maps` button. When the user taps it, the app:

1. Gets the user's current location.
2. Reads the selected place latitude and longitude.
3. Opens Google Maps with driving directions.

If current location is unavailable, the app shows an alert and gives the user an option to open device settings.

## Optional Backend

The project also includes an optional backend built with Express and MongoDB.

To run the backend:

```bash
cd backend
npm install
```

Create a `.env` file inside the `backend` folder:

```env
MONGO_URI=your_mongodb_connection_string
PORT=5000
```

Seed the database:

```bash
npm run seed
```

Start the backend:

```bash
npm run dev
```

Available backend routes include:

```text
GET /api/places
GET /api/places/hotels
GET /api/places/nature
GET /api/places/historical
GET /api/places/search?query=...
GET /api/places/nearby?lat=...&lng=...
GET /api/places/:id
```

## Main Files

- `App.js` handles the main app flow, navigation state, favorites, recently viewed places, theme state, and location state.
- `src/hooks/usePlaces.js` loads and filters place data.
- `src/utils/places.js` normalizes places, handles search, category matching, sorting, and filtering.
- `src/utils/location.js` handles location permission and current location lookup.
- `src/utils/distance.js` calculates distances between coordinates.
- `src/utils/maps.js` opens map directions.
- `src/screens/9.0 map page.jsx` contains the map screen and Google Maps directions button.

## Notes

- The app is configured as a portrait Expo app.
- Location permission text is configured in `app.json`.
- Local images are stored in the `assets` folder.
- Image names from the place dataset are mapped in `src/utils/places.js`.
- The app currently uses local data directly, while the backend is available as an optional API layer.

## License

This project includes a license file in the repository.