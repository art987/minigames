// QuestionsDetective - 专门用于检测和分析questions相关语法错误的调试工具

(function() {
    // 全局调试状态对象
    window.QuestionsDetective = {
        isActive: false,
        totalFiles: 0,
        checkedFiles: 0,
        successFiles: 0,
        errorFiles: 0,
        questionsErrorFiles: 0,
        startTime: 0,
        logs: [],
        errorDetails: {},
        currentAnalysis: null,
        
        // 要分析的文件列表
        filesToCheck: [
            // 心理测评类
            'data/心理测评类/procrastination_level.js',
            'data/心理测评类/happiness_index.js',
            'data/心理测评类/mbti_short.js',
            'data/心理测评类/emotion_stability.js',
            'data/心理测评类/stress_tolerance.js',
            'data/心理测评类/self_confidence.js',
            'data/心理测评类/introversion_extroversion.js',
            
            // 爱情与人际关系类
            'data/爱情与人际关系类/love_philosophy.js',
            'data/爱情与人际关系类/attachment_style.js',
            'data/爱情与人际关系类/ideal_partner.js',
            'data/爱情与人际关系类/intimacy_satisfaction.js',
            'data/爱情与人际关系类/friendship_stability.js',
            'data/爱情与人际关系类/social_anxiety_index.js',
            'data/爱情与人际关系类/love_communication_style.js',
            'data/爱情与人际关系类/attraction_index.js',
            
            // 职业与学习类
            'data/职业与学习类/leadership_index.js',
            'data/职业与学习类/creative_thinking.js',
            'data/职业与学习类/time_management.js',
            'data/职业与学习类/focus_attention.js',
            'data/职业与学习类/career_stress_resilience.js',
            'data/职业与学习类/communication_skills.js',
            
            // 健康与生活习惯类
            'data/健康与生活习惯类/sleep_quality.js',
            'data/健康与生活习惯类/diet_health.js',
            'data/健康与生活习惯类/schedule_regularity.js',
            'data/健康与生活习惯类/mental_subhealth_index.js',
            'data/健康与生活习惯类/exercise_habit_self_assessment.js',
            'data/健康与生活习惯类/mobile_phone_dependency.js',
            'data/健康与生活习惯类/stay_up_late_index.js',
            'data/健康与生活习惯类/sitting_risk_assessment.js',
            
            // 智力与逻辑类
            'data/智力与逻辑类/iq60.js',
            
            // 配置文件
            'data/test-config.js'
        ],
        
        // 开始分析
        startAnalysis: function() {
            if (this.isActive) {
                this.log('分析已经在进行中...');
                return;
            }
            
            this.isActive = true;
            this.totalFiles = this.filesToCheck.length;
            this.checkedFiles = 0;
            this.successFiles = 0;
            this.errorFiles = 0;
            this.questionsErrorFiles = 0;
            this.startTime = Date.now();
            this.logs = [];
            this.errorDetails = {};
            
            this.log('开始分析Questions语法错误...');
            this.log(`共需要分析 ${this.totalFiles} 个文件`);
            
            // 开始逐个分析文件
            this.analyzeNextFile();
        },
        
        // 停止分析
        stopAnalysis: function() {
            this.isActive = false;
            this.log('分析已停止');
        },
        
        // 分析下一个文件
        analyzeNextFile: function() {
            if (!this.isActive || this.checkedFiles >= this.totalFiles) {
                this.finishAnalysis();
                return;
            }
            
            const fileUrl = this.filesToCheck[this.checkedFiles];
            this.checkedFiles++;
            
            this.log(`\n分析文件 ${this.checkedFiles}/${this.totalFiles}: ${fileUrl}`);
            this.currentAnalysis = fileUrl;
            
            this.analyzeFile(fileUrl).then(() => {
                // 短暂延迟后继续分析下一个文件
                setTimeout(() => this.analyzeNextFile(), 100);
            });
        },
        
        // 分析单个文件
        analyzeFile: function(fileUrl) {
            return new Promise((resolve) => {
                const fileName = fileUrl.split('/').pop();
                
                fetch(fileUrl)
                    .then(response => {
                        if (!response.ok) {
                            throw new Error(`无法加载文件: ${response.status} ${response.statusText}`);
                        }
                        return response.text();
                    })
                    .then(content => {
                        // 1. 基本语法检查
                        const basicSyntaxResult = this.checkBasicSyntax(content, fileName);
                        if (!basicSyntaxResult.success) {
                            this.errorFiles++;
                            if (basicSyntaxResult.isQuestionsError) {
                                this.questionsErrorFiles++;
                            }
                            
                            this.errorDetails[fileName] = basicSyntaxResult;
                            this.log(`❌ 基本语法检查失败: ${basicSyntaxResult.errorMessage}`, 'error');
                            resolve();
                            return;
                        }
                        
                        // 2. Questions特定检查
                        const questionsCheckResult = this.checkQuestionsSpecificSyntax(content, fileName);
                        if (!questionsCheckResult.success) {
                            this.errorFiles++;
                            this.questionsErrorFiles++;
                            
                            this.errorDetails[fileName] = questionsCheckResult;
                            this.log(`❌ Questions语法检查失败: ${questionsCheckResult.errorMessage}`, 'error');
                            resolve();
                            return;
                        }
                        
                        // 3. 隔离环境执行检查
                        const isolatedExecutionResult = this.executeInIsolatedEnvironment(content, fileName);
                        if (!isolatedExecutionResult.success) {
                            this.errorFiles++;
                            if (isolatedExecutionResult.isQuestionsError) {
                                this.questionsErrorFiles++;
                            }
                            
                            this.errorDetails[fileName] = isolatedExecutionResult;
                            this.log(`❌ 隔离环境执行失败: ${isolatedExecutionResult.errorMessage}`, 'error');
                            resolve();
                            return;
                        }
                        
                        // 所有检查都通过
                        this.successFiles++;
                        this.log('✅ 所有检查通过！', 'success');
                        resolve();
                    })
                    .catch(error => {
                        this.errorFiles++;
                        this.log(`❌ 文件加载失败: ${error.message}`, 'error');
                        resolve();
                    });
            });
        },
        
        // 基本语法检查
        checkBasicSyntax: function(content, fileName) {
            try {
                // 使用Function构造函数来检查语法
                new Function(content);
                return { success: true };
            } catch (error) {
                const errorMessage = error.message;
                const isQuestionsError = errorMessage.includes('questions') || errorMessage.includes('Unexpected identifier');
                
                // 尝试提取行号
                let lineNumber = null;
                const positionMatch = /line\s+(\d+)/i.exec(errorMessage);
                if (positionMatch && positionMatch[1]) {
                    lineNumber = parseInt(positionMatch[1], 10);
                }
                
                return {
                    success: false,
                    errorMessage: errorMessage,
                    isQuestionsError: isQuestionsError,
                    lineNumber: lineNumber,
                    fileName: fileName
                };
            }
        },
        
        // Questions特定语法检查
        checkQuestionsSpecificSyntax: function(content, fileName) {
            // 检查questions数组定义
            const questionsArrayPatterns = [
                /questions\s*[:=]\s*\[/,  // questions: [ 或 questions = [
                /["']questions["']\s*:\s*\[/ // "questions": [
            ];
            
            let hasValidQuestionsArray = false;
            for (const pattern of questionsArrayPatterns) {
                if (pattern.test(content)) {
                    hasValidQuestionsArray = true;
                    break;
                }
            }
            
            if (!hasValidQuestionsArray) {
                return {
                    success: false,
                    errorMessage: '未找到有效的questions数组定义',
                    isQuestionsError: true,
                    fileName: fileName
                };
            }
            
            // 检查可能导致"Unexpected identifier 'questions'"的模式
            const problematicPatterns = [
                { pattern: /questions\s+\{/, desc: 'questions后面直接跟{，缺少冒号或等号' },
                { pattern: /,\s*questions\s*:/, desc: 'questions前面有多余的逗号' },
                { pattern: /\}\s*questions\s*:/, desc: '}后面直接跟questions:，可能缺少逗号' },
                { pattern: /questions\s*\./, desc: 'questions. 引用可能有问题' },
                { pattern: /questions\s*\(/, desc: 'questions( 可能是错误的函数调用' },
                { pattern: /;\s*questions\s*:/, desc: ';后面直接跟questions:，可能语法错误' }
            ];
            
            for (const { pattern, desc } of problematicPatterns) {
                const match = pattern.exec(content);
                if (match) {
                    // 尝试计算行号
                    const lines = content.substring(0, match.index).split('\n');
                    const lineNumber = lines.length;
                    
                    return {
                        success: false,
                        errorMessage: `发现可能的问题: ${desc} (匹配: "${match[0]}")`,
                        isQuestionsError: true,
                        lineNumber: lineNumber,
                        fileName: fileName,
                        matchText: match[0]
                    };
                }
            }
            
            return { success: true };
        },
        
        // 在隔离的环境中执行代码
        executeInIsolatedEnvironment: function(content, fileName) {
            try {
                // 创建一个隔离的上下文
                const isolatedContext = {
                    // 模拟全局对象
                    window: { TestDatasets: {} },
                    TestDatasets: {},
                    console: {
                        log: function() {},
                        error: function() {},
                        warn: function() {}
                    }
                };
                
                // 包装代码以便在隔离环境中执行
                const wrappedCode = `
                    (function(window, TestDatasets, console) {
                        ${content}
                        return { success: true, TestDatasets: TestDatasets };
                    })
                `;
                
                // 执行代码
                const executionFunction = new Function('context', `
                    try {
                        const result = ${wrappedCode}(context.window, context.TestDatasets, context.console);
                        context.TestDatasets = result.TestDatasets;
                        return { success: true };
                    } catch (error) {
                        return {
                            success: false,
                            errorMessage: error.message,
                            isQuestionsError: error.message.includes('questions') || error.message.includes('Unexpected identifier'),
                            stack: error.stack
                        };
                    }
                `);
                
                const result = executionFunction(isolatedContext);
                
                if (result.success) {
                    // 检查是否正确注册了数据集
                    const datasetKeys = Object.keys(isolatedContext.TestDatasets);
                    if (datasetKeys.length === 0) {
                        return {
                            success: false,
                            errorMessage: '代码执行成功，但没有正确注册到TestDatasets',
                            isQuestionsError: false,
                            fileName: fileName
                        };
                    }
                    
                    // 检查questions数组是否存在且有效
                    for (const key of datasetKeys) {
                        const dataset = isolatedContext.TestDatasets[key];
                        if (!dataset.questions || !Array.isArray(dataset.questions)) {
                            return {
                                success: false,
                                errorMessage: `数据集${key}中缺少有效的questions数组`,
                                isQuestionsError: true,
                                fileName: fileName
                            };
                        }
                        
                        if (dataset.questions.length === 0) {
                            return {
                                success: false,
                                errorMessage: `数据集${key}中的questions数组为空`,
                                isQuestionsError: true,
                                fileName: fileName
                            };
                        }
                    }
                }
                
                return result;
            } catch (error) {
                return {
                    success: false,
                    errorMessage: `隔离环境执行异常: ${error.message}`,
                    isQuestionsError: error.message.includes('questions') || error.message.includes('Unexpected identifier'),
                    fileName: fileName,
                    stack: error.stack
                };
            }
        },
        
        // 完成分析
        finishAnalysis: function() {
            if (!this.isActive) return;
            
            this.isActive = false;
            const totalTime = ((Date.now() - this.startTime) / 1000).toFixed(2);
            
            this.log('\n===== 分析总结 =====');
            this.log(`总文件数: ${this.totalFiles}`);
            this.log(`成功通过: ${this.successFiles}`);
            this.log(`分析失败: ${this.errorFiles}`);
            this.log(`Questions相关错误: ${this.questionsErrorFiles}`);
            this.log(`总耗时: ${totalTime}秒`);
            
            if (this.questionsErrorFiles > 0) {
                this.log('\n检测到Questions相关错误的文件:');
                for (const fileName in this.errorDetails) {
                    if (this.errorDetails[fileName].isQuestionsError) {
                        const details = this.errorDetails[fileName];
                        this.log(`- ${fileName}: ${details.errorMessage}${details.lineNumber ? ` (行号: ${details.lineNumber})` : ''}`, 'error');
                    }
                }
            }
            
            if (this.errorFiles === 0) {
                this.log('\n🎉 恭喜！所有文件都通过了分析，没有检测到语法错误。', 'success');
                this.log('\n如果在生产环境中仍然遇到"SyntaxError: Unexpected identifier \'questions\'"错误，可能是以下原因：');
                this.log('1. 错误只在特定条件下出现');
                this.log('2. 错误与文件加载顺序有关');
                this.log('3. 错误可能与浏览器兼容性有关');
                this.log('4. 错误可能是间歇性的或与特定用户操作有关');
            }
        },
        
        // 日志记录函数
        log: function(message, type = 'info') {
            const timestamp = new Date().toLocaleTimeString();
            const formattedMessage = `[${timestamp}] ${message}`;
            
            // 保存到日志数组
            this.logs.push({ message: formattedMessage, type: type, timestamp: timestamp });
            
            // 输出到控制台
            switch (type) {
                case 'error':
                    console.error(formattedMessage);
                    break;
                case 'success':
                    console.log('%c' + formattedMessage, 'color: green;');
                    break;
                case 'warning':
                    console.warn(formattedMessage);
                    break;
                default:
                    console.log(formattedMessage);
            }
            
            // 如果页面上有日志容器，也显示在页面上
            const logContainer = document.getElementById('questions-detective-log');
            if (logContainer) {
                const logEntry = document.createElement('div');
                logEntry.className = `log-entry log-${type}`;
                logEntry.textContent = formattedMessage;
                logContainer.appendChild(logEntry);
                logContainer.scrollTop = logContainer.scrollHeight;
            }
        },
        
        // 获取分析结果
        getResults: function() {
            return {
                totalFiles: this.totalFiles,
                successFiles: this.successFiles,
                errorFiles: this.errorFiles,
                questionsErrorFiles: this.questionsErrorFiles,
                logs: this.logs,
                errorDetails: this.errorDetails
            };
        }
    };
    
    // 如果页面加载完成，自动开始分析
    if (document.readyState === 'complete' || document.readyState === 'interactive') {
        // 延迟执行，给页面一些时间初始化
        setTimeout(() => {
            console.log('QuestionsDetective: 调试工具已加载，可以通过 window.QuestionsDetective.startAnalysis() 开始分析');
        }, 1000);
    } else {
        document.addEventListener('DOMContentLoaded', () => {
            console.log('QuestionsDetective: 调试工具已加载，可以通过 window.QuestionsDetective.startAnalysis() 开始分析');
        });
    }
})();