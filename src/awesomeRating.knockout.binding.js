(function($) {
	ko.bindingHandlers.awesomeRating = {
		init: function(element, valueAccessor, allBindings, viewModel, bindingContext) {
			// This will be called when the binding is first applied to an element
			// Set up any initial state, event handlers, etc. here
			var value = valueAccessor();

			if (!ko.isObservable(value)) { throw new Error("The value must be an observable."); }
			
			var valueUnwrapped = ko.unwrap(value);
			var options = allBindings.get("awesomeRatingOptions") || {};
			options.valueInitial = valueUnwrapped;
			
			$(element).awesomeRating(options)
				.on("rated", function(event, rate) {
					value(rate);
				});
		},
		
		update: function(element, valueAccessor, allBindings, viewModel, bindingContext) {
			// This will be called once when the binding is first applied to an element,
			// and again whenever any observables/computeds that are accessed change
			// Update the DOM element based on the supplied values here.
			var value = valueAccessor();
			var valueUnwrapped = ko.unwrap(value);
			element._awesomeRatingApi && element._awesomeRatingApi.val(valueUnwrapped);
		}
	};
})(jQuery);