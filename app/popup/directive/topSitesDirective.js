'use-strict';
(function() {
    var app = angular.module('topSitesServices', []);
    app.directive('topSites', [function()  {
        return {
            restrict : 'E',
            templateUrl: '/app/popup/templates/historyItem.html',
            controller: ["topSitesApi", "$scope", function(topSitesApi, $scope) {
                $scope.activeIndex = null;
                $scope.history = [];
                topSitesApi.get().then(function(data) {
                    $scope.history = data;
                });
            }],
            controllerAs: 'page'
        };
    }]);
})();

