import pool from '../db.js'

const GameSession = {
    upload: async (data) => {
        try {
            const { room_type, game_rule, game_level, duration_s_theory, duration_s_actual, game_log, log, is_collaborative, facility_id, team_id, player_id, is_won, score, parent_gs_id } = data

            const date_add = new Date()
            const teamId = team_id || 'no_team'

            const isCollaborative = is_collaborative ? 1 : 0
            const isWon = is_won ? 1 : 0
    
            // Insert into game_session
            const [gameResult] = await pool.query(
               `INSERT INTO game_session 
                  (date_add, room_type, game_rule, game_level, duration_s_theory, duration_s_actual, game_log, log, is_collaborative, parent_gs_id, facility_id) 
                  VALUES (NOW(), ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
               [
               room_type,
               game_rule,
               game_level,
               duration_s_theory,
               duration_s_actual,
               game_log,
               log,
               isCollaborative,
               parent_gs_id,
               facility_id
               ]
            )
      
            const game_session_id = gameResult.insertId
      
            // Insert into team_game_session (if there's a team)
            if (teamId !== 'no_team') {
               await pool.query(
               `INSERT INTO team_game_session (date_add, score, is_won, game_session_id, team_id)
                  VALUES (NOW(), ?, ?, ?, ?)`,
               [score, isWon, game_session_id, teamId]
               )
            }
      
            // Insert into player_game_session
            const playerIds = teamId !== 'no_team' ? teamId.split(',').sort() : [player_id]


            for (const player_id of playerIds) {
               // Get the most recent facility_session_id for the player
               let [facilitySessionRows] = await pool.query(
                  `SELECT id as facility_session_id FROM facility_session
                  WHERE player_id = ? ORDER BY date_add DESC LIMIT 1`,
                  [player_id]
               )

               // If a facility session exists, use the most recent one; otherwise, set it to null
               const facility_session_id = facilitySessionRows.length > 0 ? facilitySessionRows[0].facility_session_id : null
      
               await pool.query(
               `INSERT INTO player_game_session 
                  (date_add, score, is_won, game_session_id, player_id, team_id, facility_session_id)
                  VALUES (NOW(), ?, ?, ?, ?, ?, ?)`,
               [
                  score,
                  isWon,
                  game_session_id,
                  player_id,
                  teamId,
                  facility_session_id
               ]
               )
            }
      
            return true
        } catch (error) {
            console.error("Error uploading game session:", error)
            throw new Error("Failed to upload game session")
        }
    },

    getLatestId: async () => {
         const result = await pool.query(`SELECT id FROM game_session ORDER BY id DESC LIMIT 1`)

         return result[0]?.id ?? null
    }
}

export default GameSession