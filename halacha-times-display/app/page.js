'use client';

import { useSearchParams } from 'next/navigation'
import styles from "./page.module.css";
import Sidebar from './sidebar';
import Background from "./background";


export default function Home() {
  return App()
}

/**
 * The main application component.
 * 
 * This component renders the main application layout, including the background
 * and sidebar components. It fetches the events asynchronously and passes
 * them to the Sidebar component.
 * 
 * @returns {JSX.Element} The rendered application component.
 */
async function App() {
  const params = useSearchParams();
  console.log(params)
  const CITY_OVERRIDE = params.get('city');
  const RELOAD_MINUTES = params.get('backgroundReloadMinutes');

  const images = await fetch('./backgrounds');
  const events = await fetch(`./events?city=${CITY_OVERRIDE}`);
  return (
    <div className={styles.app}>
      <Background images={images} reloadMinutes={RELOAD_MINUTES} />
      <Sidebar dateMap={events} />
    </div>
  );
}