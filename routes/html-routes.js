var path = require('path');
var db = require("../models");

module.exports = function(app) {

  // goes to home page when accessing home page of site
  app.get("/", function(req, res) {
    res.render("index-b");
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

};