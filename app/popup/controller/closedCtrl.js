'use-strict';
(function() {
    var app = angular.module('services-controllers', []);
    app.controller('ClosedCtrl', ["backgroundApi", function(backgroundApi) {
        this.history = [];
        var store = this;
        backgroundApi.getClosed().then(function(data) {
            store.history = data.tabs;
            console.log(data, "DATA");
        });
    }]);
})();

