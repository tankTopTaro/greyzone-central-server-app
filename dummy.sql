INSERT INTO `player_game_session` (`id`, `date_add`, `score`, `is_won`, `game_session_id`, `player_id`, `team_id`, `facility_session_id`)
SELECT * FROM (
    SELECT 1, '2025-02-14 12:05:00', 1500, 1, 1, 'F1-001', 'F1-001,F1-002', 'F1-S001'
    UNION ALL
    SELECT 2, '2025-02-14 12:05:00', 1400, 0, 1, 'F1-002', 'F1-001,F1-002', 'F1-S002'
    UNION ALL
    SELECT 3, '2025-02-14 12:45:00', 1600, 1, 2, 'F1-001', 'F1-001,F1-002,F1-003', 'F1-S001'
    UNION ALL
    SELECT 4, '2025-02-14 12:45:00', 1450, 0, 2, 'F1-002', 'F1-001,F1-002,F1-003', 'F1-S002'
    UNION ALL
    SELECT 5, '2025-02-14 12:45:00', 1550, 1, 2, 'F1-003', 'F1-001,F1-002,F1-003', 'F1-S002'
    UNION ALL
    SELECT 6, '2025-02-13 16:00:00', 1200, 1, 3, 'F2-001', 'F2-001,F2-002', 'F2-S001'
    UNION ALL
    SELECT 7, '2025-02-13 16:00:00', 1100, 0, 3, 'F2-002', 'F2-001,F2-002', 'F2-S002'
) AS temp
WHERE NOT EXISTS (SELECT 1 FROM `player_game_session` LIMIT 1);

INSERT INTO `facility` (`date_add`, `country`, `city`, `name`)
SELECT * FROM (
    SELECT '2025-02-14 10:30:00', 'USA', 'New York', 'Central Park Gym'
    UNION ALL
    SELECT '2025-02-13 14:45:00', 'UK', 'London', 'London Health Club'
    UNION ALL
    SELECT '2025-02-12 09:00:00', 'Japan', 'Tokyo', 'Tokyo Sports Center'
    UNION ALL
    SELECT '2025-02-11 16:20:00', 'Germany', 'Berlin', 'Berlin Fitness Hub'
    UNION ALL
    SELECT '2025-02-10 12:10:00', 'Canada', 'Toronto', 'Toronto Wellness Spa'
) AS temp
WHERE NOT EXISTS (SELECT 1 FROM `facility` LIMIT 1);

INSERT INTO `player` (`id`, `nick_name`, `date_add`, `email`, `phone`, `last_name`, `first_name`, `gender`, `birth_date`, `notes`, `log`, `league_country`, `league_city`, `league_district`, `league_other`, `rfid_tag_uid`)
SELECT * FROM (
    SELECT 'F1-001', 'Shadow', '2025-02-14', 'shadow@gmail.com', '+1234567890', 'Smith', 'John', 'Male', '1995-08-21 00:00:00', 'Top scorer in local league', 'Logged in at 10 AM', 'USA', 'New York', 'District 1', 'University League', 'RFID12345'
    UNION ALL
    SELECT 'F1-002', 'Blaze', '2025-02-14', 'blaze@email.com', '+9876543210', 'Johnson', 'Emily', 'Female', '1998-05-15 00:00:00', 'Recently joined', 'Joined league at 2 PM', 'USA', 'New York', 'District 3', 'Regional League', 'RFID56789'
    UNION ALL
    SELECT 'F1-003', 'Striker', '2025-02-14', 'striker@email.com', '+1122334455', 'Williams', 'Liam', 'Male', '2001-01-10 00:00:00', 'Highly competitive', 'Match played at 5 PM', 'UK', 'London', 'District 5', 'City League', 'RFID98765'
    UNION ALL
    SELECT 'F2-001', 'Eagle', '2025-02-14', 'eagle@email.com', '+2233445566', 'Brown', 'Sophia', 'Female', '1997-12-05 00:00:00', 'Defensive player', 'Match recorded at 8 PM', 'Canada', 'Toronto', 'District 2', 'National League', 'RFID54321'
    UNION ALL
    SELECT 'F2-002', 'Vortex', '2025-02-14', 'vortex@email.com', '+3344556677', 'Taylor', 'Mason', 'Male', '1996-07-30 00:00:00', 'Midfielder specialist', 'Attended practice', 'Germany', 'Berlin', 'District 4', 'State League', 'RFID65432'
    UNION ALL
    SELECT 'F3-001', 'Cyclone', '2025-02-14', 'cyclone@email.com', '+4455667788', 'Anderson', 'Olivia', 'Female', '1999-11-25 00:00:00', 'New recruit', 'Signed up today', 'Japan', 'Tokyo', 'District 6', 'College League', 'RFID87654'
    UNION ALL
    SELECT 'F3-002', 'Comet', '2025-02-14', 'comet@email.com', '+5566778899', 'Martinez', 'Noah', 'Male', '2000-09-18 00:00:00', 'Fastest runner', 'Training session logged', 'France', 'Paris', 'District 7', 'University League', 'RFID76543'
    UNION ALL
    SELECT 'F4-001', 'Rogue', '2025-02-14', 'rogue@email.com', '+6677889900', 'Harris', 'Ava', 'Female', '1995-04-22 00:00:00', 'Team captain', 'Game analysis updated', 'USA', 'Los Angeles', 'District 8', 'Regional League', 'RFID65478'
    UNION ALL
    SELECT 'F5-001', 'Thunder', '2025-02-14', 'thunder@email.com', '+7788990011', 'Clark', 'Ethan', 'Male', '1997-06-14 00:00:00', 'Strong attacker', 'Match highlights added', 'Canada', 'Vancouver', 'District 9', 'National League', 'RFID54367'
    UNION ALL
    SELECT 'F5-002', 'Falcon', '2025-02-14', 'falcon@email.com', '+8899001122', 'Lewis', 'Mia', 'Female', '1998-02-28 00:00:00', 'Great team spirit', 'Attended league meeting', 'UK', 'Manchester', 'District 10', 'City League', 'RFID43256'
) AS temp
WHERE NOT EXISTS (SELECT 1 FROM `player` LIMIT 1);

INSERT INTO `team` (`id`, `name`, `nbr_of_players`, `date_add`, `unique_identifier`)
SELECT * FROM (
    SELECT 'F1-001,F1-002', 'New York Strikers', 2, '2025-02-14 12:00:00', 'F1-001,F1-002'
    UNION ALL
    SELECT 'F1-001,F1-002,F1-003', 'NYC Legends', 3, '2025-02-14 12:30:00', 'F1-001,F1-002,F1-003'
    UNION ALL
    SELECT 'F2-001,F2-002', 'Toronto Thunder', 2, '2025-02-14 13:00:00', 'F2-001,F2-002'
) AS temp
WHERE NOT EXISTS (SELECT 1 FROM 'team' LIMIT 1);

INSERT INTO `team_player` (`team_id`, `player_id`)
SELECT * FROM (
    SELECT 'F1-001,F1-002', 'F1-001' COMMENT-- New York Strikers
    UNION ALL
    SELECT 'F1-001,F1-002', 'F1-002'
    UNION ALL
    SELECT 'F1-001,F1-002,F1-003', 'F1-001' COMMENT -- NYC Legends
    UNION ALL
    SELECT 'F1-001,F1-002,F1-003', 'F1-002'
    UNION ALL
    SELECT 'F1-001,F1-002,F1-003', 'F1-003'
    UNION ALL
    SELECT 'F2-001,F2-002', 'F2-001' COMMENT -- Toronto Thunder
    UNION ALL 
    SELECT 'F2-001,F2-002', 'F2-002'
) AS temp
WHERE NOT EXISTS (SELECT 1 FROM 'team_player' LIMIT 1);

INSERT INTO `facility_session` (`id`, `date_add`, `date_exec`, `duration_m`, `facility_id`, `player_id`)
SELECT * FROM (
    SELECT 'F1-S001', '2025-02-14 13:30:00', '2025-02-14 13:10:00', 20, 1, 'F1-001' COMMENT -- John at Central Park Gym
    UNION ALL
    SELECT 'F1-S002', '2025-02-14 15:00:00', '2025-02-14 14:30:00', 30, 1, 'F1-002' COMMENT -- Emily at Central Park Gym
    UNION ALL
    SELECT 'F2-S001', '2025-02-13 16:45:00', '2025-02-13 16:15:00', 30, 5, 'F2-001' COMMENT -- Sophia at Toronto Wellness Spa
    UNION ALL
    SELECT 'F2-S002', '2025-02-13 18:30:00', '2025-02-13 18:00:00', 30, 5, 'F2-002' COMMENT -- Mason at Toronto Wellness Spa
    UNION ALL
    SELECT 'F3-S001', '2025-02-12 11:30:00', '2025-02-12 11:00:00', 30, 3, 'F3-001' COMMENT -- Olivia at Tokyo Sports Center
    UNION ALL
    SELECT 'F3-S002', '2025-02-12 14:00:00', '2025-02-12 13:45:00', 15, 3, 'F3-002' COMMENT -- Noah at Tokyo Sports Center
    UNION ALL
    SELECT 'F4-S001', '2025-02-11 17:00:00', '2025-02-11 16:40:00', 20, 4, 'F4-001' COMMENT -- Ava at Berlin Fitness Hub
    UNION ALL
    SELECT 'F5-S001', '2025-02-10 14:00:00', '2025-02-10 13:30:00', 30, 2, 'F5-001' COMMENT -- Ethan at London Health Club
    UNION ALL
    SELECT 'F5-S002', '2025-02-10 16:30:00', '2025-02-10 16:00:00', 30, 2, 'F5-002' COMMENT -- Mia at London Health Club
) AS temp
WHERE NOT EXISTS (SELECT 1 FROM 'facility_session' LIMIT 1);

INSERT INTO `team_game_session` (`date_add`, `score`, `is_won`, `game_session_id`, `team_id`)
SELECT * FROM (
    SELECT '2025-02-14 12:05:00', 1500, 1, 1, 'F1-001,F1-002' COMMENT -- New York Strikers played in session 1 and won
    UNION ALL
    SELECT '2025-02-14 12:45:00', 1200, 0, 2, 'F1-001,F1-002,F1-003' COMMENT -- NYC Legends played in session 2 and lost
    UNION ALL
    SELECT '2025-02-13 15:10:00', 1800, 1, 3, 'F2-001,F2-002' COMMENT -- Toronto Thunder played in session 3 and won
    UNION ALL
    SELECT '2025-02-12 10:40:00', 900, 0, 4, 'F1-001,F1-002' COMMENT -- New York Strikers lost in session 4
    UNION ALL
    SELECT '2025-02-12 11:10:00', 950, 1, 5, 'F1-001,F1-002,F1-003' COMMENT -- NYC Legends won in session 5
) AS temp
WHERE NOT EXISTS (SELECT 1 FROM 'team_game_session' LIMIT 1);

INSERT INTO `game_session` (`date_add`, `room_type`, `game_rule`, `game_level`, `duration_s_theory`, `duration_s_actual`, `game_log`, `log`, `is_collaborative`, `parent_gs_id`, `facility_id`)
SELECT * FROM (
    SELECT '2025-02-14 12:00:00', 'Virtual Reality', 'Elimination', 3, 1800, 1750, 'Game started with 4 players. Player 2 eliminated first.', 'System check complete', 0, NULL, 1 COMMENT -- First session in Central Park Gym
    UNION ALL
    SELECT '2025-02-14 12:40:00', 'Virtual Reality', 'Elimination', 3, 1800, 1780, 'New round started without exiting.', 'Updated settings', 0, 1, 1 COMMENT -- Continuation, linked to the first session
    UNION ALL
    SELECT '2025-02-13 15:00:00', 'Arcade', 'Standard', 2, 1200, 1100, 'Player 3 achieved high score.', 'System maintenance log', 0, NULL, 2 COMMENT -- London Health Club, standalone session
    UNION ALL
    SELECT '2025-02-12 10:30:00', 'Training', 'Speed Run', 4, 900, 880, 'Player 5 completed in record time.', 'No issues', 1, NULL, 3 COMMENT -- Tokyo Sports Center
    UNION ALL
    SELECT '2025-02-12 11:00:00', 'Training', 'Speed Run', 4, 900, 910, 'Second attempt at record-breaking run.', 'Minor lag detected', 1, 4, 3 COMMENT -- Continuation session
    UNION ALL
    SELECT '2025-02-11 17:00:00', 'Arcade', 'Elimination', 5, 2400, 2300, 'Final round intense battle.', 'Game mode updated', 0, NULL, 4 COMMENT -- Berlin Fitness Hub
    UNION ALL
    SELECT '2025-02-10 13:00:00', 'Simulation', 'Standard', 1, 600, 580, 'Beginner session.', 'Settings reset', 1, NULL, 5 COMMENT -- Toronto Wellness Spa
) AS temp
WHERE NOT EXISTS (SELECT 1 FROM 'game_session' LIMIT 1);