import fs from 'fs';
import path from 'path';

const imagesDirectory = path.join(process.cwd(), 'public/images');

const images = fs.readdirSync(imagesDirectory).map(file => `/images/${file}`);

export default images;