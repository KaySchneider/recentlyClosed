'use-strict';
(function() {
    var app = angular.module("factorys");
    app.factory('backgroundApi', ['$q', function($q) {
        function sendMessage(params) {
            var defer = $q.defer();
            chrome.runtime.sendMessage({command: "getClosed", params: params}, function(response) {
                defer.resolve(response);
            });
            return defer.promise;
        };
        // public API for our historyAPI
        return {
            getClosed: function(params) {
                return sendMessage(params);
            }
        };
    }]);
})();


