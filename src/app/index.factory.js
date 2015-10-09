(function() {
  'use strict';

  angular
    .module('frontend')
    .factory('io', function(socketFactory) {
      return socketFactory();
    });

})();
