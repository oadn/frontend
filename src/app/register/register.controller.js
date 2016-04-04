(function() {
  'use strict';

  angular
    .module('frontend')
    .controller('RegisterController', RegisterController)
    .controller('SignInController', SignInController)
    .controller('AliasController', AliasController);

  function RegisterController($scope) {
    $scope.sing;
    $scope.aliases = [];
  }

  /** @ngInject */
  function SignInController($scope, $state, user) {
    $scope.signIn = function() {
      user.save($scope.sign).$promise.then(function(user) {
        $state.go('home.register.alias', {id: user._id});
      });
    }
  }

  function AliasController($scope, $stateParams, alias) {
    $scope.alias = {};
    $scope.add = function() {
      $scope.aliases.push($scope.alias);
      $scope.alias = {user: $stateParams.id};
    }
    $scope.done = function() {
      alias.save
    }
  }
})();
