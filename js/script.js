$(()=>{

	function isInViewport(el) {
		var elementTop = $(el).offset().top;
		var elementBottom = elementTop + $(el).outerHeight();

		var viewportTop = $(window).scrollTop();
		var viewportBottom = viewportTop + $(window).height();

		return elementBottom > viewportTop && elementTop < viewportBottom;
	};

	function scroll(){
		

	}

	$(window).scrollTop(0);

	var lastScrollTop = $(window).scrollTop(0);


	function scroll(){
		let distance = $('.activePage').offset().top;

		var currScrollTop = $(window).scrollTop();
		if (currScrollTop > lastScrollTop){
			
			if ($(window).scrollTop() > distance){
				$(window).off('scroll');

				let oldActive = $('.activePage').first();
				oldActive.removeClass('activePage');
				let newActive = oldActive.next();
				newActive.addClass('activePage');

				$('html, body').animate({
			        scrollTop: newActive.offset().top
			    }, 2000);

			    setTimeout(() => {
					$(window).on('scroll', scroll);
				}, 2000);
				
			}
		} else {
			if ($(window).scrollTop() < distance){
				$(window).off('scroll');

				let oldActive = $('.activePage').first();
				oldActive.removeClass('activePage');
				let newActive = oldActive.prev();
				newActive.addClass('activePage');

				$('html, body').animate({
			        scrollTop: newActive.offset().top
			    }, 2000);

				setTimeout(() => {
					$(window).on('scroll', scroll);
				}, 2000);
				
			}
		}
		lastScrollTop = currScrollTop;
	}
	
	$(window).on('scroll', scroll);

	

});
