'use strict';

angular.module('mean.shopAdmin').factory('userService', ['$http', '$resource',
  function($http, $resource) {

    return {
        searchUsers: function(roles, email, name){
            if(email === undefined)
                email='';
            if(name === undefined)
                name='';
            if(roles === undefined)
                roles='';
            var searchRequest = $resource('/auth/search/user', {}, {
                'get': {method: 'GET', isArray: true}
            });
            var searchResponse = searchRequest.get({roles: roles, email: email, name: name});
            return searchResponse;
        },
        getUserById: function(userId) {
            var userById = $resource('/auth/user/:userId', {userId:'@userId'});
            return userById.get({userId: userId});
        },
        changeUserPassword: function(userId, password) {
            //var changePassword = $resource('/auth/user/:userId/:password', {userId: '@userId', password: '@password'});
            //return changePassword.put({userId: userId, password: password});
            var changePassword = $resource('/auth/user/changePassword', {userId: '@userId', password: '@password'}, {
                'update': {method: 'PUT'}
            });
            return changePassword.update({userId: userId, password: password});
        }
    };
  }
]);