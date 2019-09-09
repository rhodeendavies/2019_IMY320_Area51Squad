$(()=>{
	//SCROLL LOCK
	$(window).scrollTop(0);

	var lastScrollTop = $(window).scrollTop(0);

	$('html, body').css("background-color", "#202321");

	//function to scroll page
	function scroll(){
		let distance = $('.activePage').offset().top;

		var currScrollTop = $(window).scrollTop();
		//scrolling down
		if (currScrollTop > lastScrollTop){	
			if ($(window).scrollTop() > distance){
				$(window).off('scroll');

				let oldActive = $('.activePage').first();
				oldActive.removeClass('activePage');
				oldActive.find('.rightFGActive').removeClass('rightFGActive');
				oldActive.find('.leftFGActive').removeClass('leftFGActive');

				let newActive = oldActive.next();
				newActive.addClass('activePage');
				newActive.find('.rightFG').addClass('rightFGActive');
				newActive.find('.leftFG').addClass('leftFGActive');

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
				$(window).off('scroll');

				let oldActive = $('.activePage').first();
				oldActive.removeClass('activePage');
				oldActive.find('.rightFGActive').removeClass('rightFGActive');
				oldActive.find('.leftFGActive').removeClass('leftFGActive');

				let newActive = oldActive.prev();
				newActive.addClass('activePage');
				newActive.find('.rightFG').addClass('rightFGActive');
				newActive.find('.leftFG').addClass('leftFGActive');

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

	
	$(window).on('mousemove', e => {
		
	});

});
