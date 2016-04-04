(function() {
  'use strict';

  angular
    .module('frontend')
    .factory('ioFactrory', function(socketFactory) {
      var instance;
      return function() {
        if(!instance) instance = io.connect();
        return instance;
      }
    })
    .factory('user', function($resource) {
      return $resource('/backend/user/:id', {id: '@_id'}, {
        update: {method: 'PUT'}
      });
    })
    .factory('alias', function($resource) {
      return $resource('/backend/alias/:id', {id: '@_id'}, {
        update: {method: 'PUT'}
      });
    });

})();
