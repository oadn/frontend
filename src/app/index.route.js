(function() {
  'use strict';

  angular
    .module('frontend')
    .config(routeConfig);

  /** @ngInject */
  function routeConfig($stateProvider, $urlRouterProvider) {
    $stateProvider
      .state('home', {
        url: '/',
        templateUrl: 'app/main/main.html',
        controller: 'MainController'
      })
      .state('home.login', {
        url: 'logIn',
        templateUrl: 'app/login/login.html',
        controller: 'LoginController'
      });

    $urlRouterProvider.otherwise('/');

  }

})();
