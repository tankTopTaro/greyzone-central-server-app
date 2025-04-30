import pool from '../db.js';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

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
    
            let conditions = [];
            let values = [];
    
            if (email) {
                conditions.push("LOWER(p.email) LIKE LOWER(?)");
                values.push(`%${email}%`)
            }
            if (phone) {
                conditions.push("LOWER(p.phone) LIKE LOWER(?)");
                values.push(`%${phone}%`)
            }
            if (first_name) {
                conditions.push("LOWER(p.first_name) LIKE LOWER(?)");
                values.push(`%${first_name}%`)
            }
            if (last_name) {
                conditions.push("LOWER(p.last_name) LIKE LOWER(?)");
                values.push(`%${last_name}%`)
            }
    
            const whereClause = conditions.length > 0 ? `WHERE ${conditions.join(" OR ")}` : '';

            const query = `
               SELECT
                  p.*,
                  MAX(fs.date_exec) AS last_visit
               FROM player p
               LEFT JOIN facility_session fs ON fs.player_id = p.id
               ${whereClause}
               GROUP BY p.id
               ORDER BY IFNULL(MAX(fs.date_exec), p.date_add) DESC
               LIMIT 10
            `
    
            const [players] = await pool.query(query, values);
            return players;
        } catch (error) {
            console.error("Error searching player:", error);
            throw new Error("Failed to search player");
        }
    },
    
    create: async (playerData, avatar) => {
        try {
            const { id, nick_name, email, phone, last_name, first_name, gender, birth_date, notes, log, league_country, league_city, league_district, league_other, rfid_tag_uid } = playerData;

            await pool.query(
                "INSERT INTO player (id, nick_name, date_add, email, phone, last_name, first_name, gender, birth_date, notes, log, league_country, league_city, league_district, league_other, rfid_tag_uid) VALUES (?, ?, NOW(), ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)", 
                [id, nick_name, email, phone, last_name, first_name, gender, birth_date, notes, log, league_country, league_city, league_district, league_other, rfid_tag_uid]
            );

            if (avatar) {
                if (!fs.existsSync(UPLOADS_DIR)) fs.mkdirSync(UPLOADS_DIR, { recursive: true })

                const ext = path.extname(avatar.originalname) || '.jpg'
                const destinationPath = path.join(UPLOADS_DIR, `${id}${ext}`)

                fs.renameSync(avatar.path, destinationPath)
            }
    
            return id;
        } catch (error) {
            console.error("Error creating player:", error);
            throw new Error("Failed to create player");
        }
    },

    getLatestId: async (facilityId) => {
        const prefix = `F${facilityId}-`

        const result = await pool.query(`
            SELECT id FROM player 
            WHERE id LIKE ?
            ORDER BY CAST(SUBSTRING_INDEX(id, '-', -1) AS UNSIGNED) DESC
            LIMIT 1
        `, [`${prefix}%`])

        const rows = result[0] ?? []

        return rows.length > 0 ? rows[0].id : null
    }
}

export default Player;