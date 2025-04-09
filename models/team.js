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
            let { id, name, nbr_of_players, unique_identifier } = data

            const date_add = new Date()

            console.log(id, name, nbr_of_players, unique_identifier)

            const existingTeam = await Team.getById(id);

            if (existingTeam) {  // Ensure existingTeam is not empty
               console.log('Team already exists:', existingTeam.id);
               return existingTeam
            }
            
            await pool.query(
               "INSERT INTO team (id, name, nbr_of_players, date_add, unique_identifier) VALUES (?, ?, ?, ?, ?)", 
               [id, name, nbr_of_players, date_add, unique_identifier]
            );

            const playerIds = unique_identifier.split(',').sort()
            const values = playerIds.map(player_id => [unique_identifier, player_id])

            if (values.length > 0) {
                const placeholders = values.map(() => '(?, ?)').join(', ');
                const flatValues = values.flat(); // Flattens the array for query
                await pool.query(`INSERT INTO team_player (team_id, player_id) VALUES ${placeholders}`, flatValues);
             }     
             
            const newTeam = await Team.getById(id)
    
            return newTeam
        } catch (error) {
            console.error("Error creating team:", error);
            throw new Error("Failed to create team");
        }
    }
};

export default Team
