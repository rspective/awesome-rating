$.fn.awesomeRating = function(options) {
    //-- Normalize passed options
    options = options || {};

    //-- Setup default initial values that can be overridden by passed options
    var defaultOptions = {
        values              : [ 1, 2, 3, 4, 5 ],
        valueInitial        : null,
        cssBase             : 'rating-star fa',
        cssBaseSelected     : 'fa-star',
        cssBaseUnselected   : 'fa-star-o',
        cssValuesSelected   : [ 'first-selected', 'second-selected', 'third-selected', 'forth-selected', 'fifth-selected' ],
        cssValuesUnselected : [ 'first-unselected', 'second-unselected', 'third-unselected', 'forth-unselected', 'fifth-unselected'],
        targetSelector      : null,
        htmlBase            : '<i></i>',
        htmlSelector        : ':last-child',
        htmlEvent           : 'click'
    };

    return this.each(function() {

        //-- Check if plugin is already initialized
        if (this._awesomeRatingApi) { return; }

        //-- Select current element
        var $element = $(this);

        //-- Merge passed options with default values
        var _api = {
            values : {
                list            : options.values || defaultOptions.values || [],
                initial         : options.valueInitial || defaultOptions.valueInitial || null,
                current         : null
            },
            html : {
                base            : options.htmlBase || defaultOptions.htmlBase,
                selector        : options.htmlSelector || defaultOptions.htmlSelector,
                event           : options.htmlEvent || defaultOptions.htmlEvent
            },
            css : {
                base            : options.cssBase || defaultOptions.cssBase,
                selected        : options.cssBaseSelected || defaultOptions.cssBaseSelected,
                unselected      : options.cssBaseUnselected || defaultOptions.cssBaseUnselected,
                values : {
                    selected    : options.cssValuesSelected || defaultOptions.cssValuesSelected || [],
                    unselected  : options.cssValuesUnselected || defaultOptions.cssValuesUnselected || []
                }
            },
            external : {
                $ : {
                    element     : $element,
                    target      : $(options.targetSelector || defaultOptions.targetSelector),
                    rates       : null
                },
                val	: function(value) {
                    if (value === undefined) { return _api.values.current; }

                    _api.storeValue(value);
                    _api.updateCss();
                }
            },
            temp : {
                $initial 		: null
            },
            storeValue : function(value) {
                _api.values.current = value;
                _api.external.$.target && _api.external.$.target.text(value) && _api.external.$.target.val(value);
                _api.triggerEvent();
            },
            updateCss : function() {
                // Make sure that none of the rates will be marked as selected when null is passed
                var isCurrentValueSet = false || (_api.values.current == null);

                _api.external.$.rates.each(function(rateIndex) {
                    var $rate = $(this);

                    // Apply base styles
                    $rate.toggleClass(_api.css.selected, !isCurrentValueSet);
                    $rate.toggleClass(_api.css.unselected, isCurrentValueSet);

                    // Apply styles basing on value if css are defined per value
                    if (_api.css.values.selected.length ==  _api.values.list.length && _api.css.values.selected.length ==  _api.values.list.length) {
                        $.each(_api.values.list, function(valueIndex, value) {
                            //-- Toggle defined classes for selected and unselected state
                            $rate.toggleClass(_api.css.values.selected[valueIndex], !isCurrentValueSet && value === _api.values.current);
                            $rate.toggleClass(_api.css.values.unselected[valueIndex], isCurrentValueSet && value === _api.values.current);
                        });
                    }

                    if (_api.values.list[rateIndex] === _api.values.current) { isCurrentValueSet = true; }
                });
            },
            triggerEvent : function() {
                _api.external.$.element.trigger('rated', [ _api.values.current ]);
            }
        };

        //-- Generate rates
        $.each(_api.values.list, function(valueIndex, value) {
            // Add requested html object
            var $rate = _api.external.$.element.append(_api.html.base).find(_api.html.selector);
            // Toggle base and unselected class
            $rate.toggleClass(_api.css.base, true);
            $rate.toggleClass(_api.css.unselected, true);

            $rate.on(_api.html.event, function() {
                // Check if current value has changed
                if (value == _api.values.current) { return };

                _api.storeValue(value);
                _api.updateCss($rate);
            });

            // Check for initial value that will be selected at beginning
            if (value == _api.values.initial) { _api.temp.$initial = $rate; }
        });

        //-- Store rates as external API's variable
        _api.external.$.rates = _api.external.$.element.children();

        //-- Make initial selection
        _api.temp.$initial && _api.temp.$initial.trigger(_api.html.event);

        //-- Expose the external part of API
        this._awesomeRatingApi = _api.external;
    });
};
angular.module('awesome-rating', []).directive('awesomeRating', function() {
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
                    $scope.$apply(function() {
                        $scope.awesomeRating = rate;
                    });
                });
            //-- Apply external changes
            $scope.$watch('awesomeRating', function(value){
                $element.awesomeRating.val(value);
            })
        }
    };
});