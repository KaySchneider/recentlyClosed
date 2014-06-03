'use-strict';
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
                        store.history=data;
                    });
            }],
            controllerAs: 'page'
        }
    }]);
    app.directive('ihistoryOpen', [ function() {
        return {
            restrict: 'A',
            link: function(scope, element, attrs) {
                element.bind('click', function() {
                   chrome.tabs.create({url: scope.item.url, active:false});
                });
            }
        }
    }]);
})();
