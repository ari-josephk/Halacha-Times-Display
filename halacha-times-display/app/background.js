import styles from "./page.module.css";
import fs from 'fs';
import path from 'path';

const imagesDirectory = path.join(process.cwd(), 'public/images');

const images = fs.readdirSync(imagesDirectory).map(file => `/images/${file}`);

const getRandomImage = () => {
	const randomIndex = Math.floor(Math.random() * images.length);
	return images[randomIndex];
};

const Background = () => {
	return (
		<img src={getRandomImage()} className={styles.background_image} />
	);
};

export default Background;