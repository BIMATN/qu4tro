var path = require('path');
var db = require("../models");

module.exports = function(app) {
  // goes to home page when accessing home page of site
  app.get("/", function(req, res) {
    res.render("index");
  });

  // cms route loads cms.handlebars
  app.get("/cms", function(req, res) {
    // res.sendFile(path.join(__dirname, "../public/cms.html"));
    res.render("cms");
  });

  app.get("/viewQuizzes", function(req,res){
    res.render("viewQuizzes");
  });

  app.get("/createQuizzes", function(req,res){
    res.render("createQuizzes");
  });

  app.get("/questionMaker", function(req,res){
    res.render("questionMaker");
  });

  app.get("/answers", function(req,res){
    res.render("answers");
  });

  // route loads quiz-b.handlebars survey page
  app.get("/survey/:id?", function(req, res) {
    // res.sendFile(path.join(__dirname, "../public/survey.html"));
    res.render("quiz-b");
  });

    // route loads quiz-b.handlebars quiz page
  app.get("/quiz/:id?", function(req, res) {
    // res.sendFile(path.join(__dirname, "../public/survey.html"));
    res.render("quiz-b");
  });  

  // route loads apiInfo.handlebars informational page on how to use our API
  app.get("/apiInfo", function(req, res) {
    // res.sendFile(path.join(__dirname, "../public/apiInfo.html"));
    res.render("apiInfo");
  });

  // when authenticating userName and password passed, if successful, route to cms page else error
  // use post here to "hide" values passed back to route.
  app.post("/authenticate", function(req, res) {
    console.log(req.body);
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
        res.render("cms",{user_welcome: "Welcome, "+data[0].user_name});
        //Need to save username or user id to session storage so we can keep them logged in while the tab is open
      }
    });
  });

  // route loads quiz.handlebars
  app.post("/quiz", function(req, res) {
    var query = {};
    if (req.body.quizId) {
      query.QuizId = req.body.quizId;
      db.Question.findAll({
        where: query,
        include: [db.Quiz]
      }).then(function(dbQuestion) {
        // console.log(">>>" + dbQuestion[0].Quiz.quiz_name);
        res.render("quiz", {dbQuestion: dbQuestion, quiz_name:dbQuestion[0].Quiz.quiz_name});
      });
    } else{
      res.render(req.body.pageName, {quizIdError: "Incorrect Quiz ID. Please try again"});
    }
  });

  // route for making a new quiz, works with user id and quiz name
  app.post("/newQuiz", function(req, res) {
    if (req.body.userId && req.body.quizName) {
      db.Quiz.create({
      userId = req.body.userId;
      quiz_name = req.body.quizName;
      }).then(function(quizCreated) {
        // console.log(">>>" + dbQuestion[0].Quiz.quiz_name);
        res.render("questionMaker", {userId: quizCreated[0].userId, quiz_name:quizCreated[0].quiz_name});
      });
    } else{
      res.render("createQuizzes", {quizIdError: "Please try again. A quiz name is required"});
    }
  });
};