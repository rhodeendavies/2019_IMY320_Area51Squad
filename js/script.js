var images = ['contact.png', 'contactExit.png', 


	'friendCircleAbout.png','friendCircleAni.gif', 'friendCircleTeam.png',

	'heavenAbout.png', 'heavenMiddle.png', 'heavenMiddleBack.png', 'heavenTeam.png',

	'hopmanAbout.png', 'hopmanAni.gif', 'hopmanMiddle.png', 'hopmanSide1.png', 'hopmanSide2.png', 'hopmanSide3.png', 'hopmanSide4.png', 'hopmanTeam.png', 

	'infographicAbout.png', 'infographicAni.gif', 'infographicMiddle.png', 'infographicMiddleBack.png', 'infographicSide1.png', 'infographicSide2.png', 'infographicSide3.png', 'infographicSide4.png', 'infographicTeam.png', 

	'loadingAvo.gif', 'loadingPip.gif',

	'logo.png',

	'lyricVideosAni.gif', 

	'mamaAbout.png', 'mamaMiddle.png', 'mamaTeam.png',

	'splitAbout.png','splitAni.gif', 'splitMiddle.png', 'splitMiddleBack.png', 'splitSide1.png','splitSide2.png', 'splitSide3.png', 'splitSide4.png', 'splitTeam.png'];


//Keep track of the images that are loaded
 
//Recursive load function give the callback function you want to fire after all images are loaded
function _loadimages(imgArr,callback) {
		//Keep track of the images that are loaded
		var imagesLoaded = 0;
		function _loadAllImages(callback){
			//Create an temp image and load the url
			var img = new Image();
			$(img).attr('src',`media/images/${imgArr[imagesLoaded]}`);
			if (img.complete || img.readyState === 4) {
				// image is cached
				imagesLoaded++;
				//Check if all images are loaded
				if(imagesLoaded == imgArr.length) {
					//If all images loaded do the callback
					callback();
				} else {
					//If not all images are loaded call own function again
					_loadAllImages(callback);
				}
			} else {
				$(img).load(function(){
					//Increment the images loaded variable
					imagesLoaded++;
					//Check if all images are loaded
					if(imagesLoaded == imgArr.length) {
						//If all images loaded do the callback
						callback();
					} else {
						//If not all images are loaded call own function again
						_loadAllImages(callback);
					}
				});
			}
		};		
		_loadAllImages(callback);
	}

//In your other code just go
_loadimages(images, () => {
      //Do whatever

	$('#loader').css('background-image', 'url("media/images/loadingAvo.gif")');

	setTimeout(() => {
		$('.containerHidden').removeClass('containerHidden');
	
		$('#loader').css('display', 'none');
  	
	}, 1000);

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

		if (percentToNextPage < 85){
			if (percentToNextPage > 35)
				activePage.find('.foreGround').removeClass('activeParallax');
			else
				activePage.find('.foreGround').addClass('activeParallax');
		} else {

			activePage.removeClass('activePage');
			let leftFG = activePage.find('.leftFG');
			let rightFG = activePage.find('.rightFG');

			leftFG.removeClass('leftFGActive');
			rightFG.removeClass('rightFGActive');


			if (otherPage.length){
				otherPage.addClass('activePage');
				if (otherPage.find('.leftFG').length){
					leftFG = otherPage.find('.leftFG');
					rightFG = otherPage.find('.rightFG');

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

		//newHeight = e.target.id == 'contact' ? newHeight + 25 : newHeight;

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
			$('html').tooltip({selector: '[data-toggle=tooltip]'});
			
		} else {
			$('#navbar').removeClass('sideNav');
			$('.navButton').attr('data-placement', 'top');
			$('html').tooltip({selector: '[data-toggle=tooltip]'});
		}
		
	});



	$('#contact').on('click', contactClick);

	function contactClick(){
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
		$('#contact').addClass('showContact');
		$('#contact').removeClass('hoverable');
		$('#contact').removeClass('navButton');
		$('#contactContent').removeClass('contactContentHidden');
		$('#contact').off('click')
	}

	$('#contactExit').on('click', () => {
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
		$('#contact').removeClass('showContact');
		$('#contact').addClass('hoverable');
		$('#contact').addClass('navButton');
		$('#contactContent').addClass('contactContentHidden');
		
		setTimeout(() => {
			$('#contact').on('click', contactClick);
		}, 2000)
		
	});

	

});

