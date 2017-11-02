var path = require('path');

module.exports = function(app) {

  // when authenticating userName and password passed, if successful, route to home page else error
  app.get("/authenticate", function(req, res) {

    var query = {};
    if (req.body.userName && req.body.password) {
      query.QuizId = req.body.userName,
      query.password = req.body.password;
    }

    db.User.findAll({
      where: query,
    }).then(function(dbUser) {

// **************** error checks need to go here ***********

			res.sendFile(path.join(__dirname, '../public/home.html'));
    });
  });

  // when passed quizID, find the questions and route to quiz.handlebars to handle quiz taking
  app.get("/quiz/", function(req, res){
    var query = {};
    if (req.body.QuizId) {
      query.QuizId = req.body.QuizId;
    }

    db.Question.findAll({
      where: query,
      include: [db.Quiz]
    }).then(function(dbQuestion) {
		      res.json(dbQuestion);
		      res.render("quiz");
    });  	

  });

};