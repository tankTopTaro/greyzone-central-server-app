import pool from '../db.js';

const Download = async function (facility_id) {
    // Fetch all players, teams, and their related session data in one query each
    const [players] = await pool.query(`
            SELECT DISTINCT p.*
            FROM player p
            WHERE p.id LIKE CONCAT('F', ?, '-%')
        `, [facility_id]);
    const [teams] = await pool.query(`
            SELECT DISTINCT t.*
            FROM team t
            WHERE t.id LIKE CONCAT('F', ?, '-%')
        `, [facility_id]);

    // Fetch all player-game-session data in one go
    const [playerSessions] = await pool.query(`
        SELECT 
            pgs.id AS pgs_id, pgs.date_add AS pgs_date_add, pgs.score, pgs.is_won, pgs.game_session_id AS pgs_game_session_id, pgs.player_id AS pgs_player_id, pgs.team_id AS pgs_team_id, pgs.facility_session_id AS pgs_facility_session_id, 
            p.id AS p_id, p.nick_name, p.date_add AS p_date_add, p.last_name, p.first_name, p.gender, p.birth_date, p.league_country, p.league_city, p.league_district, p.league_other,
            gs.id AS gs_id, gs.date_add AS gs_date_add, gs.room_type, gs.game_rule, gs.game_level, gs.duration_s_actual, gs.game_log, gs.log, gs.parent_gs_id, gs.facility_id AS gs_facility_id,
            fs.id AS fs_id, fs.date_add AS fs_date_add, fs.date_exec AS fs_date_exec, fs.duration_m AS fs_duration_m, fs.facility_id AS fs_facility_id, fs.player_id AS fs_player_id,
            COUNT(DISTINCT game_session_id) AS played,
            CAST(SUM(CASE WHEN DATE(fs.date_add) = CURDATE() THEN 1 ELSE 0 END) AS UNSIGNED) AS played_today,
            IFNULL(game_level_count.play_count, 0) AS game_level_played
        FROM player_game_session pgs
        LEFT JOIN player p ON pgs.player_id = p.id
        LEFT JOIN game_session gs ON pgs.game_session_id = gs.id
        LEFT JOIN facility_session fs ON pgs.facility_session_id = fs.id

        LEFT JOIN (
            SELECT 
                pgs_sub.team_id,
                gs.game_level, 
                COUNT(*) AS play_count
            FROM player_game_session pgs_sub
            LEFT JOIN game_session gs ON pgs_sub.game_session_id = gs.id
            WHERE gs.id IS NOT NULL
            GROUP BY pgs_sub.team_id, gs.game_level
        ) AS game_level_count ON pgs.team_id = game_level_count.team_id AND gs.game_level = game_level_count.game_level

        WHERE p.id LIKE CONCAT('F', ?, '-%')
        AND gs.facility_id = ?
        AND fs.facility_id = ?

        GROUP BY
            pgs.id, pgs.date_add, pgs.score, pgs.is_won, pgs.game_session_id, pgs.player_id, pgs.team_id, pgs.facility_session_id,
            p.id, p.nick_name, p.date_add, p.last_name, p.first_name, p.gender, p.birth_date, p.league_country, p.league_city, p.league_district, p.league_other,
            gs.id, gs.date_add, gs.room_type, gs.game_rule, gs.game_level, gs.duration_s_actual, gs.game_log, gs.log, gs.parent_gs_id, gs.facility_id,
            fs.id, fs.date_add, fs.date_exec, fs.duration_m, fs.facility_id, fs.player_id,
            game_level_count.play_count
        ORDER BY gs.game_level;
    `, [facility_id, facility_id, facility_id]);

    // Fetch all team-game-session data in one go
    const [teamSessions] = await pool.query(`
        SELECT
            tgs.id, tgs.date_add AS tgs_date_add, tgs.score, tgs.is_won, tgs.game_session_id AS tgs_game_session_id, tgs.team_id AS tgs_team_id,
            tp.id AS tp_id, tp.team_id, tp.player_id,
            t.id AS t_id, t.name, t.nbr_of_players, t.date_add AS t_date_add, t.unique_identifier,
            gs.id AS gs_id, gs.date_add AS gs_date_add, gs.room_type, gs.game_rule, gs.game_level, gs.duration_s_actual, gs.game_log, gs.log, gs.parent_gs_id, gs.facility_id,
            COUNT(DISTINCT game_session_id) AS played,
            CAST(SUM(CASE WHEN DATE(gs.date_add) = CURDATE() THEN 1 ELSE 0 END) AS UNSIGNED) AS played_today,
            p.league_country, p.league_city,
            -- Count the number of times this team has played each game level
            IFNULL(game_level_count.play_count, 0) AS game_level_played
        FROM team_game_session tgs
        LEFT JOIN team_player tp ON tgs.team_id = tp.team_id
        LEFT JOIN team t ON tgs.team_id = t.id
        LEFT JOIN game_session gs ON tgs.game_session_id = gs.id
        LEFT JOIN player p ON tp.player_id = p.id
        -- Join with the subquery that counts game level occurrences

        LEFT JOIN (
            SELECT 
                tgs_sub.team_id,
                gs.game_level, 
                COUNT(*) AS play_count
            FROM team_game_session tgs_sub
            LEFT JOIN game_session gs ON tgs_sub.game_session_id = gs.id
            WHERE gs.id IS NOT NULL
            GROUP BY tgs_sub.team_id, gs.game_level
        ) AS game_level_count ON tgs.team_id = game_level_count.team_id AND gs.game_level = game_level_count.game_level
        
        WHERE tgs.tEam_id LIKE CONCAT('F', ?, '-%')
        AND gs.facility_id = ?
        
        GROUP BY
            tgs.id, tgs.date_add, tgs.score, tgs.is_won, tgs.game_session_id, tgs.team_id,
            tp.id, tp.team_id, tp.player_id,
            t.id, t.name, t.nbr_of_players, t.date_add, t.unique_identifier,
            gs.id, gs.date_add, gs.room_type, gs.game_rule, gs.game_level, gs.duration_s_actual, gs.game_log, gs.log, gs.parent_gs_id, gs.facility_id,
            p.league_country, p.league_city,
            game_level_count.play_count
        ORDER BY gs.game_level;
    `, [facility_id, facility_id]);

    // Process player data
    let playerData = {};
    players.forEach(player => {
        playerData[player.id] = {
            id: player.id,
            nick_name: player.nick_name,
            date_add: player.date_add,
            last_name: player.last_name,
            first_name: player.first_name,
            gender: player.gender,
            birth_date: player.birth_date,
            league: {
                country: player.league_country,
                city: player.league_city,
                district: player.league_district,
                other: player.league_other
            },
            games_history: {},
            facility_session: {},
            events_to_debrief: []
        };
    });

    playerSessions.forEach(session => {
        const player_id = session.pgs_player_id;

        // Ensure every game level played by this team is stored properly
        const gameKey = `${session.room_type} > ${session.game_rule} > L${session.game_level}`;
    
        if (!playerData[player_id].games_history[gameKey]) {
            playerData[player_id].games_history[gameKey] = {
                best_time: session.duration_s_actual || null,
                played: session.played || 0,  // Fix: Use `game_level_played`
                played_today: session.played_today || 0
            };
        } else {
            playerData[player_id].games_history[gameKey].best_time = Math.min(
                playerData[player_id].games_history[gameKey].best_time || Infinity,
                session.duration_s_actual || Infinity
            );
    
            playerData[player_id].games_history[gameKey].played = session.played || 0;
            playerData[player_id].games_history[gameKey].played_today = session.played_today || 0;
        }

        // Only store the latest facility session
        if (
            !playerData[player_id].facility_session.date_start ||
            session.fs_date_exec > playerData[player_id].facility_session.date_start
        ) {
            playerData[player_id].facility_session.id = session.fs_id;
            playerData[player_id].facility_session.date_start = session.fs_date_exec;
            playerData[player_id].facility_session.duration_m = session.fs_duration_m;
            playerData[player_id].facility_session.date_end = session.fs_date_add;
        }
    });

    // Process team data
    let teamData = {};
    teams.forEach(team => {
        teamData[team.id] = {
            id: team.id,
            name: team.name,
            nbr_of_players: team.nbr_of_players,
            players: new Set(),
            unique_identifier: team.unique_identifier,
            leagues: {
                country: new Set(),
                city: new Set(),
            },
            games_history: {},
            events_to_debrief: new Set()
        };
    });

    teamSessions.forEach(session => {
        const team_id = session.team_id;
        if (!teamData[team_id]) return;
    
        teamData[team_id].players.add(session.player_id);
        
        if (session.league_country) teamData[team_id].leagues.country.add(session.league_country);
        if (session.league_city) teamData[team_id].leagues.city.add(session.league_city);
    
        // Ensure every game level played by this team is stored properly
        const gameKey = `${session.room_type} > ${session.game_rule} > L${session.game_level}`;
    
        if (!teamData[team_id].games_history[gameKey]) {
            teamData[team_id].games_history[gameKey] = {
                best_time: session.duration_s_actual || null,
                played: session.played || 0,  // Fix: Use `game_level_played`
                played_today: session.played_today || 0
            };
        } else {
            teamData[team_id].games_history[gameKey].best_time = Math.min(
                teamData[team_id].games_history[gameKey].best_time || Infinity,
                session.duration_s_actual || Infinity
            );
    
            teamData[team_id].games_history[gameKey].played = session.played || 0;
            teamData[team_id].games_history[gameKey].played_today = session.played_today || 0;
        }

        // Store event logs as an array
        if (session.log || session.game_log) {
            const event = JSON.stringify({ type: session.log || '', caption: session.game_log || '' });
            teamData[team_id].events_to_debrief.add(event);
        }
    });
    

    // Convert Sets to arrays before sending response
    for (const team_id in teamData) {
        teamData[team_id].players = [...teamData[team_id].players];
        teamData[team_id].leagues = {
            country: teamData[team_id].leagues.country = [...teamData[team_id].leagues.country][0],
            city: teamData[team_id].leagues.city = [...teamData[team_id].leagues.city][0]
        };
        teamData[team_id].events_to_debrief = [...teamData[team_id].events_to_debrief].map(event => JSON.parse(event));
    }

    return { players: playerData, teams: teamData }
}

export default Download;


