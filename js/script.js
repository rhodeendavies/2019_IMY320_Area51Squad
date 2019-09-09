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


	$('.navButton').on('mouseover', e => {
		$(`#${e.target.id}`).prev().removeClass('notVisibleTip');
		$(`#${e.target.id}`).prev().addClass('visibleTip');
	});

	$('.navButton').on('mouseout', e => {
		$(`#${e.target.id}`).prev().removeClass('visibleTip');
		$(`#${e.target.id}`).prev().addClass('notVisibleTip');
	});

	$('.navButton').on('click', e => {
		$(`#${e.target.id}`).prev().removeClass('notVisibleTip');
		$(`#${e.target.id}`).prev().addClass('visibleTip');
	});


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

});


$("body").append('<div class="cursor"></div>');
var land = document.getElementById("contact").id;
var con = document.getElementById("contact").id;
if(con == "contact")
{	
	$("html").append(
	   "<style>html, body, .msty_notcur {transition: width 3s, height 3s; cursor:none !important;transition: width 1s, height 1s;}.cursor {transition: width 1s, height 1s; z-index:10000000000000; position: fixed;background-color:rgba(255,0,0,0.4);border: 2px solid rgba(255,255,255,0.4);width:15px;height:15px;border-radius:100%;transform:translate(-50%,-50%); transition: background-color 3s; top:0px;left:0px;pointer-events:none; transition: background-color 3s;transition: width 1s, height 1s;} .overlink {width:30px;height:30px;background-color:rgba(255,100,100,0.1) !important;border: 2px solid rgba(255,255,255,0.25) !important; transition: background-color 3s;transition: width 1s, height 1s;} .overtext {width:30px; height:30px; background-color:rgba(255,0,0,0.25) !important;border: 2px solid rgba(255,255,255,0.2) !important; transition: background-color 3s;}</style>"
	);
}
var scrollY = 0,
   scrollX = 0;
$(document).mousemove(function(e) {
   $(".cursor")
      .css("top", e.pageY - scrollY + "px")
      .css("left", e.pageX - scrollX + "px");
});
$(document).scroll(function(e) {
   scrollY = $(window).scrollTop();
   scrollX = $(window).scrollLeft();
});
setInterval(function() {
   scroll = $(window).scrollTop();
}, 1000);
$("*").hover(
   function(e) {
      var index = -1;
      try {
         index = $(this)
            .attr("class")
            .toLowerCase()
            .indexOf("button");
         if (index == -1) {
            index = $(this)
               .attr("class")
               .toLowerCase()
               .indexOf("link");
         }
      } catch (e) {
         index = -1;
      }
      if (
         $(this).css("cursor") == "pointer" ||
         $(this).get(0).tagName == "A" ||
         $(this).get(0).tagName == "BUTTON" ||
         $(this).hasClass("msty_cur") ||
         index > -1
      ) {
         $(this).addClass("msty_cur");
         $(this).css("cursor", "none");
         $(".cursor").addClass("overlink");
      }
      if ($(this).css("cursor") != "none") {
         $(this).addClass("msty_notcur");
      }
   },
   function(e) {
      $(this).css("cursor", "none");
      $(".cursor").removeClass("overlink");
   }
);
