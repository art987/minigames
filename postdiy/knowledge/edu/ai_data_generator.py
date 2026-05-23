#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
AI数据生成器 - 知识点备忘录
基于Coze智能体指令，将任意文章或主题自动转换为符合data.js规范的网页数据文件
"""

import json
import re
import os
from typing import Dict, List, Any
import requests
import argparse

class AIDataGenerator:
    def __init__(self, api_key: str = None, api_url: str = None):
        """
        初始化AI数据生成器
        
        Args:
            api_key: AI API密钥
            api_url: AI API地址
        """
        self.api_key = api_key
        self.api_url = api_url or "https://api.openai.com/v1/chat/completions"
        
    def call_ai_api(self, prompt: str) -> str:
        """
        调用AI API生成内容
        
        Args:
            prompt: 提示词
            
        Returns:
            AI生成的内容
        """
        if not self.api_key:
            # 如果没有API密钥，返回模拟数据
            return self._generate_mock_data(prompt)
            
        headers = {
            "Authorization": f"Bearer {self.api_key}",
            "Content-Type": "application/json"
        }
        
        data = {
            "model": "gpt-3.5-turbo",
            "messages": [
                {
                    "role": "system",
                    "content": """你是一个结构化数据生成专家，能够将任意文章或提供的主题自动生成转换为符合data.js规范的网页数据文件。

请严格按照以下格式输出JavaScript对象：

const data = {
    title: {
        h1: "主题名称备忘录",
        p: "副标题描述"
    },
    head: {
        title: "主题名称备忘录",
        keywords: "关键词1, 关键词2, 关键词3, 关键词4, 关键词5, 关键词6",
        description: "网页描述，符合SEO优化规范"
    },
    keywords: [
        "关键词1", "关键词2", "关键词3", "关键词4", "关键词5", 
        "关键词6", "关键词7", "关键词8", "关键词9", "关键词10"
    ],
    content: {
        "图标分类名称|图标 分类描述": [
            "<c> <h4>标题</h4> <p>描述</p> <nav>链接</nav></c>",
            "<c> <h4>标题</h4> <p>描述</p> <nav>链接</nav></c>"
        ]
    }
};

要求：
1. 主标题：核心关键词+「备忘录」后缀
2. 副标题：突出教育理念+效果
3. keywords：从正文提取6个相关关键词，注意SEO优化
4. description：结合内容写描述，符合SEO规范
5. 分类：自动生成8个以上分类，格式：图标+场景+效果
6. 内容：每个分类5-10条数据，使用c标签嵌套h4、p、nav标签
7. 输出标准JavaScript对象，不要包含markdown代码块标记"""
                },
                {
                    "role": "user",
                    "content": prompt
                }
            ],
            "max_tokens": 4000,
            "temperature": 0.7
        }
        
        try:
            response = requests.post(self.api_url, headers=headers, json=data)
            response.raise_for_status()
            result = response.json()
            return result['choices'][0]['message']['content']
        except Exception as e:
            print(f"API调用失败: {e}")
            return self._generate_mock_data(prompt)
    
    def _generate_mock_data(self, prompt: str) -> str:
        """生成模拟数据（当没有API密钥时使用）"""
        # 简单的模拟数据生成逻辑
        lines = prompt.split('\n')
        theme = lines[0].strip() if lines else "知识点"
        
        return f'''const data = {{
    title: {{
        h1: "{theme}备忘录",
        p: "掌握核心要点，提升学习效率"
    }},
    head: {{
        title: "{theme}备忘录",
        keywords: "{theme}, 学习, 知识点, 记忆, 技巧, 方法",
        description: "一份涵盖{theme}核心知识点的备忘录，帮助用户快速掌握重要内容。"
    }},
    keywords: [
        "{theme}", "学习", "知识点", "记忆", "技巧", "方法", "掌握", "理解", "应用", "实践"
    ],
    content: {{
        "📚基础概念|📚 掌握核心基础，奠定学习根基": [
            "<c> <h4>基础定义</h4> <p>这是{theme}的基础概念和定义</p> <nav>https://example.com/basic</nav></c>",
            "<c> <h4>核心原理</h4> <p>理解{theme}的核心原理和机制</p> <nav>https://example.com/principles</nav></c>"
        ],
        "🔧实用技巧|🔧 掌握实用技巧，提升应用能力": [
            "<c> <h4>技巧一</h4> <p>实用的{theme}学习技巧</p> <nav>https://example.com/tip1</nav></c>",
            "<c> <h4>技巧二</h4> <p>提高{theme}学习效率的方法</p> <nav>https://example.com/tip2</nav></c>"
        ]
    }}
}};'''
    
    def generate_data_file(self, content: str, theme_name: str, category_count: int = 8, item_count: int = 6) -> str:
        """
        生成数据文件内容
        
        Args:
            content: 输入的文章内容
            theme_name: 主题名称
            category_count: 分类数量
            item_count: 每类条数
            
        Returns:
            生成的JavaScript数据文件内容
        """
        prompt = f"""
请根据以下内容生成data.js文件：

主题名称：{theme_name}
分类数量：{category_count}个
每类条数：{item_count}条

内容：
{content}

请按照Coze智能体的指令生成标准化的data.js文件。
"""
        
        return self.call_ai_api(prompt)
    
    def generate_html_file(self, theme_name: str) -> str:
        """
        生成HTML文件内容
        
        Args:
            theme_name: 主题名称
            
        Returns:
            生成的HTML文件内容
        """
        file_name = theme_name.lower().replace(' ', '-')
        
        return f'''<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>{theme_name}备忘录</title>
    <link rel="stylesheet" href="https://peacelove.top/menu.css">
    <link rel="stylesheet" href="styles.css">
	<meta name="keywords" content="">
	<meta name="description" content="">
	
    <script src="https://code.responsivevoice.org/responsivevoice.js?key=tCF5EpUw"></script>
    <script src="data-{file_name}.js" defer></script>
    <script src="script.js" defer></script>
</head>
<body style="background: url({file_name}-bg.png) no-repeat top center;">
 <div id="navbar-container"></div>

    <div class="title">
        <h1 id="title-h1"></h1>
        <p id="title-p"></p>
    </div>
    <div class="search-container" id="search-container">
        <input type="text" id="search-input" placeholder="输入关键词搜索...">
        <div class="clear-btn" id="clear-search" style="display: none;">X</div>
    </div>
    <div class="marquee">
        <div class="tip">热搜：</div>
        <div class="keywords" id="keywords-container"></div>
        <button id="show-all-keywords" class="show-all-keywords">⚓︎</button>
    </div>
	<div class="tagsbox" >
		<div class="tip" >分类：</div> 
		<div class="tags" id="tags-container">
		</div>
		<button id="show-all-tags" class="show-all-tags">☸</button>
	</div>
	<div id="floating-tags-container" class="floating-tags"></div>
    <div class="content" id="content-container"></div>
    <div id="keyword-modal" class="modal">
        <div class="modal-content">
            <span class="close-button" id="close-modal">&times;</span>
            <div id="modal-keywords-container"></div>
        </div>
    </div>
	<button id="auto-scroll-button">⇢</button>
	  <button id="back-to-top">⇪</button>
	  
<script src="https://peacelove.top/menu-functions.js"></script>
</body>
</html>'''
    
    def save_files(self, content: str, theme_name: str, output_dir: str = "."):
        """
        保存生成的文件
        
        Args:
            content: 输入的文章内容
            theme_name: 主题名称
            output_dir: 输出目录
        """
        # 生成数据文件
        data_content = self.generate_data_file(content, theme_name)
        file_name = theme_name.lower().replace(' ', '-')
        
        # 保存data.js文件
        data_file_path = os.path.join(output_dir, f"data-{file_name}.js")
        with open(data_file_path, 'w', encoding='utf-8') as f:
            f.write(data_content)
        print(f"✅ 数据文件已保存: {data_file_path}")
        
        # 生成并保存HTML文件
        html_content = self.generate_html_file(theme_name)
        html_file_path = os.path.join(output_dir, f"{file_name}.html")
        with open(html_file_path, 'w', encoding='utf-8') as f:
            f.write(html_content)
        print(f"✅ HTML文件已保存: {html_file_path}")
        
        # 同步更新站点菜单 menudata.js
        try:
            project_root = os.path.abspath(os.path.join(output_dir, os.pardir))
            menu_path = os.path.join(project_root, 'menudata.js')
            if os.path.exists(menu_path):
                with open(menu_path, 'r', encoding='utf-8') as mf:
                    menu_text = mf.read()

                # 追加到“知识”或新建“方法论/益智”分类的简单策略
                entry = f"{{ text: \"{theme_name}\", href: \"/edu/{file_name}.html\", icon: \"\" , emoji:\"📄\",  describ: \"\" , keyword: \"\" }}"
                if '/edu/' + file_name + '.html' in menu_text:
                    print('ℹ️ menudata.js 已包含该页面条目')
                else:
                    # 优先插入到“知识”分类后面新增“方法论”分类（若不存在）
                    if 'title: "方法论"' not in menu_text:
                        insert_block = "\n    {\n      title: \"方法论\",\n      items: [\n      ]\n    },\n"
                        menu_text = menu_text.replace('    },\n\n    {\n      title: "站点备忘"', '    },\n' + insert_block + '\n    {\n      title: "站点备忘"')
                    # 向方法论分类 items 末尾插入
                    menu_text = menu_text.replace('      title: "方法论",\n      items: [', '      title: "方法论",\n      items: [\n        ' + entry + ',')

                    with open(menu_path, 'w', encoding='utf-8') as mf:
                        mf.write(menu_text)
                    print('✅ 已将新页面加入 menudata.js')
            else:
                print('⚠️ 未找到 menudata.js，跳过菜单更新')
        except Exception as e:
            print(f"⚠️ 更新 menudata.js 失败: {e}")

        return data_file_path, html_file_path

def main():
    parser = argparse.ArgumentParser(description='AI数据生成器 - 知识点备忘录')
    parser.add_argument('--content', '-c', required=True, help='输入的文章内容或主题')
    parser.add_argument('--theme', '-t', required=True, help='主题名称')
    parser.add_argument('--categories', type=int, default=8, help='分类数量 (默认: 8)')
    parser.add_argument('--items', type=int, default=6, help='每类条数 (默认: 6)')
    parser.add_argument('--api-key', help='AI API密钥')
    parser.add_argument('--output', '-o', default='.', help='输出目录 (默认: 当前目录)')
    
    args = parser.parse_args()
    
    # 创建生成器
    generator = AIDataGenerator(api_key=args.api_key)
    
    # 生成并保存文件
    try:
        data_path, html_path = generator.save_files(
            content=args.content,
            theme_name=args.theme,
            output_dir=args.output
        )
        print(f"\n🎉 文件生成完成！")
        print(f"📁 数据文件: {data_path}")
        print(f"🌐 HTML文件: {html_path}")
    except Exception as e:
        print(f"❌ 生成失败: {e}")

if __name__ == "__main__":
    main()
