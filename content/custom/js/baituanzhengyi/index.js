(function () {
	new Hammer($("#myCarousel")[0], {
		domEvents: true
	});
	$("#myCarousel").on("swipeleft", function (e) {
		$("#myCarousel").carousel('next');
	});
	$("#myCarousel").on("swiperight", function (e) {
		$("#myCarousel").carousel('prev');
	});
	// 社团
	$(".smart-teams-list").css("width",65*$(".smart-teams-list li").length+"px")
	var myScroll;
	myScroll = new IScroll('#wrapper', {
		eventPassthrough: true,
		scrollX: true,
		scrollY: false,
		preventDefault: false
	});
	document.addEventListener('touchmove', function (e) {
		e.preventDefault();
	}, {
        passive: false
    });
	// var myElement = document.querySelector('.smart-teams-list');
	// var mc = new Hammer(myElement);
	// mc.on("panleft panright", function (ev) {
	// 	console.log(ev.type)
	// 	// if (ev.type == "panleft") {
	// 	// 	$("#myCarousel").carousel('next');
	// 	// } else {

	// 	// 	$("#myCarousel").carousel('prev');
	// 	// }
	// });
})();
