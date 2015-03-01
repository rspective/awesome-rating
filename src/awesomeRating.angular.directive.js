(function($) {
    angular.module('awesome-rating', []).directive('awesomeRating', ['$timeout', function($timeout) {
        return {
            restrict: 'A',
            scope: {
                awesomeRating: '=',
                awesomeRatingOptions: '='
            },
            link: function($scope, element) {
                var options = $scope.awesomeRatingOptions || {};
                options.valueInitial = $scope.awesomeRating;
                // Apply jquery plugin
                $element = $(element).awesomeRating(options)
                    .on('rated', function(event, rate){
                        $timeout(function() {
                            $scope.awesomeRating = rate;
                        });
                    });
                // Apply external changes
                $scope.$watch($scope.awesomeRating, function(value){
                    $element.each(function() { this._awesomeRatingApi.val(value); });
                })
            }
        };
    }]);
})(jQuery);