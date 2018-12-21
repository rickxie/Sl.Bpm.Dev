var app = app || angular.module('sysdesigner', [
    'ngSanitize',
    'ui.bootstrap',
    'ui.router',
    'ngAnimate',
    'mabp',
    'app.shared',
    'mabp.orgChart',
    'pascalprecht.translate', 'ng-sortable'
]);

app && (function () {

    app.config(['$translateProvider', function ($translateProvider) {
        $translateProvider.translations('en', mabp.localization['Bpm.en']);
        $translateProvider.translations('zh-CN', mabp.localization['Bpm.zh-CN']);
        $translateProvider.preferredLanguage('zh-CN');
    }]);

    app.config(['$stateProvider', '$urlRouterProvider',  function ($stateProvider, $urlRouterProvider ) {
        $urlRouterProvider.otherwise('/');
            $stateProvider
                .state('home', {
                    url: '/:workflowId',
                    templateUrl: _turl('/App/sysdesigner/views/home/index.html')
                });

        }
    ]);

    app.controller('layoutController', [
        '$rootScope', function($rootScope) {
            var vm = this;
            $rootScope.activeEnterprise = null;
        }
    ]);


    app.controller('headerController', [
        '$rootScope', 'mabp.app.system', 'appSession', '$translate', function ($rootScope, service, appSession, $translate) {
            var vm = this;
       
            vm.load = function() {
                appSession.endLoad = function (result) {
                    vm.model = result;
                    app.language = result.language;
                    $translate.use(result.language);
                }
            }
            vm.load();
        }
    ]);
    app.dialogs = _shared.buildDialog();
})();