USE quatro_db;

INSERT INTO questions (Question, Answer, Category, QuizId) 
VALUES ("What is bootstrap?", "A responsive CSS framework", "web", 1),
("Who was the 16th President of the U.S.?", "Abraham Lincoln", "general", 3),
("What is the root of 144?", "12", "math", 2),
("Who was Luke Skywalker's father?", "Annakin Skywalker", "trivia", 4);

SELECT * from questions;
