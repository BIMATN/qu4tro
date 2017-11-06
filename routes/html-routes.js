var path = require('path');
var db = require("../models");

module.exports = function(app) {

  // goes to home page when accessing home page of site
  app.get("/", function(req, res) {
    // res.sendFile(path.join(__dirname, "../public/index.html"));
    res.render("index-b");
  });

  // cms route loads cms.handlebars
  app.get("/cms", function(req, res) {
    // res.sendFile(path.join(__dirname, "../public/cms.html"));
    res.render("cms");
  });



  // route loads quiz.handlebars
  app.get("/survey/:id?", function(req, res) {
    // res.sendFile(path.join(__dirname, "../public/survey.html"));
    res.render("quiz-b");
  });  

  // route loads apiInfo.handlebars informational page on how to use our API
  app.get("/apiInfo", function(req, res) {
    // res.sendFile(path.join(__dirname, "../public/apiInfo.html"));
    res.render("apiInfo");
  });    

};