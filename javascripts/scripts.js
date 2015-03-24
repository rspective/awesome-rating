(function($){
	//-- START Loader
	$(window).on('load', function(){
		// Remove loading indicator
		setTimeout(function(){
			$('#page-loader.loader > div').fadeOut(400, function(){
				$('#page-loader').fadeOut(800);	
				$("body > header, body > footer, body > section").fadeIn(1000);
			});
		}, 800);
	});
	//-- END Loader

	//-- START Header
	$(document).ready(function(){
		$("header").sticky({ topSpacing: 0 });
	});
	//-- END Header

	//-- START Navigation
	skrollr.menu.init(skrollr.init({
		mobileCheck: function() {
			//hack - forces mobile version to be off
			return false;
		}
	}), {});
	//-- END Navigation

	//-- START Code blocks
	$('pre').addClass('prettyprint');
	prettyPrint();
	//-- END Code blocks

})(jQuery);