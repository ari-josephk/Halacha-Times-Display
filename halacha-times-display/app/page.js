import styles from "./page.module.css";
import Sidebar from './sidebar';
import getYomEvents from "./yomevents";
import Background from "./background";
import images  from "./compilebackgrounds";

export default function Home() {
  return App()
}

const RELOAD_MINUTES = 10;

async function App() {
  return (
    <div className={styles.app}>
      <Background images={images} reloadMinutes={RELOAD_MINUTES} />
      <Sidebar elements={await getYomEvents()} />
    </div>
  );
}