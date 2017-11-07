module.exports = function(sequelize, DataTypes) {
  var Survey = sequelize.define("Survey", 
    {survey_name: DataTypes.STRING }, 
    {timestamps:false}
  );

  Survey.associate = function(models) {
    // We're saying that a burger should belong to an customer
    // but a burger can be created without a customer
    Survey.hasMany(models.SurveyQuestion,{     
    });
  };

  Survey.associate = function(models) {
    // We're saying that a User should belong to an Survey
    // A Survey can't be created without a User due to the foreign key constraint
    Survey.belongsTo(models.User, {
      foreignKey: {
        allowNull: false
      }      
    });
  };

  return Survey;
};
