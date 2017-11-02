USE quatro_db;
INSERT INTO users (user_name, password, role) 
VALUES 
("aaron@quatro.com", "1234", "admin"), ("bob@quatro.com", "1234", "admin"),
("charlien@quatro.com", "1234", "admin"),("david@quatro.com", "1234", "admin");

SELECT * FROM quatro_db.users;