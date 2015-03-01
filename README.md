[Awesome Rating v1.0.0](http://bandraszyk.github.io/awesome-rating/)
==============

Awesome-rating is a jQuery plugin that allows you to use simple, but flexible rating mechanism. The basic configuration uses [Font Awesome](https://github.com/FortAwesome/Font-Awesome), but it's not a problem to replace it with any library you like.

The plugin requires a **jQuery**  and it's recommended to use the latest one, although only basic methods were used (see Advanced Usage for more details). In the package you can also find integration scripts that allows to use the plugin with **AngularJS** and **KnockoutJS**.

###Required dependencies:

- jQuery
- *AngularJS (when using AngularJS)
- *KnockoutJS (when using KnockoutJS)
- *FontAwesome (when using standard configuration)

###Features:

- works out of the box
- allows to specify any values you want to, the type of data doesn't matter because mechanism is based on indexes
- is easy to customize with the use of CSS, because all styles can be adjusted or you can even specify your own classes
- supports displaying fractional values

###In action:

![alt Awesome Rating](http://bandraszyk.github.io/awesome-rating/rating.png)

Installation
--------------

TODO: Register package

Basic usage
--------------

###Scripts:

Always remember to place scripts tags before calling plugin:

    <script type="text/javascript" src="js/jquery-2.1.3.min.js"></script>

	<!-- JQuery --> <script type="text/javascript" src="dist/awesomeRating.min.js"></script>

	<!-- KnockouJS --><script type="text/javascript" src="js/knockout-3.1.0.js"></script>
	<!-- KnockouJS --><script type="text/javascript" src="dist/awesomerating.knockout.min.js"></script>

	<!-- AngularJS --><script type="text/javascript" src="js/angular.min.js"></script>
	<!-- AngularJS --><script type="text/javascript" src="dist/awesomerating.angular.min.js"></script>


###jQuery:

    <div class="awesomeRating"></div>
    <div class="awesomeRatingValue">
        <span>Rating value:</span>&nbsp;<span class="awesomeRatingValue"></span>
    </div>
    <script type="text/javascript">
        $('.awesomeRating').awesomeRating({
            valueInitial: "D",
            values: ["A", "B", "C", "D", "E"],
            targetSelector: "span.awesomeRatingValue"
        });
    </script>

###AngularJS:

    <div class="awesomeRating" awesome-rating="rating" awesome-rating-options="options"></div>
	<div class="awesomeRatingValue">
		<span class="awesomeRatingValue" ng-bind="'Rating value: ' + rating"></span>
	</div>
	<script type="text/javascript">
		angular.module("ratingApp", ["awesome-rating"])
			.controller("RatingController", function($scope) {
				$scope.rating = "D";
				$scope.options = {
					values : [ "A", "B", "C", "D", "E"]
				};
			});
	</script>

###KnockoutJS:

    <div class="awesomeRating" data-bind=" awesomeRating: rating, awesomeRatingOptions: options"></div>
	<div class="awesomeRatingValue">
		<span class="awesomeRatingValue" data-bind="text: 'Rating value: ' + rating()"></span>
	</div>
	<script type="text/javascript">
		$(function() {
			var model = {
				rating : ko.observable("D"),
				options : {
					values: ["A", "B", "C", "D", "E"]
				}
			};

			ko.applyBindings(model);
		});
	</script>


###CSS

The base CSS is as follows:

    .rating-star { color: lightgrey; cursor: pointer; }
    .rating-star.fa-star { color: #FDD05B; }
    .rating-star-hover { opacity: 0.6; }
    .rating-star-fractional {  position: absolute; overflow: hidden; z-index: 2; }

It's included in the package, but as you can see the content is pretty simple so making adjustments is a piece of cake. Please remember to and links to Font Awesome if you decided to use the default configuration.

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

Advanced usage
--------------

[Annotated source](http://bandraszyk.github.io/awesome-rating/docs/awesomeRating.html)


Demo
--------------

Please, feel free to visit [Demo Page](http://bandraszyk.github.io/awesome-rating/) to check how the library can be useful for you.