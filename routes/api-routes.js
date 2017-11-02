// *********************************************************************************
// api-routes.js - this file offers a set of routes for displaying and saving data to the db
// *********************************************************************************

// Dependencies
// =============================================================

// Requiring our models
var db = require("../models");

// Routes
// =============================================================
module.exports = function(app) {

  // GET route for getting all of the questions in db or all questions for quiz id passed
  app.get("/api/quiz/:id?", function(req, res) {
    var query = {};
    if (req.params.id) {
      query.QuizId = req.params.id;
    }

    db.Question.findAll({
      where: query,
      include: [db.Quiz]
    }).then(function(dbQuestion) {
      res.json(dbQuestion);
    });
  });

  // GET route for getting all of the questions for a userid passed
  app.get("/api/quizzes/:id?", function(req, res) {
    var query = {};
    if (req.params.id) {
      query.id = req.params.id;
    }

    db.Quiz.findAll({
      where: query,
      include: [db.User]
    }).then(function(dbQuestion) {
      res.json(dbQuestion);
    });
  });  

  // POST route for saving a new Question
  app.post("/api/question", function(req, res) {
    db.Question.create({
      question: req.body.question,
      answer: req.body.answer,
      category: req.body.category,
      quizId:quizId
    }).then(function(dbPost) {
      res.json(dbQuestion);
    });
  });

  // DELETE route for deleting posts
  app.delete("/api/question/:id", function(req, res) {
    db.Question.destroy({
      where: {
        id: req.params.id
      }
    }).then(function(dbQuestion) {
      res.json(dbQuestion);
    });
  });

  // PUT route for updating posts
  app.put("/api/question", function(req, res) {
    db.Question.update(
      req.body,
      {
        where: {
          id: req.body.id
        }
      }).then(function(dbQuestion) {
        res.json(dbQuestion);
      });
  });
};
