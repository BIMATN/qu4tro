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
  app.get("/api/quiz/:id?", function(req, res, next) {
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

  app.get("/api/user/:id?", function(req, res) {
    var query = {};
    if (req.params.id) {
      query.userId = req.params.id;
    }

    db.User.findAll({
      where: query,
      include: [db.Quiz]
    }).then(function(dbQuizId) {
      console.log(dbQuizId);
      res.json(dbQuizId);
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
  // when authenticating userName and password passed, if successful, route to home page else error
  // use post here to "hide" values passed back to route.
  app.post("/authenticate", function(req, res) {
    var query = {};
    if (req.body.userName && req.body.password) {
      query = { user_name : req.body.userName,
                password : req.body.password };
    }

    db.User.findAll({
      where:query
    }).then(function(data) {
      console.log("data : " + JSON.stringify(data));
      //console.log("user_name : " + data[0].user_name);      
      if (!data || !data.length){
        throw new Error("invalid login");
      } else{
       /* var filePath = path.join(__dirname,"../public/cms.html");
        res.sendFile(filePath);*/
        res.render("cms");
      }
    });
  });
};
