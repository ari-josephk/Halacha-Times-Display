"use client";

import styles from "./page.module.css";
import { useEffect, useState } from "react";

const getRandomImage = images => {
	if (!images || images.length === 0) return null;

	const randomIndex = Math.floor(Math.random() * images.length);
	return images[randomIndex];
};

/**
 * Background component that displays a random image from a list of images and reloads it at specified intervals.
 *
 * @param {Object} props - The properties object.
 * @param {string[]} props.images - An array of image URLs to display.
 * @param {number} props.reloadMinutes - The interval in minutes at which to reload the image.
 *
 * @returns {JSX.Element} The JSX element representing the background image.
 */
const Background = ({ images, reloadMinutes }) => {
	const [image, setImage] = useState(getRandomImage(images));

	useEffect(() => {
		const interval = setInterval(() => {
			setImage(getRandomImage(images));
		}, reloadMinutes * 60 * 1000); // 5 minutes in milliseconds

		return () => clearInterval(interval);
	}, [images]);

	return (
		<img src={image} className={styles.background_image} />
	);
};

export default Background;