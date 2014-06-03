'use-strict';
(function() {
    var app = angular.module('tabbedMenu', []);

    app.directive('tabbedMenu', [ function () {
        return {
            restrict: 'E',
            templateUrl: '/app/popup/templates/tabbed-menu.html',
            controller: [ "$rootScope","$location","$scope",
                function ($rootScope,  $location, $scope) {
                    this.currentPath = $location.path().toLowerCase();
                    $scope.path = $location.path().toLowerCase();
                    store = this;
                    this.go = function(route) {
                        $location.path(route);
                        store.currentPath = $location.path().toLowerCase();
                        $scope.path = store.currentPath;
                    };
                }],
            controllerAs: 'tabbed'
        }
    }]);
})();
