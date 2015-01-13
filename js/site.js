
jQuery('html').removeClass('no-js');

jQuery(document).ready(function () {

	jQuery('.tooltip').tip();
	jQuery('.tabs').tabify();
	jQuery('select').customSelect();

	jQuery('.accordion .accordion-title').click(function(e){
		$li = jQuery(this).parent('li');
		$ul = $li.parent('.accordion');
		// check if only one accordion can be opened at a time
		if ($ul.hasClass('only-one-visible')) {
			jQuery('li',$ul).not($li).removeClass('active');
		}
		$li.toggleClass('active');
		e.preventDefault();
	});

	if ( (jQuery('#quick-message').length>0) && jQuery.cookie ) {
		if ( jQuery.cookie('quickMessage') === 'quickMessageAccepted' && jQuery.cookie('quickMessageText') === jQuery('#quick-message .message').text() ) {
			jQuery('#quick-message').remove();
		} else {
			jQuery('#quick-message').slideDown();
			jQuery('#quick-message span.button').click(function(e) {
				jQuery('#quick-message').slideUp(function() {
					jQuery('#quick-message').remove();
				});
				if (jQuery.cookie) {
					jQuery.cookie('quickMessage', 'quickMessageAccepted', { expires: 14, path: '/' });
					jQuery.cookie('quickMessageText', jQuery('#quick-message .message').text(), { expires: 14, path: '/' });
				} else {
					jQuery.error('The jQuery.cookie plugin was not found, install this and try again!');
				}
				e.preventDefault();
			});
		}
	}

	jQuery('#menu li').hover(
		function () {
			jQuery(this).addClass("hover");
		},
		function () {
			jQuery(this).removeClass("hover");
		}
	);

	jQuery('#menu li.arrow > a').click( function (e) {
		$el = jQuery(this).parent();
		if ($el.hasClass('arrow')) {
			e.preventDefault();
			$el.toggleClass("hover");
			if ($el.parents('#menu').hasClass('mobile')) {
				$el.toggleClass('show-menu');
			}
		}
	});

	jQuery('#menu-switch').click(function(e) {
		jQuery(this).toggleClass('hover');
		jQuery('#menu').toggleClass('mobile');
		return false;
	});

	jQuery(document).click(function(e) {
		if (jQuery('#menu.mobile').length == 0) return;
		if (jQuery(e.target).parents('#menu').length > 0) return;
		jQuery('#menu-switch').removeClass('hover');
		jQuery('#menu').removeClass('mobile');
	});

	jQuery(window).smartresize(function() {
		if ($(window).width() >= 768) {
			jQuery('#menu-switch').removeClass('hover');
			jQuery('#menu').removeClass('mobile');
			jQuery('#tooltip:visible').css("opacity", 0);
		}
		jQuery('select.hasCustomSelect').trigger('update');
	});
});

(function(a){a.fn.tip=function(b){return this.each(function(){var c={offset:5};b&&a.extend(c,b);var d=a(this),e=a("#tooltip"),f=d.attr("title");return f&&""!=f?(0==e.length&&(e=a('<div id="tooltip"></div>'),e.appendTo("body")),d.removeAttr("title").data("tip",f),d.on("mouseenter",function(){$target=a(this),e.html($target.data("tip")),a(window).width()<1.5*e.outerWidth()&&e.css("max-width",a(window).width()/2);var d=$target.offset().left+$target.outerWidth()/2-e.outerWidth()/2,f=$target.offset().top-e.outerHeight()-c.offset;if(0>d?(d=$target.offset().left+$target.outerWidth()/2-c.offset,e.addClass("left")):e.removeClass("left"),d+e.outerWidth()>a(window).width()?(d=$target.offset().left-e.outerWidth()+$target.outerWidth()/2+c.offset,e.addClass("right")):e.removeClass("right"),0>f){var f=$target.offset().top+$target.outerHeight()+c.offset;e.addClass("top")}else e.removeClass("top");e.css({left:d,top:f,display:"block"}).stop().animate({opacity:1},50)}),d.on("mouseleave click",function(){$target=a(this),e.stop().animate({opacity:0},50)}),void 0):!1})}})(jQuery);