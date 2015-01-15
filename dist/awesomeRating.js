$.fn.awesomeRating = function(options) {
    //-- Normalize passed options
    options = options || {};
    //-----------------------------------------------
    //-- Options' Initialization can be done here.
    //-----------------------------------------------
    if (!options.values && options.maxValue) {
        var minValue = options.minValue || 1;

    }

    //-- Setup default initial values that will be overridden by passed options
    var defaultOptions = {
        values              : [ 1, 2, 3, 4, 5 ],
        valueInitial        : null,
        cssBase             : "rating-star fa",
        cssBaseSelected     : "fa-star",
        cssBaseUnselected   : "fa-star-o",
        cssValuesSelected   : [ "first-selected", "second-selected", "third-selected", "forth-selected", "fifth-selected" ],
        cssValuesUnselected : [ "first-unselected", "second-unselected", "third-unselected", "forth-unselected", "fifth-unselected" ],
        cssHover            : "rating-star-hover",
        cssFractional       : "rating-star-fractional",
        targetSelector      : null,
        htmlBase            : "<div></div>",
        htmlEvent           : "click",
        applyHoverCss       : true,
        readonly            : false,
        allowFractional     : false,
        calculateFractional : null,
        eventName           : "rated"
    };

    return this.each(function() {
        //-- Check if plugin is already initialized
        if (this._awesomeRatingApi) { return; }

        //-- Select current element
        var $element = $(this);

        //-- Merge passed options with default values and define basic methods
        var _api = {
            values : {
                list            : options.values || defaultOptions.values || [],
                initial         : options.valueInitial || defaultOptions.valueInitial || null,
                current         : options.valueInitial || defaultOptions.valueInitial || null
            },
            html : {
                base            : options.htmlBase || defaultOptions.htmlBase,
                event           : options.htmlEvent || defaultOptions.htmlEvent
            },
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
            settings : {
                applyHoverCss   : options.applyHoverCss !== false && defaultOptions.applyHoverCss,
                readonly        : options.readonly || defaultOptions.readonly || false,
                allowFractional : options.allowFractional || defaultOptions.allowFractional || false,
                eventName       : options.eventName || defaultOptions.eventName || "rated"
            },
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
            temp : {
                $initial        : null
            },
            storeValue : function(value) {
                // Check if current value has changed
                if (value === _api.values.current) { return; }

                _api.values.current = value;
                _api.external.$.target && _api.external.$.target.text(value) && _api.external.$.target.val(value);
                _api.triggerEvent();
                _api.updateCss();
            },
            triggerEvent : function() {
                _api.external.$.element.trigger(_api.settings.eventName, [ _api.values.current ]);
            },
            updateCss : function() {
                //-- Make sure that none of the rates will be marked as selected when null is passed
                var isCurrentValueSet = false || (_api.values.current == null);
                var selectedFractionalIndex = -1;

                _api.external.$.rates.each(function(rateIndex) {
                    var $rate = $(this);

                    //-- Handle fractional values
                    if (!isCurrentValueSet && _api.settings.allowFractional) {
                        var fractionalValue = _api.settings.allowFractional ? _api.calculateFractional(_api.values.current, _api.values.list[rateIndex]) : -1;
                        var isFractional = fractionalValue > 0 && fractionalValue < 1;
                        isCurrentValueSet = isFractional;
                        if (isCurrentValueSet) { selectedFractionalIndex = rateIndex; }
                    }

                    //-- Apply base styles
                    $rate.toggleClass(_api.css.selected, !isCurrentValueSet);
                    $rate.toggleClass(_api.css.unselected, isCurrentValueSet);

                    //-- Apply styles basing on value if css are defined per value
                    if (_api.css.values.selected.length == _api.values.list.length && _api.css.values.unselected.length == _api.values.list.length) {
                        $.each(_api.values.list, function(valueIndex, value) {
                            //-- Handle fractional values
                            var fractionalValue = _api.settings.allowFractional ? _api.calculateFractional(_api.values.current, _api.values.list[valueIndex]) : -1;
                            var isFractional = fractionalValue > 0 && fractionalValue < 1;

                            //-- Toggle defined classes for selected and unselected state
                            $rate.toggleClass(_api.css.values.selected[valueIndex], !isCurrentValueSet && (value === _api.values.current || isFractional));
                            $rate.toggleClass(_api.css.values.unselected[valueIndex], isCurrentValueSet && (value === _api.values.current || isFractional));
                        });
                    }

                    if (_api.values.list[rateIndex] === _api.values.current) { isCurrentValueSet = true; }
                });

                //-- Toggle fractional rates
                if (_api.settings.allowFractional) {
                    _api.external.$.fractional.each(function(fractionalIndex) {
                        var $fractionalRate = $(this);
                        if (fractionalIndex !== selectedFractionalIndex) { $fractionalRate.hide(); }
                        else {
                            var fractionalValue = _api.calculateFractional(_api.values.current, _api.values.list[fractionalIndex]);
                            $fractionalRate.css("display", "initial");
                            $fractionalRate.width(fractionalValue + "em");
                        }
                    });
                }
            },
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
            calculateFractional : options.calculateFractional || defaultOptions.calculateFractional || function(current, rateValue) {
                return rateValue - current;
            }
        };

        //-- Generate rates
        $.each(_api.values.list, function(valueIndex, value) {
            // Add requested html object
            var $rate = _api.external.$.element.append(_api.html.base).find(":last-child");
            // Toggle base and unselected class
            $rate.toggleClass(_api.css.base, true);
            $rate.toggleClass(_api.css.unselected, true);

            if (value === _api.values.initial) { _api.values.current = value; }
            if (_api.settings.readonly) { return; }

            $rate.on(_api.html.event, function () { _api.storeValue(value); });

            if (_api.settings.applyHoverCss) {
                $rate.hover(function() { _api.updateCssHover(valueIndex) }, function() { _api.updateCssHover(-1); });
            }
        });

        //-- Store rates as external API's variable
        _api.external.$.rates = _api.external.$.element.children();

        //-- Generate fractional rates
        if (_api.settings.allowFractional) {
            _api.external.$.rates.each(function(rateIndex) {
                // Add requested html object
                var $fractionalRate = $(this).before(_api.html.base).prev();
                // Toggle base and unselected class
                $fractionalRate.toggleClass(_api.css.base, true);
                $fractionalRate.toggleClass(_api.css.fractional, true);
                $fractionalRate.toggleClass(_api.css.selected, true);

                //-- Apply styles basing on value if css are defined per value
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

        // Store fractional rates as external API's variable
        _api.external.$.fractional = _api.external.$.element.find("." + _api.css.fractional);

        //-- Update initial styles
        _api.updateCss();

        //-- Expose the external part of API
        this._awesomeRatingApi = _api.external;
    });
};