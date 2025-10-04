// 我的书库 - 首页脚本

// DOM元素引用
const booksGrid = document.getElementById('books-grid');

// 可用的书籍列表
availableBooks = [
    {
        title: '人体造型基础',
        path: 'books/人体造型基础 .pdf'
    },
    {
        title: '夫妻性生活1000问',
        path: 'books/夫妻性生活1000问.pdf'
    }
];

// 初始化函数
function init() {
    // 显示可用书籍
    displayAvailableBooks();
}

// 显示可用书籍
function displayAvailableBooks() {
    booksGrid.innerHTML = '';
    
    availableBooks.forEach(book => {
        const bookItem = document.createElement('div');
        bookItem.className = 'book-item';
        
        // 对文件名进行URL编码，确保中文和空格能正确传递
        const encodedPath = encodeURIComponent(book.path);
        const encodedTitle = encodeURIComponent(book.title);
        
        bookItem.innerHTML = `
            <i class="fas fa-book"></i>
            <div class="book-item-title">${book.title}</div>
        `;
        
        // 点击书籍项跳转到阅读页面
        bookItem.addEventListener('click', function() {
            window.location.href = `reader.html?path=${encodedPath}&title=${encodedTitle}`;
        });
        
        booksGrid.appendChild(bookItem);
    });
}

// 页面加载完成后初始化
document.addEventListener('DOMContentLoaded', init);