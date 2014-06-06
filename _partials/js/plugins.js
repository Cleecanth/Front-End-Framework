//@codekit-append "_tabs.js"
//@codekit-append "_tables.js"
//@codekit-append "_colors.js"
//@codekit-append "_slick.js"

// Avoid `console` errors in browsers that lack a console.
(function() {
    var method;
    var noop = function () {};
    var methods = [
        'assert', 'clear', 'count', 'debug', 'dir', 'dirxml', 'error',
        'exception', 'group', 'groupCollapsed', 'groupEnd', 'info', 'log',
        'markTimeline', 'profile', 'profileEnd', 'table', 'time', 'timeEnd',
        'timeStamp', 'trace', 'warn'
    ];
    var length = methods.length;
    var console = (window.console = window.console || {});

    while (length--) {
        method = methods[length];

        // Only stub undefined methods.
        if (!console[method]) {
            console[method] = noop;
        }
    }
}());

$(function (){
	$('[data-toggle]').click(function () {
		$(this).toggleClass('active');
		var toggletarget = $(this).attr('data-toggle');
		$(toggletarget).fadeToggle();
	});
	var searching = function ( focused ) {
		var target = $(focused).attr('data-focus');
		$(target).toggleClass('search_active', function(){
			$('.utility_column').toggleClass('absolute');
		});
	}
	$('#search_main').on('focus', function(){
		searching(this);
	});
	$('#search_main').on('blur', function(){
		searching(this);
	});

});
// Place any jQuery/helper plugins in here.