const pool = require('../db');

exports.uploadGameSessions = async (req, res) => {
    const { date_add, room_type, game_rule, game_level, duration_s_theory, duration_s_actual, game_log, log, is_collaborative, parent_gs_id, facility_id } = req.body
    
    try {
        const [result] = await pool.query("INSERT INTO game_session (date_add, room_type, game_rule, game_level, duration_s_theory, duration_s_actual, game_log, log, is_collaborative, parent_gs_id, facility_id) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)", [date_add, room_type, game_rule, game_level, duration_s_theory, duration_s_actual, game_log, log, is_collaborative, parent_gs_id, facility_id]);

        res.json({ message: "Game session uploaded!"});
    } catch (error) {
        res.status(500).json({ error: "Server error" });
    }
};