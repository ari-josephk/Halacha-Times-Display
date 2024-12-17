import styles from "./page.module.css";
import Sidebar from './sidebar';
import getYomEvents from "./scripts/yomevents";
import Background from "./background";
import images  from "./scripts/compilebackgrounds";

export default function Home() {
  return App()
}

const RELOAD_MINUTES = 10;

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
  return (
    <div className={styles.app}>
      <Background images={images} reloadMinutes={RELOAD_MINUTES} />
      <Sidebar dateMap={await getYomEvents()} />
    </div>
  );
}