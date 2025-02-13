const pool = require('../db');

exports.createFacilitySession = async (req, res) => {
    const { id, date_add, date_exec, duration_m, facility_id, player_id } = req.body

    try {
        const [result] = await pool.query("INSERT INTO facility_session (id, date_add, date_exec, duration_m, facility_id, player_id) VALUES (?, ?, ?, ?, ?, ?)", [id, date_add, date_exec, duration_m, facility_id, player_id]);

        res.json({ message: "Facility session created!" });
    } catch (error) {
        res.status(500).json({ error: "Server error" });
    }
};