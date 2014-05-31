(function() {
    var app = angular.module("factorys", []);
    app.factory('historyApi', ['$q',function($q) {
        function readHistory() {
            var defer = $q.defer();
            chrome.history.search({text:'', maxResults:100}, function(result) {
                defer.resolve(result);
            });
            return defer.promise;
        };

        // public API for our historyAPI
        return {
            read: function() {
                return readHistory();
            }
        }

    }]);
})();
