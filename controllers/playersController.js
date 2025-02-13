const pool = require('../db');

exports.getPlayer = async (req, res) => {
    const { player_id } = req.params;

    try {
        const [rows] = await pool.query("SELECT * FROM player WHERE id = ?", [player_id]);

        if (rows.length === 0) return res.status(404).json({ error: "Player not found" });

        res.json(rows[0])
    } catch (error) {
        res.status(500).json({ error: "Database error "});
    }
};

exports.searchPlayers = async (req, res) => {
    try {
        const { email, phone, first_name, last_name } = req.query;

        if (!email && !phone && !first_name && !last_name) {
            return res.status(400).json({ message: "At least one search parameter is required." });
        }

        let query = "SELECT * FROM player WHERE ";
        let conditions = [];
        let values = [];

        if (email) {
            conditions.push("LOWER(email) LIKE LOWER(?)");
            values.push(`%${email}%`);
        }

        if (phone) {
            conditions.push("phone LIKE ?");
            values.push(`%${phone}%`);
        }

        if (first_name) {
            conditions.push("LOWER(first_name) LIKE LOWER(?)");
            values.push(`%${first_name}%`);
        }

        if (last_name) {
            conditions.push("LOWER(last_name) LIKE LOWER(?)");
            values.push(`%${last_name}%`);
        }

        query += conditions.join(" OR ") + " LIMIT 10";

        const [players] = await pool.query(query, values);

        if (players.length === 0) {
            return res.status(404).json({ error: "Search Player not found" });
        }

        res.json(players);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error." });
    }
};

exports.createPlayer = async (req, res) => {
    const { id, nick_name, date_add, email, phone, last_name, first_name, gender, birth_date, notes, log, league_country, league_city, league_district, league_other, rfid_tag_uid } = req.body
    
    try {
        const [result] = await pool.query("INSERT INTO facility_session (id, nick_name, date_add, email, phone, last_name, first_name, gender, birth_date, notes, log, league_country, league_city, league_district, league_other, rfid_tag_uid) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)", [id, nick_name, date_add, email, phone, last_name, first_name, gender, birth_date, notes, log, league_country, league_city, league_district, league_other, rfid_tag_uid ]);

        res.json({ message: "Player created!" });
    } catch (error) {
        res.status(500).json({ error: "Server error" });
    }
}
