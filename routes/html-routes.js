var path = require('path');
var db = require("../models");

module.exports = function(app) {
  // goes to home page when accessing home page of site
  app.get("/", function(req, res) {
    res.render("index");
  });

  app.get("/register", function(req, res){
    res.render("register");
  });

  // cms route loads cms.handlebars
  app.get("/cms", function(req, res) {
    res.render("cms");
  });
      // route loads quiz.handlebars page
  app.get("/quiz", function(req, res) {
    res.render("quiz");
  }); 

  // get route loads quiz.handlebars when accessed through menu system *
  app.get("/quiz", function(req, res) {
    res.render("quiz");
  });  

  // route loads quiz.handlebars when accessed through menu system *
  app.get("/survey", function(req, res) {
    res.render("survey");
  }); 

  app.get("/questionMaker", function(req,res){
    res.render("questionMaker");
  });

  app.get("/answers", function(req,res){
    res.render("answers");
  }); 

  // route loads apiInfo.handlebars informational page on how to use our API
  app.get("/apiInfo", function(req, res) {
    res.render("apiInfo");
  });

  // route loads about.handlebars informational page on the contributing team
  app.get("/about", function(req, res) {
    res.render("about");
  });

};

