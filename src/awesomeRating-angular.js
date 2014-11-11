angular.module('awesome-rating', []).directive('awesomeRating', function() {
    return {
        restrict: 'A',
        scope: {
            awesomeRating: '=',
            awesomeRatingOptions: '@'
        },
        link: function($scope, element) {
            var options = ($scope.awesomeRatingOptions && JSON.parse($scope.awesomeRatingOptions)) || { };
            options.valueInitial = $scope.awesomeRating;
            $(element).awesomeRating(options)
                .on('rated', function(event, rate){
                    $scope.$apply(function() {
                        $scope.awesomeRating = rate;
                    });
                });
        }
    };
});