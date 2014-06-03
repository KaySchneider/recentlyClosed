'use-strict';
(function() {
    var app = angular.module('recentlyClosedServices', []);

    app.directive('recentlyClosed', [function()  {
      return {
            restrict : 'E',
            templateUrl: '/app/popup/templates/historyItem.html',
            controller: ["backgroundApi","$scope", function(backgroundApi, $scope) {
                $scope.history = [];
                $scope.activeIndex = null;
                backgroundApi.getClosed().then(function(data) {
                    $scope.history = data.tabs;
                });

            }],
            controllerAs: 'page'
      };
    }]);
})();
