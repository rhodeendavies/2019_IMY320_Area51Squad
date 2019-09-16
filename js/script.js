$(()=>{
	//SCROLL LOCK
	$(window).scrollTop(0);

	var lastScrollTop = $(window).scrollTop(0);

	$('html, body').css("background-color", "#202321");

	function scrollRemoveClasses(){
		//remove handler while scrolling animation plays
		$(window).off('scroll');

		let oldActive = $('.activePage').first();
		oldActive.removeClass('activePage');
		oldActive.find('.rightFGActive').removeClass('rightFGActive activeParallax');
		oldActive.find('.leftFGActive').removeClass('leftFGActive activeParallax');

		return oldActive;
	}

	function scrollAddClasses(newActive){
		newActive.addClass('activePage');
		newActive.find('.rightFG').addClass('rightFGActive');
		newActive.find('.leftFG').addClass('leftFGActive');

		$('html, body').animate({
	        scrollTop: newActive.offset().top,
	        backgroundColor: newActive.attr('data-backgroundColour')
	    }, 2000);
	   
		//after animation has played, add classes and event handler
	    setTimeout(() => {
	    	newActive.find('.rightFG').addClass('activeParallax');
			newActive.find('.leftFG').addClass('activeParallax');
			$(window).on('scroll', scroll);
		}, 2000);
	}

	//function to scroll page
	function scroll(){
		let distance = $('.activePage').offset().top;

		var currScrollTop = $(window).scrollTop();
		//scrolling down
		if (currScrollTop > lastScrollTop){	
			if ($(window).scrollTop() > distance){
				let oldActive = scrollRemoveClasses();

				let newActive = oldActive.next();

				scrollAddClasses(newActive);
			}
		//scrolling up
		} else {
			if ($(window).scrollTop() < distance){
				let oldActive = scrollRemoveClasses();

				let newActive = oldActive.prev();
				
				scrollAddClasses(newActive);
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

	function parallax(e){
		if(currentX == '') currentX = e.pageX;
		var xdiff = e.pageX - currentX;
		currentX = e.pageX;
		if(currentY == '') currentY = e.pageY;
		var ydiff = e.pageY - currentY;
		currentY = e.pageY; 
		$('.activeParallax div').each(function(i, el) {
			var movementx = (i + 2) * (xdiff * movementConstant);
			var movementy = (i + 2) * (ydiff * movementConstant);
			var newX = $(el).position().left + movementx;
			var newY = $(el).position().top + movementy;
			$(el).css('left', newX + 'px');
			$(el).css('top', newY + 'px');
		});
	}

	//parallax event listener
	$(window).on('mousemove', parallax);


	//mouse pointer
	const cursor = $('.cursor');
	let offsetX = 10;
	let offsetY = 10;

	function followMouse(e){
		cursor.css({
			'top': `${e.pageY - offsetY}px`, 
			'left': `${e.pageX - offsetX}px`
		});
	}

	//cursor event listener
	$(window).on('mousemove', followMouse);

	//click event listener
	$(window).on('click', e => {
		cursor.addClass('cursorClick');

		setTimeout(() => {
			cursor.removeClass('cursorClick');
		}, 500);
	});

	//hover event listener
	$('body').on('mouseover', '.hoverable', e => {
		$(window).off('mousemove');

		let newWidth = ($(e.target).hasClass('navButton') ? $(e.target).width() : $(e.target).width() + 20);
		let newHeight = ($(e.target).hasClass('navButton') ? $(e.target).height() : $(e.target).height() + 20);

		let scale = ($(e.target).hasClass('pageElement') ? 1.1 : 1.3);

		offsetX = newWidth/2;
		offsetY = newHeight/2;

		cursor.css({
			'transform': `scale(${scale})`,
			'width': `${newWidth}px`,
			'height': `${newHeight}px`,
			'border-radius': `${$(e.target).css('border-radius')}`,
			'top': `${$(e.target).offset().top}px`,
			'left': `${$(e.target).offset().left}px`
		});

		

	});

	//hover off event listener
	$('body').on('mouseleave', '.hoverable', () => {
		$(window).on('mousemove', parallax);
		$(window).on('mousemove', followMouse);
		offsetX = 10;
		offsetY = 10;
		cursor.css({
			'width': '20px',
			'height': '20px',
			'border-radius': '50%'
		});
	})

	

});


