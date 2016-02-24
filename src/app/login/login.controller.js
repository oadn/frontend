(function() {
  'use strict';

  angular
    .module('frontend')
    .controller('LoginController', LoginController);

  /** @ngInject */
  function LoginController($scope) {
    $scope.data={};
    $scope.formTitle = "Login";
    $scope.formFields = {
      user: {
        inputType: 'text',
        label: 'User Name'
      },
      pass: {
        inputType: 'password',
        label: 'Password',
        required: true
      }
    }
  }
})();
