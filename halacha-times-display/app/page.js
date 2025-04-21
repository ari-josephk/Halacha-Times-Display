'use client';

import useSWR from 'swr'
import { useSearchParams } from 'next/navigation'
import { useGeolocated } from "react-geolocated";
import { Suspense, useEffect, useState } from "react"
import styles from "./page.module.css";
import Sidebar from './sidebar';
import Background from "./background";
import Clock from './clock';

// Define default location (New York)
const DEFAULT_LOCATION = { cityName: 'New York' };
const DEFAULT_LANGUAGE = 'en';

export default function Home() {
  return (<Suspense fallback={null}><App /></Suspense>)
}

const fetcher = (...args) => fetch(...args).then((res) => res.json());

const EVENT_RELOAD_MINUTES = 360; // 6 hours

/**
 * The main application component.
 * 
 * This component renders the main application layout, including the background
 * and sidebar components. It fetches the events asynchronously and passes
 * them to the Sidebar component.
 * 
 * @returns {JSX.Element} The rendered application component.
 */
function App() {
  const params = useSearchParams();
  const CITY_OVERRIDE = params.get('city');
  const RELOAD_MINUTES = Number(params.get('backgroundReloadMinutes')) || 10;

  const { coords, isGeolocationAvailable, isGeolocationEnabled } = useGeolocated({
    // Request high accuracy
    positionOptions: {
        enableHighAccuracy: true,
    },
    // Get location update immediately
    userDecisionTimeout: 5000,
    // Re-check periodically (optional)
    // watchPosition: true,
  });

  const [location, setLocation] = useState(null); // Can be { latitude, longitude } or { cityName }
  const [language, setLanguage] = useState(DEFAULT_LANGUAGE);
  const [events, setEvents] = useState({});
  const [error, setError] = useState(null);
  const [isLoadingLocation, setIsLoadingLocation] = useState(true);
  const [isLoadingEvents, setIsLoadingEvents] = useState(true);

  // Determine location once on client
  useEffect(() => {
    if (CITY_OVERRIDE) {
      setLocation({ cityName: CITY_OVERRIDE });
      setIsLoadingLocation(false);
    } else if (isGeolocationEnabled && coords) {
      setLocation({ latitude: coords.latitude, longitude: coords.longitude });
      setIsLoadingLocation(false);
    } else if (!isGeolocationAvailable || !isGeolocationEnabled) {
      // Geolocation failed or unavailable, use default
      setLocation(DEFAULT_LOCATION);
      setIsLoadingLocation(false);
    }
    // Still waiting for geolocation decision? Keep loading true.
  }, [coords, isGeolocationAvailable, isGeolocationEnabled, CITY_OVERRIDE]);

  // Fetch events when location or language changes
  useEffect(() => {
    if (!location) return; // Don't fetch without a location

    setIsLoadingEvents(true);
    let queryParams = new URLSearchParams();
    if (location.latitude && location.longitude) {
      queryParams.append('lat', location.latitude);
      queryParams.append('lon', location.longitude);
    } else if (location.cityName) {
      queryParams.append('city', location.cityName);
    }
    queryParams.append('lang', language); // Add language parameter

    const eventUrl = `./events?${queryParams.toString()}`;

    const getEvents = () => {
      fetcher(eventUrl)
        .then((data) => {
          setEvents(data);
          setError(null);
        })
        .catch(setError)
        .finally(() => setIsLoadingEvents(false));
    };

    getEvents(); // Initial load for this location/language
    const interval = setInterval(getEvents, EVENT_RELOAD_MINUTES * 60 * 1000);

    return () => clearInterval(interval); // Cleanup interval

  }, [location, language]); // Re-run effect if location or language changes

  const { data: images } = useSWR('./backgrounds', fetcher);

  // --- Render Logic ---

  // Handle initial loading states carefully to minimize hydration issues
  if (isLoadingLocation || (!images && !error)) {
    // Show loading indicator while determining location or loading initial assets
    // This state should ideally be consistent between server and client initial render
    return <div className={styles.app}>Loading...</div>;
  }

  // Handle specific errors after initial loading
  if (!location && !CITY_OVERRIDE) {
      // This case might occur if geolocation fails unexpectedly after initial checks
      return (<div className={styles.app}>Could not determine location. Please specify a city using ?city=YourCity or enable geolocation.</div>);
  }

  if (error) {
    return (<div className={styles.app}>Failed to load calendar data. Error: {error.message}</div>);
  }

  // Show loading for events specifically
  const showEventLoading = isLoadingEvents && Object.keys(events).length === 0;

  return (
    <div className={styles.app}>
      <Background images={images} reloadMinutes={RELOAD_MINUTES} />
      <Clock />
      {/* Language Toggle Buttons */}
      <div className={styles.languageToggle}>
        <button onClick={() => setLanguage('en')} disabled={language === 'en'}>English</button>
        <button onClick={() => setLanguage('he')} disabled={language === 'he'}>עברית</button>
        <button onClick={() => setLanguage('both')} disabled={language === 'both'}>Both</button>
      </div>
      {/* Display loading or the sidebar */}  
      {showEventLoading ? (
        <div className={`${styles.sidebar} ${styles.main}`}>Loading events...</div>
      ) : (
        <Sidebar dateMap={new Map(Object.entries(events))} />
      )}
    </div>
  );
}