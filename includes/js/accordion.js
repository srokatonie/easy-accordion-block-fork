(function ($) {
	// FAQ accordion
	const esabAccordions = $('.wp-block-esab-accordion');
	$(esabAccordions).each(function () {
		// accordion heads
		const esabHeads = $(this).find('.esab__head');

		// accordion bodies
		const esabBodies = $(this).find('.esab__body');

		// each accordion head click event
		$(esabHeads).each(function () {
			$(this).on('click', function () {
				// hide all accordion bodies
				$(esabBodies).each(function () {
					$(this).slideUp();
				});

				// show clicked accordion body
				$(this).parent().find('.esab__body').slideDown();

				// remove active class from all accordion heads icons
				$(esabHeads).each(function () {
					$(this)
						.children('.esab__icon')
						.removeClass('esab__active_icon');
				});

				// add active class to clicked accordion head icon
				$(this).children('.esab__icon').addClass('esab__active_icon');
			});
		});
	});
})(jQuery);
