import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const Image = {
    getImage: (player_id) => {  // fetch the image from a local directory
        const imagePath = path.join(__dirname, "../uploads/players", `${player_id}.jpg`);

        return imagePath;
    }
}

export default Image;