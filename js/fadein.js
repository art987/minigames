let state = 0
$(".menu").click(function() {
	if (state == 0) {
		$('.menu-box').css("transform", "translateX(0vw)")
		$("html").css("overflowY", "hidden")
		$(".menu").attr("src", "image/delete.png")
		state = 1
		$('.search-box').css("display", "none")
		$(".seach").attr("src", "image/seach.png")
		$(".main").css("display", "none")
		state2 = 0
	} else {
		$('.menu-box').css("transform", "translateX(-100vw)")
		$("html").css("overflowY", "auto")
		$(".menu").attr("src", "image/menu.png")
		state = 0
		$(".main").css("display", "block")
	}
})

let state2 = 0
$(".seach").click(function() {
	if (state2 == 0) {
		$('.search-box').css("display", "block")
		$("html").css("overflowY", "hidden")
		$(".seach").attr("src", "image/delete.png")
		$('.menu-box').css("transform", "translateX(-100vw)")
		$("html").css("overflowY", "auto")
		$(".menu").attr("src", "image/menu.png")
		$(".main").css("display", "none")
		state = 0
		state2 = 1
	} else {
		$('.search-box').css("display", "none")
		$("html").css("overflowY", "auto")
		$(".seach").attr("src", "image/seach.png")
		$(".main").css("display", "block")
		state2 = 0
	}
})
let meunlist = document.querySelectorAll(".menu_list a")
for (let i in meunlist) {
	meunlist[i].onclick = () => {
		// alert("111");
		$('.menu-box').style.transform = "translateX(0vw)"
		$("html").css("overflowY", "auto")
		$(".menu").attr("src", "image/menu.png")
		state = 1
	}
}
