const searchFn2 = (max, min, domStr, exStr, loadingStr,str2) => {
	let num = window.innerWidth > 960 ? max : min;
	let classifyJson = getArrayItems(listJson, num);
	let listBox = document.querySelector(domStr)
	let explore = document.querySelector(exStr)
	let loading = document.querySelector(loadingStr)
	let str = '';
	classifyJson.forEach((item) => {
					str += `<a class="li-box" href="games.html?gamesId=${item.index}">
								<img class="lazy" src="image/loading.gif" data-src="${item.img}">
								<div class="li-text">
									<div class="g-ms">
										<p>Play ${item.name}</p>
										<p>${str2} games</p>
									</div>
									<div class="li-play">Play</div>
								</div>
							</a>`
	})
	listBox.innerHTML = str;
	let flat = true;
	let cont = 1
	explore.addEventListener("click", function() {
		cont++
		if (cont < 6) {
			let numMob = window.innerWidth > 960 ? 7 : 6
			let classifyJson = getArrayItems(listJson, numMob);
			let str = ""
			classifyJson.forEach((item) => {
					str += `<a class="li-box" href="games.html?gamesId=${item.index}">
								<img class="lazy" src="image/loading.gif" data-src="${item.img}">
								<div class="li-text">
									<div class="g-ms">
										<p>Play ${item.name}</p>
										<p>${str2} games</p>
									</div>
									<div class="li-play">Play</div>
								</div>
							</a>`
			})
			loading.style.display = "flex"
			if (!flat) return;
			flat = false;
			setTimeout(() => {
				loading.style.display = "none"
				listBox.innerHTML += str
				flat = true;
				lazyImg()
			}, 1000)
		} else {
			explore.classList.add("end")
			explore.innerHTML = "In the end ~"
			explore.style.color = "#fff"
		}
	})
}
var str_title = ''

function tileFun() {
	let str = (window.location.href).split('=').pop()
	// str_title = str_title.replace(/[^A-Za-z0-9]/ig, " ")

	$(".mt-left").html(`${str} games`)
}
tileFun()
searchFn2(28, 12, ".list1", ".explore", ".loading", str_title);
