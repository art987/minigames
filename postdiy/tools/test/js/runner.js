/* Generic test runner: render questions, collect answers, score with ranges */
(function(){
    // 全局变量
    var currentQuestionIndex = 0;
    var totalQuestions = 0;
    var questionContainers = [];
    var currentDataset = null;
    var realTimeScoringEnabled = false; // 实时批卷模式开关状态
    var autoReadEnabled = false; // 自动朗读开关状态，默认关闭，等待用户选择
    var speechSynth = window.speechSynthesis; // 语音合成对象
    var currentUtterance = null; // 当前朗读对象
    var autoReadModalShown = false; // 自动朗读弹窗是否已显示
    var speechSupported = false; // 语音合成是否支持
    
    // 检测语音合成支持
    function checkSpeechSupport() {
        // 检查 Web Speech API
        var hasWebSpeech = !!(window.speechSynthesis && window.SpeechSynthesisUtterance);
        
        // 检查 ResponsiveVoice
        var hasResponsiveVoice = !!(typeof responsiveVoice !== 'undefined' && responsiveVoice.speak);
        
        // 任一支持即可
        speechSupported = hasWebSpeech || hasResponsiveVoice;
        
        // 如果不支持，显示友好提示
        if (!speechSupported) {
            console.log('语音合成功能检测：当前浏览器不支持');
            // 可以在这里添加降级方案，比如显示文字提示
        } else {
            console.log('语音合成功能检测：支持', hasWebSpeech ? 'Web Speech API' : '', hasResponsiveVoice ? 'ResponsiveVoice' : '');
        }
        
        return speechSupported;
    }
    
    // 显示不支持语音合成的提示
    function showUnsupportedMessage() {
        // 创建一个简单的提示元素
        var message = document.createElement('div');
        message.className = 'unsupported-message';
        message.innerHTML = '<p style="color: #666; font-size: 12px; text-align: center; margin: 5px 0;">当前浏览器不支持语音朗读功能</p>';
        
        // 将提示添加到进度头部
        var progressHeader = document.querySelector('.progress-header');
        if (progressHeader) {
            progressHeader.appendChild(message);
        }
    }
    
    // 初始化时检测支持情况
    checkSpeechSupport();
    
    function getQueryParam(key){
        var search = location.search.replace(/^\?/,'');
        var map = {};
        search.split('&').forEach(function(p){
            if(!p) return; var kv = p.split('=');
            map[decodeURIComponent(kv[0])] = decodeURIComponent(kv[1]||'');
        });
        return map[key];
    }

    function findTestById(id){
        if (!window.TestRegistry) return null;
        var all = window.TestRegistry.list();
        for (var i=0;i<all.length;i++){ if (all[i].id === id) return all[i]; }
        return null;
    }

    function loadDataset(id){
        // Data modules attach themselves to window.TestDatasets
        if (!window.TestDatasets) return null;
        return window.TestDatasets[id] || null;
    }

    function renderQuestion(form, q, idx){
        var container = document.createElement('div');
        container.className = 'question-container';
        container.dataset.index = idx;
        
        if (idx === 0) {
            container.classList.add('active');
        } else {
            container.classList.add('hidden'); // 添加hidden类，默认隐藏
        }

        var wrap = document.createElement('div');
        wrap.className = 'q';

        // 添加朗读按钮（放在题目左边）
        var readButton = document.createElement('button');
        readButton.type = 'button'; // 明确设置为button类型，防止触发表单提交
        readButton.className = 'read-button';
        readButton.title = '朗读题目';
        readButton.innerHTML = '🔊';
        readButton.addEventListener('click', function(e) {
            e.preventDefault(); // 阻止默认行为
            e.stopPropagation(); // 阻止事件冒泡
            readAloud(q.text);
        });
        wrap.appendChild(readButton);

        var title = document.createElement('p');
        title.className = 'q-title';
        title.textContent = (idx+1) + '. ' + q.text;
        wrap.appendChild(title);

        var options = document.createElement('div');
        options.className = 'options';
        q.options.forEach(function(opt, oi){
            var label = document.createElement('label');
            label.className = 'option';
            var input = document.createElement('input');
            input.type = q.multi ? 'checkbox' : 'radio';
            input.name = 'q_' + idx;
            input.value = String(oi);
            input.addEventListener('change', function() {
            // 只有在非实时批卷模式下才播放click音效
            if (!realTimeScoringEnabled) {
                playSound('click');
            }
            
            updateQuestionStatus(idx);
            
            // 实时批卷逻辑
            if (realTimeScoringEnabled && currentDataset) {
                highlightCorrectAnswer(q, idx, currentDataset);
                // 在实时批卷模式下，用户选择后立即设置题目为只读
                setQuestionReadOnly(idx, true);
            }
                
                // 实时批卷模式下不自动跳转
                if (!realTimeScoringEnabled && currentQuestionIndex < totalQuestions - 1) {
                    setTimeout(function() {
                        showQuestion(currentQuestionIndex + 1);
                    }, 300); // 普通模式下的短暂延迟
                }
            });
            label.appendChild(input);
            var span = document.createElement('span');
            // 兼容label和text两种选项文本格式
            span.textContent = opt.label || opt.text || '';
            label.appendChild(span);
            options.appendChild(label);
        });
        
        wrap.appendChild(options);
        container.appendChild(wrap);
        form.appendChild(container);
        
        questionContainers.push(container);
        return container;
    }

    function updateQuestionStatus(idx) {
        // 检查当前问题是否已回答
        var name = 'q_' + idx;
        var inputs = document.querySelectorAll('input[name="'+name+'"]');
        var answered = false;
        inputs.forEach(function(inp){ if (inp.checked) answered = true; });
        
        // 更新导航按钮状态
        var nextBtn = document.getElementById('next-btn');
        var prevBtn = document.getElementById('prev-btn');
        var submitBtn = document.getElementById('submit-btn');
        var completionModal = document.getElementById('completion-modal');
        
        prevBtn.disabled = (currentQuestionIndex === 0);
        
        // 如果是最后一题且已回答
        if (currentQuestionIndex === totalQuestions - 1 && answered) {
            nextBtn.style.display = 'none';
            submitBtn.style.display = 'none'; // 隐藏原来的提交按钮
            // 显示完成提示弹窗
            completionModal.classList.remove('hidden');
        } else {
            nextBtn.style.display = 'block';
            submitBtn.style.display = 'none';
            nextBtn.disabled = !answered;
        }
        
        // 更新进度条
        updateProgressBar();
    }
    
    function updateProgressBar() {
        var answeredCount = 0;
        for (var i = 0; i < totalQuestions; i++) {
            var name = 'q_' + i;
            var inputs = document.querySelectorAll('input[name="'+name+'"]');
            var answered = false;
            inputs.forEach(function(inp){ if (inp.checked) answered = true; });
            if (answered) answeredCount++;
        }
        
        var progressBar = document.getElementById('progress-bar');
        var progressText = document.getElementById('progress-text');
        var percentage = (answeredCount / totalQuestions) * 100;
        
        progressBar.style.width = percentage + '%';
        progressText.textContent = '题目 ' + (currentQuestionIndex + 1) + '/' + totalQuestions + ' (已完成: ' + answeredCount + ')';
    }
    
    // 朗读题目文本
    function readAloud(text) {
        // 检查语音合成是否支持
        if (!speechSupported) {
            console.warn('当前浏览器不支持语音合成功能');
            return false;
        }
        
        try {
            // 停止当前朗读
            if (currentUtterance) {
                speechSynth.cancel();
            }
            
            // 创建新的朗读对象
            currentUtterance = new SpeechSynthesisUtterance(text);
            currentUtterance.lang = 'zh-CN'; // 设置为中文
            currentUtterance.rate = 0.9; // 语速稍慢
            currentUtterance.pitch = 1.0; // 音调正常
            currentUtterance.volume = 1.0; // 音量最大
            
            // 开始朗读
            speechSynth.speak(currentUtterance);
            return true;
        } catch (error) {
            console.error('语音合成失败:', error);
            return false;
        }
    }
    
    // 构建完整的朗读文本（题目 + 带序号的选项）
    function buildFullQuestionText(question, questionIndex) {
        if (!question || !question.text) return '';
        
        // 构建题目文本，将数字序号转换为"第N题"格式
        var fullText = '第' + (questionIndex + 1) + '题：' + question.text;
        
        // 添加选项（如果有）
        if (question.options && question.options.length > 0) {
            fullText += '。';
            
            // 中文序号数组
            var chineseNumbers = ['第一', '第二', '第三', '第四', '第五', '第六', '第七', '第八', '第九', '第十'];
            
            question.options.forEach(function(option, index) {
                var optionText = option.label || option.text || '';
                if (optionText) {
                    var chineseNum = chineseNumbers[index] || '第' + (index + 1) + '个';
                    fullText += chineseNum + '，' + optionText + '。';
                }
            });
            
            // 在选项后添加"请选答"提示
            fullText += '请选答。';
        }
        
        return fullText;
    }
    
    // 显示自动朗读弹窗
    function showAutoReadModal() {
        if (autoReadModalShown) return;
        
        // 检查语音合成支持，如果不支持则直接返回
        if (!speechSupported) {
            console.log('当前浏览器不支持语音合成，跳过自动朗读弹窗');
            return;
        }
        
        var modal = document.getElementById('auto-read-modal');
        if (modal) {
            modal.style.display = 'flex';
            autoReadModalShown = true;
        }
    }
    
    // 隐藏自动朗读弹窗
    function hideAutoReadModal() {
        var modal = document.getElementById('auto-read-modal');
        if (modal) {
            modal.style.display = 'none';
        }
    }
    
    // 启用自动朗读功能
    function enableAutoRead() {
        autoReadEnabled = true;
        hideAutoReadModal();
        
        // 更新开关状态
        var autoReadCheckbox = document.getElementById('auto-read-checkbox');
        if (autoReadCheckbox) {
            autoReadCheckbox.checked = true;
        }
        
        // 模拟点击朗读按钮来触发用户交互
        var currentQuestion = currentDataset.questions[currentQuestionIndex];
        if (currentQuestion && currentQuestion.text) {
            // 构建完整的题目文本（包括选项）
            var fullQuestionText = buildFullQuestionText(currentQuestion, currentQuestionIndex);
            readAloud(fullQuestionText);
        }
    }
    
    // 禁用自动朗读功能
    function disableAutoRead() {
        autoReadEnabled = false;
        hideAutoReadModal();
        
        // 更新开关状态
        var autoReadCheckbox = document.getElementById('auto-read-checkbox');
        if (autoReadCheckbox) {
            autoReadCheckbox.checked = false;
        }
        
        // 停止当前朗读
        if (currentUtterance) {
            speechSynth.cancel();
        }
    }
    
    // 自动朗读当前题目
    function autoReadCurrentQuestion() {
        if (!autoReadEnabled || !currentDataset) return;
        
        var currentQuestion = currentDataset.questions[currentQuestionIndex];
        if (currentQuestion && currentQuestion.text) {
            // 构建完整的题目文本（包括选项）
            var fullQuestionText = buildFullQuestionText(currentQuestion, currentQuestionIndex);
            readAloud(fullQuestionText);
        }
    }
    
    function showQuestion(idx) {
        // 隐藏所有问题
        questionContainers.forEach(function(container) {
            container.classList.remove('active');
            container.classList.add('hidden');
        });
        
        // 显示当前问题
        if (questionContainers[idx]) {
            questionContainers[idx].classList.add('active');
            questionContainers[idx].classList.remove('hidden');
            currentQuestionIndex = idx;
            updateQuestionStatus(idx);
            
            // 只有在用户启用了自动朗读时才朗读题目
            if (autoReadEnabled) {
                setTimeout(function() {
                    autoReadCurrentQuestion();
                }, 300); // 延迟300ms，确保页面渲染完成
            }
            
            // 在实时批卷模式下，检查当前题目是否已回答
            if (realTimeScoringEnabled && currentDataset) {
                var name = 'q_' + idx;
                var inputs = document.querySelectorAll('input[name="'+name+'"]');
                var answered = false;
                inputs.forEach(function(inp){ if (inp.checked) answered = true; });
                
                if (answered) {
                    highlightCorrectAnswer(currentDataset.questions[idx], idx, currentDataset);
                    // 在实时批卷模式下，已回答的题目设为只读
                    setQuestionReadOnly(idx, true);
                } else {
                    // 未回答的题目保持可编辑
                    setQuestionReadOnly(idx, false);
                }
            }
        }
    }
    
    // 高亮显示正确答案
    function highlightCorrectAnswer(question, questionIndex, dataset) {
        // 清除之前的标记
        clearAnswerHighlights(question, questionIndex);
        
        // 找出最高分
        var maxScore = -1;
        var correctOptionIndices = [];
        
        question.options.forEach(function(opt, idx) {
            if (typeof opt.score === 'number' && opt.score > maxScore) {
                maxScore = opt.score;
            }
        });
        
        // 收集所有最高分选项的索引
        question.options.forEach(function(opt, idx) {
            if (typeof opt.score === 'number' && opt.score === maxScore) {
                correctOptionIndices.push(idx);
            }
        });
        
        // 获取当前问题的所有选项元素
        var container = document.querySelector('.question-container[data-index="' + questionIndex + '"]');
        var options = container.querySelectorAll('label.option');
        
        // 检查用户是否选择了正确答案
        var name = 'q_' + questionIndex;
        var inputs = document.querySelectorAll('input[name="'+name+'"]');
        var isCorrect = false;
        var hasSelected = false;
        
        inputs.forEach(function(input, idx) {
            if (input.checked) {
                hasSelected = true;
                if (correctOptionIndices.includes(idx)) {
                    isCorrect = true;
                }
            }
        });
        
        // 在实时批卷模式下，根据答题结果播放不同音效
        if (realTimeScoringEnabled && hasSelected) {
            setTimeout(function() {
                playSound(isCorrect ? 'correct' : 'wrong');
            }, 100); // 延迟播放，让用户先听到点击音效
        }
        
        options.forEach(function(option, idx) {
            if (correctOptionIndices.includes(idx)) {
                // 在正确选项右上角添加标记
                var mark = document.createElement('div');
                mark.className = 'correct-answer-mark';
                mark.textContent = '正确答案';
                option.style.position = 'relative';
                option.appendChild(mark);
            } else {
                // 非正确选项添加透明度和删除线
                option.classList.add('incorrect-option');
            }
        });
    }
    
    // 清除答案高亮标记
    function clearAnswerHighlights(question, questionIndex) {
        var container = document.querySelector('.question-container[data-index="' + questionIndex + '"]');
        var options = container.querySelectorAll('label.option');
        
        options.forEach(function(option) {
            // 移除正确答案标记
            var mark = option.querySelector('.correct-answer-mark');
            if (mark) {
                option.removeChild(mark);
            }
            
            // 移除非正确选项样式
            option.classList.remove('incorrect-option');
        });
    }
    
    // 设置题目选项的只读状态
    function setQuestionReadOnly(questionIndex, isReadOnly) {
        var name = 'q_' + questionIndex;
        var inputs = document.querySelectorAll('input[name="'+name+'"]');
        
        // 获取题目容器
        var container = document.querySelector('.question-container[data-index="' + questionIndex + '"]');
        
        inputs.forEach(function(input) {
            input.disabled = isReadOnly;
        });
        
        // 为已回答的题目容器添加或移除'answered'类
        if (container) {
            if (isReadOnly) {
                container.classList.add('answered');
            } else {
                container.classList.remove('answered');
            }
        }
    }
    
    function setupNavigation() {
        var nextBtn = document.getElementById('next-btn');
        var prevBtn = document.getElementById('prev-btn');
        var submitBtn = document.getElementById('submit-btn');
        
        nextBtn.addEventListener('click', function() {
            // 检查当前问题是否已回答
            var name = 'q_' + currentQuestionIndex;
            var inputs = document.querySelectorAll('input[name="'+name+'"]');
            var answered = false;
            inputs.forEach(function(inp){ if (inp.checked) answered = true; });
            
            if (!answered) {
                alert('请先回答当前问题再继续');
                return;
            }
            
            if (currentQuestionIndex < totalQuestions - 1) {
                showQuestion(currentQuestionIndex + 1);
            }
        });
        
        prevBtn.addEventListener('click', function() {
            if (currentQuestionIndex > 0) {
                showQuestion(currentQuestionIndex - 1);
            }
        });
    }

    function computeScore(dataset){
        // 检查是否存在自定义的结果计算函数
        if (dataset.calculateResult && typeof dataset.calculateResult === 'function') {
            // 收集用户答案
            var answers = [];
            dataset.questions.forEach(function(q, qi){
                var name = 'q_' + qi;
                var inputs = document.querySelectorAll('input[name="'+name+'"]');
                var selected = null;
                inputs.forEach(function(inp){
                    if (inp.checked) selected = parseInt(inp.value, 10);
                });
                if (selected !== null) {
                    answers.push({
                        questionId: q.id,
                        optionId: q.options[selected].id
                    });
                }
            });
            // 使用自定义函数计算结果
            var customResult = dataset.calculateResult(answers);
            // 确保返回的结果对象包含必要的字段
            return {
                total: customResult.totalScore || 0,
                perQuestionScores: customResult.perQuestionScores || Array(dataset.questions.length).fill(0),
                // 保留原始的自定义结果数据
                ...customResult
            };
        }
        
        // 标准计分逻辑
        var total = 0;
        var perQuestionScores = [];
        dataset.questions.forEach(function(q, qi){
            var name = 'q_' + qi;
            var inputs = document.querySelectorAll('input[name="'+name+'"]');
            var selected = [];
            inputs.forEach(function(inp){ if (inp.checked) selected.push(parseInt(inp.value,10)); });
            if (!selected.length) { perQuestionScores.push(0); return; }
            var qScore = 0;
            
            // 处理对象类型的score
            if (q.options[0] && typeof q.options[0].score === 'object') {
                // 对象类型的score处理（针对角色类型测试）
                qScore = 1; // 至少得1分，避免计算问题
            } else {
                // 标准数字类型的score
                selected.forEach(function(idx){ qScore += q.options[idx].score; });
            }
            
            perQuestionScores.push(qScore);
            total += qScore;
        });
        return { total: total, perQuestionScores: perQuestionScores };
    }

    function matchRange(resultRanges, total){
        for (var i=0;i<resultRanges.length;i++){
            var r = resultRanges[i];
            // 兼容min/max和minScore/maxScore两种属性命名
            var min = typeof r.min === 'number' ? r.min : r.minScore;
            var max = typeof r.max === 'number' ? r.max : r.maxScore;
            var minOk = (typeof min === 'number') ? total >= min : true;
            var maxOk = (typeof max === 'number') ? total <= max : true;
            if (minOk && maxOk) {
                // 统一结果对象的属性命名，确保label/text/advice可用
                return {
                    label: r.label || r.title || '未命名',
                    text: r.text || r.description || '',
                    advice: r.advice || (r.suggestions ? r.suggestions.join('\n') : '')
                };
            }
        }
        return null;
    }

    function renderAnswerDetails(dataset, scores) {
        var answersDetail = document.getElementById('answers-detail');
        answersDetail.innerHTML = '<h3 class="answers-title">答题详情</h3>';
        
        dataset.questions.forEach(function(q, qi) {
            var answerItem = document.createElement('div');
            answerItem.className = 'answer-item';
            
            // 获取用户选择的选项
            var name = 'q_' + qi;
            var inputs = document.querySelectorAll('input[name="'+name+'"]');
            var selected = [];
            inputs.forEach(function(inp) { 
                if (inp.checked) selected.push(parseInt(inp.value, 10)); 
            });
            
            // 找出得分最高的答案
            var correctAnswers = [];
            var maxScore = -1;
            
            // 首先找到最高分
            q.options.forEach(function(opt) {
                if (opt.score > maxScore) {
                    maxScore = opt.score;
                }
            });
            
            // 然后收集所有得到最高分的选项
            q.options.forEach(function(opt, oi) {
                if (opt.score === maxScore && maxScore > 0) {
                    correctAnswers.push(oi);
                }
            });
            
            // 构建题目信息 - 计算每道题的最高分作为满分
            var maxQuestionScore = 0;
            q.options.forEach(function(opt) {
                if (typeof opt.score === 'number' && opt.score > maxQuestionScore) {
                    maxQuestionScore = opt.score;
                }
            });
            var questionText = (qi + 1) + '. ' + q.text + ' (分值: ' + maxQuestionScore + ')';
            answerItem.innerHTML = '<p class="answer-question">' + questionText + '</p>';
            
            // 添加得分信息
            var scoreText = '得分: ' + scores.perQuestionScores[qi];
            answerItem.innerHTML += '<p class="answer-score">' + scoreText + '</p>';
            
            // 添加用户答题信息
            var userAnswerText = '您的选择: ';
            if (selected.length === 0) {
                userAnswerText += '未回答';
            } else {
                var selectedLabels = selected.map(function(idx) { return q.options[idx] ? (q.options[idx].label || q.options[idx].text || '') : '无效选项'; }).join('、');
                userAnswerText += selectedLabels;
            }
            answerItem.innerHTML += '<p class="answer-user">' + userAnswerText + '</p>';
            
            // 添加正确答案信息
            var correctAnswerText = '高分选项: ';
            var correctLabels = correctAnswers.map(function(idx) { return q.options[idx] ? (q.options[idx].label || q.options[idx].text || '') : '无效选项'; }).join('、');
            correctAnswerText += correctLabels;
            
            // 判断答案是否正确
            var isCorrect = selected.length > 0 && selected.every(function(idx) { return correctAnswers.includes(idx); });
            var correctClass = isCorrect ? 'answer-correct' : 'answer-correct answer-incorrect';
            answerItem.innerHTML += '<p class="' + correctClass + '">' + correctAnswerText + '</p>';
            
            answersDetail.appendChild(answerItem);
        });
    }
    
    function saveAsImage(){
        var card = document.getElementById('result-card');
        if (!window.html2canvas){
            alert('html2canvas 加载失败，无法保存图片'); 
            return;
        }
        try {
            html2canvas(card,{backgroundColor:'white',scale:2}).then(function(canvas){
                // 生成图片URL
                var imageUrl;
                try {
                    imageUrl = canvas.toDataURL('image/png', 1.0);
                } catch (toDataUrlError) {
                    console.error('生成图像URL时出错:', toDataUrlError);
                    alert('图片生成失败，请重试');
                    return;
                }
                
                // 设置文件名
                var testTitle = document.getElementById('test-title').textContent || 'result';
                var now = new Date();
                var year = now.getFullYear();
                var month = String(now.getMonth() + 1).padStart(2, '0');
                var day = String(now.getDate()).padStart(2, '0');
                var hours = String(now.getHours()).padStart(2, '0');
                var minutes = String(now.getMinutes()).padStart(2, '0');
                var timestamp = year + month + day + '-' + hours + minutes;
                var fileName = testTitle + '_' + timestamp + '.png';
                
                // 检测是否在uni-app的WebView中
                if (window.uni && window.uni.postMessage) {
                    // 在原生应用中，使用postMessage通知原生端
                    console.log('检测到uni-app环境，使用postMessage下载');
                    window.uni.postMessage({
                        data: {
                            action: 'downloadImage',
                            url: imageUrl,
                            fileName: fileName
                        }
                    });
                    alert('证书已发送到原生应用处理');
                } else if (window.webkit && window.webkit.messageHandlers && window.webkit.messageHandlers.downloadImage) {
                    // iOS WKWebView环境
                    console.log('检测到iOS WKWebView环境');
                    window.webkit.messageHandlers.downloadImage.postMessage({
                        url: imageUrl,
                        fileName: fileName
                    });
                    alert('证书已发送到原生应用处理');
                } else if (window.AndroidInterface && window.AndroidInterface.downloadImage) {
                    // Android WebView环境
                    console.log('检测到Android WebView环境');
                    window.AndroidInterface.downloadImage(imageUrl, fileName);
                    alert('证书已发送到原生应用处理');
                } else {
                    // 在浏览器中，使用标准的下载方式
                    var link = document.createElement('a');
                    link.href = imageUrl;
                    link.download = fileName;
                    
                    document.body.appendChild(link);
                    link.click();
                    setTimeout(function() {
                        document.body.removeChild(link);
                    }, 100);
                }
            });
        } catch (e) {
            console.error('保存图片失败:', e);
            alert('保存图片失败，请重试');
        }
    }

    function bootstrap(){
        console.log('TestRunner.bootstrap: 开始初始化测试');
        
        // 获取测试ID，支持test和testId两种参数
        var id = getQueryParam('test') || getQueryParam('testId');
        if (!id) {
            document.getElementById('test-title').textContent = '未指定测试ID';
            document.getElementById('test-form').innerHTML = '<p class="error-message">未指定测试ID</p>';
            return;
        }
        
        console.log('TestRunner.bootstrap: 尝试加载测试ID:', id);
        
        // 尝试查找测试元数据
        var meta = findTestById(id);
        if (!meta) {
            // 元数据查找失败，尝试直接从TestDatasets加载
            console.log('TestRunner.bootstrap: 未在TestRegistry中找到测试，尝试直接从TestDatasets加载');
        }
        
        // 加载数据集
        var dataset = loadDataset(id);
        if (!dataset){
            // 确保TestDatasets对象存在
            window.TestDatasets = window.TestDatasets || {};
            
            // 尝试所有可能的加载方式
            dataset = window.TestDatasets[id] || 
                      window.TestDatasets[id + '-compat'] || 
                      window.testDataset || 
                      window.dataset;
            
            if (!dataset) {
                console.error('TestRunner.bootstrap: 题库加载失败');
                document.getElementById('test-intro').textContent = '题库加载失败';
                return;
            }
        }
        
        currentDataset = dataset;
        
        // 设置测试标题和描述
        var testTitle = '';
        if (meta) {
            testTitle = meta.title;
            document.getElementById('test-title').textContent = testTitle;
            document.getElementById('test-intro').textContent = meta.description || '';
        } else if (dataset.title) {
            testTitle = dataset.title;
            document.getElementById('test-title').textContent = testTitle;
            document.getElementById('test-intro').textContent = dataset.description || '';
        }
        
        // 同步设置证书中的测试名称
        var certificateTestName = document.getElementById('certificate-test-name');
        if (certificateTestName && testTitle) {
            certificateTestName.textContent = testTitle;
        }
        
        // 更新证书logo为测试封面图
        var certificateLogo = document.querySelector('.certificate-logo');
        if (certificateLogo && dataset.cover) {
            // 创建图片元素
            var logoImg = document.createElement('img');
            logoImg.src = 'data/cover/' + dataset.cover;
            logoImg.alt = testTitle + ' 封面';
            logoImg.style.maxWidth = '100%';
            logoImg.style.maxHeight = '100%';
            
            // 清空原有内容并添加图片
            certificateLogo.innerHTML = '';
            certificateLogo.appendChild(logoImg);
            
            // 添加图片加载失败的备用方案
            logoImg.onerror = function() {
                certificateLogo.innerHTML = '🧠'; // 恢复默认表情符号
            };
        }
        
        console.log('TestRunner.bootstrap: 测试数据加载成功，开始渲染题目');
        
        // 渲染题目
        var form = document.getElementById('test-form');
        form.innerHTML = '';
        dataset.questions.forEach(function(q, idx){ renderQuestion(form, q, idx); });
        totalQuestions = dataset.questions.length;
        
        console.log('TestRunner.bootstrap: 题目渲染完成，共', totalQuestions, '题');
        
        var submitBtn = document.getElementById('submit-btn');
        var resetBtn = document.getElementById('reset-btn');
        var resultSection = document.getElementById('result-section');
        var totalSpan = document.getElementById('total-score');
        var levelSpan = document.getElementById('score-level');
        var textDiv = document.getElementById('result-text');
        var adviceDiv = document.getElementById('result-advice');
        var saveBtn = document.getElementById('save-image');

        // 设置自动朗读开关事件
        var autoReadCheckbox = document.getElementById('auto-read-checkbox');
        var autoReadToggle = document.getElementById('auto-read-toggle');
        
        if (autoReadCheckbox && autoReadToggle) {
            // 检查语音合成支持，如果不支持则隐藏开关并显示提示
        if (!speechSupported) {
            autoReadToggle.style.display = 'none';
            console.log('当前浏览器不支持语音合成，隐藏自动朗读开关');
            // 显示不支持提示
            setTimeout(showUnsupportedMessage, 1000);
        } else {
                autoReadCheckbox.addEventListener('change', function() {
                    autoReadEnabled = this.checked;
                    
                    // 如果重新开启自动朗读，朗读当前题目
                    if (autoReadEnabled) {
                        autoReadCurrentQuestion();
                    } else {
                        // 如果关闭自动朗读，停止当前朗读
                        if (currentUtterance) {
                            speechSynth.cancel();
                        }
                    }
                });
            }
        }
        
        // 设置自动朗读弹窗按钮事件
        var enableReadBtn = document.getElementById('enable-read-btn');
        var disableReadBtn = document.getElementById('disable-read-btn');
        
        if (enableReadBtn) {
            enableReadBtn.addEventListener('click', enableAutoRead);
        }
        
        if (disableReadBtn) {
            disableReadBtn.addEventListener('click', disableAutoRead);
        }
        
        // 设置导航和进度条
        setupNavigation();
        
        // 显示自动朗读提示弹窗
        setTimeout(function() {
            showAutoReadModal();
        }, 500); // 延迟500ms显示弹窗，确保页面完全加载
        updateProgressBar();
        
        // 配置实时批卷开关
        setupRealTimeScoringToggle();
        
        // 初始化音效系统
        createSoundElements();
        ensureSoundFiles();

        // 弹窗按钮事件处理
        var completionModal = document.getElementById('completion-modal');
        var reviewBtn = document.getElementById('review-btn');
        var submitResultBtn = document.getElementById('submit-result-btn');
        
        // 再检查看看按钮
        reviewBtn.addEventListener('click', function() {
            completionModal.classList.add('hidden');
        });
        
        // 提交并查看结果按钮
        submitResultBtn.addEventListener('click', function() {
            var res = computeScore(dataset);
            
            // 处理自定义计算结果（角色类型测试）
            if (res.primaryRole) {
                // 显示角色类型结果
                levelSpan.textContent = res.primaryRole.title;
                textDiv.innerHTML = res.primaryRole.description + '<br><br>';
                
                // 添加角色特征
                if (res.primaryRole.characteristics && res.primaryRole.characteristics.length > 0) {
                    textDiv.innerHTML += '<strong>主要特征：</strong><br>';
                    res.primaryRole.characteristics.forEach(function(char) {
                        textDiv.innerHTML += '• ' + char + '<br>';
                    });
                }
                
                // 显示得分分布
                textDiv.innerHTML += '<br><strong>各角色类型得分：</strong><br>';
                Object.keys(res.roleScores).forEach(function(roleType) {
                    const roleConfig = dataset.roleTypes.find(role => role.type === roleType);
                    const roleName = roleConfig ? roleConfig.title : roleType;
                    textDiv.innerHTML += roleName + ': ' + res.roleScores[roleType] + '<br>';
                });
                
                // 设置总分显示
                totalSpan.textContent = String(res.totalScore);
                
                // 设置总分值显示
                const totalPossibleScoreEl = document.getElementById('total-possible-score');
                if (totalPossibleScoreEl) {
                    totalPossibleScoreEl.textContent = '总分100';
                }
            } else {
                // 标准结果处理逻辑
                // 计算并缩放到0-100分范围
                let maxTotalScore = 0;
                dataset.questions.forEach(function(q) {
                    let maxQuestionScore = 0;
                    q.options.forEach(function(opt) {
                        if (typeof opt.score === 'number' && opt.score > maxQuestionScore) {
                            maxQuestionScore = opt.score;
                        }
                    });
                    maxTotalScore += maxQuestionScore;
                });
                
                // 缩放分数到0-100分
                let scaledScore = maxTotalScore > 0 ? Math.round((res.total / maxTotalScore) * 100) : 0;
                scaledScore = Math.max(0, Math.min(100, scaledScore)); // 确保在0-100范围内
                
                // 只显示百分制分数
                totalSpan.textContent = String(scaledScore);
                
                // 设置总分显示为100
                const totalPossibleScoreElement = document.getElementById('total-possible-score');
                if (totalPossibleScoreElement) {
                    totalPossibleScoreElement.textContent = '总分100';
                }
                
                range = dataset.resultRanges ? matchRange(dataset.resultRanges, scaledScore) : {label:'未匹配', text:'', advice:''};
                // 防止range为null导致错误
                if (range && range.label) {
                    levelSpan.textContent = range.label;
                    textDiv.textContent = range.text || '';
                    adviceDiv.textContent = range.advice || '';
                } else {
                    levelSpan.textContent = '未匹配';
                    textDiv.textContent = '无法匹配到对应的结果范围';
                    adviceDiv.textContent = '';
                }
            }
            
            // 设置总分值显示
            const totalPossibleScoreEl = document.getElementById('total-possible-score');
            if (totalPossibleScoreEl) {
                totalPossibleScoreEl.textContent = '总分100';
            }
            
            // 更新测试日期
            var dateElement = document.getElementById('test-date');
            if (dateElement) {
                // 格式化当前日期为 YYYY年MM月DD日 格式
                var now = new Date();
                var year = now.getFullYear();
                var month = now.getMonth() + 1;
                var day = now.getDate();
                var formattedDate = year + '年' + (month < 10 ? '0' + month : month) + '月' + (day < 10 ? '0' + day : day) + '日';
                dateElement.textContent =  formattedDate;
            }
            
            // 渲染答题详情
            renderAnswerDetails(dataset, res);
            
            resultSection.classList.remove('hidden');
            resultSection.scrollIntoView({behavior:'smooth'});
            completionModal.classList.add('hidden');
        });
        
        // 原来的提交按钮也保留，以备不时之需
        submitBtn.addEventListener('click', function(e){
            e.preventDefault();
            var res = computeScore(dataset);
            var range = matchRange(dataset.resultRanges, res.total) || {label:'未匹配', text:'', advice:''};
            totalSpan.textContent = String(res.total);
            
            // 计算总分值
            var maxTotalScore = 0;
            dataset.questions.forEach(function(q) {
                // 计算每道题的总分值（所有选项的最高分）
                var maxQuestionScore = 0;
                q.options.forEach(function(opt) {
                    if (opt.score > maxQuestionScore) {
                        maxQuestionScore = opt.score;
                    }
                });
                maxTotalScore += maxQuestionScore;
            });
            
            // 设置总分值显示
            var totalPossibleScoreEl = document.getElementById('total-possible-score');
            if (totalPossibleScoreEl) {
                totalPossibleScoreEl.textContent = '总分100';
            }
            
            levelSpan.textContent = range.label || '-';
            textDiv.textContent = range.text || '';
            adviceDiv.textContent = range.advice || '';
            
            // 更新测试日期
            var dateElement = document.getElementById('test-date');
            if (dateElement) {
                // 格式化当前日期为 YYYY年MM月DD日 格式
                var now = new Date();
                var year = now.getFullYear();
                var month = now.getMonth() + 1;
                var day = now.getDate();
                var formattedDate = year + '年' + (month < 10 ? '0' + month : month) + '月' + (day < 10 ? '0' + day : day) + '日';
                dateElement.textContent = '测试日期：' + formattedDate;
            }
            
            // 渲染答题详情
            renderAnswerDetails(dataset, res);
            
            resultSection.classList.remove('hidden');
            resultSection.scrollIntoView({behavior:'smooth'});
        });

        resetBtn.addEventListener('click', function(){
            form.reset();
            document.getElementById('result-section').classList.add('hidden');
            
            // 清除所有题目的批卷标记并取消只读状态
            if (currentDataset && totalQuestions > 0) {
                for (var i = 0; i < totalQuestions; i++) {
                    clearAnswerHighlights(currentDataset.questions[i], i);
                    setQuestionReadOnly(i, false);
                }
            }
            
            // 重置后回到第一题
            showQuestion(0);
        });

        if (saveBtn) {
            saveBtn.addEventListener('click', saveAsImage);
        }
    }

    // 朗读题目功能
    function readAloud(text) {
        // 检查文本是否为空
        if (!text || typeof text !== 'string') {
            console.warn('无法朗读空文本或非字符串内容');
            return;
        }
        
        // 检测是否在WebView中
        var isInWebView = function() {
            var ua = navigator.userAgent.toLowerCase();
            return ua.indexOf('wv') > -1 || 
                   ua.indexOf('webview') > -1 ||
                   (ua.indexOf('android') > -1 && ua.indexOf('chrome') === -1) ||
                   (ua.indexOf('iphone') > -1 && ua.indexOf('safari') === -1);
        };
        
        var inWebView = isInWebView();
        
        // 在WebView中优先使用ResponsiveVoice
        if (inWebView && typeof responsiveVoice !== 'undefined' && responsiveVoice.speak) {
            try {
                console.log('WebView环境：使用ResponsiveVoice');
                responsiveVoice.speak(text, 'Chinese Female', {
                    rate: 0.85,
                    pitch: 1.05,
                    volume: 0.9
                });
            } catch (error) {
                console.error('ResponsiveVoice朗读出错:', error);
            }
        }
        // 检查浏览器是否支持Web Speech API
        else if ('speechSynthesis' in window) {
            try {
                // 停止任何正在进行的朗读
                window.speechSynthesis.cancel();
                
                // 创建新的朗读实例
                var utterance = new SpeechSynthesisUtterance(text);
                utterance.lang = 'zh-CN'; // 设置中文朗读
                
                // 选择中文语音（如果可用）
                var voices = window.speechSynthesis.getVoices();
                var chineseVoice = voices.find(function(voice) {
                    return voice.lang === 'zh-CN' || voice.lang.includes('zh');
                });
                
                if (chineseVoice) {
                    utterance.voice = chineseVoice;
                }
                
                // 朗读文本
                window.speechSynthesis.speak(utterance);
            } catch (error) {
                console.error('朗读功能出错:', error);
                
                // 如果Web Speech API失败，尝试ResponsiveVoice
                if (typeof responsiveVoice !== 'undefined' && responsiveVoice.speak) {
                    console.log('Web Speech API失败，切换到ResponsiveVoice');
                    responsiveVoice.speak(text, 'Chinese Female', {
                        rate: 0.85,
                        pitch: 1.05,
                        volume: 0.9
                    });
                }
            }
        }
        // 备选方案：ResponsiveVoice
        else if (typeof responsiveVoice !== 'undefined' && responsiveVoice.speak) {
            try {
                console.log('使用ResponsiveVoice');
                responsiveVoice.speak(text, 'Chinese Female', {
                    rate: 0.85,
                    pitch: 1.05,
                    volume: 0.9
                });
            } catch (error) {
                console.error('ResponsiveVoice朗读出错:', error);
            }
        }
        else {
            console.warn('您的浏览器不支持文本朗读功能');
        }
    }
    
    // 预加载语音列表
    if ('speechSynthesis' in window) {
        window.speechSynthesis.onvoiceschanged = function() {
            window.speechSynthesis.getVoices();
        };
        
        // 初始化时获取一次语音列表
        window.speechSynthesis.getVoices();
    }
    
    // 音效控制变量
    var soundEnabled = true;
    
    // 创建音效元素
    function createSoundElements() {
        // 创建选项点击音效
        var clickSound = document.createElement('audio');
        clickSound.id = 'option-click-sound';
        clickSound.src = 'data/sounds/click.mp3'; // 假设音效文件路径
        clickSound.preload = 'auto';
        document.body.appendChild(clickSound);
        
        // 添加错误处理
        clickSound.onerror = function() {
            console.log('点击音效文件加载失败，使用默认音效');
            // 可以在这里添加fallback逻辑，比如使用Web Audio API生成简单音效
        };
        
        // 创建答对音效
        var correctSound = document.createElement('audio');
        correctSound.id = 'correct-sound';
        correctSound.src = 'data/sounds/correct.mp3'; // 假设音效文件路径
        correctSound.preload = 'auto';
        document.body.appendChild(correctSound);
        
        correctSound.onerror = function() {
            console.log('答对音效文件加载失败，使用默认音效');
        };
        
        // 创建答错音效
        var wrongSound = document.createElement('audio');
        wrongSound.id = 'wrong-sound';
        wrongSound.src = 'data/sounds/wrong.mp3'; // 假设音效文件路径
        wrongSound.preload = 'auto';
        document.body.appendChild(wrongSound);
        
        wrongSound.onerror = function() {
            console.log('答错音效文件加载失败，使用默认音效');
        };
    }
    
    // 播放音效函数
    function playSound(soundType) {
        if (!soundEnabled) return;
        
        var soundElement;
        switch(soundType) {
            case 'click':
                soundElement = document.getElementById('option-click-sound');
                break;
            case 'correct':
                soundElement = document.getElementById('correct-sound');
                break;
            case 'wrong':
                soundElement = document.getElementById('wrong-sound');
                break;
        }
        
        if (soundElement) {
            // 停止任何正在播放的音效
            soundElement.pause();
            soundElement.currentTime = 0;
            
            // 播放音效
            try {
                soundElement.play().catch(function(e) {
                    console.warn('无法播放音效:', e);
                });
            } catch (error) {
                console.warn('播放音效出错:', error);
            }
        }
    }
    
    // 创建临时音效文件（如果需要）
    function ensureSoundFiles() {
        // 检查音效目录是否存在
        // 这里简单创建音效文件，实际项目中应该由服务器提供
        var soundsDir = 'data/sounds';
        
        // 为了演示，我们可以在控制台提示用户添加音效文件
        console.log('请确保在data/sounds目录下添加click.mp3、correct.mp3和wrong.mp3音效文件');
    }
    
    // 暴露到window对象
    window.TestRunner = { bootstrap: bootstrap };
    // 设置实时批卷开关和音效开关
    function setupRealTimeScoringToggle() {
        var toggleElement = document.getElementById('realtime-scoring-toggle');
        var checkboxElement = document.getElementById('realtime-checkbox');
        
        // 创建音效开关
        if (toggleElement && !document.getElementById('sound-toggle')) {
            // 获取progress-header容器，这是实时批卷开关的父元素
            var progressHeader = toggleElement.parentElement;
            
            // 创建音效开关，作为一个独立的label元素
            var soundToggle = document.createElement('label');
            soundToggle.id = 'sound-toggle';
            soundToggle.className = 'toggle-switch';
            soundToggle.style.marginRight = '0';
            
            // 音效图标已删除
            
            // 音效复选框
            var soundCheckbox = document.createElement('input');
            soundCheckbox.type = 'checkbox';
            soundCheckbox.id = 'sound-checkbox';
            soundCheckbox.checked = soundEnabled;
            
            // 音效开关滑块
            var soundSpan = document.createElement('span');
            soundSpan.className = 'toggle-slider';
            soundSpan.title = '音效开关';

            // 添加音效开关文字
            var soundTextSpan = document.createElement('span');
            soundTextSpan.className = 'toggle-text';
            soundTextSpan.textContent = '音效开关';

            soundToggle.appendChild(soundCheckbox);
            soundToggle.appendChild(soundSpan);
            soundToggle.appendChild(soundTextSpan);
            
            // 在实时批卷开关之前添加音效开关
            progressHeader.insertBefore(soundToggle, toggleElement);
            
            // 设置音效开关的事件监听
            soundCheckbox.addEventListener('change', function() {
                soundEnabled = this.checked;
                console.log('音效已' + (soundEnabled ? '开启' : '关闭'));
            });
        }
        
        // 根据数据集配置决定是否显示开关
        if (currentDataset && currentDataset.enableRealTimeScoring) {
            if (toggleElement) {
                toggleElement.classList.remove('hidden');
            }
            
            // 设置开关的事件监听
            if (checkboxElement) {
                checkboxElement.addEventListener('change', function() {
                    realTimeScoringEnabled = this.checked;
                    
                    // 如果开启实时批卷，为所有已回答的题目显示批卷标记并设为只读
                    if (realTimeScoringEnabled) {
                        for (var i = 0; i < totalQuestions; i++) {
                            var name = 'q_' + i;
                            var inputs = document.querySelectorAll('input[name="'+name+'"]');
                            var answered = false;
                            inputs.forEach(function(inp){ if (inp.checked) answered = true; });
                            
                            if (answered) {
                                highlightCorrectAnswer(currentDataset.questions[i], i, currentDataset);
                                setQuestionReadOnly(i, true);
                            }
                        }
                    } else {
                        // 如果关闭实时批卷，清除所有批卷标记并恢复所有题目可编辑
                        for (var i = 0; i < totalQuestions; i++) {
                            clearAnswerHighlights(currentDataset.questions[i], i);
                            setQuestionReadOnly(i, false);
                        }
                    }
                });
            }
        }
    }
        
        // 同时暴露关键函数供外部使用
        window.computeScore = computeScore;
        window.matchRange = matchRange;
        window.currentDataset = currentDataset;
})();



