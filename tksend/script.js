document.addEventListener('DOMContentLoaded', function() {
    // DOM元素引用
    const notLoggedIn = document.getElementById('not-logged-in');
    const loggedIn = document.getElementById('logged-in');
    const loginBtn = document.getElementById('login-btn');
    const logoutBtn = document.getElementById('logout-btn');
    const usernameDisplay = document.getElementById('username');
    const featuresSection = document.getElementById('features-section');
    
    const usersTextarea = document.getElementById('users-textarea');
    const usersFile = document.getElementById('users-file');
    const fileName = document.getElementById('file-name');
    const clearUsersBtn = document.getElementById('clear-users-btn');
    const validateUsersBtn = document.getElementById('validate-users-btn');
    const countNumber = document.getElementById('count-number');
    
    const messageContent = document.getElementById('message-content');
    const includeGreeting = document.getElementById('include-greeting');
    const includeSignature = document.getElementById('include-signature');
    const signatureText = document.getElementById('signature-text');
    const messagePreview = document.getElementById('message-preview');
    
    const delayBetweenSends = document.getElementById('delay-between-sends');
    const delayValue = document.getElementById('delay-value');
    const maxSends = document.getElementById('max-sends');
    const simulationMode = document.getElementById('simulation-mode');
    
    const sendBtn = document.getElementById('send-btn');
    const pauseBtn = document.getElementById('pause-btn');
    const resumeBtn = document.getElementById('resume-btn');
    const stopBtn = document.getElementById('stop-btn');
    const sendStatus = document.getElementById('send-status');
    const progressFill = document.getElementById('progress-fill');
    const sentCount = document.getElementById('sent-count');
    const totalCount = document.getElementById('total-count');
    const currentUser = document.getElementById('current-user');
    const statusText = document.getElementById('status-text');
    
    const logContainer = document.getElementById('log-container');
    const clearLogBtn = document.getElementById('clear-log-btn');
    
    const resultModal = document.getElementById('result-modal');
    const modalTitle = document.getElementById('modal-title');
    const modalMessage = document.getElementById('modal-message');
    const modalDetails = document.getElementById('modal-details');
    const detailsContent = document.querySelector('.details-content');
    const modalCloseBtn = document.getElementById('modal-close-btn');
    const closeModalBtn = document.querySelector('.close-btn');
    
    // 应用状态
    let appState = {
        isLoggedIn: false,
        username: '',
        users: [],
        isSending: false,
        isPaused: false,
        sendQueue: [],
        currentSendIndex: 0,
        sendInterval: null,
        successfulSends: [],
        failedSends: []
    };
    
    // 初始化
    featuresSection.classList.add('hidden');
    updateUsersCount();
    updateMessagePreview();
    
    // 登录功能
    loginBtn.addEventListener('click', function() {
        // 模拟登录
        const mockUsername = 'demo_user_' + Math.floor(Math.random() * 1000);
        appState.isLoggedIn = true;
        appState.username = mockUsername;
        
        usernameDisplay.textContent = mockUsername;
        notLoggedIn.classList.add('hidden');
        loggedIn.classList.remove('hidden');
        featuresSection.classList.remove('hidden');
        
        addLog('info', `成功以用户 ${mockUsername} 身份登录`);
    });
    
    // 注销功能
    logoutBtn.addEventListener('click', function() {
        if (appState.isSending) {
            showModal('操作提示', '请先停止正在进行的发送任务');
            return;
        }
        
        appState.isLoggedIn = false;
        appState.username = '';
        
        notLoggedIn.classList.remove('hidden');
        loggedIn.classList.add('hidden');
        featuresSection.classList.add('hidden');
        
        // 重置应用状态
        clearUsers();
        clearLog();
        messageContent.value = '';
        updateMessagePreview();
        
        addLog('info', '已退出登录');
    });
    
    // 文件上传处理
    usersFile.addEventListener('change', function(e) {
        const file = e.target.files[0];
        if (file) {
            fileName.textContent = file.name;
            
            const reader = new FileReader();
            reader.onload = function(event) {
                const text = event.target.result;
                const usernames = text.split(/\r?\n/)
                    .map(username => username.trim())
                    .filter(username => username.length > 0);
                
                usersTextarea.value = usernames.join('\n');
                parseUsersFromTextarea();
                addLog('info', `成功导入 ${usernames.length} 个用户`);
            };
            reader.readAsText(file);
        } else {
            fileName.textContent = '未选择文件';
        }
    });
    
    // 监听文本区域变化
    usersTextarea.addEventListener('input', parseUsersFromTextarea);
    
    // 从文本区域解析用户
    function parseUsersFromTextarea() {
        const text = usersTextarea.value;
        appState.users = text.split(/\r?\n/)
            .map(username => username.trim())
            .filter(username => username.length > 0);
        updateUsersCount();
    }
    
    // 更新用户计数
    function updateUsersCount() {
        countNumber.textContent = appState.users.length;
    }
    
    // 清空用户列表
    clearUsersBtn.addEventListener('click', clearUsers);
    
    function clearUsers() {
        appState.users = [];
        usersTextarea.value = '';
        fileName.textContent = '未选择文件';
        usersFile.value = '';
        updateUsersCount();
        addLog('info', '用户列表已清空');
    }
    
    // 验证用户
    validateUsersBtn.addEventListener('click', function() {
        if (appState.users.length === 0) {
            showModal('提示', '请先添加用户');
            return;
        }
        
        // 模拟用户验证
        const validatedUsers = [];
        const invalidUsers = [];
        
        appState.users.forEach(username => {
            // 模拟80%的用户有效率
            if (Math.random() > 0.2) {
                validatedUsers.push(username);
            } else {
                invalidUsers.push(username);
            }
        });
        
        appState.users = validatedUsers;
        usersTextarea.value = validatedUsers.join('\n');
        updateUsersCount();
        
        let message = `验证完成！共 ${validatedUsers.length} 个有效用户，${invalidUsers.length} 个无效用户`;
        let details = '';
        
        if (invalidUsers.length > 0) {
            details = '无效用户：\n' + invalidUsers.join('\n');
        }
        
        showModal('验证结果', message, details);
        addLog('info', message);
    });
    
    // 签名复选框处理
    includeSignature.addEventListener('change', function() {
        if (this.checked) {
            signatureText.classList.remove('hidden');
        } else {
            signatureText.classList.add('hidden');
        }
        updateMessagePreview();
    });
    
    // 消息内容和选项变化时更新预览
    messageContent.addEventListener('input', updateMessagePreview);
    includeGreeting.addEventListener('change', updateMessagePreview);
    signatureText.addEventListener('input', updateMessagePreview);
    
    // 更新消息预览
    function updateMessagePreview() {
        let preview = '';
        const content = messageContent.value;
        
        if (includeGreeting.checked) {
            preview += '你好，@username！\n\n';
        }
        
        preview += content || '* 请输入私信内容 *';
        
        if (includeSignature.checked && signatureText.value.trim()) {
            preview += '\n\n' + signatureText.value.trim();
        }
        
        messagePreview.textContent = preview;
    }
    
    // 更新延迟值显示
    delayBetweenSends.addEventListener('input', function() {
        delayValue.textContent = this.value;
    });
    
    // 开始发送
    sendBtn.addEventListener('click', startSending);
    
    function startSending() {
        // 验证条件
        if (appState.users.length === 0) {
            showModal('错误', '请先添加用户');
            return;
        }
        
        if (!messageContent.value.trim()) {
            showModal('错误', '请输入私信内容');
            return;
        }
        
        // 准备发送队列
        appState.sendQueue = [...appState.users].slice(0, parseInt(maxSends.value));
        appState.currentSendIndex = 0;
        appState.isSending = true;
        appState.isPaused = false;
        appState.successfulSends = [];
        appState.failedSends = [];
        
        // 更新UI
        sendBtn.classList.add('hidden');
        pauseBtn.classList.remove('hidden');
        stopBtn.classList.remove('hidden');
        sendStatus.classList.remove('hidden');
        
        totalCount.textContent = appState.sendQueue.length;
        sentCount.textContent = 0;
        progressFill.style.width = '0%';
        statusText.textContent = '开始发送...';
        
        const modeText = simulationMode.checked ? '（模拟模式）' : '';
        addLog('info', `开始向 ${appState.sendQueue.length} 个用户发送私信 ${modeText}`);
        
        // 开始发送过程
        sendNextMessage();
    }
    
    // 发送下一条消息
    function sendNextMessage() {
        if (!appState.isSending || appState.isPaused || appState.currentSendIndex >= appState.sendQueue.length) {
            return;
        }
        
        const username = appState.sendQueue[appState.currentSendIndex];
        currentUser.textContent = username;
        statusText.textContent = '发送中...';
        
        // 模拟消息发送延迟
        setTimeout(() => {
            if (!appState.isSending) return;
            
            // 模拟90%的发送成功率
            const isSuccess = Math.random() > 0.1;
            
            if (isSuccess) {
                appState.successfulSends.push(username);
                addLog('success', `✓ 成功发送给 ${username}`);
            } else {
                appState.failedSends.push(username);
                addLog('error', `✗ 发送失败给 ${username} - 模拟错误`);
            }
            
            appState.currentSendIndex++;
            sentCount.textContent = appState.successfulSends.length;
            
            // 更新进度条
            const progress = (appState.currentSendIndex / appState.sendQueue.length) * 100;
            progressFill.style.width = `${progress}%`;
            
            // 检查是否完成
            if (appState.currentSendIndex >= appState.sendQueue.length) {
                finishSending();
            } else {
                // 继续发送下一条
                statusText.textContent = `等待 ${delayBetweenSends.value} 秒...`;
                appState.sendInterval = setTimeout(sendNextMessage, delayBetweenSends.value * 1000);
            }
        }, 1500); // 模拟单次发送耗时
    }
    
    // 暂停发送
    pauseBtn.addEventListener('click', function() {
        appState.isPaused = true;
        
        if (appState.sendInterval) {
            clearTimeout(appState.sendInterval);
            appState.sendInterval = null;
        }
        
        pauseBtn.classList.add('hidden');
        resumeBtn.classList.remove('hidden');
        statusText.textContent = '已暂停';
        
        addLog('warning', '发送已暂停');
    });
    
    // 继续发送
    resumeBtn.addEventListener('click', function() {
        appState.isPaused = false;
        
        resumeBtn.classList.add('hidden');
        pauseBtn.classList.remove('hidden');
        statusText.textContent = `等待 ${delayBetweenSends.value} 秒...`;
        
        addLog('info', '发送已继续');
        appState.sendInterval = setTimeout(sendNextMessage, delayBetweenSends.value * 1000);
    });
    
    // 停止发送
    stopBtn.addEventListener('click', function() {
        appState.isSending = false;
        appState.isPaused = false;
        
        if (appState.sendInterval) {
            clearTimeout(appState.sendInterval);
            appState.sendInterval = null;
        }
        
        resetSendControls();
        
        addLog('warning', '发送已停止');
        showModal('发送已停止', `已发送 ${appState.successfulSends.length} 条消息，${appState.failedSends.length} 条失败`);
    });
    
    // 完成发送
    function finishSending() {
        appState.isSending = false;
        
        resetSendControls();
        statusText.textContent = '发送完成';
        
        const summary = `发送完成！成功: ${appState.successfulSends.length}, 失败: ${appState.failedSends.length}`;
        addLog('info', summary);
        
        let details = '';
        if (appState.failedSends.length > 0) {
            details = '失败的用户：\n' + appState.failedSends.join('\n');
        }
        
        showModal('发送完成', summary, details);
    }
    
    // 重置发送控制按钮
    function resetSendControls() {
        sendBtn.classList.remove('hidden');
        pauseBtn.classList.add('hidden');
        resumeBtn.classList.add('hidden');
        stopBtn.classList.add('hidden');
    }
    
    // 添加日志
    function addLog(type, message) {
        const timestamp = new Date().toLocaleTimeString();
        const logElement = document.createElement('div');
        logElement.className = `log-message ${type}`;
        logElement.innerHTML = `<i class="fas fa-${getIconByType(type)}"></i> [${timestamp}] ${message}`;
        
        logContainer.appendChild(logElement);
        logContainer.scrollTop = logContainer.scrollHeight;
    }
    
    // 根据日志类型获取图标
    function getIconByType(type) {
        switch(type) {
            case 'info': return 'info-circle';
            case 'success': return 'check-circle';
            case 'warning': return 'exclamation-triangle';
            case 'error': return 'times-circle';
            default: return 'info-circle';
        }
    }
    
    // 清空日志
    clearLogBtn.addEventListener('click', clearLog);
    
    function clearLog() {
        logContainer.innerHTML = '';
        addLog('info', '日志已清空');
    }
    
    // 显示模态框
    function showModal(title, message, details = '') {
        modalTitle.textContent = title;
        modalMessage.textContent = message;
        
        if (details) {
            modalDetails.classList.remove('hidden');
            detailsContent.textContent = details;
        } else {
            modalDetails.classList.add('hidden');
        }
        
        resultModal.classList.remove('hidden');
    }
    
    // 关闭模态框
    function closeModal() {
        resultModal.classList.add('hidden');
    }
    
    modalCloseBtn.addEventListener('click', closeModal);
    closeModalBtn.addEventListener('click', closeModal);
    
    // 点击模态框外部关闭
    resultModal.addEventListener('click', function(e) {
        if (e.target === resultModal) {
            closeModal();
        }
    });
    
    // 初始日志
    addLog('info', 'TikTok批量私信工具已启动（演示版）');
});