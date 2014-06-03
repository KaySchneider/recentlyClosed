'use-strict';
(function() {
    var app = angular.module('historyBack', ['factorys',
                                             'historyViews','ui.router', 'tabbedMenu',
                                              'recentlyClosedServices', 'baseUrlServices',
                                              'topSitesServices', 'topSiteFac', 'scrollerDirective'
    ]);
    app.config(["$stateProvider", "$urlRouterProvider",
        function($stateProvider, $urlRouterProvider) {
            $urlRouterProvider.otherwise("/closed");
            //states
            $stateProvider
                .state('history', {
                    url: "/history",
                    templateUrl: "/app/popup/templates/history.html",
                    controller: 'AppCtrl'
                })
                .state('closed', {
                    url: "/closed",
                    templateUrl: "/app/popup/templates/closed.html",
                    controller: 'AppCtrl'
                })
                .state('topsites', {
                    url: "/topsites",
                    templateUrl: "/app/popup/templates/topSites.html",
                    controller: 'AppCtrl'
                })


            ;
    }]);
    app.controller('AppCtrl' , ["$scope", "$log","historyApi",
        function($scope, $log, historyApi) {

        }]);
    app.controller('searchFormController', [ function() {

    }]);
})();

