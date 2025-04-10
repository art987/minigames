var swiper = new Swiper(".swiper", {
	
	slidesPerView: window.innerWidth > 960 ? 3 :1,
	centeredSlides: true,
	loop: true,
	spaceBetween: 15,
	navigation: {
		nextEl: ".swiper-button-next",
		prevEl: ".swiper-button-prev",
	},
	autoplay: {
		delay: 3000, //2秒切换一次
		disableOnInteraction: true,
		waitForTransition: true,
	},
	pagination: {
		el: ".swiper-pagination",
		dynamicBullets: true,
	},

});