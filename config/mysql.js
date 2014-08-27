
exports.default = {

  mySQL: function (api) {

    return {
      database    : "construction",
      dialect     : "mysql",
      port        : 3306,
      pool        : {
        maxConnections : 20,
        maxIdleTime    : 30000
      },
      replication : {
        write: {
          host     : "127.0.0.1",
          username : "root",
          password : "mch321741",
          pool     : {}
        },
        read: [
          {
            host     : "127.0.0.1",
            username : "root",
            password : "mch321741",
            pool     : {}
          }
        ]
      }

    };

  }

};
