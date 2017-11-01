module.exports = function(sequelize, DataTypes) {
  var Question = sequelize.define("Question", {
    	Question: DataTypes.STRING,
      Answer: DataTypes.STRING,
      Category: DataTypes.STRING
    },{
    timestamps:false
  });

  Question.associate = function(models) {
    // We're saying that a Quiz should belong to an Question
    // A Question can't be created without an Quiz due to the foreign key constraint
    Question.belongsTo(models.Quiz, {
      foreignKey: {
        allowNull: false
      }      
    });
  }; 

  return Question;
};
