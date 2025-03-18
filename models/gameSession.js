import pool from '../db.js';

const GameSession = {
    upload: async (data) => {
        try {
            const { date_add, room_type, game_rule, game_level, duration_s_theory, duration_s_actual, game_log, log, is_collaborative, parent_gs_id, facility_id } = data;
    
            const [result] = await pool.query(
                "INSERT INTO game_session (date_add, room_type, game_rule, game_level, duration_s_theory, duration_s_actual, game_log, log, is_collaborative, parent_gs_id, facility_id) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)", 
                [date_add, room_type, game_rule, game_level, duration_s_theory, duration_s_actual, game_log, log, is_collaborative, parent_gs_id, facility_id]);
    
            return result.insertId;
        } catch (error) {
            console.error("Error uploading game session:", error);
            throw new Error("Failed to upload game session");
        }
    }
};

export default GameSession;