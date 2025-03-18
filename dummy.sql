USE `u469693320_mydb` ;

-- -----------------------------------------------------
-- Table `u469693320_mydb`.`player`
-- -----------------------------------------------------
INSERT INTO `u469693320_mydb`.`player` (`id`, `nick_name`, `date_add`, `email`, `phone`, `last_name`, `first_name`, `gender`, `birth_date`, `notes`, `log`, `league_country`, `league_city`, `league_district`, `league_other`, `rfid_tag_uid`)
SELECT * FROM (
    SELECT 'F1-1', 'Shadow', '2025-02-14', 'shadow@gmail.com', '+1234567890', 'Smith', 'John', 'Male', '1995-08-21 00:00:00', 'Top scorer in local league', 'Logged in at 10 AM', 'USA', 'New York', 'Manhattan', 'University League', 'RFID-F1-1'
    UNION ALL
    SELECT 'F1-2', 'Blaze', '2025-02-14', 'blaze@email.com', '+9876543210', 'Johnson', 'Emily', 'Female', '1998-05-15 00:00:00', 'Recently joined', 'Joined league at 2 PM', 'USA', 'New York', 'Manhattan', 'University League', 'RFID-F1-2'
    UNION ALL
    SELECT 'F1-3', 'Striker', '2025-02-14', 'striker@email.com', '+1122334455', 'Williams', 'Liam', 'Male', '2001-01-10 00:00:00', 'Highly competitive', 'Match played at 5 PM', 'USA', 'New York', 'Manhattan', 'University League', 'RFID-F1-3'
    UNION ALL
    SELECT 'F1-4', 'Eagle', '2025-02-14', 'eagle@email.com', '+2233445566', 'Brown', 'Sophia', 'Female', '1997-12-05 00:00:00', 'Defensive player', 'Match recorded at 8 PM', 'USA', 'New York', 'Manhattan', 'University League', 'RFID-F1-4'
    UNION ALL
    SELECT 'F2-1', 'Vortex', '2025-02-14', 'vortex@email.com', '+3344556677', 'Taylor', 'Mason', 'Male', '1996-07-30 00:00:00', 'Midfielder specialist', 'Attended practice', 'USA', 'Los Angeles', 'Little Tokyo', 'District League', 'RFID-F2-1'
    UNION ALL
    SELECT 'F2-2', 'Cyclone', '2025-02-14', 'cyclone@email.com', '+4455667788', 'Anderson', 'Olivia', 'Female', '1999-11-25 00:00:00', 'New recruit', 'Signed up today', 'USA', 'Los Angeles', 'Little Tokyo', 'District League', 'RFID-F2-2'
    UNION ALL
    SELECT 'F2-3', 'Comet', '2025-02-14', 'comet@email.com', '+5566778899', 'Martinez', 'Noah', 'Male', '2000-09-18 00:00:00', 'Fastest runner', 'Training session logged', 'USA', 'Los Angeles', 'Little Tokyo', 'District League', 'RFID-F2-3'
    UNION ALL
    SELECT 'F2-4', 'Rogue', '2025-02-14', 'rogue@email.com', '+6677889900', 'Harris', 'Ava', 'Female', '1995-04-22 00:00:00', 'Team captain', 'Game analysis updated', 'USA', 'Los Angeles', 'Little Tokyo', 'District League', 'RFID-F2-4'
    UNION ALL
    SELECT 'F1-5', 'Thunder', '2025-02-14', 'thunder@email.com', '+7788990011', 'Clark', 'Ethan', 'Male', '1997-06-14 00:00:00', 'Strong attacker', 'Match highlights added', 'USA', 'New York', 'Manhattan', 'District League', 'RFID-F1-5'
    UNION ALL
    SELECT 'F1-6', 'Falcon', '2025-02-14', 'falcon@email.com', '+8899001122', 'Lewis', 'Mia', 'Female', '1998-02-28 00:00:00', 'Great team spirit', 'Attended league meeting', 'USA', 'New York', 'Manhattan', 'District League', 'RFID-F1-6'
) AS temp
WHERE NOT EXISTS (SELECT 1 FROM `u469693320_mydb`.`player` LIMIT 1);



-- -----------------------------------------------------
-- Table `u469693320_mydb`.`facility`
-- -----------------------------------------------------
INSERT INTO `u469693320_mydb`.`facility` (`date_add`, `country`, `city`, `name`)
SELECT * FROM (
    SELECT '2025-02-14 10:30:00', 'USA', 'New York', 'Greyzone NY'
    UNION ALL
    SELECT '2025-02-13 14:45:00', 'USA', 'Los Angeles', 'Greyzone LA'
    UNION ALL
    SELECT '2025-02-12 09:00:00', 'Japan', 'Tokyo', 'Greyzone Tokyo'
    UNION ALL
    SELECT '2025-02-11 16:20:00', 'Germany', 'Berlin', 'Greyzone Berlin'
    UNION ALL
    SELECT '2025-02-10 12:10:00', 'Canada', 'Toronto', 'Greyzone Toronto'
) AS temp
WHERE NOT EXISTS (SELECT 1 FROM `u469693320_mydb`.`facility` LIMIT 1);



-- -----------------------------------------------------
-- Table `u469693320_mydb`.`game_session`
-- -----------------------------------------------------
INSERT INTO `u469693320_mydb`.`game_session` (`date_add`, `room_type`, `game_rule`, `game_level`, `duration_s_theory`, `duration_s_actual`, `game_log`, `log`, `is_collaborative`, `parent_gs_id`, `facility_id`)
SELECT * FROM (
    SELECT 
        '2025-02-14 12:40:00' AS `date_add`, 
        'MonkeyRun' AS `room_type`, 
        'Sort_it' AS `game_rule`, 
        1 AS `game_level`, 
        60 AS `duration_s_theory`, 
        48 AS `duration_s_actual`, 
        'Started new game' AS `game_log`, 
        'New game' AS `log`, 
        1 AS `is_collaborative`, 
        NULL AS `parent_gs_id`, 
        1 AS `facility_id`
    UNION ALL
    SELECT '2025-02-14 12:42:00', 'MonkeyRun', 'Sort_it', 2, 60, 56, 'New round started without exiting.', 'Updated settings', 0, 1, 1  
    UNION ALL
    SELECT '2025-02-14 12:44:00', 'MonkeyRun', 'Bump_it', 3, 60, 40, 'New round started without exiting.', 'Updated settings', 0, 1, 1  
    UNION ALL
    SELECT '2025-02-15 12:40:00', 'MonkeyRun', 'Sort_it', 1, 60, 48, 'Started new game', 'New game', 1, NULL, 2  
    UNION ALL
    SELECT '2025-02-15 12:42:00', 'MonkeyRun', 'Sort_it', 2, 60, 56, 'New round started without exiting.', 'Updated settings', 0, 4, 2  
    UNION ALL
    SELECT '2025-02-15 12:44:00', 'MonkeyRun', 'Bump_it', 3, 60, 33, 'New round started without exiting.', 'Updated settings', 0, 4, 2  
    UNION ALL
    SELECT '2025-02-19 12:40:00', 'MonkeyRun', 'Sort_it', 1, 60, 22, 'New record', 'New game', 1, NULL, 1
    UNION ALL
    SELECT '2025-02-19 12:44:00', 'MonkeyRun', 'Sort_it', 2, 60, 38, 'New record', 'New game', 1, 7, 1
    UNION ALL
    SELECT '2025-02-19 12:46:00', 'MonkeyRun', 'Bump_it', 3, 60, 33, 'New record', 'New game', 1, 7, 1
) AS temp
WHERE NOT EXISTS (SELECT 1 FROM `u469693320_mydb`.`game_session` LIMIT 1);



-- -----------------------------------------------------
-- Table `u469693320_mydb`.`team`
-- -----------------------------------------------------
INSERT INTO `u469693320_mydb`.`team` (`id`, `name`, `nbr_of_players`, `date_add`, `unique_identifier`)
SELECT temp.id, temp.name, temp.nbr_of_players, temp.date_add, temp.unique_identifier FROM (
    SELECT 'F1-1,F1-2,F1-3,F1-4' AS id, 'Team Alpha' AS name, 4 AS nbr_of_players, '2025-02-14 12:00:00' AS date_add, 'F1-1,F1-2,F1-3,F1-4' AS unique_identifier
    UNION ALL
    SELECT 'F2-1,F2-2,F2-3,F2-4', 'Team Alpha', 4, '2025-02-14 12:30:00', 'F2-1,F2-2,F2-3,F2-4'
    UNION ALL
    SELECT 'F1-5,F1-6', 'Team Beta', 2, '2025-02-14 13:00:00', 'F1-5,F1-6'
) AS temp
WHERE NOT EXISTS (SELECT 1 FROM `u469693320_mydb`.`team` LIMIT 1);




-- -----------------------------------------------------
-- Table `u469693320_mydb`.`team_game_session`
-- -----------------------------------------------------
INSERT INTO `u469693320_mydb`.`team_game_session` (`date_add`, `score`, `is_won`, `game_session_id`, `team_id`)
SELECT * FROM (
    SELECT 
        '2025-02-14 12:40:00' AS date_add, 
        1500 AS score, 
        1 AS is_won, 
        1 AS game_session_id, 
        'F1-1,F1-2,F1-3,F1-4' AS team_id  
    UNION ALL
    SELECT '2025-02-14 12:42:00', 1600, 1, 2, 'F1-1,F1-2,F1-3,F1-4'
    UNION ALL
    SELECT '2025-02-14 12:44:00', 1700, 1, 3, 'F1-1,F1-2,F1-3,F1-4'
    UNION ALL
    SELECT '2025-02-15 12:40:00', 1500, 1, 4, 'F2-1,F2-2,F2-3,F2-4'  
    UNION ALL
    SELECT '2025-02-15 12:40:00', 1600, 1, 5, 'F2-1,F2-2,F2-3,F2-4'  
    UNION ALL
    SELECT '2025-02-15 12:40:00', 1700, 1, 6, 'F2-1,F2-2,F2-3,F2-4'  
    UNION ALL
    SELECT '2025-02-19 12:40:00', 1500, 1, 7, 'F1-5,F1-6'  
    UNION ALL
    SELECT '2025-02-14 12:44:00', 1600, 1, 8, 'F1-5,F1-6'
    UNION ALL
    SELECT '2025-02-14 12:46:00', 1700, 1, 9, 'F1-5,F1-6'
) AS temp
WHERE NOT EXISTS (SELECT 1 FROM `u469693320_mydb`.`team_game_session` LIMIT 1);



-- -----------------------------------------------------
-- Table `u469693320_mydb`.`facility_session`
-- -----------------------------------------------------
INSERT INTO `u469693320_mydb`.`facility_session` (`date_add`, `date_exec`, `duration_m`, `facility_id`, `player_id`)
SELECT * FROM (
    SELECT '2025-02-14 12:44:00', '2025-02-14 12:40:00', 20, 1, 'F1-1'  
    UNION ALL
    SELECT '2025-02-14 12:44:00', '2025-02-14 12:40:00', 30, 1, 'F1-2'  
    UNION ALL
    SELECT '2025-02-14 12:44:00', '2025-02-14 12:40:00', 30, 1, 'F1-3'  
    UNION ALL
    SELECT '2025-02-14 12:44:00', '2025-02-14 12:40:00', 30, 1, 'F1-4'   
    UNION ALL
    SELECT '2025-02-19 12:46:00', '2025-02-19 12:40:00', 30, 1, 'F1-5'
    UNION ALL
    SELECT '2025-02-19 12:46:00', '2025-02-19 12:40:00', 30, 1, 'F1-6' 
) AS temp
WHERE NOT EXISTS (SELECT 1 FROM `u469693320_mydb`.`facility_session` LIMIT 1);



-- -----------------------------------------------------
-- Table `u469693320_mydb`.`team_player`
-- -----------------------------------------------------
INSERT INTO `u469693320_mydb`.`team_player` (`team_id`, `player_id`)
SELECT * FROM (
    SELECT 'F1-1,F1-2,F1-3,F1-4', 'F1-1' -- Team Alpha (F1)
    UNION ALL
    SELECT 'F1-1,F1-2,F1-3,F1-4', 'F1-2'
    UNION ALL
    SELECT 'F1-1,F1-2,F1-3,F1-4', 'F1-3' 
    UNION ALL
    SELECT 'F1-1,F1-2,F1-3,F1-4', 'F1-4'
    UNION ALL
    SELECT 'F2-1,F2-2,F2-3,F2-4', 'F2-1'  -- Team Alpha (F2)
    UNION ALL
    SELECT 'F2-1,F2-2,F2-3,F2-4', 'F2-2'  
    UNION ALL
    SELECT 'F2-1,F2-2,F2-3,F2-4', 'F2-3'  
    UNION ALL
    SELECT 'F2-1,F2-2,F2-3,F2-4', 'F2-4'  
    UNION ALL
    SELECT 'F1-5,F1-6', 'F1-5'  -- Team Beta (F1)
    UNION ALL
    SELECT 'F1-5,F1-6', 'F1-6' 
) AS temp
WHERE NOT EXISTS (SELECT 1 FROM `u469693320_mydb`.`team_player` LIMIT 1);



-- -----------------------------------------------------
-- Table `u469693320_mydb`.`player_game_session`
-- -----------------------------------------------------
INSERT INTO `u469693320_mydb`.`player_game_session` (`date_add`, `score`, `is_won`, `game_session_id`, `player_id`, `team_id`, `facility_session_id`)
SELECT * FROM (
    SELECT
        '2025-02-14 12:40:00' AS date_add, 
        1500 AS score, 
        1 AS is_won, 
        1 AS game_session_id, 
        'F1-1' AS player_id, 
        'F1-1,F1-2,F1-3,F1-4' AS team_id, 
        1 AS facility_session_id
    UNION ALL
    SELECT '2025-02-14 12:40:00', 1500, 1, 1, 'F1-2', 'F1-1,F1-2,F1-3,F1-4', 2
    UNION ALL 
    SELECT '2025-02-14 12:40:00', 1500, 1, 1, 'F1-3', 'F1-1,F1-2,F1-3,F1-4', 3
    UNION ALL
    SELECT '2025-02-14 12:40:00', 1500, 1, 1, 'F1-4', 'F1-1,F1-2,F1-3,F1-4', 4
    UNION ALL
    SELECT '2025-02-14 12:42:00', 1600, 1, 2, 'F1-1', 'F1-1,F1-2,F1-3,F1-4', 1
    UNION ALL
    SELECT '2025-02-14 12:42:00', 1600, 1, 2, 'F1-2', 'F1-1,F1-2,F1-3,F1-4', 2
    UNION ALL
    SELECT '2025-02-14 12:42:00', 1600, 1, 2, 'F1-3', 'F1-1,F1-2,F1-3,F1-4', 3
    UNION ALL
    SELECT '2025-02-14 12:42:00', 1600, 1, 2, 'F1-4', 'F1-1,F1-2,F1-3,F1-4', 4
    UNION ALL
    SELECT '2025-02-14 12:44:00', 1700, 1, 3, 'F1-1', 'F1-1,F1-2,F1-3,F1-4', 1
    UNION ALL
    SELECT '2025-02-14 12:44:00', 1600, 1, 3, 'F1-2', 'F1-1,F1-2,F1-3,F1-4', 2
    UNION ALL
    SELECT '2025-02-14 12:44:00', 1600, 1, 3, 'F1-3', 'F1-1,F1-2,F1-3,F1-4', 3
    UNION ALL
    SELECT '2025-02-14 12:44:00', 1600, 1, 3, 'F1-4', 'F1-1,F1-2,F1-3,F1-4', 4
    UNION ALL

    SELECT '2025-02-19 12:40:00', 1500, 1, 1, 'F1-5', 'F1-5,F1-6', 5
    UNION ALL
    SELECT '2025-02-19 12:40:00', 1500, 1, 1, 'F1-6', 'F1-5,F1-6', 6
    UNION ALL
    SELECT '2025-02-19 12:44:00', 1600, 1, 2, 'F1-5', 'F1-5,F1-6', 5
    UNION ALL
    SELECT '2025-02-19 12:44:00', 1600, 1, 2, 'F1-6', 'F1-5,F1-6', 6
    UNION ALL
    SELECT '2025-02-19 12:46:00', 1700, 1, 3, 'F1-5', 'F1-5,F1-6', 5
    UNION ALL
    SELECT '2025-02-19 12:46:00', 1700, 1, 3, 'F1-6', 'F1-5,F1-6', 6
    
) AS temp
WHERE NOT EXISTS (SELECT 1 FROM `u469693320_mydb`.`player_game_session` LIMIT 1);
