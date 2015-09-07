(function () {
    'use strict';

    angular
        .module('app.core')
        .config(appConfig);

    var config = {
        appErrorPrefix: '[OADN Error] ',
        appTitle: 'OADN'
    };

    appConfig.$inject = ['routerHelperProvider'];
    /* @ngInject */
    function appConfig (routerHelperProvider) {
        routerHelperProvider.configure({mainTitle: config.appTitle});
    }

})();
