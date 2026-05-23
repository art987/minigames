// 测试管理器工具 - 提供便捷功能来管理测试项目

(function() {
    // 检查是否已加载
    if (window.TestManager) {
        console.warn('TestManager已经加载，跳过重复加载');
        return;
    }
    
    // 测试管理器对象
    window.TestManager = {
        // 刷新测试列表
        refreshTestList: function() {
            console.log('刷新测试列表...');
            
            // 如果TestAutoScanner存在，重新扫描所有分类
            if (window.TestAutoScanner) {
                window.TestAutoScanner.scanAllCategories();
            }
            
            // 触发页面刷新回调（如果已定义）
            if (typeof window.onTestListRefreshed === 'function') {
                window.onTestListRefreshed();
            }
            
            console.log('测试列表刷新完成');
            return true;
        },
        
        // 手动添加新测试文件
        addNewTest: function(categoryKey, testId, testTitle) {
            console.log(`尝试添加新测试: ${testId} (分类: ${categoryKey})`);
            
            // 验证分类
            const validCategories = ['psychology', 'knowledge', 'iq', 'eq', 'personality', 'career'];
            if (!validCategories.includes(categoryKey)) {
                console.error(`无效的分类: ${categoryKey}。有效分类: ${validCategories.join(', ')}`);
                return false;
            }
            
            // 验证测试ID
            if (!testId || typeof testId !== 'string' || testId.trim() === '') {
                console.error('测试ID不能为空');
                return false;
            }
            
            // 构建文件名
            const fileName = `${testId}.js`;
            
            // 使用TestAutoScanner添加测试文件
            if (window.TestAutoScanner && typeof window.TestAutoScanner.addTestFile === 'function') {
                const result = window.TestAutoScanner.addTestFile(categoryKey, fileName);
                
                if (result) {
                    console.log(`测试 ${testId} 已添加到扫描列表，等待文件创建...`);
                    alert(`测试 "${testTitle || testId}" 已添加到系统中。\n请在 data/${categoryKey}/ 目录下创建 ${fileName} 文件。`);
                }
                
                return result;
            }
            
            console.error('无法添加测试文件，请确保TestAutoScanner已加载');
            return false;
        },
        
        // 获取测试统计信息
        getTestStats: function() {
            const stats = {
                totalTests: 0,
                testsByCategory: {}
            };
            
            // 从TestConfig获取统计信息
            if (window.TestConfig && window.TestConfig.testsByCategory) {
                Object.keys(window.TestConfig.testsByCategory).forEach(categoryKey => {
                    const testCount = window.TestConfig.testsByCategory[categoryKey].length;
                    stats.testsByCategory[categoryKey] = testCount;
                    stats.totalTests += testCount;
                });
            }
            
            return stats;
        },
        
        // 验证测试数据完整性
        validateTestData: function() {
            console.log('正在验证测试数据...');
            
            const validationResult = {
                isValid: true,
                errors: [],
                warnings: [],
                testDetails: []
            };
            
            // 检查TestConfig是否存在
            if (!window.TestConfig) {
                validationResult.isValid = false;
                validationResult.errors.push('TestConfig未加载');
                return validationResult;
            }
            
            // 检查categories是否存在且格式正确
            if (!window.TestConfig.categories || typeof window.TestConfig.categories !== 'object') {
                validationResult.isValid = false;
                validationResult.errors.push('categories不存在或格式错误');
            }
            
            // 检查testsByCategory是否存在且格式正确
            if (!window.TestConfig.testsByCategory || typeof window.TestConfig.testsByCategory !== 'object') {
                validationResult.isValid = false;
                validationResult.errors.push('testsByCategory不存在或格式错误');
                return validationResult;
            }
            
            // 检查TestDatasets是否存在
            if (!window.TestDatasets) {
                validationResult.warnings.push('TestDatasets对象不存在，创建默认对象');
                window.TestDatasets = {};
            }
            
            // 检查TestRunner是否存在
            if (!window.TestRunner || !window.TestRunner.bootstrap) {
                validationResult.warnings.push('TestRunner或bootstrap函数不存在');
            }
            
            // 检查TestRegistry是否存在
            if (!window.TestRegistry) {
                validationResult.warnings.push('TestRegistry不存在');
            }
            
            // 验证每个分类的测试数据
            Object.keys(window.TestConfig.testsByCategory).forEach(categoryKey => {
                const tests = window.TestConfig.testsByCategory[categoryKey];
                
                // 检查测试数组格式
                if (!Array.isArray(tests)) {
                    validationResult.isValid = false;
                    validationResult.errors.push(`分类${categoryKey}的测试数据不是数组`);
                    return;
                }
                
                // 检查测试项是否为空
                if (tests.length === 0) {
                    validationResult.warnings.push(`分类${categoryKey}中没有测试数据`);
                }
                
                // 验证每个测试项
                tests.forEach((test, index) => {
                    const testDetail = {
                        id: test.id,
                        title: test.title,
                        category: categoryKey,
                        status: 'OK',
                        issues: []
                    };
                    
                    if (!test || typeof test !== 'object') {
                        validationResult.isValid = false;
                        validationResult.errors.push(`分类${categoryKey}中的测试项${index}格式错误`);
                        testDetail.status = 'ERROR';
                        testDetail.issues.push('格式错误');
                    } else {
                        // 检查必要字段
                        const requiredFields = ['id', 'title'];
                        requiredFields.forEach(field => {
                            if (!test[field]) {
                                validationResult.isValid = false;
                                validationResult.errors.push(`分类${categoryKey}中的测试项${index}缺少必要字段${field}`);
                                testDetail.status = 'ERROR';
                                testDetail.issues.push(`缺少必要字段${field}`);
                            }
                        });
                        
                        // 检查数据集是否已加载
                        if (test.id) {
                            const dataset = window.TestDatasets[test.id];
                            if (!dataset) {
                                validationResult.warnings.push(`测试${test.id}的数据文件未加载`);
                                testDetail.status = 'WARNING';
                                testDetail.issues.push('数据文件未加载');
                            } else {
                                // 检查数据集结构
                                if (!dataset.questions || !Array.isArray(dataset.questions)) {
                                    validationResult.errors.push(`测试${test.id}的数据集中缺少questions数组`);
                                    testDetail.status = 'ERROR';
                                    testDetail.issues.push('缺少questions数组');
                                } else if (dataset.questions.length === 0) {
                                    validationResult.warnings.push(`测试${test.id}的questions数组为空`);
                                    testDetail.status = 'WARNING';
                                    testDetail.issues.push('questions数组为空');
                                }
                                
                                if (!dataset.resultRanges || !Array.isArray(dataset.resultRanges)) {
                                    validationResult.warnings.push(`测试${test.id}的数据集中缺少resultRanges数组`);
                                    testDetail.status = 'WARNING';
                                    testDetail.issues.push('缺少resultRanges数组');
                                }
                            }
                        }
                    }
                    
                    validationResult.testDetails.push(testDetail);
                });
            });
            
            // 输出验证结果
            if (validationResult.isValid) {
                console.log('测试数据验证通过');
                if (validationResult.warnings.length > 0) {
                    console.warn('验证警告:', validationResult.warnings);
                }
            } else {
                console.error('测试数据验证失败:', validationResult.errors);
            }
            
            return validationResult;
        },
        
        // 导出测试配置（用于备份）
        exportConfig: function() {
            if (!window.TestConfig) {
                console.error('TestConfig未加载');
                return null;
            }
            
            const configData = {
                timestamp: new Date().toISOString(),
                categories: window.TestConfig.categories,
                testsByCategory: window.TestConfig.testsByCategory
            };
            
            const configStr = JSON.stringify(configData, null, 2);
            
            // 创建下载链接
            const blob = new Blob([configStr], { type: 'application/json' });
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = `test-config-backup-${new Date().toISOString().split('T')[0]}.json`;
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            URL.revokeObjectURL(url);
            
            console.log('测试配置已导出');
            return configData;
        },
        
        // 启用开发者工具面板
        enableDevTools: function() {
            if (window.location.hostname !== 'localhost' && window.location.hostname !== '127.0.0.1') {
                console.log('不在开发环境，跳过开发者工具');
                return;
            }
            
            // 检查是否已存在开发者工具面板
            if (document.getElementById('test-dev-tools')) {
                console.warn('开发者工具面板已存在');
                return;
            }
            
            // 创建开发者工具面板
            const devToolsPanel = document.createElement('div');
            devToolsPanel.id = 'test-dev-tools';
            devToolsPanel.style.cssText = `
                position: fixed;
                bottom: 20px;
                right: 20px;
                background: rgba(0,0,0,0.8);
                color: white;
                padding: 15px;
                border-radius: 10px;
                z-index: 10000;
                min-width: 300px;
                max-height: 400px;
                overflow-y: auto;
                box-shadow: 0 0 20px rgba(0,0,0,0.5);
            `;
            
            // 开发者工具面板内容
            devToolsPanel.innerHTML = `
                <h3 style="margin-top: 0; color: #00ff00;">测试管理工具</h3>
                <div style="margin-bottom: 10px;">
                    <button id="refresh-test-list" style="padding: 5px 10px; background: #4CAF50; color: white; border: none; border-radius: 5px; cursor: pointer;">刷新测试列表</button>
                    <button id="export-config" style="padding: 5px 10px; background: #2196F3; color: white; border: none; border-radius: 5px; cursor: pointer; margin-left: 5px;">导出配置</button>
                    <button id="validate-test-data" style="padding: 5px 10px; background: #FF9800; color: white; border: none; border-radius: 5px; cursor: pointer; margin-left: 5px;">验证数据</button>
                </div>
                <div id="test-stats" style="font-size: 12px; margin-bottom: 10px; color: #ccc;">
                    加载中...
                </div>
                <div id="validation-results" style="font-size: 11px; color: #999; max-height: 200px; overflow-y: auto; margin-top: 10px;">
                    点击"验证数据"按钮查看结果
                </div>
                <div id="auto-updates" style="font-size: 11px; color: #999; margin-top: 10px;">
                    自动更新已启用
                </div>
            `;
            
            document.body.appendChild(devToolsPanel);
            
            // 绑定刷新按钮事件
            document.getElementById('refresh-test-list').addEventListener('click', function() {
                window.TestManager.refreshTestList();
                window.TestManager.updateTestStats();
            });
            
            // 绑定导出配置按钮事件
            document.getElementById('export-config').addEventListener('click', function() {
                window.TestManager.exportConfig();
            });
            
            // 绑定验证数据按钮事件
            document.getElementById('validate-test-data').addEventListener('click', function() {
                const results = window.TestManager.validateTestData();
                window.TestManager.showValidationResults(results);
            });
            
            // 更新统计信息
            window.TestManager.updateTestStats = function() {
                const statsDiv = document.getElementById('test-stats');
                if (!statsDiv) return;
                
                const stats = window.TestManager.getTestStats();
                let statsHTML = `<strong>统计信息</strong><br>`;
                statsHTML += `总测试数: ${stats.totalTests}<br>`;
                Object.keys(stats.testsByCategory).forEach(cat => {
                    statsHTML += `${cat}: ${stats.testsByCategory[cat]}<br>`;
                });
                statsDiv.innerHTML = statsHTML;
            };
            
            // 初始化统计信息
            window.TestManager.updateTestStats();
            setInterval(window.TestManager.updateTestStats, 5000); // 每5秒更新一次统计信息
            
            console.log('开发者工具面板已启用');
        },
        
        // 显示验证结果
        showValidationResults: function(results) {
            const resultsContainer = document.getElementById('validation-results');
            if (!resultsContainer) return;
            
            let html = '';
            
            // 显示总体状态
            if (results.isValid) {
                html += '<div style="color: #4CAF50; font-weight: bold; margin-bottom: 5px;">✅ 测试数据验证通过</div>';
            } else {
                html += '<div style="color: #f44336; font-weight: bold; margin-bottom: 5px;">❌ 测试数据验证失败</div>';
            }
            
            // 显示错误
            if (results.errors.length > 0) {
                html += '<div style="margin-top: 8px;">';
                html += '<div style="color: #f44336; font-weight: bold;">错误 (' + results.errors.length + '):</div>';
                results.errors.forEach(error => {
                    html += '<div style="color: #f44336; margin-left: 10px;">• ' + error + '</div>';
                });
                html += '</div>';
            }
            
            // 显示警告
            if (results.warnings.length > 0) {
                html += '<div style="margin-top: 8px;">';
                html += '<div style="color: #FF9800; font-weight: bold;">警告 (' + results.warnings.length + '):</div>';
                results.warnings.forEach(warning => {
                    html += '<div style="color: #FF9800; margin-left: 10px;">• ' + warning + '</div>';
                });
                html += '</div>';
            }
            
            // 显示测试详情
            if (results.testDetails && results.testDetails.length > 0) {
                html += '<div style="margin-top: 8px;">';
                html += '<div style="color: #ccc; font-weight: bold;">测试详情:</div>';
                
                // 按分类分组显示
                const testsByCategory = {};
                results.testDetails.forEach(test => {
                    if (!testsByCategory[test.category]) {
                        testsByCategory[test.category] = [];
                    }
                    testsByCategory[test.category].push(test);
                });
                
                Object.keys(testsByCategory).forEach(category => {
                    html += '<div style="margin-left: 10px; margin-top: 5px;">';
                    html += '<div style="color: #2196F3; font-weight: bold;">' + category + ':</div>';
                    
                    testsByCategory[category].forEach(test => {
                        let statusColor = '#4CAF50'; // 绿色
                        let statusIcon = '✓';
                        
                        if (test.status === 'WARNING') {
                            statusColor = '#FF9800'; // 橙色
                            statusIcon = '⚠';
                        } else if (test.status === 'ERROR') {
                            statusColor = '#f44336'; // 红色
                            statusIcon = '✗';
                        }
                        
                        html += '<div style="margin-left: 10px; margin-top: 2px;">';
                        html += '<span style="color: ' + statusColor + '">' + statusIcon + ' ' + (test.title || test.id) + '</span>';
                        
                        if (test.issues && test.issues.length > 0) {
                            html += '<div style="margin-left: 15px; font-size: 10px;">';
                            test.issues.forEach(issue => {
                                html += '<div style="color: ' + statusColor + '">• ' + issue + '</div>';
                            });
                            html += '</div>';
                        }
                        
                        html += '</div>';
                    });
                    
                    html += '</div>';
                });
                
                html += '</div>';
            }
            
            resultsContainer.innerHTML = html;
        }
    };
    
    // 在首页添加开发者工具按钮（仅在开发环境下可见）
    function addDevToolsButton() {
        // 检查是否在首页
        if (window.location.pathname.endsWith('index.html') || window.location.pathname.endsWith('/')) {
            setTimeout(() => {
                // 创建按钮容器
                const container = document.createElement('div');
                container.id = 'test-dev-button-container';
                container.style.cssText = `
                    position: fixed;
                    bottom: 20px;
                    right: 20px;
                    z-index: 9999;
                `;
                
                // 创建按钮
                const button = document.createElement('button');
                button.textContent = '测试管理';
                button.onclick = window.TestManager.enableDevTools;
                button.style.cssText = `
                    padding: 8px 16px;
                    background: #6c5ce7;
                    color: white;
                    border: none;
                    border-radius: 4px;
                    cursor: pointer;
                    font-size: 14px;
                `;
                
                container.appendChild(button);
                document.body.appendChild(container);
            }, 2000);
        }
    }
    
    // 页面加载完成后添加开发者工具按钮
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', addDevToolsButton);
    } else {
        addDevToolsButton();
    }
    
    console.log('测试管理器工具已加载');
})();