import pool from '../db.js';

const Team = {
    getById: async (team_id) => {
        try {
            const [rows] = await pool.query(
                "SELECT * FROM team WHERE id = ?", 
                [team_id]
            );
    
            return rows.length > 0 ? rows[0] : null;
        } catch (error) {
            console.error("Error fetching team:", error);
            throw new Error("Database query failed");
        }
    },
    
    create: async (data) => {
        try {
            let { name, nbr_of_players, unique_identifier } = data

            const date_add = new Date()

            const [existingTeam] = await Team.getById(unique_identifier)

            if (existingTeam.length > 0) {
               console.log('Team already exists:', existingTeam[0].id)
               return existingTeam[0].id
            }
            
            const [result] = await pool.query(
                "INSERT INTO team (id, name, nbr_of_players, date_add, unique_identifier) VALUES (?, ?, ?, ?, ?)", 
                [unique_identifier, name, nbr_of_players, date_add, unique_identifier]
            );

            const playerIds = unique_identifier.sort().split(',')

            const values = playerIds.map(player_id => [unique_identifier, player_id])

            if(values.length > 0) {
               await pool.query('INSERT INTO team_player (team_id, player_id) VALUES ?', [values])
            }
    
            return result.insertId
        } catch (error) {
            console.error("Error creating team:", error);
            throw new Error("Failed to create team");
        }
    }
};

export default Team
