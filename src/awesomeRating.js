//     awesomeRating.js 1.0.0
//     http://bandraszyk.github.io/awesome-rating/
//     (c) 2015 Bandro
//     Awesome Rating may be freely distributed under the MIT license.
(function($) {
    $.fn.awesomeRating = function(options) {
        // Basic operations
        // ------------------
        // This section contains specific methods used to set initial options before plugin code runs
        options = options || {};

        // *options.valueMax*, *options.valieMin* and *options.valueStep* are used to populate values array when it's not specified.
        if (!options.values && options.valueMax) {
            options.values = [];
            for (var i = options.valueMin || 1; i <= options.valueMax; i += options.valueStep || 1) { options.values.push(i); }
        }

        var defaultOptions = $.fn.awesomeRating.defaults;

        return this.each(function() {

            if (this._awesomeRatingApi) { return; }

            var $element = $(this);

            // API definition
            // -------------
            // Merge passed options with default values and define basic methods
            var _api = {
                // Contains values used within plugin, including: list, initial and currently selected
                values : {
                    list            : options.values || defaultOptions.values || [],
                    initial         : options.valueInitial || defaultOptions.valueInitial || null,
                    current         : null
                },
                // Contains settings from the HTML point of view
                html : {
                    base            : options.htmlBase || defaultOptions.htmlBase,
                    event           : options.htmlEvent || defaultOptions.htmlEvent
                },
                // Contains settings from the CSS point of view
                css : {
                    base            : options.cssBase || defaultOptions.cssBase,
                    selected        : options.cssBaseSelected || defaultOptions.cssBaseSelected,
                    unselected      : options.cssBaseUnselected || defaultOptions.cssBaseUnselected,
                    values : {
                        selected    : options.cssValuesSelected || defaultOptions.cssValuesSelected || [],
                        unselected  : options.cssValuesUnselected || defaultOptions.cssValuesUnselected || []
                    },
                    hover           : options.cssHover || defaultOptions.cssHover || null,
                    fractional      : options.cssFractional || defaultOptions.cssFractional || null
                },
                // Contains additional settings used withing plugin
                settings : {
                    applyHoverCss   : options.applyHoverCss !== false && defaultOptions.applyHoverCss,
                    readonly        : options.readonly || defaultOptions.readonly || false,
                    allowFractional : options.allowFractional || defaultOptions.allowFractional || false,
                    eventName       : options.eventName || defaultOptions.eventName || "rated"
                },
                // Defines external API that should be used by other scripts to interact with the plugin
                external : {
                    $ : {
                        element     : $element,
                        target      : $(options.targetSelector || defaultOptions.targetSelector),
                        rates       : null,
                        fractional  : null
                    },
                    val : function(value) {
                        if (value === undefined) { return _api.values.current; }

                        _api.storeValue(value);
                    }
                },
                // Contains temp variables used by plugin to work more effectively
                temp : {
                    fractionalIndex : -1
                },
                // Stores passed value as current one and fire DOM updates and events
                storeValue : function(value) {
                    if (value === _api.values.current) { return; }

                    _api.values.current = value;
                    _api.updateTarget();
                    _api.triggerEvent();
                    _api.updateFractionalIndex();
                    _api.updateCss();
                },
                // Updates the target element's value with the use of *val()* and *text()* methods
                updateTarget : function() {
                    _api.external.$.target && _api.external.$.target.text(_api.values.current) && _api.external.$.target.val(_api.values.current);
                },
                // Triggers an event to notify attached handlers that value has been changed
                triggerEvent : function() {
                    _api.external.$.element.trigger(_api.settings.eventName, [ _api.values.current ]);
                },
                // Toggles base CSS classes and refresh the DOM so it corresponds to current state; This Method applies base CSS classes
                toggleBaseCss : function() {
                    var isCurrentValueSet = _api.values.current == null;

                    _api.external.$.rates.each(function(rateIndex) {
                        var $rate = $(this);

                        if (!isCurrentValueSet && _api.settings.allowFractional) {
                            isCurrentValueSet = _api.temp.fractionalIndex === rateIndex;
                        }

                        $rate.toggleClass(_api.css.selected, !isCurrentValueSet);
                        $rate.toggleClass(_api.css.unselected, isCurrentValueSet);

                        if (_api.css.values.selected.length == _api.values.list.length && _api.css.values.unselected.length == _api.values.list.length) {
                            $.each(_api.values.list, function(valueIndex, value) {
                                var fractionalValue = _api.settings.allowFractional ? _api.calculateFractional(_api.values.current, _api.values.list[valueIndex]) : -1;
                                var isFractional = fractionalValue > 0 && fractionalValue < 1;

                                $rate.toggleClass(_api.css.values.selected[valueIndex], !isCurrentValueSet && (value === _api.values.current || isFractional));
                                $rate.toggleClass(_api.css.values.unselected[valueIndex], isCurrentValueSet && (value === _api.values.current || isFractional));
                            });
                        }

                        if (_api.values.list[rateIndex] === _api.values.current) { isCurrentValueSet = true; }
                    });
                },
                // Toggles CSS classes dedicated for fractional purposes basing on current fractionalIndex
                toggleFractionalCss : function() {
                    _api.external.$.fractional.each(function(fractionalIndex) {
                        var $fractionalRate = $(this);
                        if (fractionalIndex !== _api.temp.fractionalIndex) { $fractionalRate.hide(); }
                        else {
                            var fractionalValue = _api.calculateFractional(_api.values.current, _api.values.list[fractionalIndex]);
                            $fractionalRate.css("display", "initial");
                            $fractionalRate.width(fractionalValue + "em");
                        }
                    });
                },
                // Updates CSS classes for both: base and fractional values
                updateCss : function() {
                    _api.toggleBaseCss();
                    if (_api.settings.allowFractional) { _api.toggleFractionalCss(); }
                },
                // Updates CSS classes for hover event
                updateCssHover : function(hoverRateIndex) {
                    _api.external.$.rates.each(function(rateIndex) {
                        $(this).toggleClass(_api.css.hover, rateIndex <= hoverRateIndex);
                    });

                    if (_api.settings.allowFractional) {
                        _api.external.$.fractional.each(function (rateIndex) {
                            $(this).toggleClass(_api.css.hover, rateIndex <= hoverRateIndex);
                        });
                    }
                },
                // Calculates fractional value for given pari: current and rate value. To indicate currently selected value it should return value between 0 and 1 that will be used to make final calculation of item's width
                calculateFractional : options.calculateFractional || defaultOptions.calculateFractional || function(current, rateValue) {
                    return 1 - (rateValue - current);
                },
                // Updates fractional index by getting
                updateFractionalIndex : function() {
                    _api.temp.fractionalIndex = -1;
                    _api.external.$.rates.each(function(rateIndex) {
                        if (_api.temp.fractionalIndex === -1 && _api.settings.allowFractional) {
                            var fractionalValue = _api.settings.allowFractional ? _api.calculateFractional(_api.values.current, _api.values.list[rateIndex]) : -1;
                            if (fractionalValue > 0 && fractionalValue < 1) { _api.temp.fractionalIndex = rateIndex; }
                        }
                    });
                }
            };

            // Plugin initialization
            // ---------------

            // Iterate over collection of values to generate HTML objects that directly represent rating values and attach requested events
            $.each(_api.values.list, function(valueIndex, value) {
                var $rate = _api.external.$.element.append(_api.html.base).find(":last-child");

                $rate.toggleClass(_api.css.base, true);
                $rate.toggleClass(_api.css.unselected, true);

                if (_api.settings.readonly) { return; }

                $rate.on(_api.html.event, function () { _api.storeValue(value); });

                if (_api.settings.applyHoverCss) {
                    $rate.hover(function() { _api.updateCssHover(valueIndex) }, function() { _api.updateCssHover(-1); });
                }
            });

            // Store rates as external API's variable so it can be use by external scripts
            _api.external.$.rates = _api.external.$.element.children();

            // Iterates over created rates objects to generate HTML objects that directly represents fractional rating values and attach requested events
            if (_api.settings.allowFractional) {
                _api.external.$.rates.each(function(rateIndex) {
                    var $fractionalRate = $(this).before(_api.html.base).prev();

                    $fractionalRate.toggleClass(_api.css.base, true);
                    $fractionalRate.toggleClass(_api.css.fractional, true);
                    $fractionalRate.toggleClass(_api.css.selected, true);

                    if (_api.css.values.selected.length == _api.values.list.length && _api.css.values.unselected.length == _api.values.list.length) {
                        $fractionalRate.toggleClass(_api.css.values.selected[rateIndex]);
                    }

                    if (_api.settings.readonly) { return; }

                    $fractionalRate.on(_api.html.event, function () { _api.storeValue(_api.values.list[rateIndex]); });

                    if (_api.settings.applyHoverCss) {
                        $fractionalRate.hover(function() { _api.updateCssHover(rateIndex) }, function() { _api.updateCssHover(-1); });
                    }
                });
            }

            // Store fractional rates as external API's variable so it can be use by external scripts
            _api.external.$.fractional = _api.external.$.element.find("." + _api.css.fractional);

            // Set initial values
            _api.storeValue(_api.values.initial);

            // Expose plugin's external interface
            this._awesomeRatingApi = _api.external;
        });
    };

    // Default Options
    // ---------------

    // The default configuration is provided as global settings for the plugin. You can easily change it globally for every usage on your page.
    $.fn.awesomeRating.defaults = {
        // An array of values that are set after user makes selection; The type doesn't matter, you easily pass here a string array
        values              : [ 1, 2, 3, 4, 5 ],
        // A value that is selected initially, should correspond to the values in above array; Can be different when fractional values are allowed
        valueInitial        : null,
        // A base CSS class that is applied to every html element
        cssBase             : "rating-star fa",
        // A CSS class that is be applied to selected element
        cssBaseSelected     : "fa-star",
        // A CSS class that is applied to unselected element
        cssBaseUnselected   : "fa-star-o",
        // A CSS class that is applied to all selected element when corresponding value is selected
        cssValuesSelected   : null,
        // A CSS class that is applied to all unselected element when corresponding value is selected
        cssValuesUnselected : null,
        // A CSS class that is applied on hover
        cssHover            : "rating-star-hover",
        // A CSS class applied for fractional values (it's used only when value is set programmatically and plugin allows fractional values)
        cssFractional       : "rating-star-fractional",
        // A jQuery selector that identify the control when selected values should be applied with the use of text() and val() methods
        targetSelector      : null,
        // A base HTML element that is used to populate a single rating object for each value; All CSS classes will be applied to it
        htmlBase            : "<div></div>",
        // A HTML event that is used to change the rating value
        htmlEvent           : "click",
        // Indicates whether hover CSS should be applied on hover or not
        applyHoverCss       : true,
        // Indicates whether htmlEvent should be attached to rating objects
        readonly            : false,
        // Indicates whether fractional values can be displayed with the use of the plugin
        allowFractional     : false,
        // A special method used to calculate fractional values (the difference between two elements); It should return values between 0 and 1 when current value should be treated as fractional. It is called with currentValue as first parameter and particular rateValue from values array as second one.
        calculateFractional : null,
        // An event name that is fired when user changes rating value
        eventName           : "rated"
    };
}(jQuery));