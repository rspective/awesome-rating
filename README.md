
[Awesome Rating v1.0.0](http://bandraszyk.github.io/awesome-rating/)
==============

Awesome-rating is a jQuery plugin that allows you to use simple, but flexible rating mechanism. The basic configuration uses [Font Awesome](https://github.com/FortAwesome/Font-Awesome), but it's not a problem to replace it with any library you like.

The plugin requires a **jQuery**  and it's recommended to use the latest one, although only basic methods were used (see Advanced Usage for more details). In the package you can also find integration scripts that allows to use the plugin with **AngularJS** and **KnockoutJS**.

Required dependencies:

- jQuery
- *AngularJS (when using AngularJS)
- *KnockoutJS (when using KnockoutJS)
- *FontAwesome (when using standard configuration)

Installation
--------------

TODO: Register package

Basic usage
--------------

###jQuery:

    <div class="awesome-rating"></div>
    <script>
        $(".awesome-rating").awesomeRating({ valueInitial: 4 });
    </script>

###AngularJS:

TODO: Describe

###KnockoutJS:

TODO: Describe

Default Configuration
--------------

The default configuration is provided as global settings for the plugin. You can easily change it globally (for every usage on your page) or pass as an object (with same properties' names) to awesomeRating method to change it locally for single usage.

###Options

    $.fn.awesomeRating.defaults = {
        values              : [ 1, 2, 3, 4, 5 ],
        valueInitial        : null,
        cssBase             : "rating-star fa",
        cssBaseSelected     : "fa-star",
        cssBaseUnselected   : "fa-star-o",
        cssValuesSelected   : null,
        cssValuesUnselected : null,
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

Options meaning is as follows:

- **values**: array of values that are set after user makes selection; The type doesn't matter, you easily pass here a string array
- **valueInitial**: a value that is selected initially, should correspond to the values in above array; Can be different when fractional values are allowed
- **cssBase**: a base CSS class that is applied to every html element
- **cssBaseSelected**: a CSS class that is be applied to selected element
- **cssBaseUnselected**: a CSS class that is applied to unselected element
- **cssValuesSelected**: a CSS class that is applied to all selected element when corresponding value is selected
- **cssValuesUnselected**: a CSS class that is applied to all unselected element when corresponding value is selected
- **cssHover**: a CSS class that is applied on hover
- **cssFractional**: a CSS class applied for fractional values (it's used only when value is set programmatically and plugin allows fractional values)
- **targetSelector**: a jQuery selector that identify the control when selected values should be applied with the use of text() and val() methods
- **htmlBase**: a base HTML element that is used to populate a single rating object for each value; All CSS classes will be applied to it
- **htmlEvent**: a HTML event that is used to change the rating value
- **applyHoverCss**: indicates whether hover CSS should be applied on hover or not
- **readonly**: indicates whether htmlEvent should be attached to rating objects
- **allowFractional**: indicates whether fractional values can be displayed with the use of the plugin
- **calculateFractional**: a special method used to calculate fractional values (the difference between two elements); It should return values between 0 and 1 when current value should be treated as fractional. It is called with currentValue as first parameter and particular rateValue from values array as second one.
- **eventName**: an event name that is fired when user changes rating value

###CSS

    .rating-star { color: lightgrey; cursor: pointer; }
    .rating-star-hover { opacity: 0.6; }
    .rating-star-fractional {  position: absolute; overflow: hidden; z-index: 2; }

Advanced usage
--------------

TODO: Add correct link here.

[Annotated source](https://github.com/bandraszyk/awesome-rating)


Live Demo
--------------

Please, feel free to visit [Demo Page](http://bandraszyk.github.io/awesome-rating/) to check how the library can be useful for you.