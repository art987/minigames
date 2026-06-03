// 闪喵游戏中心 - 游戏数据
// 在此文件中快速增删游戏数据
// visible: true 显示, false 隐藏

window.gamesData = {
  channel: {
    name: '闪喵游戏中心',
    logo: '../images/statics/games-active.png',
    description: '休闲益智游戏合集'
  },
  
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
  
  categories: [
    { id: 'classic', name: '经典游戏', icon: '🎮' },
    { id: 'number', name: '数字游戏', icon: '🔢' },
    { id: 'eliminate', name: '消除游戏', icon: '🧱' },
    { id: 'memory', name: '记忆游戏', icon: '🃏' },
    { id: 'puzzle', name: '益智游戏', icon: '🧩' },
    { id: 'jigsaw', name: '拼图游戏', icon: '🖼️' },
    { id: 'reaction', name: '反应游戏', icon: '⚡' }
  ],
  
  gameCards: [
    {
      id: 1,
      visible: true,
      icon: '🔢',
      iconBg: '#3498db',
      title: '2048',
      shortTitle: '2048',
      subtitle: '经典数字合成游戏，滑动合并相同数字',
      tags: ['数字', '益智', '经典'],
      link: '2048.html',
      category: 'number'
    },
    {
      id: 2,
      visible: true,
      icon: '🧱',
      iconBg: '#9b59b6',
      title: '俄罗斯方块',
      shortTitle: '俄罗斯方块',
      subtitle: '经典消除游戏，旋转下落方块填满一行',
      tags: ['消除', '经典', '益智'],
      link: 'tetris.html',
      category: 'eliminate'
    },
    {
      id: 3,
      visible: true,
      icon: '🐍',
      iconBg: '#2ecc71',
      title: '贪吃蛇',
      shortTitle: '贪吃蛇',
      subtitle: '控制小蛇吃食物，不断变长小心撞墙',
      tags: ['经典', '反应', '休闲'],
      link: 'snake.html',
      category: 'classic'
    },
    {
      id: 4,
      visible: true,
      icon: '🃏',
      iconBg: '#e74c3c',
      title: '记忆翻牌',
      shortTitle: '记忆翻牌',
      subtitle: '翻开卡片找出配对，锻炼记忆力',
      tags: ['记忆', '益智', '休闲'],
      link: 'memory.html',
      category: 'memory'
    },
    {
      id: 5,
      visible: true,
      icon: '💣',
      iconBg: '#f39c12',
      title: '扫雷',
      shortTitle: '扫雷',
      subtitle: '经典扫雷游戏，推理找出所有地雷',
      tags: ['推理', '益智', '经典'],
      link: 'minesweeper.html',
      category: 'puzzle'
    },
    {
      id: 6,
      visible: true,
      icon: '✏️',
      iconBg: '#1abc9c',
      title: '数独',
      shortTitle: '数独',
      subtitle: '经典数字逻辑游戏，填满9x9格子',
      tags: ['数字', '逻辑', '益智'],
      link: 'sudoku.html',
      category: 'number'
    },
    {
      id: 7,
      visible: true,
      icon: '🧩',
      iconBg: '#e67e22',
      title: '拼图游戏',
      shortTitle: '拼图游戏',
      subtitle: '移动方块还原图片，锻炼空间思维',
      tags: ['拼图', '益智', '休闲'],
      link: 'puzzle.html',
      category: 'jigsaw'
    },
    {
      id: 8,
      visible: true,
      icon: '⚡',
      iconBg: '#34495e',
      title: '反应测试',
      shortTitle: '反应测试',
      subtitle: '测试你的反应速度，看谁反应更快',
      tags: ['反应', '测试', '趣味'],
      link: 'reaction.html',
      category: 'reaction'
    }
  ]
};

console.log('闪喵游戏中心数据已加载');
