import path from 'path';
import { fileURLToPath } from 'url';
import pool from '../db.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const Image = {
    getImage: (player_id) => {  // fetch the image from a local directory
        const imagePath = path.join(__dirname, "../uploads/players", `${player_id}.jpg`);

        return imagePath;
    },

    getImageFromDB: async (player_id) => {  // fetch the image from the database
        try {
            const [rows] = await pool.query("SELECT * FROM player_images WHERE player_id = ?", [player_id]);
    
            return rows.length > 0 ? rows[0] : null;
        } catch (error) {
            console.error("Error fetching player image:", error);
            throw new Error("Failed to fetch player image");
        }
    }
}

export default Image;