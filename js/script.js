$(()=>{
	//SCROLL LOCK
	$(window).scrollTop(0);

	var lastScrollTop = $(window).scrollTop(0);

	$('html, body').css("background-color", "#202321");

	var activeColour = 0;

	//function to scroll page
	function scroll(){
		let distance = $('.activePage').offset().top;

		var currScrollTop = $(window).scrollTop();
		//scrolling down
		if (currScrollTop > lastScrollTop){
			
			if ($(window).scrollTop() > distance){
				++activeColour;
				$(window).off('scroll');

				let oldActive = $('.activePage').first();
				oldActive.removeClass('activePage');
				let newActive = oldActive.next();
				newActive.addClass('activePage');

				console.log(newActive.attr('data-backgroundColour'));

				$('html, body').animate({
			        scrollTop: newActive.offset().top,
			        backgroundColor: newActive.attr('data-backgroundColour')
			    }, 2000);
			   

			    setTimeout(() => {
					$(window).on('scroll', scroll);
				}, 2000);
				
			}
		//scrolling up
		} else {
			if ($(window).scrollTop() < distance){
				--activeColour;
				$(window).off('scroll');

				let oldActive = $('.activePage').first();
				oldActive.removeClass('activePage');
				let newActive = oldActive.prev();
				newActive.addClass('activePage');

				$('html, body').animate({
			        scrollTop: newActive.offset().top,
			        backgroundColor: newActive.attr('data-backgroundColour')
			    }, 2000);

				setTimeout(() => {
					$(window).on('scroll', scroll);
				}, 2000);
				
			}
		}
		lastScrollTop = currScrollTop;
	}
	
	//scroll event listener
	$(window).on('scroll', scroll);

	


});
