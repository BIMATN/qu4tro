module.exports = function(sequelize, DataTypes) {
  var Customer = sequelize.define("Customer", {
    	customer_name: DataTypes.STRING
    }, {
    timestamps:false
  });

  Customer.associate = function(models) {
    // We're saying that a burger should belong to an customer
    // but a burger can be created without a customer
    Customer.hasMany(models.Burger,{     
    });
  };

  return Customer;
};
