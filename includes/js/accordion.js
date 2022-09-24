(function ($) {
	// FAQ accordion
	const esabAccordions = $('.wp-block-esab-accordion');
	$(esabAccordions).each(function () {
		// accordion heads
		const esabHeads = $(this).find('.esab__head');
		// accordion bodies
		const esabBodies = $(this).find('.esab__body');
		// active body
		const esabActiveBody = $(this).find('.esab__active');
		// accordion icons
		const esabIcons = $(this).find('.esab__icon');
		// show active accrodion on load
		if (esabActiveBody.length) {
			esabActiveBody.slideDown();
		}
		// each accordion head click event
		$(esabHeads).each(function () {
			$(this).on('click', function () {
				// accordion body
				const esabParent = $(this).parent();
				const esabBody = esabParent.find('.esab__body');
				const esabIcon = $(this).find('.esab__icon');

				if (esabBody.hasClass('esab__active')) {
					esabBody.removeClass('esab__active');
					esabBody.slideUp();
					esabIcon.removeClass('esab__active_icon');
					esabParent.removeClass('esab__active_accordion');
					// set aria-expanded to false
					$(this).attr('aria-expanded', 'false');
				} else {
					$(esabBodies).each(function () {
						$(this).slideUp();
						$(this).removeClass('esab__active');
						// remove active class from parent
						$(this).parent().removeClass('esab__active_accordion');
						// set aria-expanded to false
						$(this)
							.parent()
							.find('.esab__head')
							.attr('aria-expanded', 'false');
					});
					esabBody.slideDown();
					esabBody.addClass('esab__active');
					esabParent.addClass('esab__active_accordion');
					$(esabIcons).each(function () {
						$(this).removeClass('esab__active_icon');
					});
					esabIcon.addClass('esab__active_icon');
					// set aria-expanded to true
					$(this).attr('aria-expanded', 'true');
				}
			});
		});
	});
})(jQuery);
