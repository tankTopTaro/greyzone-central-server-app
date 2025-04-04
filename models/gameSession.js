import pool from '../db.js'

const GameSession = {
    upload: async (data) => {
        try {
            const { room_type, game_rule, game_level, duration_s_theory, duration_s_actual, game_log, log, is_collaborative, facility_id, team_id, player_id, is_won, score } = data

            const date_add = new Date()
            const teamId = team_id || null

            // STEP 1: Find last game session (same room_type, rule, level, team) to use as possible parent
            let parentRows = await pool.query(
               `SELECT id from game_session
                  WHERE room_type = ? AND game_rule = ? AND game_level = ? AND facility_id = ?
                  ORDER BY date_add DESC LIMIT 1`,
               [room_type, game_rule, game_level - 1, facility_id]
            )

            const parent_gs_id = ''

            if (parentRows.length > 0) {
               parent_gs_id = parentRows[0].id // Parent game session found
            }
    
            // STEP 2: Insert into game_session
            const [gameResult] = await pool.query(
               `INSERT INTO game_session 
               (date_add, room_type, game_rule, game_level, duration_s_theory, duration_s_actual, game_log, log, is_collaborative, parent_gs_id, facility_id) 
               VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
               [
               date_add,
               room_type,
               game_rule,
               game_level,
               duration_s_theory,
               duration_s_actual,
               game_log,
               log,
               is_collaborative,
               parent_gs_id,
               facility_id
               ]
            )
      
            const game_session_id = gameResult.insertId
      
            // STEP 3: Insert into team_game_session (if there's a team)
            if (teamId) {
               await pool.query(
               `INSERT INTO team_game_session (date_add, score, is_won, game_session_id, team_id)
                  VALUES (?, ?, ?, ?, ?)`,
               [date_add, score, is_won, game_session_id, teamId]
               )
            }
      
            // STEP 4: Insert into player_game_session
            const playerIds = teamId ? teamId.split(',').sort() : [player_id]
            for (const player_id of playerIds) {
               // Placeholder: Replace this with real facility_session_id logic
               const facility_session_id = null
      
               await pool.query(
               `INSERT INTO player_game_session 
                  (date_add, score, is_won, game_session_id, player_id, team_id, facility_session_id)
                  VALUES (?, ?, ?, ?, ?, ?, ?)`,
               [
                  date_add,
                  score,
                  is_won,
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
    }
}

export default GameSession