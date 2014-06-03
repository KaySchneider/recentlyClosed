'use-strict';
(function() {
    var app = angular.module("topSiteFac", []);
    app.factory('topSitesApi', ['$q' , function($q) {
        this.history=null;
        var apf = this;
        function getTopSites() {
            var defer = $q.defer();
            chrome.topSites.get(function(pages) {
                defer.resolve(pages);
            });
            return defer.promise;
        };

        // public API for our historyAPI
        return {
            get: function() {
                return getTopSites();
            }
        }

    }]);
})();



