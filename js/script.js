$(()=>{

	$(window).scrollTop(0);

	$(window).on('mousemove', () => {$('html').tooltip({selector: '[data-toggle=tooltip]'})});
	
	//scroll needs cursor details
	const cursor = $('.cursor');
	let lastMouseY;
	let lastMouseX;
	let offsetX = 10;
	let offsetY = 10;

	let lastScrollTop = $(window).scrollTop();
	let activePage = $('.activePage');

	let sideNav = false;


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

		let otherPage;
		//calculate distance between two pages, based on which pages are in view
		if (activePage.next().isInViewport() && activePage.next().hasClass('page'))
			otherPage = activePage.next();
		else if (activePage.prev().hasClass('page'))
			otherPage = activePage.prev();
		else
			otherPage = activePage.next();

		console.log(otherPage.attr('id'))


		//******************COLOR*******************************//
		//get color changing from and to in array [red, green, blue]
		let activePageColor = [activePage.attr('data-red'), 
							activePage.attr('data-green'), 
							activePage.attr('data-blue')];
							
		let otherPageColor = [otherPage.attr('data-red'), 
							otherPage.attr('data-green'), 
							otherPage.attr('data-blue')];

		let newColor = [(activePageColor[0] - otherPageColor[0]),
						(activePageColor[1] - otherPageColor[1]),
						(activePageColor[2] - otherPageColor[2]),]

		let percentToNextPage;
		//if active page is above the other page
		if (activePage.offset().top < otherPage.offset().top)
			percentToNextPage = 100 - (otherPage.offset().top - $(window).scrollTop())/ $(window).height() * 100;
		//otherwise the other page is above the active page
		else 
			percentToNextPage = -1* ($(window).scrollTop() - activePage.offset().top)/ $(window).height() * 100;

		newColor.forEach((item, index) => {
			newColor[index] = item * percentToNextPage/ 100;
		});

		$('html, body').css("background-color", `rgb(${activePageColor[0] - newColor[0]},${activePageColor[1] - newColor[1]},${activePageColor[2] - newColor[2]})`);
		//////////////////////////////////////////////////////////////


		//*******************PARALLAX AND ACTIVE PAGE******************************//
		let leftValue = parseFloat($('#split .leftFG').css('left').substr(0, $('#split .leftFG').css('left').length - 2));
		let rightValue = parseFloat($('#split .rightFG').css('right').substr(0, $('#split .rightFG').css('right').length - 2));

		if (percentToNextPage < 85){
			if (otherPage.find('.leftFG').length){
				let leftFG = otherPage.find('.leftFG');
				let rightFG = otherPage.find('.rightFG');
				
				leftFG.css({
					'left': `${leftValue - (leftValue * percentToNextPage/ 100)}px`
				});
				rightFG.css({
					'right': `${rightValue - (rightValue * percentToNextPage/ 100)}px`
				});
			}

			if (percentToNextPage > 35)
				activePage.find('.foreGround').removeClass('activeParallax');
			else
				activePage.find('.foreGround').addClass('activeParallax');

			leftFG = activePage.find('.leftFG');
			rightFG = activePage.find('.rightFG');

			leftFG.css('left', `${leftValue * percentToNextPage/ 100}px`);
			rightFG.css('right', `${rightValue * percentToNextPage/ 100}px`);

			leftFG.find('div').removeAttr('style');
			rightFG.find('div').removeAttr('style');

		} else {

			activePage.removeClass('activePage');
			leftFG = activePage.find('.leftFG');
			rightFG = activePage.find('.rightFG');

			leftFG.removeClass('leftFGActive');
			rightFG.removeClass('rightFGActive');

			leftFG.removeAttr('style');
			rightFG.removeAttr('style');

			if (otherPage.length){
				otherPage.addClass('activePage');
				if (otherPage.find('.leftFG').length){
					let leftFG = otherPage.find('.leftFG');
					let rightFG = otherPage.find('.rightFG');
					
					leftFG.removeAttr('style');
					rightFG.removeAttr('style');

					leftFG.addClass('leftFGActive activeParallax');
					rightFG.addClass('rightFGActive activeParallax');
					
				}

				otherPage = activePage;
			} else {
				activePage.addClass('activePage');
			}

			activePage = $('.activePage');

		}

		

		if (activePage.attr('id') == 'landing' && (percentToNextPage > 99 || percentToNextPage < 20))
			sideNav = false;
		else
			sideNav = true;
		/////////////////////////////////////////////////////////////

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
			let movementConstant = i % 2 == 0 ? 0.01 : 0.02;
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

	});

	$('.navButton').on('click', e => {
		
		let target = $(`#${e.target.id}`).attr('data-target');
		$(window).scrollTop($(`#${target}`).offset().top);
		activePage.removeClass('activePage');
		activePage = $(`#${target}`);
		activePage.addClass('activePage');
	});

	$('.pageElement').on('mouseover', e => {
		$(`#${e.target.id}`).parent().css('background-image', 
			`url(media/images/${e.target.id}.png), 
			url(media/images/${$(`#${e.target.id}`).parent().attr('id')}MiddleBack.png)`);
	});

	$('.pageElement').on('mouseleave', e => {
		$(`#${e.target.id}`).parent().removeAttr('style');
	});


	$(window).on('scroll', () => {
		if (sideNav){
			$('#navbar').addClass('sideNav');
			$('.navButton').attr('data-placement', 'left');
			$('html').tooltip({selector: '[data-toggle=tooltip]'})
		} else {
			$('#navbar').removeClass('sideNav');
			$('.navButton').attr('data-placement', 'top');
			$('html').tooltip({selector: '[data-toggle=tooltip]'})
		}
	});

	

});

