var path = require('path');
var db = require("../models");

// setup cryptr for external use of quiz, survey and user IDs 
var Cryptr = require('cryptr'),
  survey_cryptr = new Cryptr('qu4tro');
  quiz_cryptr = new Cryptr('qu4troIsBoss');


module.exports = function(app) {
  // goes to home page when accessing home page of site
  app.get("/", function(req, res) {
    res.render("index");
  });

  // cms route loads cms.handlebars
  app.get("/cms", function(req, res) {
    res.render("cms");
  });

  // get request for quizzes viewing via cms
  app.get("/viewQuizzes/:id?", function(req, res) {
    var query = {};
    if (req.params.id) {
      query.id = req.params.id;
    }
    db.User.findAll({
      where: query,
      include: [db.Quiz]
    }).then(function(quizResponse) {
      console.log(quizResponse[0].dataValues.Quizzes);
      res.render("viewQuizzes", {quizzes: quizResponse[0].dataValues.Quizzes})
    });
  });

  // route loads quiz.handlebars when accessed through menu system
  app.get("/quiz", function(req, res) {
    res.render("quiz");
  });  

  // route loads quiz.handlebars when accessed through menu system
  app.get("/survey", function(req, res) {
    res.render("survey");
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
  app.post("/survey", function(req, res) {
    var query = {};
    if (req.body.surveyId) { // if no survey ID entered, route back to sender
        var decryptedString = req.body.surveyId;
        try {
            decryptedString = survey_cryptr.decrypt(req.body.surveyId);

            query = { SurveyId : decryptedString};
            console.log("******* decryptedString =" + decryptedString);
            db.SurveyQuestion.findAll({
              where:query,
              include: [db.Survey]
            }).then(function(data) {
              console.log("data : " + JSON.stringify(data));
              //console.log("user_name : " + data[0].user_name);      
              if (!data || !data.length){
                res.render("survey",{loginError: "Incorrect survey id. Ask your Administrator for a valid Survey ID."});
              } else{   
                res.render("survey",{dbQuestion: data, survey_name:data[0].Survey.survey_name, survey_id:req.body.surveyId});
              }
            });
        }
        catch(err) {
            decryptedString = 0;
              res.render("survey",{loginError: "Incorrect survey id. Ask your Administrator for a valid Survey ID."});            
        }           
      } else {
        res.render("survey",{loginError: "Incorrect survey id. Ask your Administrator for a valid Survey ID."}); 
      }           
  });

    // route loads quiz-b.handlebars quiz page
  app.get("/quiz", function(req, res) {
    res.render("quiz");
  });  

  // route loads apiInfo.handlebars informational page on how to use our API
  app.get("/apiInfo", function(req, res) {
    res.render("apiInfo");
  });

  // route loads about.handlebars informational page on the contributing team
  app.get("/about", function(req, res) {
    res.render("about");
  });

  // when authenticating userName and password passed, if successful, route to cms page else error
  // use post here to "hide" values passed back to route.
  app.post("/authenticate", function(req, res) {
    console.log(req.body);
    var query = {};
    if (req.body.userName && req.body.password) {
      query = { user_name : req.body.userName,
                password : req.body.password };
      db.User.findAll({
        where:query
      }).then(function(data) {
        console.log("data : " + JSON.stringify(data));
        //console.log("user_name : " + data[0].user_name);      
        if (!data || !data.length){
          res.render("index",{loginError: "Incorrect Username and/or password."});
        } else{
          res.render("cms",{userName: data[0].user_name, userId: data[0].id});
        }
      });
    } else {
      res.render("index",{loginError: "Incorrect Username and/or password."});
    }
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
      res.render(req.body.pageName, {quizIdError: "Incorrect Quiz ID. Please try again."});
    }
  });

  // route for making a new quiz, works with user id and quiz name
  app.post("/newQuiz", function(req, res) {
    if (req.body.userId && req.body.quizName) {
      console.log(req.body);
      db.Quiz.create({
      UserId: parseInt(req.body.userId),
      quiz_name: req.body.quizName
      }).then(function(quizCreated) {
        res.render("questionMaker", {quizName:quizCreated.dataValues.quiz_name, quizId: quizCreated.dataValues.id});
      });
    } else{
      console.log(req.body);
      res.render("createQuizzes", {quizNameError: "Please try again. A quiz name is required."});
    }
  });

  // route for adding a question to a quiz
  app.post("/questionMaker", function(req, res) {
    if (req.body.quizId && req.body.question) {
      console.log(req.body);
      db.Question.create({
      Question: req.body.question,
      QuizId: req.body.quizId
      }).then(function(questionCreated) {
        res.render("answers", {question:questionCreated.dataValues.Question, questionId: questionCreated.dataValues.id});
      });
    } else{
      console.log(req.body);
      res.render("questionMaker", {questionError: "Please try again. A question is required."});
    }
  });

  // route for adding an answer to a question
  app.post("/answers", function(req, res) {
    if (req.body.questionId && req.body.answer) {
      console.log(req.body);
      db.Question.update({
        Answer: req.body.answer
      }, {
      where: {
        id: req.body.questionId
      }
      }).then(function(answerAdded) {
        console.log(answerAdded[0].dataValues);
        //res.render("questionMaker", {QuizId: answerAdded[0].dataValues.QuizId, nextQuestion: true});
      });
    } else{
      console.log(req.body);
      res.render("answers", {answerError: "Please try again. An answer is required."});
    }
  });
};