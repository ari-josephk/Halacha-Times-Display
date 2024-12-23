'use client';

import useSWR from 'swr'
import { useSearchParams } from 'next/navigation'
import { useGeolocated } from "react-geolocated";
import styles from "./page.module.css";
import Sidebar from './sidebar';
import Background from "./background";


export default function Home() {
  return App()
}

const fetcher = (...args) => fetch(...args).then((res) => res.json())

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
  const RELOAD_MINUTES = params.get('backgroundReloadMinutes') || 10;

  const { coords } = useGeolocated();

  let eventUrl;
  if (coords) eventUrl = `./events?lat=${coords.latitude}&lon=${coords.longitude}&city=${CITY_OVERRIDE}`;
  else eventUrl = `./events?city=${CITY_OVERRIDE}`;

  const { data: events, error } = useSWR(eventUrl, fetcher);

  const { data: images } = useSWR('./backgrounds', fetcher);

  if (error) return (<div className={styles.app}>Failed to load location</div>);

  if (!events || !images) return (<div className={styles.app}>Loading...</div>);
  
  return (
    <div className={styles.app}>
      <Background images={images} reloadMinutes={RELOAD_MINUTES} />
      <Sidebar dateMap={new Map(Object.entries(events))} />
    </div>
  );
}