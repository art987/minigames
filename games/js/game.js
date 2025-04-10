function gameFn() {
	let i = (window.location.href).split('=').pop() - 1 ||8
	if (i != null) {
		$(".game-box").html( `
									<div class="g_banner">
										<div class="game-inner">
											<div class="gn-left">
												<div class="gl-banner" style="background-image: url(${listJson[i].img});"></div>
												<div class="gl-mb">
													<div class="play">
														<img src="${listJson[i].img}">
														<div class="play-btn">
															Play Game
														</div>
														
													</div>
													<div class="g-title">${listJson[i].name}</div>
												</div>
												<iframe src="${listJson[i].url}" class="ifam-box" scrolling="none" frameborder="0"  ></iframe> 
											</div>
										</div>
									</div>
									<div class="g-about">
										<div class="gb-title">Game Description</div>
										<p>${listJson[i].text}</p>
									</div>
									
									`)
		
		let play = document.querySelector(".play")
		let iform = document.querySelector(".ifam-box")
		play.onclick = () => {
			iform.style.display = "block"
		}
	}
}
gameFn()


let numMob = window.innerWidth > 960 ? 16 : 6

function ListBox3(num, str,str2) {
	let listLiOneBox = document.querySelector(str);
	let listLiOneBoxStr = '';
	let classifyJson = getArrayItems(listJson, num);
	classifyJson.forEach((item) => {
		listLiOneBoxStr += `<a class="li-box" href="games.html?gamesId=${item.index}">
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
	listLiOneBox.innerHTML = listLiOneBoxStr;
}
ListBox3(numMob, ".list1","Related")