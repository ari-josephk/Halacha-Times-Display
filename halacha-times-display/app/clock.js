import { useState, useEffect } from 'react';
import styles from "./page.module.css";

const fetcher = (...args) => fetch(...args).then((res) => res.json());

const Clock = () => {
	const [currentDate, setCurrentDate] = useState(new Date().toLocaleDateString());
	const [currentTime, setCurrentTime] = useState(new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));
	const [hebDate, setHebDate] = useState();

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));

			if (new Date().toLocaleDateString() != currentDate || hebDate == undefined) {
				setCurrentDate(new Date().toLocaleDateString());
				setHebDate(fetcher('./date?date=' + new Date().toLocaleDateString()));
			}
    }, 1000);

    return () => clearInterval(timer); // cleanup on unmount
  });

	return (
		<div className={styles.clock}>
			<span>{hebDate}</span><br />
			<span>{currentTime}</span>
		</div>
	);
}

export default Clock;