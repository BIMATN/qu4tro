// *****************************************************************************
// **** api-routes.js - this file offers a set of routes for displaying and
// saving data to the db
// ******************************************************************************
// *** Dependencies

// Requiring our models
var db = require("../models");

// Routes =============================================================
module.exports = function(app) {
  // GET route for getting all of the burgers
  app.get("/" || "/api/burgers", function(req, res) {
    var query = {};

    // findAll returns all burger entries when used with no options
    db.Burger.findAll({
      include:[db.Customer]   
    }).then(function(dbBurger) {
        db.Customer.findAll({}).then(function(dbCustomer) {
              var hbsObject = {
                burgers: dbBurger,
                customers: dbCustomer,
              };
              // We have access to the burgers as an argument inside of the callback function
              res.render("index", hbsObject); 
        });
    })

  });

  // POST route for saving a new burger
  app.post("/api/burgers", function(req, res) {
    db.Burger.create(req.body).then(function(dbBurger) {
      res.json(dbBurger);
    });

  });

  // DELETE route for deleting burgers. We can get the id of the burger to be deleted
  // from req.params.id
  app.delete("/api/burgers/:id", function(req, res) {
    // Destroy takes in one argument: a "where object describing the burgers we want to destroy
    db.Burger.destroy({
      where: {
        id: req.params.id
      }
    })
    .then(function(dbBurger) {
      res.json(dbBurger);
    });

  });

  // PUT route for updating burgers. We can get the updated burger data from req.body
  app.put("/api/burgers", function(req, res) {
    var newBody = req.body;    
 
    if (!req.body.CustomerId){
      newBody = {
        id: req.body.id,
        devoured: req.body.id
      }
    console.log("***>>" + JSON.stringify(newBody) + "<<***");         
    }
    db.Burger.update(
       newBody,
      {
        where: {
          id: req.body.id
        }
    }).then(function(dbBurger) {
        res.json(dbBurger);
    });

  });  
};
 