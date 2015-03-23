(function($){
	$(window).on('load', function(){

		// Remove loading indicator
		setTimeout(function(){
			$('#page-loader.loader > div').fadeOut(400, function(){
				$('#page-loader').fadeOut(800);	
				$("body > header, body > footer, body > section").fadeIn(1000);
			});
		}, 800);
	});

	//-- Apply google prettify code plugin
	$('pre').addClass('prettyprint');
	prettyPrint();
   
})(jQuery);