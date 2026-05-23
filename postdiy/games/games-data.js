// 闪喵游戏中心 - 游戏数据
// 在此文件中快速增删游戏数据

window.gamesData = {
  // 频道配置
  channel: {
    name: '闪喵游戏中心',
    logo: '../images/statics/games-active.png',
    description: '休闲益智游戏合集'
  },
  
  // 热搜词列表
  hotSearches: [
    '休闲游戏',
    '益智游戏',
    '消除游戏',
    '数字游戏',
    '记忆游戏',
    '反应游戏',
    '拼图游戏',
    '文字游戏',
    '策略游戏',
    '趣味游戏'
  ],
  
  // 游戏卡片数据
  gameCards: [
    {
      id: 1,
      image: 'https://via.placeholder.com/400x200/3498db/ffffff?text=2048',
      title: '2048',
      description: '经典数字合成游戏，滑动合并相同数字，挑战最高分',
      tags: ['数字', '益智', '经典'],
      link: '2048.html',
      category: '数字游戏'
    },
    {
      id: 2,
      image: 'https://via.placeholder.com/400x200/9b59b6/ffffff?text=俄罗斯方块',
      title: '俄罗斯方块',
      description: '经典消除游戏，旋转下落方块，填满一行消除',
      tags: ['消除', '经典', '益智'],
      link: 'tetris.html',
      category: '消除游戏'
    },
    {
      id: 3,
      image: 'https://via.placeholder.com/400x200/2ecc71/ffffff?text=贪吃蛇',
      title: '贪吃蛇',
      description: '控制小蛇吃食物，不断变长，小心撞墙',
      tags: ['经典', '反应', '休闲'],
      link: 'snake.html',
      category: '经典游戏'
    },
    {
      id: 4,
      image: 'https://via.placeholder.com/400x200/e74c3c/ffffff?text=记忆翻牌',
      title: '记忆翻牌',
      description: '翻开卡片找出配对，锻炼记忆力',
      tags: ['记忆', '益智', '休闲'],
      link: 'memory.html',
      category: '记忆游戏'
    },
    {
      id: 5,
      image: 'https://via.placeholder.com/400x200/f39c12/ffffff?text=扫雷',
      title: '扫雷',
      description: '经典扫雷游戏，推理找出所有地雷',
      tags: ['推理', '益智', '经典'],
      link: 'minesweeper.html',
      category: '益智游戏'
    },
    {
      id: 6,
      image: 'https://via.placeholder.com/400x200/1abc9c/ffffff?text=数独',
      title: '数独',
      description: '经典数字逻辑游戏，填满9x9格子',
      tags: ['数字', '逻辑', '益智'],
      link: 'sudoku.html',
      category: '数字游戏'
    },
    {
      id: 7,
      image: 'https://via.placeholder.com/400x200/e67e22/ffffff?text=拼图游戏',
      title: '拼图游戏',
      description: '移动方块还原图片，锻炼空间思维',
      tags: ['拼图', '益智', '休闲'],
      link: 'puzzle.html',
      category: '拼图游戏'
    },
    {
      id: 8,
      image: 'https://via.placeholder.com/400x200/34495e/ffffff?text=反应测试',
      title: '反应测试',
      description: '测试你的反应速度，看谁反应更快',
      tags: ['反应', '测试', '趣味'],
      link: 'reaction.html',
      category: '反应游戏'
    }
  ]
};

console.log('闪喵游戏中心数据已加载');
