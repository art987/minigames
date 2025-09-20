/* Generic test runner: render questions, collect answers, score with ranges */
(function(){
    // 全局变量
    var currentQuestionIndex = 0;
    var totalQuestions = 0;
    var questionContainers = [];
    var currentDataset = null;
    
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
                updateQuestionStatus(idx);
                
                // 自动跳转到下一题
                if (currentQuestionIndex < totalQuestions - 1) {
                    setTimeout(function() {
                        showQuestion(currentQuestionIndex + 1);
                    }, 300); // 短暂延迟，让用户看到选择效果
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
        var total = 0;
        var perQuestionScores = [];
        dataset.questions.forEach(function(q, qi){
            var name = 'q_' + qi;
            var inputs = document.querySelectorAll('input[name="'+name+'"]');
            var selected = [];
            inputs.forEach(function(inp){ if (inp.checked) selected.push(parseInt(inp.value,10)); });
            if (!selected.length) { perQuestionScores.push(0); return; }
            var qScore = 0;
            selected.forEach(function(idx){ qScore += q.options[idx].score; });
            perQuestionScores.push(qScore);
            total += qScore;
        });
        return { total: total, perQuestionScores: perQuestionScores };
    }

    function matchRange(resultRanges, total){
        for (var i=0;i<resultRanges.length;i++){
            var r = resultRanges[i];
            var minOk = (typeof r.min === 'number') ? total >= r.min : true;
            var maxOk = (typeof r.max === 'number') ? total <= r.max : true;
            if (minOk && maxOk) return r;
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
            
            // 找出正确答案
            var correctAnswers = [];
            q.options.forEach(function(opt, oi) {
                if (opt.score > 0) correctAnswers.push(oi);
            });
            
            // 构建题目信息
            var questionText = (qi + 1) + '. ' + q.text + ' (分值: ' + q.options.reduce(function(sum, opt) { return sum + opt.score; }, 0) + ')';
            answerItem.innerHTML = '<p class="answer-question">' + questionText + '</p>';
            
            // 添加得分信息
            var scoreText = '得分: ' + scores.perQuestionScores[qi];
            answerItem.innerHTML += '<p class="answer-score">' + scoreText + '</p>';
            
            // 添加用户答题信息
            var userAnswerText = '您的答案: ';
            if (selected.length === 0) {
                userAnswerText += '未回答';
            } else {
                var selectedLabels = selected.map(function(idx) { return q.options[idx].label || q.options[idx].text || ''; }).join('、');
                userAnswerText += selectedLabels;
            }
            answerItem.innerHTML += '<p class="answer-user">' + userAnswerText + '</p>';
            
            // 添加正确答案信息
            var correctAnswerText = '高分答案: ';
            var correctLabels = correctAnswers.map(function(idx) { return q.options[idx].label || q.options[idx].text || ''; }).join('、');
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
                var link = document.createElement('a');
                link.download = (document.getElementById('test-title').textContent||'result') + '.png';
                link.href = canvas.toDataURL('image/png');
                link.click();
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

        // 设置导航和进度条
        setupNavigation();
        updateProgressBar();

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
                totalPossibleScoreEl.textContent = '总分' + maxTotalScore;
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
                dateElement.textContent = '颁证日期：' + formattedDate;
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
                totalPossibleScoreEl.textContent = '总分' + maxTotalScore;
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
            // 重置后回到第一题
            showQuestion(0);
        });

        if (saveBtn) {
            saveBtn.addEventListener('click', saveAsImage);
        }
    }

    // 暴露到window对象
    window.TestRunner = { bootstrap: bootstrap };
    // 同时暴露关键函数供外部使用
    window.computeScore = computeScore;
    window.matchRange = matchRange;
    window.currentDataset = currentDataset;
})();



