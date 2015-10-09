(function() {
  'use strict';

  angular
    .module('frontend')
    .run(runBlock);

  /** @ngInject */
  function runBlock($log, $rootScope) {

    $log.debug('runBlock end');
    $rootScope.$on('$stateChangeError',
      function(event, toState, toParams, fromState, fromParams, error){
        $log.info('change error');
        console.log(error); }
    );

    $rootScope.$on('$stateNotFound',
function(event, unfoundState, fromState, fromParams){
  $log.info('change not found');
    console.log(unfoundState.to); // "lazy.state"
    console.log(unfoundState.toParams); // {a:1, b:2}
    console.log(unfoundState.options); // {inherit:false} + default options
});

$rootScope.$on('$stateChangeStart',
function(event, toState, toParams, fromState, fromParams){
  $log.info('change start');
    console.log(toState);
    console.log(fromState);
});

$rootScope.$on('$stateChangeSuccess',
  function(event, toState, toParams, fromState, fromParams){
    $log.info('change success');
    console.log(toState);
    console.log(fromState);
  }
);
  }

})();
