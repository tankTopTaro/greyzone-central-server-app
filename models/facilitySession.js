import pool from '../db.js';

const FacilitySession = {
    create: async (data) => {
        try {
            const {date_exec, duration_m, facility_id, player_id } = data;

            const date_add = new Date()
    
            const [result] = await pool.query(
                "INSERT INTO facility_session (date_add, date_exec, duration_m, facility_id, player_id) VALUES (?, ?, ?, ?, ?)", 
                [date_add, date_exec, duration_m, facility_id, player_id]
            );
    
            return result.insertId;
        } catch (error) {
            console.error("Error creating facility session:", error);
            throw new Error("Failed to create facility session");
        }
    },

    update: async (data) => {
        const { date_exec, duration_m, facility_id, player_id } = data;

        const [result] = await pool.query(
            "UPDATE facility_session SET date_exec = ?, duration_m = ? WHERE facility_id = ? AND player_id = ?",
            [date_exec, duration_m, facility_id, player_id]
        );

        if (result.affectedRows === 0) {
            throw new Error("No matching session found or no changes made.");
        }

        return true;
    }
};

export default FacilitySession;