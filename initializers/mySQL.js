var Sequelize = require("sequelize");
var SequelizeFixtures = require('sequelize-fixtures');

exports.mySQL = function(api, next){

  api.mySQL = {
    _start: function(api, next){
      var self = this;

      api.mySQL.sequelize = new Sequelize(api.config.mySQL.database, 'root', 'mch321741');
      console.log('conected to db');
      api.models = {
        users: api.mySQL.sequelize.import(__dirname + "/../models/users.js"),
        //slug: api.mySQL.sequelize.import(__dirname + "/../models/slug.js"),
        // ...
      };

      if(api.env === "test"){
        SequelizeFixtures.loadFile(__dirname + '/../test/fixtures/*.json', api.models, function(){
          self.test(next);
        });
      }else{
        self.test(next);
      }
    },

    _teardown: function(api, next){
      next();
    },

    test: function(next){
      api.models.users.count().success(function(count){
        api.log("Connected to DB and coutned " + count + " users.");
        next();
      }).error(function(e){
        api.log(e, 'warning');
        process.exit();
      });
    }
  };

  next();
};
