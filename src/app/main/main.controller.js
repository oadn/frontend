(function() {
  'use strict';

  angular
    .module('frontend')
    .controller('MainController', MainController);

  /** @ngInject */
  function MainController($scope, ioFactrory) {
    var io = ioFactrory();
    io.emit('schema', 'alias');
    io.on('schema:alias', function(schema) {
      $scope.sockMsg = schema;
    })
  }
})();
