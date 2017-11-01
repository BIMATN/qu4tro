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

  // goes to home page for login
  app.get("/", function(req, res) {
      res.render("index");
  });

  // GET route for getting all of the questions in db or all questions for quiz id passed
  app.get("/api/quiz/:id?", function(req, res) {
    var query = {};
    if (req.params.id) {
      query.QuizId = req.params.id;
    }
    // Here we add an "include" property to our options in our findAll query
    // We set the value to an array of the models we want to include in a left outer join
    // In this case, just db.Author
    db.Question.findAll({
      where: query,
      include: [db.Quiz]
    }).then(function(dbQuestion) {
      res.json(dbQuestion);
    });
  });

  // POST route for saving a new Question
  app.post("/api/question", function(req, res) {
    db.Question.create(req.body).then(function(dbPost) {
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
  app.put("/api/posts", function(req, res) {
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
