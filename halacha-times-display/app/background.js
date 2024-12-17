"use client";

import styles from "./page.module.css";
import { useEffect, useState } from "react";

const getRandomImage = images => {
	const randomIndex = Math.floor(Math.random() * images.length);
	return images[randomIndex];
};

const Background = elements => {
	const [image, setImage] = useState(getRandomImage(elements.images));

	useEffect(() => {
		const interval = setInterval(() => {
			setImage(getRandomImage(elements.images));
		}, elements.reloadMinutes * 60 * 1000); // 5 minutes in milliseconds

		return () => clearInterval(interval);
	}, [elements.images]);

	return (
		<img src={image} className={styles.background_image} />
	);
};

export default Background;