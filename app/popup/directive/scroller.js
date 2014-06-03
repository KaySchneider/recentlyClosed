'use-strict';
(function() {
    var app = angular.module('scrollerDirective', []);
    app.directive('scrollKeyboard', [function() {
        return {
            restrict: 'E',
            controller: [ "$scope", function($scope) {
                $scope.handlekeyPressed = function(keyString) {
                    /**
                     * move up or down the "active" class on the items!
                     */
                    if(keyString == 'enter') {
                        if($scope.activeIndex != null) {
                            chrome.tabs.create({url: $scope.historyFiltered[$scope.activeIndex].url, active:true});
                        }
                    }
                    if($scope.activeIndex == null) {
                        if(keyString == 'down') {
                            $scope.activeIndex = 0;
                            $scope.$apply();
                        }
                    } else {
                        if(keyString == 'down') {
                            if($scope.activeIndex + 1 <= $scope.history.length) {
                                $scope.activeIndex++;
                                $scope.$apply();
                            }
                        } else if(keyString == 'up') {
                            if($scope.activeIndex - 1 >= 0) {
                                $scope.activeIndex--;
                                $scope.$apply();
                            }
                        }
                    }
                };
                document.onkeydown = function(ev) {
                    var keypressed = null;
                    switch(ev.keyCode) {
                        case 40:
                            keypressed = 'down';
                            break;
                        case 38:
                            keypressed = 'up';
                            break;
                        case 13:
                            keypressed = 'enter';
                            break;
                    }
                    if(keypressed != null) {
                        $scope.handlekeyPressed(keypressed);
                    }
                };
            }]
        }
    }]);
    app.directive('scroller', [ function () {
        return {
            restrict: 'A',
            link: function (scope, element, attrs) {
                scope.$watch('activeIndex', function() {
                    if(scope.activeIndex == scope.$index) {
                        //element.scrollIntoView(true);
                        document.getElementById(scope.$index+'urlItem').scrollIntoView(false);

                    }
                });
            }
        }
    }]);
    app.directive('focusMe', function() {
       return {
           restrict: 'A',
           link: function(scope, element, attrs) {
               element[0].focus();
           }
       }
    });
})();
