USE `u469693320_mydb` ;

-- -----------------------------------------------------
-- Table `u469693320_mydb`.`player`
-- -----------------------------------------------------
INSERT INTO `u469693320_mydb`.`player` (`id`, `nick_name`, `date_add`, `email`, `phone`, `last_name`, `first_name`, `gender`, `birth_date`, `notes`, `log`, `league_country`, `league_city`, `league_district`, `league_other`, `rfid_tag_uid`)
SELECT * FROM (
    SELECT 'F1-1', 'Shadow', '2025-02-14', 'shadow@gmail.com', '+1234567890', 'Smith', 'John', 'Male', '1995-08-21 00:00:00', 'Top scorer in local league', 'Logged in at 10 AM', 'USA', 'New York', 'Manhattan', 'University League', ''
    UNION ALL
    SELECT 'F1-2', 'Blaze', '2025-02-14', 'blaze@email.com', '+9876543210', 'Johnson', 'Emily', 'Female', '1998-05-15 00:00:00', 'Recently joined', 'Joined league at 2 PM', 'USA', 'New York', 'Manhattan', 'University League', ''
    UNION ALL
    SELECT 'F1-3', 'Striker', '2025-02-14', 'striker@email.com', '+1122334455', 'Williams', 'Liam', 'Male', '2001-01-10 00:00:00', 'Highly competitive', 'Match played at 5 PM', 'USA', 'New York', 'Manhattan', 'University League', ''
    UNION ALL
    SELECT 'F1-4', 'Eagle', '2025-02-14', 'eagle@email.com', '+2233445566', 'Brown', 'Sophia', 'Female', '1997-12-05 00:00:00', 'Defensive player', 'Match recorded at 8 PM', 'USA', 'New York', 'Manhattan', 'University League', ''
    UNION ALL
    SELECT 'F2-1', 'Vortex', '2025-02-14', 'vortex@email.com', '+3344556677', 'Taylor', 'Mason', 'Male', '1996-07-30 00:00:00', 'Midfielder specialist', 'Attended practice', 'USA', 'Los Angeles', 'Little Tokyo', 'District League', ''
    UNION ALL
    SELECT 'F2-2', 'Cyclone', '2025-02-14', 'cyclone@email.com', '+4455667788', 'Anderson', 'Olivia', 'Female', '1999-11-25 00:00:00', 'New recruit', 'Signed up today', 'USA', 'Los Angeles', 'Little Tokyo', 'District League', ''
    UNION ALL
    SELECT 'F2-3', 'Comet', '2025-02-14', 'comet@email.com', '+5566778899', 'Martinez', 'Noah', 'Male', '2000-09-18 00:00:00', 'Fastest runner', 'Training session logged', 'USA', 'Los Angeles', 'Little Tokyo', 'District League', ''
    UNION ALL
    SELECT 'F2-4', 'Rogue', '2025-02-14', 'rogue@email.com', '+6677889900', 'Harris', 'Ava', 'Female', '1995-04-22 00:00:00', 'Team captain', 'Game analysis updated', 'USA', 'Los Angeles', 'Little Tokyo', 'District League', ''
    UNION ALL
    SELECT 'F1-5', 'Thunder', '2025-02-14', 'thunder@email.com', '+7788990011', 'Clark', 'Ethan', 'Male', '1997-06-14 00:00:00', 'Strong attacker', 'Match highlights added', 'USA', 'New York', 'Manhattan', 'District League', ''
    UNION ALL
    SELECT 'F1-6', 'Falcon', '2025-02-14', 'falcon@email.com', '+8899001122', 'Lewis', 'Mia', 'Female', '1998-02-28 00:00:00', 'Great team spirit', 'Attended league meeting', 'USA', 'New York', 'Manhattan', 'District League', ''
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
