/* Generic test runner: render questions, collect answers, score with ranges */
(function(){
    // 当前问题索引
    var currentQuestionIndex = 0;
    var totalQuestions = 0;
    var questionContainers = [];
    var currentDataset = null;

    // 全局变量
    var questionContainers = [];
    var currentQuestionIndex = 0;
    var totalQuestions = 0;
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
            span.textContent = opt.label;
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
        
        prevBtn.disabled = (currentQuestionIndex === 0);
        
        // 如果是最后一题且已回答，显示提交按钮
        if (currentQuestionIndex === totalQuestions - 1 && answered) {
            nextBtn.style.display = 'none';
            submitBtn.style.display = 'block';
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
        });
        
        // 显示当前问题
        if (questionContainers[idx]) {
            questionContainers[idx].classList.add('active');
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

    function saveAsImage(){
        var card = document.getElementById('result-card');
        if (!window.html2canvas){ alert('html2canvas 加载失败'); return; }
        html2canvas(card,{backgroundColor:'white',scale:2}).then(function(canvas){
            var link = document.createElement('a');
            link.download = (document.getElementById('test-title').textContent||'result') + '.png';
            link.href = canvas.toDataURL('image/png');
            link.click();
        });
    }

    function bootstrap(){
        var id = getQueryParam('test');
        var meta = findTestById(id);
        if (!meta){
            document.getElementById('test-title').textContent = '未找到该测试';
            return;
        }
        document.getElementById('test-title').textContent = meta.title;
        var dataset = loadDataset(id);
        if (!dataset){
            document.getElementById('test-intro').textContent = '题库加载失败';
            return;
        }
        document.getElementById('test-intro').textContent = meta.description;
        currentDataset = dataset;

        var form = document.getElementById('test-form');
        form.innerHTML = '';
        dataset.questions.forEach(function(q, idx){ renderQuestion(form, q, idx); });
        totalQuestions = dataset.questions.length;

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

        submitBtn.addEventListener('click', function(e){
            e.preventDefault();
            var res = computeScore(dataset);
            var range = matchRange(dataset.resultRanges, res.total) || {label:'未匹配', text:'', advice:''};
            totalSpan.textContent = String(res.total);
            levelSpan.textContent = range.label || '-';
            textDiv.textContent = range.text || '';
            adviceDiv.textContent = range.advice || '';
            resultSection.classList.remove('hidden');
            resultSection.scrollIntoView({behavior:'smooth'});
        });

        resetBtn.addEventListener('click', function(){
            form.reset();
            document.getElementById('result-section').classList.add('hidden');
            // 重置后回到第一题
            showQuestion(0);
        });

        saveBtn.addEventListener('click', saveAsImage);
    }

    window.TestRunner = { bootstrap: bootstrap };
})();



