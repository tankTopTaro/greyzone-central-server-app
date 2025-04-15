import pool from '../db.js';
import getNextUniqueId from '../utils/getNextUniqueId.js'
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const DEFAULT_IMAGES_DIR = path.join(__dirname, '../assets/defaults')
const UPLOADS_DIR = path.join(__dirname, '../uploads/players')

const Player = {
    getById: async (player_id) => {
        try {
            const [rows] = await pool.query(
                "SELECT * FROM player WHERE id = ?", 
                [player_id]
            );
    
            return rows.length > 0 ? rows[0] : null;
        } catch (error) {
            console.error("Error fetching player:", error);
            throw new Error("Database query failed");
        }
    },
    
    search: async ({ email, phone, first_name, last_name }) => {
        try {
            if (!email && !phone && !first_name && !last_name) {
                throw new Error('At least one search parameter is required.');
            }
    
            let query = "SELECT * FROM player WHERE ";
            let conditions = [];
            let values = [];
    
            if (email) {
                conditions.push("LOWER(email) LIKE LOWER(?)");
                values.push(`%${email}%`)
            }
            if (phone) {
                conditions.push("LOWER(phone) LIKE LOWER(?)");
                values.push(`%${phone}%`)
            }
            if (first_name) {
                conditions.push("LOWER(first_name) LIKE LOWER(?)");
                values.push(`%${first_name}%`)
            }
            if (last_name) {
                conditions.push("LOWER(last_name) LIKE LOWER(?)");
                values.push(`%${last_name}%`)
            }
    
            query += conditions.join(" OR ") + " LIMIT 10";
    
            const [players] = await pool.query(query, values);
            return players;
        } catch (error) {
            console.error("Error searching player:", error);
            throw new Error("Failed to search player");
        }
    },
    
    create: async (data) => {
        try {
            let { id, nick_name, email, phone, last_name, first_name, gender, birth_date, notes, log, league_country, league_city, league_district, league_other, rfid_tag_uid } = data;
    
            const date_add = new Date()
            const facilityMatch = id.match(/^F(\d+)-\d+$/)

            if (!facilityMatch) {
               console.error('player Invalid ID format')
            }

            const facility_id = facilityMatch[1]

            id = await getNextUniqueId(pool, "player", facility_id)
            rfid_tag_uid = ''

            const [result] = await pool.query(
                "INSERT INTO player (id, nick_name, date_add, email, phone, last_name, first_name, gender, birth_date, notes, log, league_country, league_city, league_district, league_other, rfid_tag_uid) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)", 
                [id, nick_name, date_add, email, phone, last_name, first_name, gender, birth_date, notes, log, league_country, league_city, league_district, league_other, rfid_tag_uid]
            );

            // Copy and rename profile image
            const defaultImages = fs.readdirSync(DEFAULT_IMAGES_DIR)

            if (defaultImages.length > 0) {
               const randomImage = defaultImages[Math.floor(Math.random() * defaultImages.length)]
               const sourcePath = path.join(DEFAULT_IMAGES_DIR, randomImage)
               const destPath = path.join(UPLOADS_DIR, `${id}${path.extname(randomImage)}`)

               fs.copyFileSync(sourcePath, destPath)
               //console.log(`Profile image for player ${id} copied to: ${destPath}`)
            } else {
               console.warn('No default images found in assets/defaults')
            }
    
            return id;
        } catch (error) {
            console.error("Error creating player:", error);
            throw new Error("Failed to create player");
        }
    }
}

export default Player;