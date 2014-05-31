(function() {
    var app = angular.module('historyViews', []);
    app.directive('historyView', [ function() {
        return {
            restrict: 'E',
            templateUrl: '/app/popup/templates/historyItem.html',
            controller: ['historyApi', '$log',
                function(historyApi, $log) {
                    this.history = [];
                    store = this;
                    historyApi.read().then(function(data) {
                        $log.info(data, "MEH");
                        store.history=data;
                    });
            }],
            controllerAs: 'page'
        }
    }]);
})();
