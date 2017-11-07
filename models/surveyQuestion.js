module.exports = function(sequelize, DataTypes) {
  var SurveyQuestion = sequelize.define("SurveyQuestion", {
    	Question: DataTypes.STRING,
      Category: DataTypes.STRING // see below
    },{
    timestamps:false
  });

  SurveyQuestion.associate = function(models) {
    // We're saying that a Survey question should belong to a Survey
    // A Survey Question can't be created without an Survey due to the foreign key constraint
    SurveyQuestion.belongsTo(models.Survey, {
      foreignKey: {
        allowNull: false
      }      
    });
  }; 

  return SurveyQuestion;
};

// the most common types of survey questions.
// Closed-ended questions. ...
// Rating scale questions. ...
// Likert-type scales. ...
// Semantic differential. ...
// Multiple choice questions. ...
// Rank order questions. ...
// Dichotomous questions. ...
// Open-ended questions.
