var path = require('path');
var db = require("../models");

module.exports = function(app) {

  // goes to home page when accessing home page of site
  app.get("/", function(req, res) {("home")
      res.render("index");
  });

  // when authenticating userName and password passed, if successful, route to home page else error
  app.get("/authenticate", function(req, res) {
    console.log(req.body);
    var query = {};
    if (req.body.userName && req.body.password) {
      query.userName= req.body.userName,
      query.password = req.body.password;
    }

    db.User.findAll({
      where: query,
    }).then(function(dbUser) {
      // **************** error checks need to go here ***********

      if (!dbUser){
        throw new Error("invalid login");
      } else{
          
        res.sendFile(path.join(__dirname,"../public/cms.html"));     // gets all the way to here but doesn't update page
      }
    });
  });

  // when passed quizID, find the questions and route to quiz.handlebars to handle quiz taking
  app.get("/quiz/", function(req, res){
        res.sendFile(path.join(__dirname,"../public/quiz.html"));      
  });


  // when passed quizID, find the questions and route to quiz.handlebars to handle quiz taking
  app.get("/quiz/:id?", function(req, res){

    var query = {};
    if (req.params.quizId) {
      query.QuizId = req.params.quizId;
    }

    db.Question.findAll({
      where: query,
      include: [db.Quiz]
    }).then(function(dbQuestion) {
		    res.render("quiz");
    });  	

  });

};