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
