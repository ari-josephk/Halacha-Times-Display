import Image from "next/image";
import styles from "./page.module.css";
import Sidebar from './sidebar';
import getYomEvents from "./yomevents";
import Background from "./background";

export default function Home() {
  return App()
}

async function App() {
  return (
    <div className={styles.app}>
      <Background />
      <Sidebar elements={await getYomEvents()} />
    </div>
  );
}