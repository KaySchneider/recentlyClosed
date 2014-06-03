'use-strict';
(function() {
    var app = angular.module('baseUrlServices', []);

    app.directive('baseUrl', [function()  {
        return {
            restrict : 'E',
            templateUrl: '/app/popup/templates/baseUrl.html',
            controller: ["backgroundApi", "$log","$scope",
            function(backgroundApi, $log, $scope) {
                if(! $scope.favIconUrl) {
                    var domain = $scope.item.url.replace('http://','').replace('https://','').split(/[/?#]/)[0];
                    $scope.item.favIconUrl = 'http://' + domain + '/favicon.ico';
                }
            }],
            controllerAs: 'page'
        };
    }]);
})();
