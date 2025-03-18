import pool from '../db.js';

const Download = async function (facility_id) {
    try {
        // Fetch only player IDs based on the facility_id
        const [players] = await pool.query(
            `SELECT DISTINCT p.id FROM player p WHERE p.id LIKE CONCAT('F', ?, '-%')`,
            [facility_id]
        );

        // Extract and return just the player IDs
        const playerIds = players.map(player => player.id);

        return { players: playerIds };
    } catch (error) {
        console.error("MySQL Query Error:", error);
        throw error;
    }
};

export default Download;



