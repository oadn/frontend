(function() {
  'use strict';

  angular
    .module('frontend')
    .controller('RegisterController', RegisterController);

  /** @ngInject */
  function RegisterController($scope) {
    $scope.data={};
    $scope.formTitle = "Register";
    $scope.tabIndex = 0;
    $scope.aliases = [];
    $scope.alias = {};

    $scope.next = function() {
      if($scope.tabs.length > $scope.tabIndex)
      $scope.tabIndex++;
    };

    $scope.prev = function() {
      if($scope.tabs.length < $scope.tabIndex)
      $scope.tabIndex--;
    };

    $scope.add = function() {
      $scope.aliases.push(angular.extend({}, $scope.alias));
      $scope.alias = {};
    }

    $scope.rm = function(index) {
      $scope.aliases.splice(index, 1);
    }

    $scope.tabs = [
      {
        title: 'Sign In Data',
        src: 'templates/signInData.html'
        /*submit: $scope.next,
        fields: {
          //ids: [{type: Schema.Types.ObjectId, ref: 'id'}],
          //aliases: [{type: Schema.Types.ObjectId, ref: 'alias'}],
          mail: {
            inputType: 'email',
            label: 'Mail',
            required: true
          },
          name: {
            inputType: 'text',
            label: 'User Name'
          },
          pass: {
            inputType: 'password',
            label: 'Password'
          },
          confirm: {
            inputType: 'password',
            label: 'Confirm Password'
          }
        }*/
      },
      {
        title: 'Create Aliases',
        src: 'templates/aliases.html'
      }
    ]
    /*$scope.formFields = {
      user: {
        inputType: 'text',
        label: 'User Name'
      },
      pass: {
        inputType: 'password',
        label: 'Password',
        required: true
      }
    }*/
  }
})();
