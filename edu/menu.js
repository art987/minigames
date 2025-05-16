// data.js
const menuData = {
  logo: {
    text: "PeaceLove.Top",
    imageUrl: null, // 如果需要图片，可以设置图片路径
  },
  menuItems: [
    {
      name: "风格",
      link: "#",
      subMenu: [
        { name: "购物", link: "#shopping" },
        { name: "新品上市", link: "#new-arrivals" },
        { name: "250 美元以下", link: "#under-250" },
        { name: "办公风格", link: "#office-style" },
        { name: "编辑愿望清单", link: "#edit-wishlist" },
        { name: "手表", link: "#watches" },
        { name: "球鞋", link: "#sneakers" },
        { name: "现在销售", link: "#on-sale" },
        { name: "所有购物", link: "#all-shopping" },
      ],
    },
    {
      name: "文化",
      link: "#",
      subMenu: [
        { name: "美容", link: "#beauty" },
        { name: "健康", link: "#health" },
      ],
    },
    {
      name: "科技",
      link: "#",
      subMenu: [
        { name: "最新科技", link: "#latest-tech" },
        { name: "科技产品", link: "#tech-products" },
        { name: "科技新闻", link: "#tech-news" },
      ],
    },
    {
      name: "旅游",
      link: "#",
      subMenu: [
        { name: "热门目的地", link: "#hot-destinations" },
        { name: "旅行攻略", link: "#travel-tips" },
        { name: "酒店预订", link: "#hotel-booking" },
      ],
    },
    { name: "GQ 体育", link: "#gq-sports" },
    { name: "GQ 盒子", link: "#gq-box" },
    { name: "视频", link: "#videos" },
    { name: "更多", link: "#more" },
    { name: "年度最佳男士", link: "#man-of-the-year" },
    { name: "通讯", link: "#contact" },
  ],
};

export default menuData;