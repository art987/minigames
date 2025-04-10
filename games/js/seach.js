function doSeach() {
	var value1 = document.getElementById("seach")
	var value = document.getElementById("seach").value;
	var http = document.getElementById("seach").dataset.http;
	var state = document.getElementById("seach").dataset.state
	// console.log(state,"sss")

	if (value || state == 0) {
		window.location.href = "search.html" + "?key=" + value1.value
		// window.location.href = "search.html/search?q=" + value
	}

}

var seach = document.getElementById("seach")
seach.onkeydown = function (event) {
	clickSeach(event)
}
seach.onKeypress = function (event) {
	clickSeach(event)
};

function clickSeach(event) {
	var event = window.event || event;
	var keycode = event.keyCode;
	if (keycode == '13') {
		doSeach()
	}

}

// var input = document.querySelector("input")

function creat(key) {
	let nodate = document.querySelector('.nodate')
	var listBox = document.querySelector(".list1")
	let value = window.location.search.split("?").pop().split('=').pop();
	let str=`Search results: ${value}`	
	str = str.replace(/[^A-Za-z0-9]/ig, " ")
	$(".mt-left").html(str)
	function search(keyword) {
		keyword = keyword.toLowerCase();
		const result = listJson.filter(item => {
			const name = item.name.toLowerCase();
			const text = item.text.toLowerCase();
			return name.includes(keyword) || text.includes(keyword);
		});
		return result;
	}
	let newData = search(value);
	if (newData.length > 0) {
		let listLiOneBoxStr = '';
		newData.forEach((item) => {
			listLiOneBoxStr += `<a class="li-box"  href="games.html?gamesId=${item.index}">
									<img class="lazy" src="image/loading.gif" data-src="${item.img}">
									<div class="li-text">
										${item.name}
									</div>
								</a>`
		})
		lazyImg()
		listBox.innerHTML = listLiOneBoxStr;
		
		nodate.style.display = "none"

	} else {
		nodate.style.display = "block"
		listBox.style.padding="0px"
	}
}
