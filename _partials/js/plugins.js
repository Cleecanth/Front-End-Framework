//@codekit-append "_tabs.js"
//@codekit-append "_tables.js"
//@codekit-append "_colors.js"
//@codekit-append "_slick.js"
//@codekit-prepend "_velocity.js"

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


	var click_check = function(container, event){
		if (!container.is(event.target) // if the target of the click isn't the container
                && container.has(event.target).length === 0) {
				return false;
			}else{
				return true;
			}
	};

	//If Megamenu or search shade is clicked outside of while active,
	// then we hide them.

	var searching = function (focused) {
		var focus_target = $(focused).attr('data-focus');
		$(focus_target).toggleClass('search_active');
	}, close_button = $("#search_close"), $main_search = $('#search_main');


	$(document).on('click',function (e){

		if ($('#mega_menu').has('.active')){
			if (click_check($('#mega_menu'), e) === false
					&& click_check($('#mega_buttons'), e) === false
					&& click_check($('[data-toggle="#mega_menu"]'), e) === false){
				$('#mega_menu').find('.tab_button').removeClass('active');
				$('#mega_menu')
					.velocity({translateY: ["-30%", "easeInOutBack", 0], opacity: [0, "easeIn", 1] }, {duration: 300});
				$('#mega_menu .tab_content:visible').fadeOut(300);
				$('#mega_menu').velocity({translateY: [0], opacity: [1]}, {duration: 0});
				$('#mega_buttons').find('.active').removeClass('active');
			}
		}
		if ($('#search_shade').hasClass('search_active')){
			if (click_check($('#search_shade'), e) === false && click_check($('#search_main'), e) === false ){
				searching($main_search);
			}
		}

	});

	$main_search.on('focus', function (e){
		var focus_target = $(this).attr('data-focus');

		if ($(focus_target).hasClass('search_active') === false){
			searching(this);

		}
		return false;

	});

	//Making sure search menu clicks return themselves correctly
	$('#search_shade').on('click', function (e) {
		e.preventDefault();

		if (e.target == close_button[0]) {
			//Close the shade if 'close' is clicked
			searching($main_search);
		}else{
			if ($(e.target).hasClass('button')){
				//If any of the buttons are clicked, change the active query
				// then change the appropriate placeholder class
				$('#search_shade .button').removeClass('active');
				$(e.target).addClass('active');
				var placeholder_text = "Search " + $(e.target).attr('data-placeholder');
				$main_search.attr('placeholder', placeholder_text);

			}
			$main_search.focus();
		}
		e.stopPropagation();
		return false;

	});

	$('[data-toggle]').click(function (e) {
		e.preventDefault();
		$(this).toggleClass('active');
		var toggletarget = $(this).attr('data-toggle');
		var iconswitch = $(this).attr('data-icon-switch');
		if (iconswitch === undefined){
			iconswitch = [$(this).attr('data-icon'), $(this).attr('data-icon')];
		}else{
			iconswitch = iconswitch.split(" ");
		}
		if ($(this).hasClass('slide_anim') === true) {
			if ($(toggletarget).is(":visible")){
				$(toggletarget).velocity("slideUp", 200, "easeInBack");
				$(this).attr('data-icon', iconswitch[0]);
			}else{
				$(toggletarget).velocity("slideDown", 200, "easeOutBack");
				$(this).attr('data-icon', iconswitch[1]);
			}
		}else{
			$(toggletarget).fadeToggle(200);
		}
	});


});
// Place any jQuery/helper plugins in here.