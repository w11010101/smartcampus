 (function() {
 	new Hammer($("#myCarousel")[0], {
 		domEvents: true
 	});
// 	var current = 0;
// 	var imgs = $(".demo-box.swipe img");
// 	var pages = $(".swipe .page-num span");
 	$("#myCarousel").on("swipeleft", function(e) {
// 		if(imgs[current + 1]) {
// 			imgs.removeClass("active");
// 			imgs.eq(++current).addClass("active");
// 			pages.removeClass("active");
// 			pages.eq(current).addClass("active");
// 		}
		$(this).carousel('next');
 	});
 	$("#myCarousel").on("swiperight", function(e) {
// 		if(imgs[current - 1]) {
// 			imgs.removeClass("active");
// 			imgs.eq(--current).addClass("active");
// 			pages.removeClass("active");
// 			pages.eq(current).addClass("active");
// 		}
	
		
		$(this).carousel('prev');
 	});
 })();