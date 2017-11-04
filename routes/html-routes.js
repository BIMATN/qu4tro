var path = require('path');
var db = require("../models");

module.exports = function(app) {

  // goes to home page when accessing home page of site
  app.get("/", function(req, res) {
    /*res.sendFile(path.join(__dirname, "../public/index.html"));*/
    res.render("index-b");
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

  // cms route loads cms.handlebars
  app.get("/cms", function(req, res) {
    /*res.sendFile(path.join(__dirname, "../public/cms.html"));*/
    res.render("cms");
  });

  // route loads quiz.handlebars
  app.get("/quiz", function(req, res) {
    /*res.sendFile(path.join(__dirname, "../public/quiz.html"));*/
    res.render("quiz-b");
  });

  // route loads quiz.handlebars
  app.get("/survey", function(req, res) {
    /*res.sendFile(path.join(__dirname, "../public/survey.html"));*/
    res.render("quiz-b");
  });  

  // route loads apiInfo.handlebars informational page on how to use our API
  app.get("/apiInfo", function(req, res) {
    /*res.sendFile(path.join(__dirname, "../public/apiInfo.html"));*/
    res.render("apiInfo");
  });    

  // when passed quizID, find the questions and route to quiz.handlebars to handle quiz taking
  // app.get("/quiz/:id?", function(req, res){
  //   var filePath = path.join(__dirname,"../public/quiz.html");
  //   res.sendFile(filePath);
  // });

};