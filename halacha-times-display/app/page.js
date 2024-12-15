import Image from "next/image";
import styles from "./page.module.css";
import Sidebar from './sidebar';
import getYomEvents from "./yomevents";

const backgroundImage = "/path/to/your/image.jpg";

export default function Home() {
  return App()
}

async function App() {
  return (
    <div className={styles.app}>
      <div className={styles.background_image}></div>
      <Sidebar elements={await getYomEvents()} />
    </div>
  );
}