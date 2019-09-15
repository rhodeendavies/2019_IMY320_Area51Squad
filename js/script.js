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
				oldActive.find('.rightFGActive').removeClass('rightFGActive activeParallax');
				oldActive.find('.leftFGActive').removeClass('leftFGActive activeParallax');
				oldActive.find('.rightFGActive').removeClass('activeParallax');
				oldActive.find('.leftFGActive').removeClass('activeParallax');

				let newActive = oldActive.next();
				newActive.addClass('activePage');
				newActive.find('.rightFG').addClass('rightFGActive');
				newActive.find('.leftFG').addClass('leftFGActive');

				$('html, body').animate({
			        scrollTop: newActive.offset().top,
			        backgroundColor: newActive.attr('data-backgroundColour')
			    }, 2000);
			   

			    setTimeout(() => {
			    	newActive.find('.rightFG').addClass('activeParallax');
					newActive.find('.leftFG').addClass('activeParallax');
					$(window).on('scroll', scroll);
				}, 2000);
				
			}
		//scrolling up
		} else {
			if ($(window).scrollTop() < distance){
				$(window).off('scroll');

				let oldActive = $('.activePage').first();
				oldActive.removeClass('activePage');
				oldActive.find('.rightFGActive').removeClass('rightFGActive activeParallax');
				oldActive.find('.leftFGActive').removeClass('leftFGActive activeParallax');
				oldActive.find('.rightFGActive').removeClass('activeParallax');
				oldActive.find('.leftFGActive').removeClass('activeParallax');

				let newActive = oldActive.prev();
				newActive.addClass('activePage');
				newActive.find('.rightFG').addClass('rightFGActive');
				newActive.find('.leftFG').addClass('leftFGActive');

				$('html, body').animate({
			        scrollTop: newActive.offset().top,
			        backgroundColor: newActive.attr('data-backgroundColour')
			    }, 2000);

				setTimeout(() => {
					newActive.find('.rightFG').addClass('activeParallax');
					newActive.find('.leftFG').addClass('activeParallax');
					$(window).on('scroll', scroll);
				}, 2000);
				
			}
		}
		lastScrollTop = currScrollTop;
	}
	
	//scroll event listener
	$(window).on('scroll', scroll);

	//parallax effect
	var currentX = '';
	var currentY = '';
	var movementConstant = .015;
	$(window).on('mousemove', e => {
		if(currentX == '') currentX = e.pageX;
		var xdiff = e.pageX - currentX;
		currentX = e.pageX;
		if(currentY == '') currentY = e.pageY;
		var ydiff = e.pageY - currentY;
		currentY = e.pageY; 
		$('.activeParallax div').each(function(i, el) {
			var movement = (i + 2) * (xdiff * movementConstant);
			var movementy = (i + 2) * (ydiff * movementConstant);
			var newX = $(el).position().left + movement;
			var newY = $(el).position().top + movementy;
			$(el).css('left', newX + 'px');
			$(el).css('top', newY + 'px');
		});
		
	});


	//mouse pointer
	const cursor = $('.cursor');
	let offset = 10;
	$(window).on('mousemove', e => {
		cursor.css({
			'top': `${e.pageY - offset}px`, 
			'left': `${e.pageX - offset}px`
		});
	});

	$(window).on('click', e => {
		cursor.addClass('cursorClick');

		setTimeout(() => {
			cursor.removeClass('cursorClick');
		}, 500);
	});

	$('.hoverable').hover(() => {
		offset = 25;
		cursor.addClass('cursorHover');
	}, () => {
		offset = 10;
		cursor.removeClass('cursorHover');
	});

	

});


