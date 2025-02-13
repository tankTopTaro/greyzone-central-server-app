const pool = require('../db')

exports.getTeam = async (req, res) => {
    const { team_id } = req.params;

    try {
        const [rows] = await pool.query("SELECT * FROM team WHERE id = ?", [team_id])

        if (rows.length === 0) return res.status(404).json({ error: "Team not found" });

        res.json(rows[0]);
    } catch (error) {
        res.status(500).json({ error: "Database error" });
    }
};

exports.createTeam = async (req, res) => {
    const { id, name, nbr_of_players, date_add, unique_identifier } = req.body

    try {
        const [result] = await pool.query("INSERT INTO facility_session (id, name, nbr_of_players, date_add, unique_identifier) VALUES (?, ?, ?, ?, ?)", [id, name, nbr_of_players, date_add, unique_identifier]);

        res.json({ message: "Team created!" });
    } catch (error) {
        res.status(500).json({ error: "Server error" });
    }
};
