$(()=>{
	
	//scroll needs cursor details
	const cursor = $('.cursor');
	let lastMouseY;
	let lastMouseX;
	let offsetX = 10;
	let offsetY = 10;

	let lastScrollTop = $(window).scrollTop();
	let oldActive = $('.activePage');

	$(window).scrollTop(0);


	 $('[data-toggle="tooltip"]').tooltip();
	

	const leftValue = parseFloat($('#split .leftFG').css('left').substr(0, $('#split .leftFG').css('left').length - 2));
	const rightValue = parseFloat($('#split .rightFG').css('right').substr(0, $('#split .rightFG').css('right').length - 2));


	//is element in viewport
	$.fn.isInViewport = function() {
		var elementTop = $(this).offset().top;
		var elementBottom = elementTop + $(this).outerHeight();

		var viewportTop = $(window).scrollTop();
		var viewportBottom = viewportTop + $(window).height();

		return elementBottom > viewportTop && elementTop < viewportBottom;
	};

	//scroll
	function scrollAnimation(){
		if (!$('.activePage').isInViewport()){
			oldActive.removeClass('activePage');
			oldActive.find('leftFG').removeClass('leftFGActive');
			oldActive.find('rightFG').removeClass('rightFGActive');

			if (lastScrollTop < $(window).scrollTop())
				oldActive.next().addClass('activePage');
			else
				oldActive.prev().addClass('activePage');

			oldActive = $('.activePage');
			oldActive.find('leftFG').addClass('leftFGActive');
			oldActive.find('rightFG').addClass('rightFGActive');	
		}



		let otherPage;
		//calculate distance between two pages, based on which pages are in view
		if (oldActive.next().isInViewport())
			otherPage = oldActive.next();
		else
			otherPage = oldActive.prev();

		//COLOR
		//get color changing from and to in array [red, green, blue]
		let oldActiveColor = [oldActive.attr('data-red'), 
							oldActive.attr('data-green'), 
							oldActive.attr('data-blue')];
							
		let otherPageColor = [otherPage.attr('data-red'), 
							otherPage.attr('data-green'), 
							otherPage.attr('data-blue')];

		let newColor = [(oldActiveColor[0] - otherPageColor[0]),
						(oldActiveColor[1] - otherPageColor[1]),
						(oldActiveColor[2] - otherPageColor[2]),]

		let percentToNextPage;
		//if active page is above the other page
		if (oldActive.offset().top < otherPage.offset().top)
			percentToNextPage = 100 - (otherPage.offset().top - $(window).scrollTop())/ $(window).height() * 100;
		//otherwise the other page is above the active page
		else 
			percentToNextPage = -1* ($(window).scrollTop() - oldActive.offset().top)/ $(window).height() * 100;

		newColor.forEach((item, index) => {
			newColor[index] = item * percentToNextPage/ 100;
		});

		$('html, body').css("background-color", `rgb(${oldActiveColor[0] - newColor[0]},${oldActiveColor[1] - newColor[1]},${oldActiveColor[2] - newColor[2]})`);

		console.log(percentToNextPage)


		//PARALLAX
		if (percentToNextPage > 20){
			if (otherPage.find('.leftFG').length){
				let leftFG = otherPage.find('.leftFG');
				let rightFG = otherPage.find('.rightFG');
				
				leftFG.css('left', `${leftValue - (leftValue * percentToNextPage/ 100)}px`);
				rightFG.css('right', `${rightValue - (rightValue * percentToNextPage/ 100)}px`);
				
				leftFG.css('transform', `rotate(${-20 - (-20 * percentToNextPage/ 100)}deg)`);
				rightFG.css('transform', `rotate(${20 - (20 * percentToNextPage/ 100)}deg)`);				
			}

			leftFG = oldActive.find('.leftFG');
			rightFG = oldActive.find('.rightFG');
			
			leftFG.css('left', `${leftValue * percentToNextPage/ 100}px`);
			rightFG.css('right', `${rightValue * percentToNextPage/ 100}px`);

			leftFG.css('transform', `rotate(${-20 * percentToNextPage/ 100}deg)`);
			rightFG.css('transform', `rotate(${20 * percentToNextPage/ 100}deg)`);		

		} else {
			if (otherPage.find('.leftFG').length){
				let leftFG = otherPage.find('.leftFG');
				let rightFG = otherPage.find('.rightFG');
				
				leftFG.css('left', `${leftValue}px`);
				rightFG.css('right', `${rightValue}px`);
				
				leftFG.css('transform', `rotate(-20deg)`);
				rightFG.css('transform', `rotate(20deg)`);				
			}

			leftFG = oldActive.find('.leftFG');
			rightFG = oldActive.find('.rightFG');
			
			leftFG.css('left', `0px`);
			rightFG.css('right', `0px`);

			leftFG.css('transform', `rotate(0deg)`);
			rightFG.css('transform', `rotate(0deg)`);		
		}

		
		
		



		lastScrollTop = $(window).scrollTop();
		
	}

	$(window).on('scroll', scrollAnimation);


	//parallax effect
	var currentX = '';
	var currentY = '';

	function parallax(e){
		if(currentX == '') currentX = e.pageX;
		let xdiff = e.pageX - currentX;
		currentX = e.pageX;
		if(currentY == '') currentY = e.pageY;
		let ydiff = e.pageY - currentY;
		currentY = e.pageY; 
		
		$('.activeParallax div').each(function(i, el) {
			let movementConstant = i % 2 == 0 ? .015 : 0.03;
			let movementx = (i + 2) * (xdiff * movementConstant);
			let movementy = (i + 2) * (ydiff * movementConstant);
			let newX = $(el).position().left + movementx;
			let newY = $(el).position().top + movementy;
			$(el).css('left', newX + 'px');
			$(el).css('top', newY + 'px');
		});
	}

	//parallax event listener
	$(window).on('mousemove', parallax);


	//mouse pointer
	function followMouse(e){
		lastMouseY = e.pageY - $(window).scrollTop();
		lastMouseX = e.pageX;
		cursor.css({
			'top': `${lastMouseY - offsetY}px`, 
			'left': `${lastMouseX - offsetX}px`
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

	//hover over event listener
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
			'top': `${$(e.target).offset().top - $(window).scrollTop()}px`,
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
			'border-radius': '50%',
			'transition': ''
		});

	})

	

});


