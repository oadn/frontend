(function() {
  'use strict';

  angular
    .module('frontend')
    .controller('LoginController', LoginController);

  /** @ngInject */
  function LoginController($scope) {
    $scope.formTitle = "Login";
    $scope.formFields = {
      user: {
        inputType: 'text',
        placeholder: 'User Name'
      },
      pass: {
        inputType: 'password',
        required: true
      }
    }
  }
})();
