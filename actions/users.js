/**
 * Application    : Zeus Auction Program API (sri-oa-api)
 *
 * Description    : /actions/users.js
 *                  This file is contains user actions.
 *
 * Author         : SRI Incorporated
 *                  8082 Bash Street
 *                  Indianapolis, IN 46250
 *
 *                  Copyright (c) 2014 SRI, Inc.
 */

'use strict';

/**
 * Module dependencies
 */

var bycrept = require('bcrypt');

exports.userList = {
  name: 'userList',
  description: 'returns a list of users',
  inputs: {
    required: [],
    optional: []
  },
  authenticated: false,
  outputExample: {},
  version: 1.0,
  run: function ( api, connection, next ) {
    api.models.users.findAll().success( function (data) {
      api.log(data);
      connection.response.data = data;
      next(connection, true);
    }).error( function (error) {
      api.log(error, 'warning');
      process.exit();
    });
  }
};

exports.user = {
  name: 'user',
  description: 'returns a user by id',
  inputs: {
    required: ['id'],
    optional: []
  },
  authenticated: false,
  outputExample: {},
  version: 1.0,
  run: function ( api, connection, next ) {
    api.models.users.find({ where: { id : connection.params.id } }).success( function (data) {
      api.log(data);
      connection.response.data = data;
      next(connection, true);
    }).error( function (error) {
      console.log(JSON.stringify(error));
      api.log(error, 'warning');
      process.exit();
    });
  }
};

exports.userDelete = {
  name: 'userDelete',
  description: 'deletes a user by id',
  inputs: {
    required: ['id'],
    optional: []
  },
  authenticated: false,
  outputExample: {},
  version: 1.0,
  run: function ( api, connection, next ) {
    api.models.users.destroy({ id : connection.params.id }).success( function (data) {
      api.log(data);
      connection.response.data = data;
      next(connection, true);
    }).error( function (error) {
      api.log(error, 'warning');
      process.exit();
    });
  }
};

exports.userCreate = {
  name: 'userCreate',
  description: 'Creates a user',
  inputs: {
    required: ['first_name', 'last_name', 'password'],
    optional: []
  },
  authenticated: false,
  outputExample: {},
  version: 1.0,
  run: function ( api, connection, next ) {
    api.models.users.create(connection.params).success( function (data) {
      api.log(data);
      connection.response.data = data;
      next(connection, true);
    }).error( function (error) {
      api.log(error, 'warning');
      process.exit();
    });
  }
};


exports.userUpdate = {
  name: 'userUpdate',
  description: 'Update a user',
  inputs: {
    required: ['id'],
    optional: ['first_name', 'last_name']
  },
  authenticated: false,
  outputExample: {},
  version: 1.0,
  run: function ( api, connection, next ) {
    api.models.users.update(connection.params,
    {
      id: connection.params.id
    }).success( function (data) {
      api.log(data);
      connection.response.data = data;
      next(connection, true);
    }).error( function (error) {
      api.log(error, 'warning');
      process.exit();
    });
  }
};

exports.userAuthenticate = {
  name: 'userAuthenticate',
  description: 'Authenticate a user',
  inputs: {
    required: ['id', 'password'],
    optional: []
  },
  authenticated: false,
  outputExample: {},
  version: 1.0,
  run: function ( api, connection, next ) {
    api.models.users.login(
      connection.params.id,
      connection.params.password,
      function (error, res) {
        console.log('Error: ' + JSON.stringify(error));
        if (error) {
          api.log(error, 'warning');
          connection.response.data = res;
          next(connection, true);
        } else {
          api.log(res);
          connection.response.data = res;
          next(connection, true);
        }
    });
  }
};
