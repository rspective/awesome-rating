angular.module('awesome-rating', []).directive('awesomeRating', function($timeout) {
    return {
        restrict: 'A',
        scope: {
            awesomeRating: '=',
            awesomeRatingOptions: '@'
        },
        link: function($scope, element) {
            //-- Initialize the options
            var options = ($scope.awesomeRatingOptions && JSON.parse($scope.awesomeRatingOptions)) || { };
            options.valueInitial = $scope.awesomeRating;
            //-- Apply jquery plugin
            $element = $(element).awesomeRating(options)
                .on('rated', function(event, rate){
                    $timeout(function() {
                        $scope.awesomeRating = rate;
                    });
                });
            //-- Apply external changes
            $scope.$watch('awesomeRating', function(value){
                $element.each(function() { this.awesomeRating.val(value); });
            })
        }
    };
});