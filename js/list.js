function typeBox(){
	let str=""
	for (var i = 0; i < 4; i++) {
		str +=`<a href="class.html?type=${navcation[i].text}" class="m-title">
					<div class="mt-left">
						<img src="${navcation[i].img}" alt="">
						${navcation[i].text} games
					</div>
					<div class="mt-right">
						view all →
					</div>
				</a>
				<div class="list${i+1}"></div>
				`
	}
	$(".main").html(str)
}
typeBox()
function ListBox(num, str,str2) {
	let listLiOneBox = document.querySelector(str);
	let listLiOneBoxStr = '';
	let classifyJson =getArrayItems(listJson, num);
	classifyJson.forEach((item) => {
		listLiOneBoxStr += `<a class="li-box" href="games.html?gamesId=${item.index}">
								<img src="image/loading.gif" data-echo="${item.img}">
								<div class="li-text">
									<div class="g-ms">
										<p>Play ${item.name}</p>
										<p>${str2} games</p>
									</div>
									<div class="li-play">Play</div>
								</div>
							</a>`

	})
	listLiOneBox.innerHTML = listLiOneBoxStr;

}
let numMob1 = window.innerWidth > 960 ? 16 :9
let numMob2 = window.innerWidth > 960 ? 16 :4
let numMob3 = window.innerWidth > 960 ? 10 :3
let numMob4 = window.innerWidth > 960 ? 10 :6
ListBox(numMob1, ".list1","new")
ListBox(numMob2, ".list2","best")
ListBox(numMob3, ".list3","hot")
ListBox(numMob4, ".list4","favorite")
