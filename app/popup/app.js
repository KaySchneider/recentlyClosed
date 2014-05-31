'use-strict';
(function() {
    var app = angular.module('historyBack', ['services-controllers', 'factorys', 'historyViews']);
    app.controller('AppCtrl' , ["$scope", "$log","historyApi",
        function($scope, $log, historyApi) {
            this.name = "HEY";
        }]);
})();

