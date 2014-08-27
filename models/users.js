var bcrypt = require('bcrypt');

module.exports = function(sequelize, DataTypes) {
  return sequelize.define("users",
  {
    id : {
      type          : DataTypes.INTEGER,
      autoIncrement : true,
      primaryKey    : true,
      allowNull     : true
    },
    password : {
      type      : DataTypes.STRING,
      allowNull : false,
      set: function (input) {
        var salt = bcrypt.genSaltSync(10);
        var hash = bcrypt.hashSync(input, salt);

        this.setDataValue('password', hash);
      }
    },
    first_name : DataTypes.STRING,
    last_name  : DataTypes.STRING
  },
  {
    timestamps :  true,
    // hooks: {
    //     beforeCreate: function (user, next) {
    //         user.password = bcrypt.hashSync(user.password, 8);
    //         next()
    //     }
    // },
    classMethods : {
      login: function (id, password, next) {
        if (!(id && password)) {
          return next({
            message: 'Not Authenticated'
          }, false);
        }

        this.find({ where: { id: id } }).success( function (user) {
          if (!user) {
            return next({
              message: 'Not Authenticated'
            }, false);
          }
          console.log(user.dataValues, false, 2);
          if (!bcrypt.compareSync(password, user.dataValues.password)) {
            return next({
              message: 'Not Authenticated'
            }, false);
          }

          return next(null, user);
        });
      }
    }
  });
};
