'use-strict';
(function() {
    var app = angular.module("factorys", []);
    app.factory('historyApi', ['$q','$timeout',function($q, $timeout) {
        this.history=null;
        var apf = this;
        function readHistory() {
            var defer = $q.defer();
            $timeout(function() {
                console.log("HU", apf);
                if(apf.history != null) {
                    defer.resolve(this.history);
                }
            }, 0);
            chrome.history.search({text:'', maxResults:25}, function(result) {
                apf.history = result;
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
