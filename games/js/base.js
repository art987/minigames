// 请求链接并处理响应
async function fetchAndTransform() {
    const url = "https://gamemonetize.com/rssfeed.php?format=json&category=All&type=mobile&popularity=newest&company=All&amount=2";
    try {
        const response = await fetch(url);
        const data = await response.json();

        // 转换为目标格式
        const transformedData = data.map((item,index) => ({
            index: index+1,
            star: "image/star-3.png",
            img: item.thumb,
            name: item.title,
            url: item.url,
            text: item.description
        }));

        console.log(transformedData);
    } catch (error) {
        console.error("Error fetching or transforming data:", error);
    }
}

// 调用函数
//fetchAndTransform();

let listJson = [
    {
        "index": 1,
        "star": "image/star-3.png",
        "img": "https://img.gamemonetize.com/dh1hgwbe6zn2m30w34n9n131yj7jcgvr/512x384.jpg",
        "name": "Nutcracker New Years Adventures",
        "url": "https://www.gamesoss.com/Fruit-Cut/index.html",
        "text": "Welcome to the world of a fairy tale, where two princesses are preparing for a series of winter holidays. Each of the princesses is working on creating her own unique New Years outfit, inspired by Hoffmanns mystical fairy tales and Tchaikovskys classical ballet. Bright colors, shiny fabrics and exquisite details make each dress a real work of art. Princesses can experiment with various fashion trends: from elegant evening dresses to playful costumes full of naive coquetry. Immersing themselves in the atmosphere of New Years magic, players will be able not only to dress princesses, but also to develop their sense of style. Get ready for an unforgettable adventure and create your own New Years style!"
    },
    {
        "index": 2,
        "star": "image/star-3.png",
        "img": "https://img.gamemonetize.com/l1ebwf76jffgm1hsrgkzve1tydb73xj8/512x384.jpg",
        "name": "Toddler Baby Phone",
        "url": "https://www.gamesoss.com/Fruit-Cut/index.html",
        "text": "This is an educational game for children. Have you ever wanted to have a virtual cell phone? Our game can fulfill your wish. There are many interesting things you can do in this game. You can learn numbers and letters, you can choose any color to paint."
    },
    
]



let navcation = [
	{
		img: "image/l1.png",
		text: 'New ',
		index: 1
	},
	{
		img: "image/l2.png",
		text: 'Best ',
		index: 2
	},
	{
		img: "image/l3.png",
		text: 'Hot ',
		index: 3
	},
	{
		img: "image/l4.png",
		text: 'Favorite',
		index: 4
	},

]
let typeList = [
	{

		text: 'Action',
		img: "image/m1.svg",
		index: 1
	},
	{

		text: 'Adventure',
		img: "image/m2.svg",
		index: 2
	},
	{

		text: 'Car',
		img: "image/m3.svg",
		index: 3
	},
	{

		text: 'Class',
		img: "image/m4.svg",
		index: 4
	},
	{

		text: 'Collection',
		img: "image/m5.svg",
		index: 5
	},
	{

		text: 'Management',
		img: "image/m6.svg",
		index: 6
	},
	{

		text: 'Kids',
		img: "image/m7.svg",
		index: 7
	},
	{

		text: 'Chess',
		img: "image/m8.svg",
		index: 8
	}

]

//random
function getArrayItems(arr, num) {
	var temp_arr = arr.slice(0);
	// 取出的数值项，保存在此数组
	var return_arr = [];
	for (var i = 0; i < num; i++) {
		// 判断如果数组还有可以取出的元素，以防下标越界
		if (temp_arr.length > 0) {
			// 在数组中产生一个随机索引
			var arrIndex = Math.floor(Math.random() * temp_arr.length);
			// 将此随机索引的对应数组元素值复制出来
			return_arr[i] = temp_arr[arrIndex];
			// 然后删掉此索引的数组元素，这时候temp_arr变为新的数组
			temp_arr.splice(arrIndex, 1)
		} else {
			// 数组中数据项取完后，退出循环，比如数组本来只有10项，但要求取出20项
			break;
		}
	}
	return return_arr;
}

function detai(url) {
	window.location.href = url
}
let title = document.querySelector(".title")
title.onclick = () => {
	detai("index.html")
}
$(".f-inner img").click(function () {
	detai("index.html")
})




function menuListFun() {
	let str = ""
	let menuJson = window.innerWidth > 960 ? navcation : typeList
	menuJson.forEach((item) => {
		str += `
				<a href="class.html?type=${item.text}">
					<img src="${item.img}">
					${item.text} games
				</a>
				`
	})
	$(".menu_list").html(str)
}
menuListFun()

function typeListFun(num) {
	let str = ""
	typeList.forEach((item) => {
		str += `
				<a href="class.html?type=${item.text}">
					<img src="${item.img}">
					<p>${item.text} Game</p>
				</a>
				`
	})
	$(".type-box").html(str)
}
let type_box = $(".type-box")
if (type_box) {
	typeListFun()
}
var item_state = 0
$(".all_item").click(function () {
	if (item_state == 0) {
		$(".type-box").css("height", "250px")
		item_state = 1
	} else {
		$(".type-box").css("height", "70px")
		item_state = 0
	}
})


let randomNum = (min, max) => {
	return (parseInt(Math.random() * (max - min + 0) + min));
}
let randomToFixedNum = (min, max) => {
	return (Math.random() * (max - min + 0) + min).toFixed(1);
}
