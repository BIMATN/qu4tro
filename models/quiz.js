module.exports = function(sequelize, DataTypes) {
  var Quiz = sequelize.define("Quiz", 
    {quiz_name: DataTypes.STRING }, 
    {timestamps:false}
  );

  Quiz.associate = function(models) {
    // We're saying that a question should belong to an quiz
    // but a quiz can be created without a question
    Quiz.hasMany(models.Question,{     
    });
  };

  Quiz.associate = function(models) {
    // We're saying that a User should belong to an Quiz
    // A Quiz can't be created without an User due to the foreign key constraint
    Quiz.belongsTo(models.User, {
      foreignKey: {
        allowNull: false
      }      
    });
  };

  return Quiz;
};
