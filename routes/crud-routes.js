var path = require('path');
var db = require("../models");

// setup cryptr for external use of quiz, survey and user IDs 
var Cryptr = require('cryptr'),
  survey_cryptr = new Cryptr('qu4tro');
  quiz_cryptr = new Cryptr('qu4troIsBoss');


module.exports = function(app) {
  // post request for user's quizzes viewing when passed with userid *
  app.post("/viewQuizzes", function(req, res) {
    var query = {};
    if (req.body.userId) {
      query.userId = req.body.userId;
    }

    db.Quiz.findAll({
      where: {userId : req.body.userId},
      include: [db.User]
    }).then(function(quizResponse) {
      if (quizResponse.length)
        res.render("cms", {
          successMessage:"Quizzes for " + quizResponse[0].User.user_name,
          quizzes: quizResponse, 
          viewQuiz:true
        });
    // res.json(quizResponse);
      else
        db.User.findAll({
          where: {id : req.body.userId}
        }).then(function(dbUser) {
          res.render("cms", {
            errorMessage:"No Quizzes for " + dbUser[0].user_name
          });
        });
    });
  });

  // post route loads questions to edit for a requested quiz *
  app.post("/editQuiz", function(req, res) {
    var query = {};
    var encryptedString = quiz_cryptr.encrypt(req.body.quizId); // encrypting to test
    try {
        var decryptedString = quiz_cryptr.decrypt(encryptedString);

        query = { QuizId : decryptedString};

        db.Question.findAll({
          where:query,
          include: [db.Quiz]
        }).then(function(data) {
          console.log("data : " + JSON.stringify(data));     
          if (!data || !data.length){
            query = { id : decryptedString};
            db.Quiz.findAll({ // pass back Quiz info to edit/delete
              where:query
            }).then(function(data) {
              res.render("cms",{
                dbQuiz:data, 
                loginError: "No questions to edit.", 
                editQuestions:true, 
                quiz_name:data[0].quiz_name, 
                userId: data[0].UserId, 
                quizId:data[0].id});
            });
          } else{   
            res.render("cms",{
              dbQuestion: data, 
              quiz_name:data[0].Quiz.quiz_name, 
              quizId: data[0].Quiz.id,
              userId: data[0].Quiz.UserId, 
              editQuestions:true});
          }
        });
    }
    catch(err) {
        decryptedString = 0;
          res.render("cms",{loginError: "Incorrect quiz id passed."});            
    }                     
  });
  // when authenticating userName and password passed, if successful, route to cms page else error
  // use post here to "hide" values passed back to route. *
  app.post("/authenticate", function(req, res) {
    var query = {};
    if (req.body.userName && req.body.password) {
      query = { user_name : req.body.userName,
                password : req.body.password };
      db.User.findAll({
        where:query
      }).then(function(data) {
        //console.log("user_name : " + data[0].user_name);      
        if (!data || !data.length){
          res.render("index",{loginError: "Incorrect Username and/or password."});
        } else{
          console.log("**** userid:" + data[0].id)
          res.render("cms",{userName: data[0].user_name, userId: data[0].id});
        }
      });
    } else {
      res.render("index",{loginError: "Please enter Username and password."});
    }
  });

  // route loads a requested survey page
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
        res.render("survey",{loginError: "Incorrect survey id. No Survey id entered."}); 
      }           
  });

  // route loads questions for a quiz ID passed
  app.post("/quiz", function(req, res) {

    if (req.body.quizId) {
        var query = {};
        var encryptedString = quiz_cryptr.encrypt(req.body.quizId);
        console.log("*** encrypted quiz ID: " + encryptedString);      

        try {                  
            var decryptedString = quiz_cryptr.decrypt(encryptedString);

            query = {QuizId : decryptedString};
            console.log("******* decryptedString =" + decryptedString);      
            query.QuizId = decryptedString;
            db.Question.findAll({
              where: query,
              include: [db.Quiz]
            }).then(function(dbQuestion) {
              if (!dbQuestion || !dbQuestion.length){
                res.render("quiz",{quizIdError: "Incorrect Quiz id. Ask your Administrator for a valid Quiz ID."});
              } else{   
                res.render("quiz", {dbQuestion: dbQuestion, quiz_name:dbQuestion[0].Quiz.quiz_name, quizId:decryptedString});
              }
              
            });
        }
        catch(err) {
              res.render("quiz",{quizIdError: "Incorrect quiz id. Ask your Administrator for a valid Quiz ID."});            
        }                        
    } else{
      res.render("quiz", {quizIdError: "No Quiz id entered. Please try again."});
    }
  });

  // post route for registering user
  app.post("/register", function(req, res) {
    if (req.body.userName && req.body.password) {
      db.User.create({
        user_name : req.body.userName,
        password : req.body.password
      }).then(function(data) {
        console.log("New user: " + JSON.stringify(data));
        res.render("cms", {userName: data.user_name, userId: data.id})
      });
    }
    else {
      res.render("register",{registerError: "Please try Again"});//need to add handlebars into page
    };
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
      res.render("createQuizzes", {errorMessage: "Please try again. A quiz name is required."});
    }
  });

  // POST route for making a new question, requires quizID, question and answer
  app.post("/addQA", function(req, res) {
            
    if (req.body.quizId  && req.body.question && req.body.answer) {
      db.Question.create({
      QuizId: parseInt(req.body.quizId),
      Question: req.body.question,
      Answer:req.body.answer
      }).then(function(data) {

        db.Question.findAll({
          where:{QuizId: parseInt(req.body.quizId)},
          include: [db.Quiz]
        }).then(function(data) {
          console.log("data : " + JSON.stringify(data));     
          if (!data || !data.length){
            query = { id : decryptedString};
            db.Quiz.findAll({ // pass back Quiz info to edit/delete
              where:query
            }).then(function(data) {
              res.render("cms",{dbQuiz:data, loginError: "No questions to edit.", editQuestions:true, quiz_name:data[0].quiz_name, quizId:data[0].id});
            });
          } else{   
            res.render("cms",{

              dbQuestion: data, 
              quiz_name:data[0].Quiz.quiz_name, 
              quizId: data[0].Quiz.id, 
              editQuestions:true,
              successMessage:"question added to quiz"});
          }
        });

      });
    } else{
      res.render("cms", {errorMessage: "Please try again. A quiz name and its answer are required."});
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
        id: req.body.questionId,
      }
      }).then(function(answerAdded) {
        //add check for change to ensure things went well...future
        res.render("questionMaker", {nextQuestion: true});
      });
    } else{
      console.log(req.body);
      res.render("answers", {answerError: "Please try again. An answer is required."});
    }
  });

    // returns to cms page to load partial createQuizzes *
  app.get("/createQuizzes", function(req,res){
    res.render("cms",{createQuiz:true});
  });

    // POST route for getting questions to update
  app.post("/getQuestions", function(req, res) {
    var query = {};
    if (req.body.id) {
      query.QuizId = req.body.id;
    }
    db.Question.findAll(
      {
        where: query,
        include: [db.Quiz]
      }).then(function(dbQuestion) {
        // console.log(JSON.stringify(dbQuestion));
        res.render(req.body.pageName, {dbQuestion:dbQuestion})
      });
  });

     // POST route for updating a quiz name when passed quiz id, new quiz name
  app.post("/editQuestion", function(req, res) {
    var query = {};
    if (req.body.id) {
      query.id = req.body.id;
    }

      db.Question.update({
        Question:req.body.question,        
        Answer: req.body.answer
      }, {
      where: {
        id: req.body.id}
      }).then(function(dbQuestion) {

        db.Question.findAll(
          {
            where: {QuizId:req.body.quizId},
            include: [db.Quiz]
          }).then(function(dbQuestion) {
            // console.log(JSON.stringify(dbQuestion));
            res.render("cms", {
              successMessage:"updated Question and Answer for Quiz ID:" + req.body.quizId, 
              dbQuestion:dbQuestion, 
              quiz_name: dbQuestion[0].dataValues.Quiz.quiz_name,
              quizId:req.body.quizId, 
              editQuestions:true})            
          });
          console.log("qname:" + dbQuestion[0].dataValues.Quiz.quiz_name);
        
      });
  }); 

     // POST route for updating a question when passed question id, question and answer
  app.post("/editQuizName", function(req, res) {
    var query = {};
    if (req.body.quizId) {
      query.id = req.body.quizId;
    }

      db.Quiz.update({
        quiz_name:req.body.quiz_name
      }, {
      where: {id:req.body.quizId}
      }).then(function(dbQuestion) {

        db.Question.findAll(
          {
            where: {QuizId:req.body.quizId},
            include: [db.Quiz]
          }).then(function(dbQuestion) {
            // console.log(JSON.stringify(dbQuestion));
            res.render("cms", {
              successMessage:"updated quiz name for Quiz ID:" + req.body.quizId, 
              dbQuestion:dbQuestion, 
              quiz_name: dbQuestion[0].dataValues.Quiz.quiz_name,
              quizId:req.body.quizId, 
              editQuestions:true})            
          });
      });
  });

  // DELETE route for deleting a single question
  app.post("/deleteQuestion", function(req, res) {

    db.Question.destroy({
      where: {
        id: req.body.questionId
      }
    }).then(function(destroyed) {
        db.Question.findAll(
          {
            where: {QuizId:req.body.quizId},
            include: [db.Quiz]
          }).then(function(dbQuestion) {
            if (dbQuestion.length>0){
            res.render("cms", {
              successMessage:"Question deleted for Quiz ID:" + req.body.quizId, 
              dbQuestion:dbQuestion, 
              quiz_name: dbQuestion[0].Quiz.quiz_name,
              quizId:req.body.quizId, 
              editQuestions:true});     
            } else {
            res.render("cms", {
              errorMessage:"Question deleted for Quiz ID:" + req.body.quizId, 
              loginError: "No questions to edit.",               
              quiz_name: req.body.quiz_name,
              userId:req.body.userId,
              quizId:req.body.quizId, 
              editQuestions:true});   
            }
          });
    });

  });

    // DELETE route for deleting a quiz *
  app.post("/deleteQuiz", function(req, res) {

          db.Quiz.destroy({
            where: {
              id: req.body.quizId
            }
          }).then(function(destroyed) {
              console.log("entered here");
              db.Quiz.findAll({
                where: {UserId:req.body.userId},
                include: [db.User]
              }).then(function(quizResponse) {
                res.render("cms", {
                  successMessage:"Quiz ID:" + req.body.quizId + " deleted.", 
                  quizzes: quizResponse, 
                  viewQuiz:true});
              });
          });

  });

};

