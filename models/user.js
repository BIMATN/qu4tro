module.exports = function(sequelize, DataTypes) {
  var User = sequelize.define("User",{
      user_name: DataTypes.STRING,
      password:DataTypes.STRING,
      role: DataTypes.STRING    
    }, {
    timestamps:false
  });

  User.associate = function(models) {
    // We're saying that a burger should belong to an customer
    // but a burger can be created without a customer
    User.hasMany(models.Quiz,{     
    });
  };

  return User;
};
